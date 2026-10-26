// screenshot.js v2 — captures TWO screenshots per site:
//   - hero: viewport 1920x1080 (above-the-fold), saved as JPEG <=200 KB
//   - full: full-page (entire scroll height, like GoFullPage extension)
// Returns { hero: {...}, full: {...} }
//
// Usage as module:
//   import { captureSite } from "./screenshot.js";
//   const result = await captureSite(siteUrl, slug, logFn);
//
// CLI mode: node screenshot.js <site_url> <slug>

import { chromium } from "playwright";
import { promises as fs } from "fs";
import path from "path";

const SCREENSHOTS_DIR = "/home/USER/automation/screenshots";
const PUBLIC_BASE = process.env.SCREENSHOTS_PUBLIC_BASE || "http://YOUR_VPS_HOST:3000/screenshots";

async function saveAndDescribe(localPath, filename, log) {
  const stat = await fs.stat(localPath);
  const sizeKb = Math.round(stat.size / 1024);
  const publicUrl = `${PUBLIC_BASE}/${filename}`;
  log(`[screenshot] saved ${sizeKb} KB → ${publicUrl}`);
  return { local_path: localPath, public_url: publicUrl, filename, size_kb: sizeKb };
}

export async function captureSite(siteUrl, slug, log = console.log) {
  if (!siteUrl || !slug) throw new Error("captureSite: siteUrl and slug required");
  await fs.mkdir(SCREENSHOTS_DIR, { recursive: true });

  const timestamp = Date.now();
  const heroFilename = `${slug}-hero-${timestamp}.jpg`;
  const fullFilename = `${slug}-full-${timestamp}.png`;
  const heroPath = path.join(SCREENSHOTS_DIR, heroFilename);
  const fullPath = path.join(SCREENSHOTS_DIR, fullFilename);

  log(`[screenshot] launching chromium`);
  // --force-device-scale-factor=1 prevents Chromium from inheriting the host's
  // DPI scale (some headless setups apply 1.25x or 1.5x silently, making
  // rendered text appear smaller than at native 100% zoom).
  // --hide-scrollbars removes the right-side scrollbar gutter so layout matches
  // the user's normal browser view.
  const browser = await chromium.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--force-device-scale-factor=1",
      "--high-dpi-support=1",
      "--hide-scrollbars",
      "--font-render-hinting=none",
    ],
  });
  try {
    // Emulate Windows 125% DPI scaling: CSS viewport 1536×864, DPR 1.25
    // → PNG output = 1920×1080. Tuned visually (1.5x = too zoomed,
    // 1.15x = not enough). 1536 also aligns to Tailwind 2xl breakpoint.
    const context = await browser.newContext({
      viewport: { width: 1536, height: 864 },
      deviceScaleFactor: 1.25,
    });
    // Pre-set cookie consent in localStorage so the banner never renders.
    // Template's CookieConsent reads localStorage["cookie-consent"] on mount;
    // if a value exists, it skips showing the slide-up banner.
    await context.addInitScript(() => {
      try {
        localStorage.setItem("cookie-consent", JSON.stringify({
          necessary: true,
          analytics: false,
          marketing: false,
          timestamp: Date.now(),
          accepted: true,
        }));
      } catch (e) { /* localStorage may not be available yet */ }
    });

    const page = await context.newPage();
    log(`[screenshot] navigating to ${siteUrl}`);
    await page.goto(siteUrl, { waitUntil: "networkidle", timeout: 60000 });

    // Vercel SSO sometimes lingers at the edge (stale cache + Chromium cookies)
    // even after API-level ssoProtection was disabled. Retry with aggressive
    // cache-bust + cookie clearing to force fresh edge resolution.
    for (let attempt = 1; attempt <= 10; attempt++) {
      const title = await page.title();
      const isLogin = /Vercel|Authentication|Login/i.test(title);
      if (!isLogin) {
        log(`[screenshot] real site loaded after ${attempt - 1} retry/ies (title="${title}")`);
        break;
      }
      if (attempt === 10) {
        log(`[screenshot] gave up after 10 retries, still got "${title}" — capturing anyway`);
        break;
      }
      log(`[screenshot] SSO page (title="${title}"), retry ${attempt}/10: clear cookies + cache-bust URL`);
      await context.clearCookies();
      await page.waitForTimeout(6000);
      const cacheBustUrl = `${siteUrl}${siteUrl.includes("?") ? "&" : "?"}_pwretry=${Date.now()}_${attempt}`;
      await page.goto(cacheBustUrl, { waitUntil: "networkidle", timeout: 60000 });
    }
    // CRITICAL #1: wait for CSS to be actually applied.
    // networkidle fires when network requests stop, but Next.js can serve the
    // HTML before stylesheets are downloaded/parsed, especially on fresh
    // Vercel deploys whose edge CDN hasn't fully propagated. If we screenshot
    // before CSS applies, the page renders as unstyled HTML (raw browser
    // defaults: links blue+underlined, nav stacked, no spacing, mobile
    // hamburger shown at desktop width).
    // Heuristic: a styled page has body background ≠ white/transparent
    // (templates use bg-ink, bg-cream, bg-tide, bg-paper, etc.) AND has at
    // least one stylesheet with accessible cssRules. Retry up to 10s.
    log(`[screenshot] waiting for CSS to apply (computed styles + stylesheets gate)`);
    let cssApplied = false;
    for (let i = 0; i < 20; i++) {
      cssApplied = await page.evaluate(() => {
        const bg = getComputedStyle(document.body).backgroundColor;
        const transparent = !bg || bg === "rgba(0, 0, 0, 0)" || bg === "transparent";
        const white = bg === "rgb(255, 255, 255)";
        const hasStyledBody = !transparent && !white;
        const hasParsedSheets = Array.from(document.styleSheets || []).some((s) => {
          try { return (s.cssRules || []).length > 0; } catch { return false; }
        });
        return hasStyledBody && hasParsedSheets;
      });
      if (cssApplied) break;
      await page.waitForTimeout(500);
    }
    if (!cssApplied) {
      log(`[screenshot] CSS still not applied after 10s — reloading once`);
      await page.reload({ waitUntil: "networkidle", timeout: 60000 });
      await page.waitForTimeout(2000);
    }

    // CRITICAL #2: wait for web fonts to ACTUALLY load before capturing.
    // next/font/google uses `font-display: swap` → text first renders in the
    // CSS fallback font (Arial/Helvetica metrics), then swaps to the web font
    // when it's loaded. document.fonts.ready resolves only after every
    // @font-face declared in CSS has finished loading (or failed).
    log(`[screenshot] waiting for document.fonts.ready (web font load gate)`);
    try {
      await page.evaluate(() => document.fonts.ready);
    } catch (e) {
      log(`[screenshot] fonts.ready threw (continuing): ${e.message}`);
    }
    // Belt-and-suspenders: framer-motion + lazy hero animations need a tick
    // after fonts settle so layout reflows once more before capture.
    await page.waitForTimeout(2500);

    // Hide cookie UI BEFORE hero capture.
    // PRIMARY: localStorage trick (set via addInitScript) → React's CookieConsent
    // checks localStorage on mount, sees consent, never renders the banner.
    // FALLBACK 1: CSS display:none on common cookie-related selectors.
    // FALLBACK 2: JS removal of fixed-bottom elements with cookie text content.
    await page.addStyleTag({
      content: `
        html, body { overflow: visible !important; overflow-clip-margin: unset !important; height: auto !important; }
        [class*="CookieConsent" i],
        [class*="cookie-consent" i],
        [class*="cookie-banner" i],
        [class*="cookie-button" i],
        [class*="CookieButton" i],
        [aria-label*="cookie" i],
        [data-cookie],
        [id*="cookie" i] { display: none !important; }
      `,
    });

    // Structural fallback: any fixed-position element at viewport bottom (<400px tall)
    // whose text mentions "cookie"/"consent"/"accept" → probable cookie banner. Remove it.
    await page.evaluate(() => {
      document.querySelectorAll("*").forEach((el) => {
        const cs = getComputedStyle(el);
        if (cs.position !== "fixed") return;
        const rect = el.getBoundingClientRect();
        const nearBottom = rect.bottom > window.innerHeight - 50;
        const reasonablySized = rect.height < 400 && rect.height > 20;
        if (!nearBottom || !reasonablySized) return;
        const text = (el.textContent || "").toLowerCase().slice(0, 500);
        if (text.includes("cookie") || text.includes("consent") || text.match(/accept[\s_-]*all/)) {
          el.remove();
        }
      });
    });

    await page.waitForTimeout(300); // let style + DOM mutations apply

    log(`[screenshot] capturing hero (viewport 1920x1080) as JPEG <=200KB`);
    // Hero is saved as JPEG. Step quality down until the encoded file is
    // <= 200 KB (max). No `sharp` on the VPS — Playwright encodes JPEG directly.
    {
      const HERO_MAX_BYTES = 200 * 1024;
      let heroQuality = 82;
      let heroBuf = await page.screenshot({ fullPage: false, type: "jpeg", quality: heroQuality });
      while (heroBuf.length > HERO_MAX_BYTES && heroQuality > 30) {
        heroQuality -= 7;
        heroBuf = await page.screenshot({ fullPage: false, type: "jpeg", quality: heroQuality });
      }
      await fs.writeFile(heroPath, heroBuf);
      log(`[screenshot] hero JPEG quality=${heroQuality}, ${Math.round(heroBuf.length / 1024)} KB`);
    }

    // Auto-scroll page top-to-bottom to trigger lazy-loaded images +
    // Intersection Observer animations (framer-motion whileInView, etc.)
    // Smaller steps + slower interval = more reliable IO triggering.
    log(`[screenshot] auto-scrolling to trigger lazy loads + animations`);
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let y = 0;
        const step = 200;
        const timer = setInterval(() => {
          window.scrollBy(0, step);
          y += step;
          if (y >= document.documentElement.scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 120);
      });
    });
    await page.waitForLoadState("networkidle").catch(() => {});

    // Wait for all images to actually finish loading (5s max each)
    await page.evaluate(async () => {
      const imgs = Array.from(document.querySelectorAll("img"));
      await Promise.all(imgs.map((img) => {
        if (img.complete && img.naturalWidth > 0) return Promise.resolve();
        return new Promise((resolve) => {
          img.addEventListener("load", resolve, { once: true });
          img.addEventListener("error", resolve, { once: true });
          setTimeout(resolve, 5000);
        });
      }));
    });

    // Neutralize ONLY position:sticky/fixed elements so they don't repeat
    // across the full-page render. Leave absolute/relative alone (layout).
    await page.evaluate(() => {
      document.querySelectorAll("*").forEach((el) => {
        const pos = getComputedStyle(el).position;
        if (pos === "sticky" || pos === "fixed") {
          el.style.setProperty("position", "absolute", "important");
        }
      });
    });

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(2000); // settle after scroll-to-top

    // Measure final page height BEFORE viewport resize.
    const fullHeight = await page.evaluate(() => Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight,
    ));
    // Chromium hard cap is 16384 DEVICE pixels. With deviceScaleFactor=1.25,
    // max CSS height = 16384/1.25 ≈ 13107 — clamp slightly under to be safe.
    const clampedHeight = Math.min(fullHeight, 13000);
    log(`[screenshot] full page height = ${fullHeight}px (capturing ${clampedHeight}px)`);

    // CRITICAL: lock ALL vh-based heights BEFORE the viewport resize.
    // Use attribute SUBSTRING selectors (not class selectors) so responsive
    // variants like `md:min-h-screen`, `lg:h-screen`, `sm:max-h-[90vh]` are caught.
    // Without this, vh recomputes against the new viewport height (e.g. 9761px),
    // stretching the hero and creating massive empty gaps.
    await page.addStyleTag({
      content: `
        /* Tailwind shorthand vh-units — catches all responsive prefixes */
        [class*="h-screen"], [class*="min-h-screen"], [class*="max-h-screen"],
        [class*="h-dvh"], [class*="min-h-dvh"], [class*="max-h-dvh"],
        [class*="h-svh"], [class*="min-h-svh"], [class*="max-h-svh"],
        [class*="h-lvh"], [class*="min-h-lvh"], [class*="max-h-lvh"] {
          height: 864px !important;
          min-height: 864px !important;
          max-height: 864px !important;
        }
        /* Tailwind arbitrary values — catch ANY number of vh/svh/dvh/lvh:
           h-[90vh], md:h-[100vh], min-h-[100svh], max-h-[80dvh], h-[calc(100vh-64px)], etc. */
        [class*="vh]"], [class*="svh]"], [class*="dvh]"], [class*="lvh]"],
        [class*="vh-"], [class*="svh-"], [class*="dvh-"], [class*="lvh-"],
        [class*="vh)"], [class*="svh)"], [class*="dvh)"], [class*="lvh)"] {
          height: 864px !important;
          min-height: 864px !important;
          max-height: 864px !important;
        }
        body { min-height: 864px !important; }
      `,
    });
    await page.waitForTimeout(300); // CSS apply + reflow

    // Re-measure after vh-lock (page may have shrunk slightly without the hero stretching)
    const lockedHeight = await page.evaluate(() => Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
    ));
    const finalHeight = Math.min(lockedHeight, 13000);
    log(`[screenshot] vh-locked page height = ${lockedHeight}px (capturing ${finalHeight}px)`);

    // Resize viewport CSS width = 1536 (matches the 125% scaling emulation),
    // height = full page. PNG output will be 1920 × (finalHeight*1.25) physical pixels.
    await page.setViewportSize({ width: 1536, height: finalHeight });
    await page.waitForTimeout(800); // let layout settle after resize

    log(`[screenshot] capturing full-page`);
    await page.screenshot({ path: fullPath, fullPage: false, type: "png" });
  } finally {
    await browser.close();
  }

  const hero = await saveAndDescribe(heroPath, heroFilename, log);
  const full = await saveAndDescribe(fullPath, fullFilename, log);

  // Post-capture sanity validation. Suspicious patterns we've burned ourselves on:
  // - File < 100 KB usually means a login page or empty/broken render
  // - Hero size == Full size means full-page didn't actually grow (truncation bug)
  // - Hero very tiny means hero failed to render
  const warnings = [];
  if (hero.size_kb < 15) warnings.push(`hero suspiciously small (${hero.size_kb} KB) — possible login page / broken render`);
  if (full.size_kb < 100) warnings.push(`full suspiciously small (${full.size_kb} KB) — possible login page / broken render`);
  if (Math.abs(hero.size_kb - full.size_kb) < 5 && hero.size_kb < 200) {
    warnings.push(`hero and full nearly identical size (${hero.size_kb} ≈ ${full.size_kb} KB) — full-page may have captured only viewport`);
  }
  if (warnings.length) {
    log(`[screenshot] WARNINGS: ${warnings.join(" | ")}`);
  }

  return { hero, full, warnings };
}

// CLI mode
if (import.meta.url === `file://${process.argv[1]}`) {
  const [siteUrl, slug] = process.argv.slice(2);
  captureSite(siteUrl, slug)
    .then((r) => { console.log(JSON.stringify(r, null, 2)); process.exit(0); })
    .catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
}
