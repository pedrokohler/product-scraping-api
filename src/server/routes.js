const express = require("express");
const { handleProductRequest } = require("./request/handlers");

const router = express.Router();

router.use(express.json());
router.get("/product/:url", handleProductRequest);

module.exports = router;
