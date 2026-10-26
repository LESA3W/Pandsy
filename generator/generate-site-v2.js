/**
 * generate-site-v2.js (v2.2 - bypass sharp build issue)
 *
 * CHANGES v2.2:
 *  - Fix: ajoute --ignore-scripts a pnpm install pour eviter ERR_PNPM_IGNORED_BUILDS sur sharp
 *  - Vercel buildra sharp lui-meme lors du deploy (pas besoin de le build localement)
 *
 * CHANGES v2.1:
 *  - Fix: PATH explicite dans spawn() pour que pnpm/vercel/git soient toujours trouves
 *  - Fix: retire --silent de pnpm install (on veut voir les erreurs)
 *  - Fix: log stderr dans le job log en cas d'echec
 */

import fs from 'fs/promises';
import path from 'path';
import { spawn } from 'child_process';
import dotenv from 'dotenv';
import { substitutePlaceholders } from './placeholder-substitute.js';
import { captureSite } from './screenshot.js';

// Load .env BEFORE evaluating module-level const, because server.js's
// dotenv.config() runs AFTER this module is imported (ESM hoists imports
// before any top-level code in the importing file). Without this, vars like
// RESEND_API_KEY were empty at module-load time, even though they're set in
// the actual .env file used by server.js at runtime. Idempotent — safe to
// call twice (once here, once in server.js).
dotenv.config();

const SITES_DIR = process.env.SITES_DIR || '/home/USER/automation/sites';
const TEMPLATES_LIB = process.env.TEMPLATES_LIB || '/home/USER/automation/templates-lib';
const TEMPLATE_ROTATION_FILE = process.env.TEMPLATE_ROTATION_FILE || '/home/USER/automation/.template-rotation.json';
// Pandsy Pro team (migrated 2026-05-19 to escape Hobby 100-deploys/day cap
// and align with Vercel ToS commercial-use requirement).
const VERCEL_SCOPE = process.env.VERCEL_SCOPE || 'pandsy';
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID || 'YOUR_VERCEL_TEAM_ID';
const VERCEL_AUTH_FILE = process.env.VERCEL_AUTH_FILE || '/home/USER/.local/share/com.vercel.cli/auth.json';
const TEST_EMAIL = process.env.TEST_EMAIL || 'your-email@example.com';
// Defensive: re-read at use-sites too. Defining as a getter would be cleaner
// but the existing code uses it as a plain const in multiple places.
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';

// Poll a URL with a full GET request until the response body is NOT the Vercel SSO
// login page. HEAD-200 isn't enough — Vercel's edge can serve a cached SSO redirect
// to GET requests for a few seconds after ssoProtection is disabled via API.
async function waitForPublicAccess(siteUrl, log, maxWaitMs = 90000, pollIntervalMs = 2000) {
  const start = Date.now();
  const userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
  while (Date.now() - start < maxWaitMs) {
    try {
      const res = await fetch(siteUrl, {
        method: 'GET',
        redirect: 'follow',
        headers: { 'User-Agent': userAgent, 'Accept': 'text/html' },
      });
      const html = await res.text();
      const isSsoPage = res.url.includes('vercel.com/login') ||
                        html.includes('Log in to Vercel') ||
                        html.includes('Authentication Required');
      if (res.status === 200 && !isSsoPage) {
        log(`[vercel-auth] site truly public after ${Math.round((Date.now() - start) / 1000)}s`);
        return true;
      }
    } catch (e) { /* retry */ }
    await new Promise(r => setTimeout(r, pollIntervalMs));
  }
  log(`[vercel-auth] site still SSO-protected after ${maxWaitMs}ms — proceeding anyway`);
  return false;
}

// Shared helper: read the Vercel CLI auth token from auth.json. Used by every
// API call below. Returns null on any failure (caller logs + degrades).
async function readVercelToken(log) {
  try {
    const auth = JSON.parse(await fs.readFile(VERCEL_AUTH_FILE, 'utf8'));
    if (!auth.token) throw new Error('token field empty in auth.json');
    return auth.token;
  } catch (err) {
    log(`[vercel-api] could not read token: ${err.message}`);
    return null;
  }
}

// Push RESEND_API_KEY + PREVIEW_FORWARD_TO to a freshly-created Vercel project
// so the runtime serverless functions (/api/contact, /api/quote) can access
// them. The pipeline previously wrote .env.local in the project dir, but Vercel
// only reads that at BUILD time — at runtime, process.env is sourced from the
// project's stored env vars (settable via API or dashboard).
async function setVercelProjectEnv(projectName, log) {
  // Re-read at call time as belt-and-suspenders against the ESM load-order bug
  // that left the module-level const empty when dotenv hadn't loaded yet.
  const resendKey = process.env.RESEND_API_KEY || RESEND_API_KEY;
  if (!resendKey) {
    log('[vercel-env] RESEND_API_KEY is empty in pipeline env — refusing to push. Forms will be broken.');
    return false;
  }
  const token = await readVercelToken(log);
  if (!token) return false;
  const url = `https://api.vercel.com/v10/projects/${projectName}/env?teamId=${VERCEL_TEAM_ID}&upsert=true`;
  const body = [
    { key: 'RESEND_API_KEY', value: resendKey, type: 'encrypted', target: ['production', 'preview', 'development'] },
    // PREVIEW_FORWARD_TO routes all form emails to the Resend account owner
    // while we're still in sandbox mode (no verified domain yet).
    { key: 'PREVIEW_FORWARD_TO', value: 'your-email@example.com', type: 'plain', target: ['production', 'preview', 'development'] },
  ];
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text();
      log(`[vercel-env] push failed (${res.status}): ${text.substring(0, 300)}`);
      return false;
    }
    log(`[vercel-env] pushed RESEND_API_KEY + PREVIEW_FORWARD_TO to project ${projectName}`);
    return true;
  } catch (err) {
    log(`[vercel-env] request error: ${err.message}`);
    return false;
  }
}

// Find the dpl_xxx uid of the latest production deployment for this project.
// More robust than parsing the CLI stdout (which has changed format historically).
async function findLatestDeploymentId(projectName, log) {
  const token = await readVercelToken(log);
  if (!token) return null;
  const url = `https://api.vercel.com/v6/deployments?app=${projectName}&target=production&limit=1&teamId=${VERCEL_TEAM_ID}`;
  try {
    const res = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
    if (!res.ok) {
      log(`[vercel-deploy] findLatest failed (${res.status})`);
      return null;
    }
    const data = await res.json();
    const uid = data?.deployments?.[0]?.uid || null;
    if (!uid) log(`[vercel-deploy] no production deployment found for ${projectName}`);
    return uid;
  } catch (err) {
    log(`[vercel-deploy] findLatest error: ${err.message}`);
    return null;
  }
}

// Trigger a redeploy of an existing deployment so newly-pushed env vars are
// loaded into the serverless runtime. Vercel reuses the build cache when the
// source is identical (faster than a from-scratch build), but env vars are
// re-injected.
async function redeployForEnv(projectName, sourceDeploymentId, log) {
  const token = await readVercelToken(log);
  if (!token) return { ok: false };
  const url = `https://api.vercel.com/v13/deployments?teamId=${VERCEL_TEAM_ID}&forceNew=1`;
  const body = {
    name: projectName,
    deploymentId: sourceDeploymentId,
    target: 'production',
    meta: { redeployedFor: 'env-injection' },
  };
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text();
      log(`[vercel-deploy] redeploy failed (${res.status}): ${text.substring(0, 300)}`);
      return { ok: false };
    }
    const data = await res.json();
    return { ok: true, newDeploymentUid: data.uid || data.id, newDeploymentUrl: data.url };
  } catch (err) {
    log(`[vercel-deploy] redeploy request error: ${err.message}`);
    return { ok: false };
  }
}

// Poll a deployment until its readyState is READY (or ERROR / CANCELED).
// Returns true only on READY. Logs state transitions for debug.
async function waitForDeploymentReady(deploymentUid, log, maxWaitMs = 180000, pollIntervalMs = 3000) {
  const token = await readVercelToken(log);
  if (!token) return false;
  const url = `https://api.vercel.com/v13/deployments/${deploymentUid}?teamId=${VERCEL_TEAM_ID}`;
  const start = Date.now();
  let lastState = null;
  while (Date.now() - start < maxWaitMs) {
    try {
      const res = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) {
        const data = await res.json();
        const state = data.readyState || data.state;
        if (state !== lastState) {
          log(`[vercel-deploy] ${deploymentUid} state: ${state}`);
          lastState = state;
        }
        if (state === 'READY') return true;
        if (state === 'ERROR' || state === 'CANCELED') {
          log(`[vercel-deploy] deployment ended in ${state}: ${data.errorMessage || '(no message)'}`);
          return false;
        }
      }
    } catch (e) { /* retry */ }
    await new Promise(r => setTimeout(r, pollIntervalMs));
  }
  log(`[vercel-deploy] waitForReady timed out after ${maxWaitMs}ms — continuing`);
  return false;
}

// Add <subdomain>.pandsy.com alias to a Vercel project so the client URL
// looks branded (cruz-electric.pandsy.com) instead of the long Vercel default.
// Returns { ok, pandsyUrl, subdomain } — pandsyUrl is undefined on failure.
// Falls back to a random 4-char suffix, then to compactTs, if the clean
// subdomain is taken by another project (collision-safe).
async function addPandsyAlias(projectName, fullSlug, compactTs, log) {
  const token = await readVercelToken(log);
  if (!token) return { ok: false };

  const randSuffix = Math.random().toString(36).slice(2, 6); // 4 base36 chars
  const candidates = [
    fullSlug,
    `${fullSlug}-${randSuffix}`,
    `${fullSlug}-${compactTs}`,
  ];

  for (const sub of candidates) {
    // DNS label limit is 63 chars; "pandsy.com" overhead is 11 chars including dot.
    if (sub.length > 52) {
      log(`[pandsy-alias] skipping "${sub}" (too long: ${sub.length} chars)`);
      continue;
    }
    const domainName = `${sub}.pandsy.com`;
    const url = `https://api.vercel.com/v10/projects/${projectName}/domains?teamId=${VERCEL_TEAM_ID}`;
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: domainName }),
      });
      if (res.ok) {
        log(`[pandsy-alias] attached ${domainName} to project ${projectName}`);
        return { ok: true, pandsyUrl: `https://${domainName}`, subdomain: sub };
      }
      const text = await res.text();
      if (res.status === 409 || /already\s+(in\s+use|exists|owned)/i.test(text)) {
        log(`[pandsy-alias] "${domainName}" taken, trying next candidate`);
        continue;
      }
      log(`[pandsy-alias] add failed (${res.status}): ${text.substring(0, 200)}`);
      return { ok: false };
    } catch (err) {
      log(`[pandsy-alias] request error: ${err.message}`);
      return { ok: false };
    }
  }
  log(`[pandsy-alias] all candidates exhausted for ${projectName}`);
  return { ok: false };
}

// Probe the branded pandsy.com URL over HTTPS to confirm its SSL cert actually
// provisioned. Vercel attaches the domain instantly, but the Let's Encrypt cert
// is issued asynchronously; when the 50-certs/week-per-registered-domain limit
// for pandsy.com is hit, the cert never issues and the subdomain serves
// ERR_CONNECTION_CLOSED. Returns true as soon as ANY HTTPS response comes back
// (TLS handshake succeeded). Retries because provisioning can lag a few seconds.
async function pandsyCertLive(pandsyUrl, log) {
  const attempts = 3;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(pandsyUrl, { method: 'HEAD', redirect: 'manual', signal: AbortSignal.timeout(8000) });
      log(`[pandsy-cert] live after ${i + 1} probe(s) (status ${res.status})`);
      return true;
    } catch {
      if (i < attempts - 1) await new Promise((r) => setTimeout(r, 7000));
    }
  }
  log(`[pandsy-cert] no HTTPS response after ${attempts} probes — cert not provisioned`);
  return false;
}

// Disable Vercel "Deployment Protection / Vercel Authentication" on a project so it's publicly accessible.
// Hobby tier defaults projects to protected — leads can't view without disabling.
async function disableVercelProtection(projectName, log) {
  const token = await readVercelToken(log);
  if (!token) return false;
  const url = `https://api.vercel.com/v9/projects/${projectName}?teamId=${VERCEL_TEAM_ID}`;
  try {
    const res = await fetch(url, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ ssoProtection: null }),
    });
    if (!res.ok) {
      const text = await res.text();
      log(`[vercel-auth] disable failed (${res.status}): ${text.substring(0, 200)}`);
      return false;
    }
    log(`[vercel-auth] disabled ssoProtection on project ${projectName}`);
    return true;
  } catch (err) {
    log(`[vercel-auth] request error: ${err.message}`);
    return false;
  }
}

const VALID_CATEGORIES = ['AUTO_REPAIR', 'PLUMBERS', 'ELECTRICIANS'];

// Sheet data is messy — accept common variations (singular, lowercase, spaces) and normalize.
const CATEGORY_ALIASES = {
  'AUTO_REPAIR': 'AUTO_REPAIR',
  'AUTO_REPAIRS': 'AUTO_REPAIR',
  'AUTO_MECHANIC': 'AUTO_REPAIR',
  'AUTOREPAIR': 'AUTO_REPAIR',
  'MECHANIC': 'AUTO_REPAIR',
  'PLUMBERS': 'PLUMBERS',
  'PLUMBER': 'PLUMBERS',
  'PLUMBING': 'PLUMBERS',
  'ELECTRICIANS': 'ELECTRICIANS',
  'ELECTRICIAN': 'ELECTRICIANS',
  'ELECTRICAL': 'ELECTRICIANS',
};
// Round-robin template selection per category (replaces the old random pick)
// so each category's leads cycle Template_1 -> 2 -> 3 -> 1 ... evenly,
// independent of other categories interleaved between them. State persists in
// TEMPLATE_ROTATION_FILE and is written atomically (tmp + rename).
async function nextTemplateNum(category) {
  let state = {};
  try {
    state = JSON.parse(await fs.readFile(TEMPLATE_ROTATION_FILE, 'utf8'));
  } catch { state = {}; }
  const count = Number.isInteger(state[category]) ? state[category] : 0;
  const templateNum = (count % 3) + 1;
  state[category] = count + 1;
  try {
    const tmp = TEMPLATE_ROTATION_FILE + '.tmp';
    await fs.writeFile(tmp, JSON.stringify(state, null, 2));
    await fs.rename(tmp, TEMPLATE_ROTATION_FILE);
  } catch (err) {
    console.error('[template-rotation] persist failed: ' + err.message);
  }
  return templateNum;
}

function normalizeCategory(raw) {
  const key = String(raw || '').toUpperCase().trim().replace(/\s+/g, '_');
  return CATEGORY_ALIASES[key] || key;
}

// PATH explicite pour que pnpm, vercel, git, node soient trouves
// meme quand le process Node est lance via nohup ou systemd
const ENRICHED_PATH = [
  '/home/USER/.local/share/pnpm/bin',
  '/home/USER/.local/bin',
  '/usr/local/sbin',
  '/usr/local/bin',
  '/usr/sbin',
  '/usr/bin',
  '/sbin',
  '/bin',
  process.env.PATH || '',
].filter(Boolean).join(':');

function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50);
}

function execCommand(cmd, args, cwd, log) {
  return new Promise((resolve, reject) => {
    log(`  $ ${cmd} ${args.join(' ')}  (cwd: ${cwd})`);
    const proc = spawn(cmd, args, {
      cwd,
      env: {
        ...process.env,
        PATH: ENRICHED_PATH,
        HOME: process.env.HOME || '/home/USER',
      },
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    let stdout = '';
    let stderr = '';

    proc.stdout.on('data', (data) => {
      const s = data.toString();
      stdout += s;
      const lines = s.split('\n').filter(Boolean);
      for (const line of lines) {
        if (line.match(/error|warning|installing|building|deploy|production|preview/i)) {
          log(`    [out] ${line.substring(0, 200)}`);
        }
      }
    });
    proc.stderr.on('data', (data) => {
      const s = data.toString();
      stderr += s;
      const lines = s.split('\n').filter(Boolean);
      for (const line of lines) {
        log(`    [err] ${line.substring(0, 200)}`);
      }
    });

    proc.on('close', (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
      } else {
        reject(new Error(
          `Command failed (exit ${code}): ${cmd} ${args.join(' ')}\n` +
          `--- stderr ---\n${stderr.substring(0, 2000)}\n` +
          `--- stdout (tail) ---\n${stdout.substring(Math.max(0, stdout.length - 2000))}`
        ));
      }
    });

    proc.on('error', (err) => {
      reject(new Error(`Spawn error for "${cmd}": ${err.message}`));
    });
  });
}

async function copyRecursive(src, dst, skip = new Set(['node_modules', '.next', '.preview', '.git', 'out'])) {
  await fs.mkdir(dst, { recursive: true });
  for (const entry of await fs.readdir(src, { withFileTypes: true })) {
    if (skip.has(entry.name)) continue;
    const srcPath = path.join(src, entry.name);
    const dstPath = path.join(dst, entry.name);
    if (entry.isDirectory()) {
      await copyRecursive(srcPath, dstPath, skip);
    } else if (entry.isFile()) {
      await fs.copyFile(srcPath, dstPath);
    }
  }
}

// Make a string safe for substitution inside JS single-quoted string literals
// in the template source (e.g. `const REVIEWS = [{ text: '{{REVIEW_1}}' }]`).
// Replace straight apostrophes/quotes with curly equivalents (visually identical,
// no JS escape needed) and strip control chars.
function jsSafe(s) {
  return String(s || '')
    .replace(/[\x00-\x1F\x7F]/g, '')  // strip control chars
    .replace(/\\/g, '\u29F5')      // backslash → visually similar (avoid JS escape)
    .replace(/'/g, '\u2019')        // straight apostrophe → curly close
    .replace(/"/g, '\u201D')       // straight double quote → curly close
    .trim();
}

function parseReview(raw, fallbackIndex = 1) {
  if (!raw || typeof raw !== 'string') {
    return defaultReview(fallbackIndex);
  }
  // Normalize curly quotes to straight for consistent parsing
  const normalized = raw
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'");

  // PRIMARY FORMAT (Workflow A scraper, canonical):
  //   Name = "Daisy Frost", Date = "2 months ago", Comment = "...", Stars = "5"
  // Each field is labeled and value is double-quoted. Detect via the labeled
  // pattern and extract directly. Aliases tolerated: Comment | Review | Text | Body.
  const labeled = {
    name: normalized.match(/\bname\s*=\s*"([^"]*)"/i),
    date: normalized.match(/\bdate\s*=\s*"([^"]*)"/i),
    text: normalized.match(/\b(?:comment|review|text|body)\s*=\s*"([^"]*)"/i),
    stars: normalized.match(/\bstars?\s*=\s*"?(\d)"?/i),
  };
  if (labeled.text || labeled.name) {
    const ls = labeled.stars ? parseInt(labeled.stars[1], 10) : 5;
    return {
      name: jsSafe((labeled.name?.[1] || '').trim() || `Customer ${fallbackIndex}`),
      date: jsSafe((labeled.date?.[1] || '').trim() || 'Recently'),
      text: jsSafe((labeled.text?.[1] || '').trim() || 'Great service, highly recommended.'),
      stars: ls >= 1 && ls <= 5 ? ls : 5,
    };
  }

  // FALLBACK heuristic (legacy / unstructured rows): "5 stars" suffix + quoted text.
  const starsMatch = normalized.match(/(\d)\s*stars?/i);
  const stars = starsMatch ? parseInt(starsMatch[1]) : 5;

  // Try to extract the quoted review text (between first " and last ")
  const textMatch = normalized.match(/"([^"]+)"/);

  if (textMatch) {
    const text = textMatch[1].trim();
    // Parse the part BEFORE the quoted text for name + date
    const before = normalized.substring(0, textMatch.index).trim().replace(/,$/, '').trim();
    const parts = before.split(',').map((s) => s.trim().replace(/^"|"$/g, '')).filter(Boolean);
    const name = parts[0] || `Customer ${fallbackIndex}`;
    const date = parts[1] || 'Recently';
    return {
      name: jsSafe(name && name !== 'name' ? name : `Customer ${fallbackIndex}`),
      date: jsSafe(date && date !== 'date' ? date : 'Recently'),
      text: jsSafe(text || 'Great service, highly recommended.'),
      stars: stars >= 1 && stars <= 5 ? stars : 5,
    };
  }

  // No quoted text — best-effort split by comma: name, date, ...rest as text
  const parts = normalized.split(',').map((s) => s.trim()).filter(Boolean);
  if (parts.length >= 3) {
    return {
      name: jsSafe(parts[0]),
      date: jsSafe(parts[1]),
      text: jsSafe(parts.slice(2).join(', ').substring(0, 280)),
      stars: stars >= 1 && stars <= 5 ? stars : 5,
    };
  }

  return {
    name: `Customer ${fallbackIndex}`,
    date: 'Recently',
    text: jsSafe(normalized.substring(0, 280)),
    stars: 5,
  };
}

function defaultReview(index) {
  const defaults = [
    { name: 'James M.', text: 'Honest, fast, and professional. Highly recommend.' },
    { name: 'Sarah L.', text: 'Great service and fair pricing. Will use again.' },
    { name: 'Mike R.', text: 'Quality work and friendly staff. Five stars.' },
    { name: 'Linda K.', text: 'They explained everything clearly. Trustworthy team.' },
  ];
  const d = defaults[(index - 1) % defaults.length];
  return { name: d.name, date: 'Recently', text: d.text, stars: 5 };
}

// Normalize Sheet LOGO_COLORS format "[blue #0000ff, red #ff0000, black #000000]"
// (or any messy variant) to the strict CSV hex format the templates' parseColors expects:
// "#0000ff,#ff0000,#000000". Extracts 6-digit hex codes via regex; ignores names/brackets.
function normalizeLogoColors(input) {
  const hexes = (String(input || '').match(/#[0-9a-fA-F]{6}\b/g) || []).slice(0, 3);
  return hexes.join(',');
}

// Convert a Google Drive sharing URL "https://drive.google.com/file/d/<ID>/view?usp=sharing"
// to "https://lh3.googleusercontent.com/d/<ID>" which is the format the templates' native
// <img> tags can load directly (per constitution rule #2). Pass-through unknown formats.
function normalizeDriveUrl(input) {
  const s = String(input || '');
  if (!s) return '';
  if (s.includes('lh3.googleusercontent.com')) return s;
  const m = s.match(/(?:\/file\/d\/|[?&]id=)([a-zA-Z0-9_-]{15,})/);
  if (m) return `https://lh3.googleusercontent.com/d/${m[1]}`;
  return s;
}

// FONT_LOGO from Sheet is a CSS font-family string ("Helvetica, sans-serif").
// Returns EMPTY STRING if input empty / "No font" / placeholder unsubstituted —
// so Logo.tsx fallback can detect "no font specified" and use the template's
// own display font (inherited via parent).
function normalizeFontLogo(input) {
  let s = String(input || '').trim();
  if (!s) return '';
  if (/^no\s*font$/i.test(s)) return '';
  if (s.startsWith('{{')) return '';
  // Workflow A's Gemini sometimes emits descriptive strings like:
  //   "script (likely Pacifico)"  or  "sans-serif (likely Montserrat)"
  // The part before "(likely ...)" is a CSS generic ("script", "sans-serif")
  // which is NOT a real font face. Prefer the hinted family inside parens.
  // Pattern is tolerant: matches "(likely Foo)" or "(likely  Foo)" or with
  // surrounding text. Trailing punctuation/whitespace inside () gets trimmed.
  const likelyMatch = s.match(/\(\s*likely\s+([^)]+?)\s*\)/i);
  if (likelyMatch) {
    s = likelyMatch[1].trim();
  }
  return s;
}

// Parse FONT_LOGO into family + weight + italic for Google Fonts URL building.
// Accepts: "Oswald" | "Oswald, Bold" | "Oswald, Bold Italic" | "Oswald, 700" | "Oswald, ExtraBold Italic"
// Returns null if input empty / generic / unparseable.
function parseFontLogo(input) {
  const s = String(input || '').trim();
  if (!s) return null;
  const parts = s.split(',').map((p) => p.trim()).filter(Boolean);
  if (parts.length === 0) return null;
  const family = parts[0].replace(/^["']|["']$/g, '');
  if (!family) return null;
  // Skip CSS generic fallbacks (no point loading from Google Fonts).
  if (/^(serif|sans-serif|monospace|cursive|fantasy|system-ui|inherit|initial|unset)$/i.test(family)) return null;
  let weight = 400;
  let italic = false;
  for (let i = 1; i < parts.length; i++) {
    const tokens = parts[i].toLowerCase().split(/\s+/);
    for (const tok of tokens) {
      if (/^\d{3}$/.test(tok)) weight = parseInt(tok, 10);
      else if (tok === 'thin' || tok === 'hairline') weight = 100;
      else if (tok === 'extralight' || tok === 'ultralight') weight = 200;
      else if (tok === 'light') weight = 300;
      else if (tok === 'normal' || tok === 'regular' || tok === 'book') weight = 400;
      else if (tok === 'medium') weight = 500;
      else if (tok === 'semibold' || tok === 'demibold') weight = 600;
      else if (tok === 'bold') weight = 700;
      else if (tok === 'extrabold' || tok === 'ultrabold') weight = 800;
      else if (tok === 'black' || tok === 'heavy') weight = 900;
      else if (tok === 'italic' || tok === 'oblique') italic = true;
    }
  }
  return { family, weight, italic };
}

// Build the Google Fonts v2 stylesheet URL for the parsed font.
// Caller wraps it in a <link> tag at template-render time (via layout.tsx).
function buildGoogleFontsHref(parsed) {
  if (!parsed) return '';
  const familyParam = parsed.family.replace(/\s+/g, '+');
  const axis = parsed.italic
    ? `ital,wght@1,${parsed.weight}`
    : `wght@${parsed.weight}`;
  return `https://fonts.googleapis.com/css2?family=${familyParam}:${axis}&display=swap`;
}

// Probe Google Fonts to confirm the family exists. GF returns 200 with an empty
// body for unknown families on the CSS endpoint when User-Agent is non-browser —
// so we use a browser UA and check that @font-face blocks are present.
async function validateGoogleFont(parsed, log) {
  if (!parsed) return false;
  const familyParam = parsed.family.replace(/\s+/g, '+');
  const probeUrl = `https://fonts.googleapis.com/css2?family=${familyParam}&display=swap`;
  try {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(probeUrl, {
      method: 'GET',
      headers: { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
      signal: controller.signal,
    });
    clearTimeout(t);
    if (!res.ok) {
      log(`[google-fonts] probe HTTP ${res.status} for "${parsed.family}"`);
      return false;
    }
    const css = await res.text();
    const ok = /@font-face/.test(css);
    if (!ok) log(`[google-fonts] family "${parsed.family}" not found on Google Fonts (no @font-face in response)`);
    return ok;
  } catch (e) {
    log(`[google-fonts] probe error for "${parsed.family}": ${e.message}`);
    return false;
  }
}

// LOGO URL: pass-through if it looks valid (Drive URL), or empty string if
// missing / unparseable / sample-template-placeholder. Returns empty so that
// Logo.tsx text fallback can detect and render BUSINESS_NAME as text instead.
function normalizeLogoUrl(input) {
  const s = String(input || '').trim();
  if (!s) return '';
  if (s.startsWith('{{')) return '';
  if (/^no\s*logo$/i.test(s)) return '';
  return normalizeDriveUrl(s);
}

// Sheet's HOURS field is often verbose (e.g. "Monday = 9:30am - 5pm ; Tuesday = 9:30am - 5pm ; ...").
// Templates render {{HOURS}} as-is, so verbose input = ugly output. This function
// collapses consecutive days with identical hours and uses short day names:
//   "Monday = 9:30am - 5pm ; Tuesday = 9:30am - 5pm ; ... ; Sunday = Closed"
//   → "Mon-Thu 9:30am-5pm, Fri 10am-5pm, Sat 9:30am-5pm, Sun Closed"
function normalizeHours(raw) {
  const s = String(raw || '').trim();
  if (!s || s.startsWith('{{')) return s;
  // If input doesn't contain a full day name (Monday, Tuesday, etc.), assume
  // it's already in a compact human-readable format and pass it through.
  if (!/\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i.test(s)) {
    return s;
  }
  const DAY_FULL_TO_SHORT = {
    monday: 'Mon', tuesday: 'Tue', wednesday: 'Wed', thursday: 'Thu',
    friday: 'Fri', saturday: 'Sat', sunday: 'Sun',
    mon: 'Mon', tue: 'Tue', tues: 'Tue', wed: 'Wed', weds: 'Wed',
    thu: 'Thu', thur: 'Thu', thurs: 'Thu', fri: 'Fri', sat: 'Sat', sun: 'Sun',
  };
  const ORDER = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Split by `;` or `,` and parse each entry
  const entries = s.split(/[;,]/).map((e) => e.trim()).filter(Boolean);
  const dayHours = {};
  for (const entry of entries) {
    // Match "Day = hours" or "Day: hours" or "Day - hours" or "Day hours"
    const m = entry.match(/^([A-Za-z]+)\s*[=:-]?\s*(.+)$/);
    if (!m) continue;
    const day = DAY_FULL_TO_SHORT[m[1].toLowerCase()];
    if (!day) continue;
    let hours = m[2].trim();
    // Compact: "9:30am - 5pm" → "9:30am-5pm"
    hours = hours.replace(/\s*-\s*/g, '-').replace(/\s+/g, ' ').trim();
    // Normalize "Closed"
    if (/^closed$/i.test(hours)) hours = 'Closed';
    // Normalize 24-hour notations:
    //   "Open 24 hours" / "24 hours" / "24/7" / "Open 24/7" / "Open All Day"
    //   → "24h/24" (compact, matches French-style hours convention)
    else if (/^(?:open\s+)?24\s*(?:\/\s*7|h(?:rs?|ours?)?)?$|^open\s+all\s+day$/i.test(hours)) {
      hours = '24h/24';
    }
    dayHours[day] = hours;
  }

  // If parsing failed, fall back to original (avoid breaking the page)
  if (Object.keys(dayHours).length === 0) return s;

  // Compress consecutive days with same hours into ranges
  const runs = [];
  let cur = null;
  for (let i = 0; i < ORDER.length; i++) {
    const day = ORDER[i];
    if (!(day in dayHours)) {
      if (cur) { runs.push(cur); cur = null; }
      continue;
    }
    const h = dayHours[day];
    if (cur && cur.hours === h) {
      cur.endIdx = i;
    } else {
      if (cur) runs.push(cur);
      cur = { startIdx: i, endIdx: i, hours: h };
    }
  }
  if (cur) runs.push(cur);

  return runs
    .map((r) => {
      const a = ORDER[r.startIdx];
      const b = ORDER[r.endIdx];
      const range = a === b ? a : `${a}-${b}`;
      return `${range} ${r.hours}`;
    })
    .join(', ');
}

// IMAGES_BANK is a Google Drive folder URL like:
//   https://drive.google.com/drive/folders/<FOLDER_ID>?usp=sharing
// Folder must be shared "Anyone with link". We scrape the public HTML to list files,
// then map them to placeholders (HERO/ABOUT/SERVICES_IMAGE/GALLERY_1/GALLERY_2/CTA)
// by filename pattern. Each file ID becomes lh3.googleusercontent.com/d/<ID> URL.
async function listDriveFolder(folderUrl, log) {
  if (!folderUrl) return [];
  const m = String(folderUrl).match(/(?:\/folders\/|[?&]id=)([a-zA-Z0-9_-]{15,})/);
  if (!m) {
    log(`[images-bank] no folder ID in URL: ${String(folderUrl).substring(0, 80)}`);
    return [];
  }
  const folderId = m[1];
  try {
    const res = await fetch(`https://drive.google.com/drive/folders/${folderId}`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
    });
    if (!res.ok) {
      log(`[images-bank] folder fetch failed: HTTP ${res.status}`);
      return [];
    }
    const html = await res.text();
    const files = [];
    const seen = new Set();
    const regex = /data-id="([a-zA-Z0-9_-]{15,})"[\s\S]{0,2000}?aria-label="([^"]+?\.(?:png|jpg|jpeg|webp|gif))[^"]*"/g;
    let match;
    while ((match = regex.exec(html)) !== null) {
      const id = match[1];
      const name = match[2].toLowerCase();
      if (seen.has(id)) continue;
      seen.add(id);
      files.push({ id, name, url: `https://lh3.googleusercontent.com/d/${id}` });
    }
    log(`[images-bank] folder ${folderId}: ${files.length} file(s) found [${files.map(f => f.name).join(', ')}]`);
    return files;
  } catch (err) {
    log(`[images-bank] folder list error: ${err.message}`);
    return [];
  }
}

// Pick first file matching any of the regex patterns. Falls back to provided default.
function pickImageByName(files, patterns, fallback) {
  for (const p of patterns) {
    const f = files.find((fi) => p.test(fi.name));
    if (f) return f.url;
  }
  return fallback || '';
}

function buildPlaceholders(businessData, templateBusinessData, clientImages = []) {
  const phone = String(businessData.PHONE || '');
  const phoneDigits = phone.replace(/\D/g, '');
  const review1 = parseReview(businessData.REVIEW_1, 1);
  const review2 = parseReview(businessData.REVIEW_2, 2);
  const review3 = parseReview(businessData.REVIEW_3, 3);
  const review4 = parseReview(businessData.REVIEW_4, 4);
  // LOGO URLs: ONLY use what the Sheet provided. NO fallback to template sample.
  // Empty Sheet → empty string → Logo.tsx renders BUSINESS_NAME as text instead.
  const logoUrlLight = normalizeLogoUrl(businessData.LOGO_URL);
  const logoUrlDark = normalizeLogoUrl(businessData.LOGO_URL_DARK || businessData.LOGO_URL);
  const logoColors = normalizeLogoColors(businessData.LOGO_COLORS || templateBusinessData.LOGO_COLORS || '');
  const fontLogo = normalizeFontLogo(businessData.FONT_LOGO || templateBusinessData.FONT_LOGO);
  const googleRating = String(businessData.RATING || '5.0');
  const googleReviewCount = String(businessData.NB_REVIEWS || '50');
  const googleReviewUrl = businessData.REVIEW_URL || businessData.GOOGLE_MAPS || '#';

  // Map client IMAGES_BANK folder files to image placeholders by filename pattern.
  // Falls back to template sample images if the corresponding client image is missing.
  const heroImg = pickImageByName(clientImages, [/^hero/, /^01[-_]?hero/, /^bg[-_]?hero/], templateBusinessData.HERO);
  const aboutImg = pickImageByName(clientImages, [/^about/, /^02[-_]?about/, /^team/, /^story/], templateBusinessData.ABOUT);
  const servicesImg = pickImageByName(clientImages, [/^services?/, /^03[-_]?services?/, /^work/], templateBusinessData.SERVICES_IMAGE);
  const gallery1Img = pickImageByName(clientImages, [/^gallery[-_]?1\b/, /^gallery\b/, /^04[-_]?gallery/], templateBusinessData.GALLERY_1);
  const gallery2Img = pickImageByName(clientImages, [/^gallery[-_]?2\b/, /^05[-_]?gallery/], templateBusinessData.GALLERY_2);
  const ctaImg = pickImageByName(clientImages, [/^cta/, /^06[-_]?cta/, /^bottom/], templateBusinessData.CTA);

  return {
    BUSINESS_NAME: businessData.BUSINESS_NAME || 'Your Business',
    BUSINESS_TYPE: displayBusinessType(businessData.BUSINESS_TYPE),
    CITY: businessData.CITY || '',
    ZIP: String(businessData.ZIP || '').replace(/\.0$/, ''),
    STATE: businessData.STATE || '',
    FULL_ADDRESS: businessData.FULL_ADDRESS || '',
    PHONE: phone,
    PHONE_DIGITS: phoneDigits,
    EMAIL: businessData.EMAIL || TEST_EMAIL,
    HOURS: normalizeHours(businessData.HOURS) || 'Mon-Fri 8am-6pm',
    GOOGLE_MAPS_URL: businessData.GOOGLE_MAPS || '#',
    // Constitution-named keys (rule #1)
    GOOGLE_RATING: googleRating,
    GOOGLE_REVIEW_COUNT: googleReviewCount,
    GOOGLE_REVIEW_URL: googleReviewUrl,
    // Backward-compat aliases (some templates may still use these)
    RATING: googleRating,
    REVIEW_COUNT: googleReviewCount,
    REVIEW_URL: googleReviewUrl,
    // Review bodies as standalone placeholders (constitution rule #1: {{REVIEW_N}})
    REVIEW_1: review1.text,
    REVIEW_2: review2.text,
    REVIEW_3: review3.text,
    REVIEW_4: review4.text,
    // Parsed review fields
    REVIEW_1_NAME: review1.name,
    REVIEW_1_DATE: review1.date,
    REVIEW_1_TEXT: review1.text,
    REVIEW_1_STARS: String(review1.stars),
    REVIEW_2_NAME: review2.name,
    REVIEW_2_DATE: review2.date,
    REVIEW_2_TEXT: review2.text,
    REVIEW_2_STARS: String(review2.stars),
    REVIEW_3_NAME: review3.name,
    REVIEW_3_DATE: review3.date,
    REVIEW_3_TEXT: review3.text,
    REVIEW_3_STARS: String(review3.stars),
    REVIEW_4_NAME: review4.name,
    REVIEW_4_DATE: review4.date,
    REVIEW_4_TEXT: review4.text,
    REVIEW_4_STARS: String(review4.stars),
    INSTAGRAM_URL: businessData.INSTAGRAM_URL || businessData.INSTAGRAM || '#',
    FACEBOOK_URL: businessData.FACEBOOK_URL || businessData.FACEBOOK || '#',
    TIKTOK_URL: businessData.TIKTOK_URL || businessData.TIKTOK || '#',
    TWITTER_URL: businessData.TWITTER_URL || businessData.TWITTER || '#',
    LOGO_URL_LIGHT: logoUrlLight,
    LOGO_URL_DARK: logoUrlDark,
    LOGO_COLORS: logoColors,
    FONT_LOGO: fontLogo,
    // GOOGLE_FONTS_HREF is filled in by an async validation step right after
    // buildPlaceholders() returns (we can't probe GF synchronously here).
    GOOGLE_FONTS_HREF: '',
    HERO: heroImg,
    ABOUT: aboutImg,
    SERVICES_IMAGE: servicesImg,
    GALLERY_1: gallery1Img,
    GALLERY_2: gallery2Img,
    CTA: ctaImg,
    GOOGLE_LOGO_URL: templateBusinessData.GOOGLE_LOGO_URL || '',
    SERVICES: businessData.SERVICES || templateBusinessData.SERVICES || '',
    TARGET_DESCRIPTION: businessData.TARGET_DESCRIPTION || templateBusinessData.TARGET_DESCRIPTION || '',
  };
}

// Customer-facing {{BUSINESS_TYPE}} label. The Sheet often stores a category
// slug ("auto_repair", "AUTO REPAIR", "ELECTRICIAN") which must NEVER show on
// the site. Keep already-human values as-is; clean slug/single-case ones to
// readable Title Case ("auto_repair" -> "Auto Repair").
function displayBusinessType(raw) {
  const v = String(raw || '').trim();
  if (!v) return 'Local Business';
  // Already human (has a space, mixed case, no underscore) -> keep as-is.
  if (!/_/.test(v) && /\s/.test(v) && /[a-z]/.test(v) && /[A-Z]/.test(v)) return v;
  return v
    .replace(/_+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function generateSite(businessData, jobLogger) {
  const log = jobLogger || console.log;
  const startTime = Date.now();

  log('Starting site generation [TEMPLATE-BASED PIPELINE V2.2]');
  log(`Business: ${businessData.BUSINESS_NAME} (${businessData.BUSINESS_TYPE})`);

  if (!businessData.BUSINESS_NAME) throw new Error('Missing BUSINESS_NAME');
  if (!businessData.BUSINESS_TYPE) throw new Error('Missing BUSINESS_TYPE');

  const category = normalizeCategory(businessData.BUSINESS_TYPE);
  if (!VALID_CATEGORIES.includes(category)) {
    throw new Error(`Invalid BUSINESS_TYPE "${businessData.BUSINESS_TYPE}" (normalized: "${category}"). Must map to: ${VALID_CATEGORIES.join(', ')}`);
  }

  const templateNum = await nextTemplateNum(category);
  const templateName = `Template_${templateNum}`;
  const templatePath = path.join(TEMPLATES_LIB, category, templateName);

  try {
    await fs.access(templatePath);
  } catch {
    throw new Error(`Template not found: ${templatePath}`);
  }
  log(`Picked template: ${category}/${templateName}`);

  const templateBusinessDataPath = path.join(TEMPLATES_LIB, category, '_BUSINESS_DATA.json');
  let templateBusinessData = {};
  try {
    const raw = await fs.readFile(templateBusinessDataPath, 'utf8');
    templateBusinessData = JSON.parse(raw);
  } catch (err) {
    log(`Warning: could not read template _BUSINESS_DATA.json: ${err.message}`);
  }

  // Vercel canonical alias `<project>.vercel.app` is silently truncated when
  // the project name exceeds ~35 chars (Vercel registers a shortened alias
  // and the long form returns 404). To keep canonical URLs valid for ALL
  // business names, cap project name to 33 chars (small safety margin).
  // Compact ts (base36) saves 5 chars vs decimal — frees room for the slug.
  const fullSlug = slugify(businessData.BUSINESS_NAME);
  const timestamp = Date.now();
  const compactTs = timestamp.toString(36); // ~8 chars vs 13 in decimal
  const MAX_PROJECT_NAME = 33;
  const maxSlugLen = MAX_PROJECT_NAME - compactTs.length - 1; // -1 for separator
  const slug = fullSlug.slice(0, maxSlugLen).replace(/-+$/, '');
  const projectDir = path.join(SITES_DIR, 'inactive', `${slug}-${compactTs}`);

  log(`Project dir: ${projectDir}`);
  await fs.mkdir(path.dirname(projectDir), { recursive: true });

  log('Copying template files (excluding node_modules, .next, .git)...');
  await copyRecursive(templatePath, projectDir);

  await fs.writeFile(
    path.join(projectDir, 'business-info.json'),
    JSON.stringify(businessData, null, 2),
  );

  log('Building placeholders map...');
  // Fetch client image folder (IMAGES_BANK) BEFORE building placeholders so
  // HERO/ABOUT/SERVICES_IMAGE/GALLERY/CTA can use the client's actual photos
  // instead of the template's sample images.
  log('Listing IMAGES_BANK folder for client photos...');
  const clientImages = await listDriveFolder(businessData.IMAGES_BANK, log);
  const placeholders = buildPlaceholders(businessData, templateBusinessData, clientImages);

  // Validate FONT_LOGO against Google Fonts. If found, fill GOOGLE_FONTS_HREF
  // so layout.tsx injects a <link rel="stylesheet">. If not found, clear
  // FONT_LOGO so Logo.tsx falls back to the template's own display font
  // (otherwise the browser would render an unstyled generic sans-serif).
  const fontParsed = parseFontLogo(placeholders.FONT_LOGO);
  if (fontParsed) {
    log(`[google-fonts] validating "${fontParsed.family}" (weight=${fontParsed.weight}, italic=${fontParsed.italic})...`);
    const ok = await validateGoogleFont(fontParsed, log);
    if (ok) {
      placeholders.GOOGLE_FONTS_HREF = buildGoogleFontsHref(fontParsed);
      log(`[google-fonts] loaded: ${placeholders.GOOGLE_FONTS_HREF}`);
    } else {
      placeholders.FONT_LOGO = '';
      log(`[google-fonts] fallback: FONT_LOGO cleared, template default display font will apply`);
    }
  }

  log(`Substituting placeholders (${Object.keys(placeholders).length} keys)...`);
  const subResult = await substitutePlaceholders(projectDir, placeholders);
  log(`  ${subResult.filesTouched} files updated, ${subResult.replacementsCount} replacements`);

  // Write _BUSINESS_DATA.json audit trail in the generated site dir.
  // Contains the FULL substituted placeholder set + the raw Sheet input,
  // so the lead-specific values are inspectable on disk after generation.
  const auditPath = path.join(projectDir, '_BUSINESS_DATA.json');
  const auditPayload = {
    _README: 'Auto-generated audit trail of the lead data used to populate this site. Source: Sheet → Workflow B → pipeline buildPlaceholders.',
    _generated_at: new Date().toISOString(),
    _template: `${category}/${templateName}`,
    raw_sheet_input: businessData,
    substituted_placeholders: placeholders,
    client_images_bank: clientImages,
  };
  await fs.writeFile(auditPath, JSON.stringify(auditPayload, null, 2));
  log(`  audit trail written: _BUSINESS_DATA.json (${Object.keys(placeholders).length} placeholders)`);

  const envContent = `RESEND_API_KEY=${RESEND_API_KEY}\nNEXT_PUBLIC_SITE_URL=https://example.com\n`;
  await fs.writeFile(path.join(projectDir, '.env.local'), envContent);

  log('Running pnpm install (--ignore-scripts mode)...');
  try {
    await execCommand('pnpm', ['install', '--reporter=append-only', '--ignore-scripts'], projectDir, log);
  } catch (err) {
    throw new Error(`pnpm install failed: ${err.message}`);
  }

  log('Deploying to Vercel (production = canonical <project>.vercel.app URL)...');
  // --prod ships directly to the project's canonical production URL
  // (rodriguez-auto-repair-<ts>.vercel.app) instead of a preview deploy
  // with a random hash suffix (rodriguez-auto-repair-<ts>-<hash>-<team>.vercel.app).
  // Cleaner URL to send to the lead/client on the phone.
  const deployArgs = ['deploy', '--yes', '--prod', '--scope', VERCEL_SCOPE];
  let deployStdout;
  try {
    const result = await execCommand('vercel', deployArgs, projectDir, log);
    deployStdout = result.stdout;
  } catch (err) {
    throw new Error(`Vercel deploy failed: ${err.message}`);
  }

  const urlMatch = deployStdout.match(/https:\/\/[a-z0-9-]+\.vercel\.app/);
  const siteUrl = urlMatch ? urlMatch[0] : null;
  if (!siteUrl) {
    throw new Error(`Could not extract Vercel URL from deploy output. Raw: ${deployStdout.substring(0, 500)}`);
  }

  const duration = Math.round((Date.now() - startTime) / 1000);
  log(`Site deployed in ${duration}s: ${siteUrl}`);

  // Push RESEND_API_KEY + PREVIEW_FORWARD_TO to the new Vercel project so
  // form API routes can actually send email at runtime. Vercel ignores the
  // .env.local we wrote earlier at runtime — env vars must live in project
  // settings (via API or dashboard) to reach serverless functions.
  const projectName = path.basename(projectDir);
  log('Pushing env vars (RESEND_API_KEY + PREVIEW_FORWARD_TO) to new Vercel project...');
  const envSet = await setVercelProjectEnv(projectName, log);
  if (!envSet) {
    log('WARNING: env vars push failed — forms will return 500 at runtime. Continuing so site is at least visible.');
  }

  // Canonical URL auto-aliases to the latest production deployment.
  // After the redeploy below, this URL serves the env-injected build.
  let canonicalSiteUrl = `https://${projectName}.vercel.app`;

  if (envSet) {
    const sourceDeploymentId = await findLatestDeploymentId(projectName, log);
    if (sourceDeploymentId) {
      log('Triggering redeploy so new env vars take effect at runtime...');
      const redeploy = await redeployForEnv(projectName, sourceDeploymentId, log);
      if (redeploy.ok) {
        log(`Redeploy queued: ${redeploy.newDeploymentUid}`);
        const ready = await waitForDeploymentReady(redeploy.newDeploymentUid, log);
        if (ready) log('Redeploy READY — env vars now live in serverless runtime');
        else log('WARNING: redeploy did not reach READY in time. Forms may still be broken. Continuing.');
      } else {
        log('WARNING: redeploy request failed — keeping initial deploy (forms broken)');
      }
    } else {
      log('WARNING: could not find source deployment id — skipping redeploy');
    }
  }

  // Attach branded <slug>.pandsy.com alias for the URL we send to the client.
  // We keep canonicalSiteUrl (.vercel.app) as the "internal" URL for SSO
  // disable + screenshot (proven path, no SSL cert race on first hit).
  // The pandsy URL becomes the one written to the Sheet.
  log('Attaching pandsy.com alias to new Vercel project...');
  const aliasResult = await addPandsyAlias(projectName, fullSlug, compactTs, log);
  if (!aliasResult.ok) {
    log(`WARNING: pandsy alias not attached — will use ${canonicalSiteUrl} for Sheet`);
  }
  // The Sheet URL (publicSiteUrl) is finalized AFTER the screenshot below: the
  // pandsy.com cert provisions asynchronously, so the screenshot delay doubles
  // as provisioning time, then we probe HTTPS once and fall back to .vercel.app
  // if the cert never served (Let's Encrypt weekly quota for pandsy.com exhausted).

  // Disable Vercel Auth so leads (and the screenshot bot) can view the site
  // Project name = the same slug-timestamp dir name we used for vercel deploy
  const authDisabled = await disableVercelProtection(projectName, log);
  if (authDisabled) {
    // Wait for the Vercel edge to actually reflect the change before screenshotting
    await waitForPublicAccess(canonicalSiteUrl, log);
  }

  // Capture hero (viewport 1920x1080) + full-page screenshots, non-fatal
  let screenshot = null;
  try {
    screenshot = await captureSite(canonicalSiteUrl, slug, log);
  } catch (err) {
    log(`Screenshot capture failed (non-fatal): ${err.message}`);
  }

  // Prefer the branded pandsy.com alias, but ONLY if its SSL cert actually
  // provisioned (probe HTTPS). Otherwise use the always-valid .vercel.app slug
  // so the Sheet link is never a dead ERR_CONNECTION_CLOSED page.
  let publicSiteUrl = canonicalSiteUrl;
  if (aliasResult.ok && aliasResult.pandsyUrl) {
    if (await pandsyCertLive(aliasResult.pandsyUrl, log)) {
      publicSiteUrl = aliasResult.pandsyUrl;
      log(`Branded URL live (cert OK): ${publicSiteUrl}`);
    } else {
      log(`pandsy cert not provisioned (quota likely exhausted) — using ${canonicalSiteUrl}`);
    }
  }

  try {
    await fs.rm(projectDir, { recursive: true, force: true });
    log(`Local build dir removed: ${projectDir}`);
  } catch (cleanupErr) {
    log(`Build dir cleanup failed (non-fatal): ${cleanupErr.message}`);
  }
  return {
    success: true,
    site_url: publicSiteUrl,
    project_dir: projectDir,
    slug,
    category,
    template: templateName,
    duration_seconds: duration,
    hero_capture_url: screenshot ? screenshot.hero.public_url : null,
    full_capture_url: screenshot ? screenshot.full.public_url : null,
    hero_capture_filename: screenshot ? screenshot.hero.filename : null,
    full_capture_filename: screenshot ? screenshot.full.filename : null,
  };
}
