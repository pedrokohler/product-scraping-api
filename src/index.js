const scrapePage = require('./services/scraping/core');
const { parseParamUrl } = require("./helpers/url");
const paramURL = process.argv[2];


(async () => {
  const { url, storeName, productId } = parseParamUrl(paramURL);
  const product = await scrapePage(url, storeName);
  console.log({ id: productId, ...product, url });
})();