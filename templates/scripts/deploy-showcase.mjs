#!/usr/bin/env node
/**
 * scripts/deploy-showcase.mjs
 *
 * Deploy all 9 templates to Vercel with their niche _BUSINESS_DATA.json values
 * substituted as showcase. Outputs the 9 URLs at the end.
 *
 * Usage:
 *   node scripts/deploy-showcase.mjs            # all 9 templates
 *   node scripts/deploy-showcase.mjs PLUMBERS   # just one niche
 *
 * Process per template:
 *   1. Wipe `.preview-deploy/`
 *   2. Copy template files (excluding node_modules, .next, .preview, .git)
 *   3. Substitute every {{PLACEHOLDER}} using <NICHE>/_BUSINESS_DATA.json
 *   4. Inject Templates/.env.preview if present
 *   5. `pnpm install --ignore-scripts`
 *   6. `vercel deploy --yes --scope lesa3ws-projects`
 *   7. Capture & log the URL
 *
 * Vercel project env vars required for /api/contact + /api/quote to work:
 *   - RESEND_API_KEY    (re_... key from resend.com/api-keys)
 *   - PREVIEW_FORWARD_TO (account-owner email for sandbox routing — Resend
 *                         blocks sends to non-owner addresses until a domain
 *                         is verified at resend.com/domains)
 */

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES_ROOT = path.resolve(SCRIPT_DIR, "..");
// Pandsy Pro team (migrated 2026-05-19 from Hobby team lesa3ws-projects).
// Override via env VERCEL_SCOPE if you need to deploy to a different team.
const SCOPE = process.env.VERCEL_SCOPE || "pandsy";

const NICHES = ["AUTO_REPAIR", "ELECTRICIANS", "PLUMBERS"];
const TPL_PER_NICHE = ["Template_1", "Template_2", "Template_3"];

const filterNiche = process.argv[2];
const filterTpl = process.argv[3]; // optional: e.g. "Template_2"

const SKIP_EXACT = new Set([
  "node_modules", ".next", ".preview", ".preview-deploy", ".git", "out",
  ".builds",
]);
function isSkipped(name) {
  return SKIP_EXACT.has(name) || name.startsWith(".deploy-");
}

// Build dirs live at Templates/.builds/<slug>/ so the LEAF directory name
// (e.g. "auto-repair-t-1") becomes the Vercel project name — no prefix.
const BUILDS_ROOT = path.join(TEMPLATES_ROOT, ".builds");
fs.mkdirSync(BUILDS_ROOT, { recursive: true });
const editableExt = new Set([
  ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs",
  ".json", ".css", ".md", ".html",
]);

const targets = [];
for (const niche of NICHES) {
  if (filterNiche && niche !== filterNiche) continue;
  for (const tpl of TPL_PER_NICHE) {
    if (filterTpl && tpl !== filterTpl) continue;
    const tplDir = path.join(TEMPLATES_ROOT, niche, tpl);
    if (fs.existsSync(tplDir) && fs.statSync(tplDir).isDirectory()) {
      targets.push({ niche, tpl, tplDir });
    }
  }
}

console.log(`\n=== Deploying ${targets.length} templates to Vercel ===\n`);

const results = [];

for (const { niche, tpl, tplDir } of targets) {
  const label = `${niche}/${tpl}`;
  console.log(`\n▶ ${label}`);

  try {
    const url = await deployOne(niche, tpl, tplDir);
    results.push({ label, url, ok: true });
    console.log(`✓ ${label} → ${url}`);
  } catch (err) {
    console.error(`✗ ${label} failed: ${err.message}`);
    results.push({ label, url: null, ok: false, error: err.message });
  }
}

console.log(`\n\n=== Summary ===\n`);
for (const r of results) {
  const status = r.ok ? "✓" : "✗";
  console.log(`${status} ${r.label.padEnd(28)} ${r.url || r.error}`);
}

const failed = results.filter((r) => !r.ok).length;
process.exit(failed > 0 ? 1 : 0);

// ---------- deployOne ----------

async function deployOne(niche, tpl, tplDir) {
  const dataPath = path.join(TEMPLATES_ROOT, niche, "_BUSINESS_DATA.json");
  if (!fs.existsSync(dataPath)) {
    throw new Error(`_BUSINESS_DATA.json not found at ${dataPath}`);
  }
  const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  const replacements = Object.fromEntries(
    Object.entries(data).filter(([k]) => !k.startsWith("_")),
  );

  // Slug = the Vercel project name. Format: niche-t-N (auto-repair-t-1).
  // Vercel project names allow lowercase + hyphens only.
  const tplNum = tpl.replace(/^Template_/, "");
  const slug = `${niche.toLowerCase().replace(/_/g, "-")}-t-${tplNum}`;
  // Build at Templates/.builds/<slug>/ so the leaf dir = the project name.
  const deployDir = path.join(BUILDS_ROOT, slug);

  // 1. Wipe
  if (fs.existsSync(deployDir)) {
    fs.rmSync(deployDir, { recursive: true, force: true });
  }
  fs.mkdirSync(deployDir, { recursive: true });

  // 2. Copy template
  copyRecursive(tplDir, deployDir);

  // 3. Substitute placeholders
  let touched = 0;
  walkAndReplace(deployDir, replacements, () => touched++);
  console.log(`   placeholders substituted in ${touched} files`);

  // 4. Inject .env.preview if present
  const envSource = path.resolve(TEMPLATES_ROOT, ".env.preview");
  const envDest = path.join(deployDir, ".env.local");
  if (fs.existsSync(envSource)) {
    fs.copyFileSync(envSource, envDest);
  }

  // 4b. Download LOGO_URL_LIGHT as app/icon.png so Next.js 15 picks it up
  //     automatically as favicon. Logo white = visible on dark browser chrome.
  const logoUrl = replacements.LOGO_URL_LIGHT;
  if (logoUrl) {
    try {
      const resp = await fetch(logoUrl);
      if (resp.ok) {
        const buf = Buffer.from(await resp.arrayBuffer());
        const appDir = path.join(deployDir, "app");
        if (fs.existsSync(appDir)) {
          fs.writeFileSync(path.join(appDir, "icon.png"), buf);
          console.log(`   favicon downloaded (logo white, ${buf.length} bytes)`);
        }
      } else {
        console.log(`   warn: favicon download failed (HTTP ${resp.status})`);
      }
    } catch (err) {
      console.log(`   warn: favicon download error: ${err.message}`);
    }
  }

  // 5. pnpm install --ignore-scripts
  console.log(`   pnpm install...`);
  const install = spawnSync("pnpm", ["install", "--ignore-scripts", "--reporter=append-only"], {
    cwd: deployDir,
    stdio: ["ignore", "pipe", "pipe"],
    shell: true,
  });
  if (install.status !== 0) {
    throw new Error(`pnpm install failed (exit ${install.status})\n${install.stderr?.toString()?.slice(0, 600)}`);
  }

  // 6. vercel deploy
  console.log(`   vercel deploy...`);
  const deploy = spawnSync(
    "vercel",
    ["deploy", "--prod", "--yes", "--scope", SCOPE],
    {
      cwd: deployDir,
      stdio: ["ignore", "pipe", "pipe"],
      shell: true,
    },
  );
  const stdout = deploy.stdout?.toString() || "";
  const stderr = deploy.stderr?.toString() || "";
  if (deploy.status !== 0) {
    throw new Error(`vercel deploy failed (exit ${deploy.status})\n${stderr.slice(0, 800)}`);
  }

  // 7. Capture URL — vercel prints the URL on stdout (and sometimes stderr)
  const both = stdout + "\n" + stderr;
  const m = both.match(/https:\/\/[a-z0-9-]+\.vercel\.app/);
  if (!m) {
    throw new Error(`could not extract Vercel URL from output:\n${both.slice(0, 600)}`);
  }
  return m[0];
}

// ---------- helpers ----------

function copyRecursive(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (isSkipped(entry.name)) continue;
    const srcPath = path.join(src, entry.name);
    const dstPath = path.join(dst, entry.name);
    if (entry.isDirectory()) {
      copyRecursive(srcPath, dstPath);
    } else if (entry.isFile()) {
      fs.copyFileSync(srcPath, dstPath);
    }
  }
}

function walkAndReplace(dir, replacements, onTouch) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (isSkipped(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkAndReplace(full, replacements, onTouch);
      continue;
    }
    if (!editableExt.has(path.extname(entry.name))) continue;
    const original = fs.readFileSync(full, "utf8");
    const next = original.replace(/\{\{([A-Z0-9_]+)\}\}/g, (m, key) =>
      key in replacements ? String(replacements[key]) : m,
    );
    if (next !== original) {
      fs.writeFileSync(full, next);
      onTouch();
    }
  }
}
