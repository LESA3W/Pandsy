import { chromium } from "playwright";
const url = process.argv[2], out = process.argv[3];
const b = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const ctx = await b.newContext({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 });
const p = await ctx.newPage();
await p.goto(url, { waitUntil: "networkidle", timeout: 60000 });
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(1500);
// click Accept all to open the modal
const btn = await p.$("text=Accept all");
if (btn) { await btn.click(); await p.waitForTimeout(1000); }
await p.screenshot({ path: out });
console.log("OK");
await b.close();
