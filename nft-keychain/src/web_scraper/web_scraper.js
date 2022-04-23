const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());
const fs = require('fs');

let browser_test_url = ["https://opensea.io/assets/matic/0x28009881f0ffe85c90725b8b02be55773647c64a/20"]
let browser_test_urls = ["https://foundation.app/@spasi___sohrani/GPSG/15",
                          "https://rarible.com/token/0x57a204aa1042f6e66dd7730813f4024114d74f37:1700", // not working
                          "https://makersplace.com/bluepolescapital/a-spark-of-an-idea-1-of-1-167320/",
                          "https://mintable.app/COLLECTIBLES/item/Happy-Pugs-8-MINT/ULKEheYYY7J1F3h", // not working
                          "https://knownorigin.io/gallery/10817000-iv-xx",
                          "https://opensea.io/assets/matic/0x28009881f0ffe85c90725b8b02be55773647c64a/20"];

async function grab_image(url, title) {
  const file_path = "./images/" + title + ".png";

  console.log('\ngrabbing image');
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });
  console.log('\naxioos finished');

  return new Promise((resolve, reject) => {
    response.data.pipe(fs.createWriteStream(file_path))
                .on('error', reject)
                .on('error', () => console.log('error downloading image'))
                .on('finish', () => console.log('finished'))
                .once('close', () => resolve(file_path));
  });
}

function webs(urls) {
  let image_url;
  let image_title;
  let image_urls = new Array();
  let image_titles = new Array();

  (async () => {
    const browser = await puppeteer.launch({
      args: ['--user-agent=<user_agent_string>',]
    });
    console.log('browser opened')

    const page = await browser.newPage();

      // finding the image source url for each of the given nft urls
      for (let i = 0; i < urls.length; i++) {
          try {
              console.log('\nloading: ' + urls[i])
              await page.goto(urls[i], {timeout: 100000});
              let bodyHTML = await page.evaluate(() => document.body.innerHTML);
              let $ = cheerio.load(bodyHTML);
              //console.log(bodyHTML); // thie will print the entire html page

              if (urls[i].slice(0, 22) === "https://foundation.app") {
                console.log("https://foundation.app");
                image_url = $('.fullscreen > img').attr('src');
                image_title = $('.fullscreen > img').attr('alt');
                if (image_url === undefined || image_title === undefined) {
                  console.log('failed to find image at', urls[i]);
                } else {
                  console.log('successfully found something at', urls[i])
                  image_urls.push(image_url)
                  image_titles.push(image_title)
                }
              }

              // rarible not working
              else if (urls[i].slice(0, 19) === "https://rarible.com") {
                console.log("https://rarible.com");
                image_url = $('.sc-bdvvtL sc-gsDKAQ sc-jNHqnW ieSfBq bMYxVD > img').attr('src');
                image_title = $('');
                if (image_url === undefined) {
                  console.log('failed to find image at', urls[i]);
                } else {
                  console.log('successfully found something at', urls[i])
                  image_urls.push(image_url)
                  image_titles.push(image_title)
                }
              }
              else if (urls[i].slice(0, 23) === "https://makersplace.com") {
                console.log("https:/makersplace.com");
                image_url = $('.image-wrp > img').attr('src');
                image_title = $('#digital_media_title').text();
                if (image_url === undefined) {
                  console.log('failed to find image at', urls[i]);
                } else {
                  console.log('successfully found something at', urls[i])
                  image_urls.push(image_url)
                  image_titles.push(image_title)
                }
              }

              // mintable not working
              else if (urls[i].slice(0, 20) === "https://mintable.app") {
                console.log("https://mintable.app");
                // Image_container__zulTR MediaGallery_previewImgCard__4WZRP
                image_url = $(".Image_overlay__1+3kG > img").attr('src');
                image_title = $('');
                if (image_url === undefined) {
                  console.log('failed to find image at', urls[i]);
                } else {
                  console.log('successfully found something at', urls[i])
                  image_urls.push(image_url)
                  image_titles.push(image_title)
                }
              }
              else if (urls[i].slice(0, 22) === "https://knownorigin.io") {
                console.log("https://knownorigin.io");
                image_url = $('.tile > div > div > div > div > section > figure > div > img').attr('src');
                image_title = $('.is-size-3-mobile:last').text();
                if (image_url === undefined) {
                  console.log('failed to find image at', urls[i]);
                } else {
                  console.log('successfully found something at', urls[i])
                  image_title = image_title.replace(':', '-'); // files can't have ":" in them, need to do more robust error catching for titles
                  image_urls.push(image_url)
                  image_titles.push(image_title)
                }
              }
              else if (urls[i].slice(0, 18) === "https://opensea.io") {
                console.log("https://opensea.io");
                image_url = $('.AssetMedia--img').attr('src');
                image_title = $('.item--title').attr('title');
                if (image_url === undefined) {
                  console.log('failed to find image at', urls[i]);
                } else {
                  console.log('successfully found something at', urls[i])
                  image_title = image_title.replace(':', '-'); // files can't have ":" in them, need to do more robust error catching for titles
                  image_title = image_title.replace(':', '-'); // files can't have ":" in them, need to do more robust error catching for titles
                  image_title = image_title.replace('@', ''); // files can't have "@" in them, need to do more robust error catching for titles
                  console.log(image_title);
                  image_urls.push(image_url)
                  image_titles.push(image_title)
                }
              }
              else {
                console.log('failed to load ' + urls[i]);
              }

            } catch(err) {
                console.log(err);
            }
      }

        await browser.close();
        console.log("\nbrowser closed");

        // printing the gathered image source urls to check if they're for the right image
        console.log("image urls and titles:");
        for (let i = 0; i < image_urls.length; i++) {
          console.log(image_urls[i]);
          console.log(image_titles[i]);
          grab_image(image_urls[i], image_titles[i]);
        }
  })();
}

webs(browser_test_urls);