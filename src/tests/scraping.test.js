const cheerio = require("cheerio");
const { extractInformation } = require("../services/scraping/core");
const {
  regularQuery,
  regularPriceQuery,
  regularImageQuery,
  amazonImageQuery,
} = require("../services/scraping/queries");

describe("SCRAPING SERVICE TESTS", () => {
  it("Should extract information according to queries", () => {
    const page = cheerio.load(
      `<h1 class="title">My title</h1>
      <span class="image">My image</span>
      <span class="price">My price</span>
      <span class="description">My description</span>
      `,
    ).html();

    const queries = {
      titleQuery: (selector) => selector.find(".title").text(),
      imageQuery: (selector) => selector.find(".image").text(),
      priceQuery: (selector) => selector.find(".price").text(),
      descriptionQuery: (selector) => selector.find(".description").text(),
    };

    const selector = cheerio.load(page);

    expect(extractInformation(selector("body"), queries)).toEqual({
      title: "My title",
      image: "My image",
      price: "My price",
      description: "My description",
    });
  });

  it("Regular query should return simple text", () => {
    const page = cheerio.load(
      "<h1 class=\"title\">My title</h1>",
    ).html();
    const selector = cheerio.load(page);
    const text = regularQuery(".title")(selector("body"));

    expect(text).toBe("My title");
  });

  it("Regular query should return text without extra spaces", () => {
    const page = cheerio.load(
      "<h1 class=\"title\">My                         title</h1>",
    ).html();
    const selector = cheerio.load(page);
    const text = regularQuery(".title")(selector("body"));

    expect(text).toBe("My title");
  });

  it("Regular image query should return image url", () => {
    const page = cheerio.load(
      "<img src=\"my-url\">",
    ).html();
    const selector = cheerio.load(page);
    const text = regularImageQuery("img")(selector("body"));

    expect(text).toBe("my-url");
  });

  it("Regular price query should numeric price without symbols", () => {
    const page = cheerio.load(
      "<span class=\"price\">R$58,21</span>",
    ).html();
    const selector = cheerio.load(page);
    const text = regularPriceQuery(".price")(selector("body"));

    expect(text).toBe(58.21);
  });

  it("Amazon image query should return the image url", () => {
    const page = cheerio.load(
      "<div id=\"imgTagWrapperId\"><img data-old-hires=\"my-url\"></div>",
    ).html();
    const selector = cheerio.load(page);
    const text = amazonImageQuery(selector("body"));

    expect(text).toBe("my-url");
  });
});
