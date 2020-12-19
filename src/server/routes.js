const express = require("express");

const getRouter = (handleProductRequest) => {
  const router = express.Router();

  router.use(express.json());
  router.get("/product/:url", handleProductRequest);

  return router;
};

module.exports = getRouter;
