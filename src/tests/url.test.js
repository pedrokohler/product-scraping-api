const { getStoreFromUrl } = require("../helpers/url");

describe("URL HELPERS TEST", () => {
  it("Should parse store from a url with www", () => {
    const url = "https://www.myexamplestore.com";
    expect(getStoreFromUrl(url)).toBe("myexamplestore");
  });
  it("Should parse store from a url without", () => {
    const url = "https://myexamplestore.com";
    expect(getStoreFromUrl(url)).toBe("myexamplestore");
  });
});
