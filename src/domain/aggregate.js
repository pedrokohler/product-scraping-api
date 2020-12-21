const { scrapePage } = require("../services/scraping/core");
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

const persistProduct = async ({
  url, product, cache,
}) => {
  try {
    await Product.findOneAndUpdate({ _id: url }, product, { upsert: true });
    cache.set(url, Date.now());
  } catch (e) {
    console.error(`Failed to persist product ${url}:\n\n\t${e.message}`);
  }
};

const getRefreshedProduct = async (url) => {
  const storeName = getStoreFromUrl(url);
  const product = await scrapePage(queryMap)(url, storeName);
  return product;
};

const getProductData = (cache) => async (url) => {
  if (shouldRefreshData(url, cache)) {
    const product = await getRefreshedProduct(url);
    persistProduct({ url, product, cache });
    return product;
  }

  const product = await Product.findById(url);
  return product;
};

module.exports = {
  persistProduct,
  shouldRefreshData,
  getProductData,
  DATA_EXPIRATION_TIME_LIMIT,
};
