const express = require("express");
const app = express();

const scrapePage = require('./services/scraping/core');
const { parseParamUrl } = require("./helpers/url");

app.use(express.json());

app.get("/product", async (req, res) => {
  const paramURL = decodeURIComponent(req.query.url);
  const { url, storeName } = parseParamUrl(paramURL);

  const product = await scrapePage(url, storeName);
  return res.json(product);
});

app.listen(3000);

module.exports = app;