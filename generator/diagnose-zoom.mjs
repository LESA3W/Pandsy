import { chromium } from "playwright";
const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox", "--force-device-scale-factor=1", "--high-dpi-support=1", "--hide-scrollbars"],
});
const context = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
const page = await context.newPage();
await page.goto("https://rodriguez-auto-repair-1779092190156.vercel.app", { waitUntil: "networkidle", timeout: 60000 });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(2000);
const diag = await page.evaluate(() => {
  const h1 = document.querySelector("h1");
  const h1cs = h1 ? getComputedStyle(h1) : {};
  return {
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    devicePixelRatio: window.devicePixelRatio,
    clientWidth: document.documentElement.clientWidth,
    clientHeight: document.documentElement.clientHeight,
    scrollWidth: document.documentElement.scrollWidth,
    h1_fontSize: h1cs.fontSize,
    h1_lineHeight: h1cs.lineHeight,
    h1_offsetWidth: h1 ? h1.offsetWidth : null,
    h1_offsetHeight: h1 ? h1.offsetHeight : null,
    h1_text: h1 ? h1.textContent.slice(0, 50) : null,
    htmlFontSize: getComputedStyle(document.documentElement).fontSize,
    bodyFontSize: getComputedStyle(document.body).fontSize,
  };
});
console.log(JSON.stringify(diag, null, 2));
await browser.close();
