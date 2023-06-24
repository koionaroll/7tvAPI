const puppeteer = require("puppeteer");

const scrapedEmote = async (emoteIn) => {
  // what emote the user inputs
  console.log("Emote searched for is: ", emoteIn);

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  page.setDefaultNavigationTimeout(60 * 1000);

  await page.goto(`https://7tv.app/emotes?page=1&query=${emoteIn}`);

  await page.waitForSelector(".img-wrapper:first-child");

  let scrappedWrapper = await page.$(".img-wrapper:first-child");
  let scrapedData = await scrappedWrapper.$eval("img", (img) => img.src);

  await browser.close();
  return scrapedData;
};
module.exports.scrapedEmote = scrapedEmote;
