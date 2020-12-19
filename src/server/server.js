const express = require("express");
const getRouter = require("./routes");
const { handleProductRequest } = require("./handlers");

const app = express();

const router = getRouter(handleProductRequest);

app.use(router);

app.listen(3000);

module.exports = app;
