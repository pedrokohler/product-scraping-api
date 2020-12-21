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

const getSelector = async (url) => {
  const html = await fetchHtml(url);
  const selector = cheerio.load(html);
  return selector("body");
};

const scrapePage = async (url, queries) => {
  try {
    const selector = await getSelector(url);
    const productInformation = extractInformation(selector, queries);
    const product = new Product({ ...productInformation, url });
    return product;
  } catch (e) {
    console.error(`ERROR: An error occurred while trying to scrape the URL: ${url}`);
    console.error(e.message);
    return { error: e.message };
  }
};

module.exports = {
  extractInformation,
  scrapePage,
};
