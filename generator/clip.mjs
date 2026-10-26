import { chromium } from "playwright";
const url = process.argv[2], sel = process.argv[3], out = process.argv[4];
const b = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 });
const p = await ctx.newPage();
await p.goto(url, { waitUntil: "networkidle", timeout: 60000 });
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(1500);
const el = await p.$(sel);
if (!el) { console.log("NOT FOUND"); await b.close(); process.exit(1); }
await el.scrollIntoViewIfNeeded();
await p.waitForTimeout(400);
await el.screenshot({ path: out });
console.log("OK " + out);
await b.close();
