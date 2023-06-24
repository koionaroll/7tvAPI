const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
const port = process.env.PORT;

app.use(cors());

app.listen(port, () => {
  console.log(`Express listening on port ${port}`);
});

const scraper = require("./utils/scraper");

app.get("/:emote", (req, res) => {
  const emoteIn = req.params.emote;
  const emoteOut = new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject("Scraping timed out");
    }, 2000); // Adjust the timeout duration as per your requirement (in milliseconds)

    scraper
      .scrapedEmote(emoteIn)
      .then((data) => {
        clearTimeout(timeout);
        if (data) {
          resolve(data);
        } else {
          reject("No data found for the specified emote");
        }
      })
      .catch((err) => {
        clearTimeout(timeout);
        reject("Scraping failed: " + err);
      });
  });

  Promise.all([emoteOut])
    .then((data) => {
      res.send(data);
      console.log("Scraped img/gif:", data);
    })
    .catch((err) => res.status(500).send(err));
});






