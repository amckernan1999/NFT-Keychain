const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const fs = require("fs");

let browser_test_url = ["https://foundation.app/@spasi___sohrani/GPSG/15"]
let browser_test_urls = ["https://foundation.app/@spasi___sohrani/GPSG/15",
                          "https://rarible.com/token/0x57a204aa1042f6e66dd7730813f4024114d74f37:1700", 
                          "https://makersplace.com/bluepolescapital/a-spark-of-an-idea-1-of-1-167320/",
                          "https://mintable.app/COLLECTIBLES/item/Happy-Pugs-8-MINT/ULKEheYYY7J1F3h",
                          "https://knownorigin.io/gallery/10817000-iv-xx",
                          "https://opensea.io/assets/matic/0x28009881f0ffe85c90725b8b02be55773647c64a/20"];

function webs(urls) {
  let image_url;
  let image_urls = new Array();

  (async () => {
    const browser = await puppeteer.launch({
      args: ['--user-agent=<user_agent_string>',]
    });
    console.log('browser opened')

    const page = await browser.newPage();

      // finding the image source url for each of the given nft urls
      for (let i = 0; i < urls.length; i++) {
          try {
              console.log('loading: ' + urls[i])
              await page.goto(urls[i], {timeout: 100000});
              let bodyHTML = await page.evaluate(() => document.body.innerHTML);
              let $ = cheerio.load(bodyHTML);
              //console.log(bodyHTML); // thie will print the entire html page

              if (urls[i].slice(0, 22) === "https://foundation.app") {
                console.log("https://foundation.app");
                image_url = $('.fullscreen > img').attr('src');
                image_urls.push(image_url)
              }

              // rarible not working
              else if (urls[i].slice(0, 19) === "https://rarible.com") {
                console.log("https://rarible.com");
                image_url = $('.sc-bdvvtL sc-gsDKAQ sc-jNHqnW ieSfBq bMYxVD > img').attr('src');
                image_urls.push(image_url)
              }
              else if (urls[i].slice(0, 23) === "https://makersplace.com") {
                console.log("https:/makersplace.com");
                image_url = $('.image-wrp > img').attr('src');
                image_urls.push(image_url)
              }

              // mintable not working
              else if (urls[i].slice(0, 20) === "https://mintable.app") {
                console.log("https://mintable.app");
                image_url = $('.Image_wrapper__AzPWo MediaGallery_previewMediaCard__F0mji Image_visible__OrBzBp > img').attr('src');
                image_urls.push(image_url)
              }

              // knownorigin not working
              else if (urls[i].slice(0, 22) === "https://knownorigin.io") {
                console.log("https://knownorigin.io");
                image_url = $('.tile is-child > section > figure > div > img').attr('src');
                image_urls.push(image_url)
              }

              // opensea not working
              else if (urls[i].slice(0, 18) === "https://opensea.io") {
                console.log("https://opensea.io");
                image_url = $('Blockreact__Block-sc-1xf18x6-0 Flexreact__Flex-sc-1twd32i-0 FlexColumnreact__FlexColumn-sc-1wwz3hp-0 VerticalAlignedreact__VerticalAligned-sc-b4hiel-0 CenterAlignedreact__CenterAligned-sc-cjf6mn-0 bKhpmf jYqxGr ksFzlZ iXcsEj cgnEmv > img').attr('src');
                image_urls.push(image_url)
              }
              else {
                console.log('failed to load ' + urls[i]);
              }

            } catch(err) {
                console.log(err);
            }
      }

        await browser.close();
        console.log("browser closed");

        // printing the gathered image source urls to check if they're for the right image
        console.log("image urls:");
        for (let i = 0; i < image_urls.length; i++) {
          console.log(image_urls[i]);
        }
  })();
}

webs(browser_test_urls);