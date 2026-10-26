#!/usr/bin/env node
/**
 * scripts/preview.mjs
 *
 * Preview a template with the niche's _BUSINESS_DATA.json injected.
 *
 * Usage:
 *   node scripts/preview.mjs <NICHE>/<Template_X>            # default: build .preview + dev
 *   node scripts/preview.mjs <NICHE>/<Template_X> --list     # report placeholders only
 *   node scripts/preview.mjs <NICHE>/<Template_X> --clean    # remove .preview/ only
 *
 * Paths are resolved relative to the Templates lib root (this script's
 * parent directory), so invocation from any subdirectory works the same.
 *
 * Default behavior:
 *   1. Read the niche's _BUSINESS_DATA.json
 *   2. Copy the template to <template>/.preview/ (excluding node_modules,
 *      .next, .preview itself, .git)
 *   3. Replace every {{PLACEHOLDER}} occurrence in editable source files
 *      with the corresponding JSON value
 *   4. pnpm install + pnpm run dev inside the .preview/ copy
 *
 * Source files in the original template stay untouched — placeholders
 * remain literal.
 */

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES_ROOT = path.resolve(SCRIPT_DIR, "..");

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith("--")));
const positional = args.filter((a) => !a.startsWith("--"));

const arg = positional[0];
if (!arg) {
  console.error("Usage: node scripts/preview.mjs <NICHE>/<Template_X> [--list|--clean]");
  process.exit(1);
}

const target = path.resolve(TEMPLATES_ROOT, arg);
const niche = arg.split(/[\\/]/)[0];
const dataPath = path.resolve(TEMPLATES_ROOT, niche, "_BUSINESS_DATA.json");

if (!fs.existsSync(target) || !fs.statSync(target).isDirectory()) {
  console.error(`Template directory not found: ${target}`);
  process.exit(1);
}

const previewDir = path.join(target, ".preview");
const skip = new Set(["node_modules", ".next", ".preview", ".git"]);
const editableExt = new Set([
  ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs",
  ".json", ".css", ".md", ".html",
]);

// ---------- --clean ----------
if (flags.has("--clean")) {
  if (fs.existsSync(previewDir)) {
    console.log(`→ removing ${path.relative(process.cwd(), previewDir)}`);
    fs.rmSync(previewDir, { recursive: true, force: true });
    console.log("  done");
  } else {
    console.log("  no .preview directory to remove");
  }
  process.exit(0);
}

// _BUSINESS_DATA.json required for both --list and default mode (the data
// drives the resolution map shown in --list).
if (!fs.existsSync(dataPath)) {
  console.error(`_BUSINESS_DATA.json not found at: ${dataPath}`);
  process.exit(1);
}
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const replacements = Object.fromEntries(
  Object.entries(data).filter(([k]) => !k.startsWith("_")),
);

// ---------- --list ----------
if (flags.has("--list")) {
  const found = collectPlaceholders(target);
  const keys = [...found].sort();
  if (keys.length === 0) {
    console.log("(no {{PLACEHOLDERS}} found in source)");
    process.exit(0);
  }
  console.log(`Placeholders found in ${path.relative(TEMPLATES_ROOT, target)}:`);
  console.log("");
  const longest = Math.max(...keys.map((k) => k.length));
  for (const key of keys) {
    const resolved = key in replacements
      ? truncate(String(replacements[key]), 56)
      : "  ⟨ not in _BUSINESS_DATA.json ⟩";
    console.log(`  {{${key.padEnd(longest)}}}  →  ${resolved}`);
  }
  console.log("");
  console.log(`Source: ${path.relative(TEMPLATES_ROOT, dataPath)}`);
  process.exit(0);
}

// ---------- default: build .preview + install + dev ----------
console.log(`→ cleaning ${path.relative(process.cwd(), previewDir)}`);
fs.rmSync(previewDir, { recursive: true, force: true });
fs.mkdirSync(previewDir, { recursive: true });

console.log(`→ copying template to .preview/`);
copyRecursive(target, previewDir);

console.log(`→ replacing {{PLACEHOLDERS}}`);
let touched = 0;
walkAndReplace(previewDir);
console.log(`  ${touched} files updated`);

// Inject .env.preview from Templates root into .preview/.env.local
// This allows the preview server to use a single shared API key (Resend, etc.)
// without checking it into per-template .env files.
const envSource = path.resolve(TEMPLATES_ROOT, ".env.preview");
const envDest = path.join(previewDir, ".env.local");
if (fs.existsSync(envSource)) {
  fs.copyFileSync(envSource, envDest);
  console.log(`→ injected .env.preview → .preview/.env.local`);
} else {
  console.warn(
    `⚠ ${path.relative(TEMPLATES_ROOT, envSource)} not found — server-side env vars (RESEND_API_KEY, etc.) will be undefined. Forms will fail silently.`,
  );
}

console.log(`→ pnpm install (this may take a moment)`);
const install = spawnSync("pnpm", ["install"], {
  cwd: previewDir,
  stdio: "inherit",
  shell: true,
});
if (install.status !== 0) {
  console.error("pnpm install failed");
  process.exit(install.status ?? 1);
}

console.log(`→ pnpm run dev`);
const dev = spawnSync("pnpm", ["run", "dev"], {
  cwd: previewDir,
  stdio: "inherit",
  shell: true,
});
process.exit(dev.status ?? 0);

// ---------- helpers ----------

function copyRecursive(src, dst) {
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (skip.has(entry.name)) continue;
    const srcPath = path.join(src, entry.name);
    const dstPath = path.join(dst, entry.name);
    if (entry.isDirectory()) {
      fs.mkdirSync(dstPath, { recursive: true });
      copyRecursive(srcPath, dstPath);
    } else if (entry.isFile()) {
      fs.copyFileSync(srcPath, dstPath);
    }
  }
}

function walkAndReplace(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (skip.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkAndReplace(full);
      continue;
    }
    if (!editableExt.has(path.extname(entry.name))) continue;
    const original = fs.readFileSync(full, "utf8");
    // Match {{KEY}} where KEY contains uppercase letters, underscores, or digits.
    // Digits are required for placeholders like {{GALLERY_1}}, {{REVIEW_1}}, etc.
    const next = original.replace(/\{\{([A-Z0-9_]+)\}\}/g, (m, key) =>
      key in replacements ? String(replacements[key]) : m,
    );
    if (next !== original) {
      fs.writeFileSync(full, next);
      touched++;
    }
  }
}

function collectPlaceholders(dir, found = new Set()) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (skip.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectPlaceholders(full, found);
      continue;
    }
    if (!editableExt.has(path.extname(entry.name))) continue;
    const text = fs.readFileSync(full, "utf8");
    const re = /\{\{([A-Z0-9_]+)\}\}/g;
    let m;
    while ((m = re.exec(text)) !== null) found.add(m[1]);
  }
  return found;
}

function truncate(s, n) {
  return s.length <= n ? s : s.slice(0, n - 1) + "…";
}
