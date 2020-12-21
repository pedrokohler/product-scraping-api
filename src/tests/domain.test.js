const { shouldRefreshData, DATA_EXPIRATION_TIME_LIMIT } = require("../domain/aggregate");
const Product = require("../domain/models/product");

describe("DOMAIN MODEL TEST", () => {
  it("Should create a product", () => {
    const payload = {
      title: "Produto",
      price: 8.2,
      description: "Um bom produto",
      image: "Url da imagem",
    };
    const product = new Product(payload);
    expect(product).toEqual(expect.objectContaining(payload));
  });
});

describe("DOMAIN AGGREGATE TEST", () => {
  describe("shouldRefreshData", () => {
    it("Should return true if no previous request with url", () => {
      const cache = new Map();
      const url = "https://firsttimer.com";
      expect(shouldRefreshData(url, cache)).toBeTruthy();
    });

    it("Should return false if url was just included in cache", () => {
      const cache = new Map();
      const url = "https://example.com";
      cache.set(url, Date.now());

      expect(shouldRefreshData(url, cache)).toBeFalsy();
    });

    it("Should return false until expiration time is reached", () => {
      const cache = new Map();
      const url = "https://example.com";
      const beforeExpiration = Date.now() - DATA_EXPIRATION_TIME_LIMIT + 1000;
      cache.set(url, beforeExpiration);

      expect(shouldRefreshData(url, cache)).toBeFalsy();
    });

    it("Should return true after expiration time is reached", () => {
      const cache = new Map();
      const url = "https://example.com";
      const afterExpiration = Date.now() - DATA_EXPIRATION_TIME_LIMIT - 1000;
      cache.set(url, afterExpiration);

      expect(shouldRefreshData(url, cache)).toBeTruthy();
    });
  });
});
