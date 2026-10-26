#!/usr/bin/env node
/**
 * patch-templates-package-json.js
 *
 * Patche les package.json des 9 templates :
 *   1. Upgrade Next.js a 15.5.18 (fix CVE-2025-66478 + CVEs mai 2026)
 *   2. Upgrade React a 19.0.6 (fix CVE-2025-55182)
 *   3. Ajoute pnpm.onlyBuiltDependencies pour autoriser sharp, etc.
 *
 * A lancer depuis ~/automation/ sur la VPS, ou sur le PC depuis Templates/.
 * Apres run, faire git add -A && git commit && git push.
 */

import fs from 'fs/promises';
import path from 'path';

// Determine le templates root : si on est sur la VPS = templates-lib, sinon Templates/
const VPS_PATH = '/home/USER/automation/templates-lib';
const PC_PATH = 'C:\\Users\\wease\\.claude\\sites\\Templates';

let TEMPLATES_LIB;
try {
  await fs.access(VPS_PATH);
  TEMPLATES_LIB = VPS_PATH;
} catch {
  TEMPLATES_LIB = PC_PATH;
}

const CATEGORIES = ['AUTO_REPAIR', 'PLUMBERS', 'ELECTRICIANS'];
const TEMPLATES = ['Template_1', 'Template_2', 'Template_3'];

const ALLOWED_BUILDS = [
  'sharp',
  '@parcel/watcher',
  'esbuild',
  'unrs-resolver',
  '@tailwindcss/oxide',
];

// Versions safe (mai 2026)
const VERSION_UPGRADES = {
  'next': '15.5.18',
  'react': '19.0.6',
  'react-dom': '19.0.6',
};

async function patchOne(category, template) {
  const pkgPath = path.join(TEMPLATES_LIB, category, template, 'package.json');
  try {
    const raw = await fs.readFile(pkgPath, 'utf8');
    const pkg = JSON.parse(raw);

    let changes = [];

    // 1. Upgrade deps versions (dependencies + devDependencies)
    for (const [name, version] of Object.entries(VERSION_UPGRADES)) {
      if (pkg.dependencies && pkg.dependencies[name]) {
        const old = pkg.dependencies[name];
        if (old !== version) {
          pkg.dependencies[name] = version;
          changes.push(`${name}: ${old} -> ${version}`);
        }
      }
      if (pkg.devDependencies && pkg.devDependencies[name]) {
        const old = pkg.devDependencies[name];
        if (old !== version) {
          pkg.devDependencies[name] = version;
          changes.push(`${name} (dev): ${old} -> ${version}`);
        }
      }
    }

    // 2. Ajoute pnpm.onlyBuiltDependencies
    pkg.pnpm = pkg.pnpm || {};
    const existing = JSON.stringify(pkg.pnpm.onlyBuiltDependencies || []);
    pkg.pnpm.onlyBuiltDependencies = ALLOWED_BUILDS;
    if (existing !== JSON.stringify(ALLOWED_BUILDS)) {
      changes.push(`pnpm.onlyBuiltDependencies updated`);
    }

    await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

    if (changes.length > 0) {
      console.log(`  [OK] ${category}/${template}:`);
      changes.forEach((c) => console.log(`        - ${c}`));
    } else {
      console.log(`  [NOOP] ${category}/${template}: already up to date`);
    }
    return true;
  } catch (err) {
    console.log(`  [SKIP] ${category}/${template}: ${err.message}`);
    return false;
  }
}

console.log(`Patching templates in: ${TEMPLATES_LIB}\n`);
console.log(`Target versions:`);
for (const [name, version] of Object.entries(VERSION_UPGRADES)) {
  console.log(`  ${name}: ${version}`);
}
console.log(`\nAllowed builds: ${ALLOWED_BUILDS.join(', ')}\n`);

let success = 0;
for (const cat of CATEGORIES) {
  for (const tpl of TEMPLATES) {
    if (await patchOne(cat, tpl)) success++;
  }
}

console.log(`\nDone. ${success}/${CATEGORIES.length * TEMPLATES.length} templates patched.`);
console.log(`\nNext steps:`);
console.log(`  1. cd ${TEMPLATES_LIB}`);
console.log(`  2. # Remove old pnpm-lock.yaml so pnpm regenerates with new versions:`);
console.log(`  3. find . -name "pnpm-lock.yaml" -path "*/Template_*" -delete`);
console.log(`  4. git add -A && git commit -m "fix: upgrade Next.js to 15.5.18 (security patch)"`);
console.log(`  5. git push`);
