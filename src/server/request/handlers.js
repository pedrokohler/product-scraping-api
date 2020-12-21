const { getProductData } = require("../../domain/aggregate");

const lastTimeRequestedCache = new Map();

const handleProductRequest = async (req, res) => {
  const url = decodeURIComponent(req.params.url);
  const product = await getProductData(lastTimeRequestedCache)(url);
  return res.json(product);
};

module.exports = {
  handleProductRequest,
};
