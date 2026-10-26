#!/usr/bin/env node
/**
 * scripts/preview-prepare.mjs
 *
 * Prepares a template's .preview/ folder WITHOUT starting the dev server.
 * Used by preview-all.ps1 to bootstrap all 9 templates before launching
 * their dev servers in parallel.
 *
 * Steps performed:
 *   1. Copy the template to .preview/ (excluding node_modules, .next, .preview, .git)
 *   2. Replace every {{PLACEHOLDER}} with the niche's _BUSINESS_DATA.json values
 *   3. Inject .env.preview from Templates root into .preview/.env.local
 *   4. pnpm install
 *
 * Then exits — the caller is responsible for spawning `pnpm dev` on the
 * port of its choice.
 *
 * Usage:
 *   node scripts/preview-prepare.mjs <NICHE>/<Template_X>
 */

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES_ROOT = path.resolve(SCRIPT_DIR, "..");

const arg = process.argv[2];
if (!arg) {
  console.error("Usage: node scripts/preview-prepare.mjs <NICHE>/<Template_X>");
  process.exit(1);
}

const target = path.resolve(TEMPLATES_ROOT, arg);
const niche = arg.split(/[\\/]/)[0];
const dataPath = path.resolve(TEMPLATES_ROOT, niche, "_BUSINESS_DATA.json");

if (!fs.existsSync(target) || !fs.statSync(target).isDirectory()) {
  console.error(`Template directory not found: ${target}`);
  process.exit(1);
}
if (!fs.existsSync(dataPath)) {
  console.error(`_BUSINESS_DATA.json not found at: ${dataPath}`);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const replacements = Object.fromEntries(
  Object.entries(data).filter(([k]) => !k.startsWith("_")),
);

const previewDir = path.join(target, ".preview");
const skip = new Set(["node_modules", ".next", ".preview", ".git"]);
const editableExt = new Set([
  ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs",
  ".json", ".css", ".md", ".html",
]);

console.log(`[${arg}] cleaning .preview/`);
fs.rmSync(previewDir, { recursive: true, force: true });
fs.mkdirSync(previewDir, { recursive: true });

console.log(`[${arg}] copying source files`);
copyRecursive(target, previewDir);

console.log(`[${arg}] replacing {{PLACEHOLDERS}}`);
let touched = 0;
walkAndReplace(previewDir);
console.log(`[${arg}]   ${touched} files updated`);

const envSource = path.resolve(TEMPLATES_ROOT, ".env.preview");
const envDest = path.join(previewDir, ".env.local");
if (fs.existsSync(envSource)) {
  fs.copyFileSync(envSource, envDest);
  console.log(`[${arg}] injected .env.preview → .env.local`);
} else {
  console.warn(`[${arg}] WARN: .env.preview not found at ${envSource}`);
}

console.log(`[${arg}] running pnpm install (silent)...`);
const install = spawnSync("pnpm", ["install", "--silent"], {
  cwd: previewDir,
  stdio: "inherit",
  shell: true,
});
if (install.status !== 0) {
  console.error(`[${arg}] pnpm install failed with code ${install.status}`);
  process.exit(install.status ?? 1);
}

console.log(`[${arg}] ready.`);

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
    const next = original.replace(/\{\{([A-Z0-9_]+)\}\}/g, (m, key) =>
      key in replacements ? String(replacements[key]) : m,
    );
    if (next !== original) {
      fs.writeFileSync(full, next);
      touched++;
    }
  }
}
