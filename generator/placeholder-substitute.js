/**
 * placeholder-substitute.js
 *
 * Helpers pour le sed-like substitution des {{PLACEHOLDERS}}
 * dans tous les fichiers d'un template Next.js copie.
 *
 * Regex: /\{\{([A-Z0-9_]+)\}\}/g - matche {{HERO}}, {{REVIEW_1_NAME}}, etc.
 */

import fs from 'fs/promises';
import path from 'path';

const EDITABLE_EXTENSIONS = new Set([
  '.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs',
  '.json', '.css', '.md', '.html',
]);

const SKIP_DIRS = new Set([
  'node_modules', '.next', '.preview', '.git', 'out',
]);

const PLACEHOLDER_REGEX = /\{\{([A-Z0-9_]+)\}\}/g;

/**
 * Walk recursively dir and replace all {{PLACEHOLDERS}} by their values from replacements.
 */
// Sanitize an injected value so client data with special characters cannot
// break the generated TS/JSX at compile time. Safe in JS strings, JSX text and
// template literals; readable. Fixes builds where e.g. a business name has
// embedded double quotes (which broke a "..." JS string and killed the build).
function sanitizeValue(v) {
  let s = String(v);
  s = s.split(String.fromCharCode(92)).join('/');   // lone backslash -> slash
  s = s.split('`').join("'");                        // backtick -> apostrophe
  s = s.split('${').join('$ {');                     // ${ -> $ {
  s = s.split('"').join('”');                         // straight quote -> curly ”
  s = s.split('</').join('< /');                     // </ can break JSX
  s = s.split(String.fromCharCode(13)).join(' ');    // CR
  s = s.split(String.fromCharCode(10)).join(' ');    // LF -> space
  s = s.split(String.fromCharCode(9)).join(' ');     // tab
  while (s.indexOf('  ') !== -1) s = s.split('  ').join(' ');
  return s.trim();
}

export async function substitutePlaceholders(rootDir, replacements) {
  let filesTouched = 0;
  let replacementsCount = 0;

  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (SKIP_DIRS.has(entry.name)) continue;
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await walk(fullPath);
        continue;
      }

      if (!entry.isFile()) continue;
      if (!EDITABLE_EXTENSIONS.has(path.extname(entry.name))) continue;

      const original = await fs.readFile(fullPath, 'utf8');
      let count = 0;

      const next = original.replace(PLACEHOLDER_REGEX, (match, key) => {
        if (key in replacements) {
          count++;
          return sanitizeValue(replacements[key]);
        }
        return match;
      });

      if (count > 0) {
        await fs.writeFile(fullPath, next);
        filesTouched++;
        replacementsCount += count;
      }
    }
  }

  await walk(rootDir);
  return { filesTouched, replacementsCount };
}

/**
 * Find {{PLACEHOLDERS}} not replaced (orphans).
 * Useful for warning that some data is missing.
 */
export async function findOrphanPlaceholders(rootDir) {
  const orphans = new Set();

  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (SKIP_DIRS.has(entry.name)) continue;
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await walk(fullPath);
        continue;
      }

      if (!entry.isFile()) continue;
      if (!EDITABLE_EXTENSIONS.has(path.extname(entry.name))) continue;

      const content = await fs.readFile(fullPath, 'utf8');
      const matches = content.matchAll(PLACEHOLDER_REGEX);
      for (const m of matches) {
        orphans.add(m[1]);
      }
    }
  }

  await walk(rootDir);
  return Array.from(orphans).sort();
}
