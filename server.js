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
  const emote = req.params.emote;
  const emotes = new Promise((resolve, reject) => {
    scraper
      .scrapedEmote(emote)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => reject("Scraped failed"));
  });
  Promise.all([emotes])
    .then((data) => {
      res.send(data)
      console.log("Scrapped img/gif: ", data);
    })
    .catch((err) => res.status(500).send(err));
});
