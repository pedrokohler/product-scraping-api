const regularQuery = (query) => (selector) => selector
  .find(query)
  .text()
  .replace(/[\n\t]{1,}/g, '\n')
  .replace(/[\s]{1,}/g, ' ')
  .trim();

const regularPriceQuery = (query) => (selector) => parseFloat(
  regularQuery(query)(selector)
  .replace("R$", "")
  .replace('.', "")
  .replace(",", ".")
);

const regularImageQuery = (query) => (selector) => selector
  .find(query)
  .attr("src");

const amazonImageQuery = (selector) => selector
  .find("#imgTagWrapperId img")
  .attr("data-old-hires");

const queryMap = new Map([
  ["magazineluiza", {
    titleQuery: regularQuery(".header-product__title"),
    imageQuery: regularImageQuery(".showcase-product__big-img"),
    priceQuery: regularPriceQuery(".price-template__text"),
    descriptionQuery: regularQuery(".description__container-text"),
  }],
  ["zattini", {
    titleQuery: regularQuery("h1[data-productname]"),
    imageQuery: regularImageQuery(".photo-figure img"),
    priceQuery: regularPriceQuery("#buy-box div.price-box div.default-price span strong"),
    descriptionQuery: regularQuery("p.description")
  }],
  ["amazon", {
    titleQuery: regularQuery("#productTitle"),
    imageQuery: amazonImageQuery,
    priceQuery: regularPriceQuery("#priceblock_ourprice"),
    descriptionQuery: regularQuery("#feature-bullets ul")
  }]
]);

module.exports = queryMap;