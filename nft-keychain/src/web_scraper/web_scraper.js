const axios = require('axios');
const cheerio = require('cheerio');
const sizeOf = require('image-size');
const puppeteer = require('puppeteer');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());
const jimp = require('jimp');
const fs = require('fs');


const express = require('express');
const cors = require('cors');
const rateLimit = require("express-rate-limit")

const app = express();
app.use(cors({
    credentials: true,
  }));

const limiter = rateLimit({
  max: 1
});
app.use(limiter);
// limits 1 request at a time
// prevents every button press calling the web scraper before the button has functionality

const port = 3001; // port that web_scraper listens on, needs to be different from db port

app.get('/web_scraper/:urlInput/:titleInput', (req, res) => {
  console.log('req:', req.params.urlInput, req.params.titleInput);

  console.log('web scraper starting');
  web_scraper(req.params.urlInput, req.params.titleInput)
  console.log('after web scraper call');

  res.send(t);
})

app.listen(port, function(err) {
  if(err){
     console.log(err);
     } else {
     console.log("web scraper listening on:", port);
  }
});

async function remove_image(image) {
  fs.stat('./temp_images/' + image, function (err, stats) {
    if (err) {
      return console.error(err);
  }
  fs.unlink('./temp_images/' + image,function(err){
    if(err) {
      return console.log(err);
    }
    // console.log(image, 'deleted from temp images');
  });  
  });
}

async function resize_image(image_file) {
  // finding all the files that need to be resized
  // const image_files = fs.readdirSync("./temp_images/");

  // for (let i = 0; i < image_files.length; i++) {
    // if (image_files[i] === ".gitignore") {
    //   i++;
    // }
    let image_dimensions = sizeOf("./temp_images/" + image_file)
    
    let m = Math.max(image_dimensions.width, image_dimensions.height) / 240;
    let newW = Math.floor(image_dimensions.width/m);
    let newH = Math.floor(image_dimensions.height/m);

    if (newW < 240) {
      newW = 240;
    }
    if (newH < 240) {
      newH = 240;
    }
    
    let image = await jimp.read("./temp_images/" + image_file);
    image.resize(newW, newH);
    // await image.quality(100);
    await image.writeAsync("./images/" + image_file);
  // }
}

async function grab_image(url, title) {
  const file_path = "./temp_images/" + title + ".png";

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });

  return new Promise((resolve, reject) => {
    response.data.pipe(fs.createWriteStream(file_path))
                .on('error', reject)
                .on('error', () => console.log('error downloading image'))
                .once('close', () => resolve(file_path));
  });
}

function web_scraper(url_input, title_input) {
  console.log('in web scraper with url:', url_input);
  let image_url;
  let image_title = title_input;

  (async () => {
      const browser = await puppeteer.launch({
          args: ['--user-agent=<user_agent_string>',]
      }).catch((err) => {
          console.log('launching browser err:', err);
      }).then(
          console.log('launching browser')
      );


      const page = await browser.newPage()
      .catch((err) => {
          console.log('new page err:', err);
      }).then(
          console.log('a page opens')
      );
      
      try {
          console.log('loading:', url_input);

          await page.goto(url_input, {timeout: 100000});
          let bodyHTML = await page.evaluate(() => document.body.innerHTML);

          console.log('loading cheerio');

          let $ = cheerio.load(bodyHTML);

          if (url_input.slice(0, 22) === "https://foundation.app") {
              image_url = $('.fullscreen > img').attr('src');  // scraping for the nft url
              // image_title = $('.fullscreen > img').attr('alt');  // scraping for the nft title
              if (image_url === undefined) {  // if a url cannot be found we ignore it and send an error message so we know what went wrong
                console.log('failed to find image at', url_input);
              } else {
                console.log('successfully found something at', url_input)
              }
            }
          
            // rarible not working
            else if (url_input.slice(0, 19) === "https://rarible.com") {
              image_url = $('.sc-bdvvtL sc-gsDKAQ sc-jNHqnW ieSfBq bMYxVD > img').attr('src');
              // image_title = $('');
              if (image_url === undefined) {
                console.log('failed to find image at', url_input);
              } else {
                console.log('successfully found something at', url_input)
              }
            }

            else if (url_input.slice(0, 23) === "https://makersplace.com") {
              image_url = $('.image-wrp > img').attr('src');
              // image_title = $('#digital_media_title').text();
              if (image_url === undefined) {
                console.log('failed to find image at', url_input);
              } else {
                console.log('successfully found something at', url_input)
              }
            }

            // mintable not working
            else if (url_input.slice(0, 20) === "https://mintable.app") {
              // Image_container__zulTR MediaGallery_previewImgCard__4WZRP
              image_url = $(".Image_overlay__1+3kG > img").attr('src');
              // image_title = $('');
              if (image_url === undefined) {
                console.log('failed to find image at', url_input);
              } else {
                console.log('successfully found something at', url_input)
              }
            }

            else if (url_input.slice(0, 22) === "https://knownorigin.io") {
              image_url = $('.tile > div > div > div > div > section > figure > div > img').attr('src');
              // image_title = $('.is-size-3-mobile:last').text();
              if (image_url === undefined) {
                console.log('failed to find image at', url_input);
              } else {
                console.log('successfully found something at', url_input)
              }
            }

            else if (url_input.slice(0, 18) === "https://opensea.io") {
              image_url = $('.Image--image').attr('src');
              // image_url = $('.AssetMedia--img').attr('src'); 
              // image_title = $('.item--title').attr('title');
              if (image_url === undefined) {
                console.log('failed to find image at', url_input);
              } else {
                console.log('successfully found something at', url_input)
              }
            }

            else {
              console.log('failed to load', url_input, 'unsupported website');
            }
      } catch(err) {
          console.log(err);
      }

      await browser.close();
      console.log("\nbrowser closed");
      
      // files can't have some characters in them
      // let pieces = image_title.split(':');
      // image_title = pieces.join('');
      // pieces = image_title.split('@');
      // image_title = pieces.join('');
      // pieces = image_title.split('.');
      // image_title = pieces.join('');

      await grab_image(image_url, image_title); // grabs full size image and places it in temp_images
      await resize_image(image_title + ".png"); // resizes and saves image in images
      await remove_image(image_title + ".png"); // deletes the full size image from temp_images
  })();
}


// please leave this until the web scraper is running well
/*
let browser_test_url = ["https://opensea.io/assets/matic/0x28009881f0ffe85c90725b8b02be55773647c64a/20"]
let browser_test_urls = ["https://foundation.app/@spasi___sohrani/GPSG/15",
                          "https://rarible.com/token/0x57a204aa1042f6e66dd7730813f4024114d74f37:1700", // not working
                          "https://makersplace.com/bluepolescapital/a-spark-of-an-idea-1-of-1-167320/",
                          "https://mintable.app/COLLECTIBLES/item/Happy-Pugs-8-MINT/ULKEheYYY7J1F3h", // not working
                          "https://knownorigin.io/gallery/10817000-iv-xx",
                          "https://opensea.io/assets/matic/0x28009881f0ffe85c90725b8b02be55773647c64a/20",
                          "https://knownorigin.io/gallery/11033000-abstract-maiden",
                          "https://knownorigin.io/gallery/11054000-realm-electric-me",
                          "https://makersplace.com/astraultra/path-4b-1-of-1-376667/",
                          "https://foundation.app/@nathanaelbillings/wavy/2",
                          "https://opensea.io/assets/0xd25508dab0b8fa88e783ee065d8f78b10745dd21/3",
                        ];


async function resize_images() {
  const image_files = fs.readdirSync("./images/");

  for (let i = 0; i < image_files.length; i++) {
    if (image_files[i] === ".gitignore") {
      i++;
    }
    let image_dimensions = sizeOf("./images/" + image_files[i])
    
    let m = Math.max(image_dimensions.width, image_dimensions.height) / 240;
    let newW = Math.floor(image_dimensions.width/m);
    let newH = Math.floor(image_dimensions.height/m);
    
    let image = await jimp.read("./images/" + image_files[i]);
    image.resize(newW, newH);
    // await image.quality(100);
    await image.writeAsync("./images/" + image_files[i]);
  }
}
                          
async function grab_image(url, title) {
  const file_path = "./images/" + title + ".png";

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });

  return new Promise((resolve, reject) => {
    response.data.pipe(fs.createWriteStream(file_path))
                .on('error', reject)
                .on('error', () => console.log('error downloading image'))
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
              // console.log(bodyHTML); // this will print the entire html page

              // this chain of conditionals routes the web scraper to different websites
              if (urls[i].slice(0, 22) === "https://foundation.app") {
                console.log("https://foundation.app");  // to test if requests are being sent to the right website
                image_url = $('.fullscreen > img').attr('src');  // scraping for the nft url
                image_title = $('.fullscreen > img').attr('alt');  // scraping for the nft title
                if (image_url === undefined) {  // if a url cannot be found we ignore it and send an error message so we know what went wrong
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
                  image_title = image_title.replace(':', '-'); // files can't have ":" in them, need to do more robust error catching for titles
                  image_title = image_title.replace('.', '-'); // files can't have ":" in them, need to do more robust error catching for titles
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
                image_url = $('.Image--image').attr('src');
                // image_url = $('.AssetMedia--img').attr('src');
                image_title = $('.item--title').attr('title');
                if (image_url === undefined) {
                  console.log('failed to find image at', urls[i]);
                } else {
                  console.log('successfully found something at', urls[i])
                  image_title = image_title.replace(':', '-'); // files can't have ":" in them, need to do more robust error catching for titles
                  image_title = image_title.replace(':', '-'); // files can't have ":" in them, need to do more robust error catching for titles
                  image_title = image_title.replace('@', ''); // files can't have "@" in them, need to do more robust error catching for titles
                  image_title = image_title.replace('.', '-'); // files can't have ":" in them, need to do more robust error catching for titles
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
          await grab_image(image_urls[i], image_titles[i]);
        }
        await resize_images();
  })();
}

webs(browser_test_urls);
*/