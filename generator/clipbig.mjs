import { chromium } from "playwright";
const url = process.argv[2], out = process.argv[3];
const b = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const p = await ctx.newPage();
await p.goto(url, { waitUntil: "networkidle", timeout: 60000 });
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(1200);
// pick the tallest <footer>
const handle = await p.evaluateHandle(() => {
  const fs = [...document.querySelectorAll("footer")];
  let best = null, h = 0;
  for (const f of fs) { const r = f.getBoundingClientRect(); if (r.height > h) { h = r.height; best = f; } }
  return best;
});
const el = handle.asElement();
if (!el) { console.log("NONE"); await b.close(); process.exit(1); }
await el.scrollIntoViewIfNeeded();
await p.waitForTimeout(500);
await el.screenshot({ path: out });
console.log("OK");
await b.close();
