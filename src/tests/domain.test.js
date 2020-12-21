const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const options = require("../services/db/options");
const { shouldRefreshData, DATA_EXPIRATION_TIME_LIMIT } = require("../domain/aggregate");
const Product = require("../domain/models/product");

let mongoServer;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, options);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

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
  it("Should refresh data if no previous request with url", () => {
    const cache = new Map();
    const url = "https://firsttimer.com";
    expect(shouldRefreshData(url, cache)).toBeTruthy();
  });

  it("Shouldn't refresh data if url was just included in cache", () => {
    const cache = new Map();
    const url = "https://example.com";
    cache.set(url, Date.now());

    expect(shouldRefreshData(url, cache)).toBeFalsy();
  });

  it("Shouldn't refresh data until expiration time is reached", () => {
    const cache = new Map();
    const url = "https://example.com";
    const beforeExpiration = Date.now() - DATA_EXPIRATION_TIME_LIMIT + 1000;
    cache.set(url, beforeExpiration);

    expect(shouldRefreshData(url, cache)).toBeFalsy();
  });

  it("Should refresh data aftar expiration time is reached", () => {
    const cache = new Map();
    const url = "https://example.com";
    const afterExpiration = Date.now() - DATA_EXPIRATION_TIME_LIMIT - 1000;
    cache.set(url, afterExpiration);

    expect(shouldRefreshData(url, cache)).toBeTruthy();
  });
});
