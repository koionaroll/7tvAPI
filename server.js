const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
const port = process.env.PORT;

// middleware parses request body as JSON, Need this for access to req.body for posts
app.use(express.json());
app.use(express.static("public"));
app.use(cors());

app.get(`/`, (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`Express listening on port ${port}`);
});

//-------------

const scraper = require("./utils/scraper");

app.set("view engine", "pug");

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
