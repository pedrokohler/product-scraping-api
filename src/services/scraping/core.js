const cheerio = require("cheerio");
const axios = require("axios").default;
const Product = require("../../domain/models/product");

const fetchHtml = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

const extractInformation = (selector, queries) => {
  const {
    titleQuery,
    imageQuery,
    priceQuery,
    descriptionQuery,
  } = queries;

  return {
    title: titleQuery(selector),
    image: imageQuery(selector),
    price: priceQuery(selector),
    description: descriptionQuery(selector),
  };
};

const scrapePage = (queryMap) => async (url, storeName) => {
  try {
    const html = await fetchHtml(url);
    const selector = cheerio.load(html);
    const productInformation = extractInformation(selector("body"), queryMap.get(storeName));
    const product = new Product({ _id: url, ...productInformation, url });
    return product;
  } catch (e) {
    console.error(`ERROR: An error occurred while trying to fetch the URL: ${url}`);
    console.error(e.message);
    return { error: e.message };
  }
};

module.exports = {
  extractInformation,
  scrapePage,
};
