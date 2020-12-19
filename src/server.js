const express = require("express");

const app = express();

const scrapePage = require("./services/scraping/core");
const { parseParamUrl } = require("./helpers/url");
const Product = require("./models/product");

app.use(express.json());

const lastTimeRequestedCache = new Map();

app.get("/product/:url", async (req, res) => {
  const paramURL = decodeURIComponent(req.params.url);
  const { url, storeName } = parseParamUrl(paramURL);

  if (Date.now() - lastTimeRequestedCache.get(url) < 3600 * 1000) {
    const product = await Product.findById(url);
    return res.json(product);
  }

  const product = await scrapePage(url, storeName);
  await Product.findOneAndUpdate({ _id: url }, product, { upsert: true });
  lastTimeRequestedCache.set(url, Date.now());
  return res.json(product);
});

app.listen(3000);

module.exports = app;
