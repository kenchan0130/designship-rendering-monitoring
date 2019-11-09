const puppeteer = require("puppeteer");
const axios = require("axios");

const cacheResetUrl = process.env.CACHE_RESET_URL;

(async () => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox"]
  });
  const page = await browser.newPage();
  await page.goto("https://design-ship.jp/");
  const selector = "#__layout .container";
  try {
    await page.waitForSelector(selector, {
      timeout: 10000
    });
  } catch (e) {
    console.log(e.name + ": " + e.message);
    console.log(`Not found ${selector} selector. Resetting cache the page...`);
    axios.post(cacheResetUrl, { text: "cache clear", robot: true });
  } finally {
    await browser.close();
  }
})().catch(console.log);
