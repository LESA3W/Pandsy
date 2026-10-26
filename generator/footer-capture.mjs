import { chromium } from "playwright";
import { promises as fs } from "fs";
import path from "path";

const SITES = [
  { name: "AR_T1", url: process.argv[2] },
];

const filtered = SITES.filter((s) => s.url);
if (filtered.length === 0) {
  console.error("usage: node footer-capture.mjs <url1> [name1] [url2] [name2] ...");
  process.exit(1);
}

const args = process.argv.slice(2);
const pairs = [];
for (let i = 0; i < args.length; i += 2) {
  pairs.push({ url: args[i], name: args[i + 1] || `site${i / 2 + 1}` });
}

const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const ctx = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 1,
});
await ctx.addInitScript(() => {
  try {
    localStorage.setItem("cookie-consent", JSON.stringify({
      necessary: true, analytics: false, marketing: false, timestamp: Date.now(), accepted: true,
    }));
  } catch (e) {}
});

for (const { url, name } of pairs) {
  console.log(`\n=== ${name}: ${url} ===`);
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await page.addStyleTag({
    content: `
      [class*="cookie" i], [aria-label*="cookie" i] { display: none !important; }
      [class*="h-screen"], [class*="min-h-screen"], [class*="max-h-screen"],
      [class*="vh]"], [class*="svh]"], [class*="dvh]"], [class*="lvh]"] {
        height: 1080px !important; min-height: 1080px !important; max-height: 1080px !important;
      }
      /* Force framer-motion whileInView elements to be visible.
         The footer is screenshotted after Playwright scrolls but Intersection
         Observers may not fire in time — force final animation state. */
      footer, footer *,
      [style*="opacity: 0"], [style*="opacity:0"],
      [style*="transform"] {
        opacity: 1 !important;
        transform: none !important;
      }
    `,
  });
  // Scroll to bottom slowly to trigger lazy loads
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = 200;
      const t = setInterval(() => {
        window.scrollBy(0, step);
        y += step;
        if (y >= document.documentElement.scrollHeight) {
          clearInterval(t);
          resolve();
        }
      }, 100);
    });
  });
  await page.waitForLoadState("networkidle").catch(() => {});
  // Wait for framer-motion whileInView animations to complete after scroll
  await page.waitForTimeout(1500);

  // Find main page <footer> — pick the TALLEST footer element on the page,
  // skipping small inner <footer>s inside review cards / articles.
  const footer = await page.evaluateHandle(() => {
    const all = Array.from(document.querySelectorAll("footer"));
    if (all.length === 0) return null;
    let best = all[0];
    let bestH = best.getBoundingClientRect().height;
    for (const el of all) {
      const h = el.getBoundingClientRect().height;
      if (h > bestH) {
        bestH = h;
        best = el;
      }
    }
    return best;
  });
  if (footer && (await footer.evaluate((el) => el !== null))) {
    const out = `/tmp/footer-${name}.png`;
    await footer.screenshot({ path: out });
    const stat = await fs.stat(out);
    console.log(`Footer saved: ${out} (${Math.round(stat.size / 1024)} KB)`);
  } else {
    console.log("No <footer> found, falling back to bottom viewport");
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(500);
    await page.screenshot({ path: `/tmp/footer-${name}.png`, fullPage: false });
  }
  await page.close();
}

await browser.close();
console.log("\nDone.");
