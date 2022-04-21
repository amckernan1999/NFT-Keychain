const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const fs = require("fs");

let browser_urls = ["https://foundation.app/@spasi___sohrani/GPSG/15", "https://opensea.io/assets/matic/0x28009881f0ffe85c90725b8b02be55773647c64a/20"];

(async () => {
  const browser = await puppeteer.launch({
  });
  console.log('browser opened')

  const page = await browser.newPage();
  
    for (let i = 0; i < browser_urls.length; i++) {
        try {
            await page.goto(browser_urls[i], {timeout: 100000});
            let bodyHTML = await page.evaluate(() => document.body.innerHTML);
            let $ = cheerio.load(bodyHTML);
            console.log('webpage loaded');
            console.log(bodyHTML);
          } catch(err) {
              console.log(err);
          }
    }

      await browser.close();
})();