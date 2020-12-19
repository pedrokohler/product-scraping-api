const scrapePage = require("../services/scraping/core");
const { getStoreFromUrl } = require("../helpers/url");
const Product = require("../models/product");

const MILLISECONDS_PER_SECOND = 1000;
const SECONDS_BEFORE_EXPIRING = 3600;
const DATA_EXPIRATION_TIME_LIMIT = SECONDS_BEFORE_EXPIRING * MILLISECONDS_PER_SECOND;

const lastTimeRequestedCache = new Map();

const shouldRefreshData = (url) => (
  lastTimeRequestedCache.has(url)
    ? Date.now() - lastTimeRequestedCache.get(url) > DATA_EXPIRATION_TIME_LIMIT
    : true
);

const persistProduct = async (url, product, tries = 0) => {
  try {
    await Product.findOneAndUpdate({ _id: url }, product, { upsert: true });
    lastTimeRequestedCache.set(url, Date.now());
  } catch (e) {
    const MAX_AMOUNT_OF_ATTEMPTS = 10;
    if (tries < MAX_AMOUNT_OF_ATTEMPTS) {
      setTimeout(() => persistProduct(url, product, tries + 1), 200);
    } else {
      console.error(`Failed to persist product ${url} after ${tries} attempts.\n\n\t${e.message}`);
    }
  }
};

const getRefreshedProduct = async (url) => {
  const storeName = getStoreFromUrl(url);
  const product = await scrapePage(url, storeName);
  return product;
};

const getProductData = async (url) => {
  if (shouldRefreshData(url)) {
    const product = await getRefreshedProduct(url);
    persistProduct(url, product);
    return product;
  }

  const product = await Product.findById(url);
  return product;
};

const handleProductRequest = async (req, res) => {
  const url = decodeURIComponent(req.params.url);
  const product = await getProductData(url);
  return res.json(product);
};

module.exports = {
  handleProductRequest,
};
