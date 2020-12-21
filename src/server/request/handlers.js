const { getProductData } = require("../../domain/aggregate");

const lastTimeRequestedCache = new Map();

const handleProductRequest = async (req, res) => {
  try {
    const url = decodeURIComponent(req.params.url);
    const product = await getProductData(lastTimeRequestedCache, url);
    return res.json(product);
  } catch (e) {
    console.error(e.message);
    return res.status(500).json({ error: e.message });
  }
};

module.exports = {
  handleProductRequest,
};
