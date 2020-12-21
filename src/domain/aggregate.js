const { scrapePage } = require("../services/scraping");
const { queryMap } = require("../services/scraping/queries");
const { getStoreFromUrl } = require("../helpers/url");
const Product = require("./models/product");

const MILLISECONDS_PER_SECOND = 1000;
const SECONDS_BEFORE_EXPIRING = 3600;

const DATA_EXPIRATION_TIME_LIMIT = SECONDS_BEFORE_EXPIRING * MILLISECONDS_PER_SECOND;

const shouldRefreshData = (url, cache) => (
  cache.has(url)
    ? Date.now() - cache.get(url) > DATA_EXPIRATION_TIME_LIMIT
    : true
);

const pesistProductAsynchronously = async ({
  url, product, cache,
}) => {
  try {
    await Product.findOneAndUpdate({ url }, product, { upsert: true });
    cache.set(url, Date.now());
  } catch (e) {
    console.error(`Failed to persist product ${url}:\n\n\t${e.message}`);
  }
};

const getRefreshedProduct = async (url) => {
  const storeName = getStoreFromUrl(url);
  const product = await scrapePage(url, queryMap.get(storeName));
  return product;
};

const getProductData = async (cache, url) => {
  if (shouldRefreshData(url, cache)) {
    const product = await getRefreshedProduct(url);
    pesistProductAsynchronously({ url, product, cache });
    return product;
  }

  const product = await Product.findOne({ url });
  return product;
};

module.exports = {
  shouldRefreshData,
  getProductData,
  DATA_EXPIRATION_TIME_LIMIT,
};
