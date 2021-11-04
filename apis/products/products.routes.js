const express = require("express");
const { shopCreate } = require("./products.controllers.js");
const upload = require("../../middleware/multer");
const { productListFetch, fetchProduct } = require("./products.controllers.js");

// Create a mini express application
const router = express.Router();

// Param Middleware
router.param("productId", async (req, res, next, productId) => {
  const product = await fetchProduct(productId, next);
  if (product) {
    req.product = product;
    next();
  } else {
    next({ status: 404, message: "Product Not Found!" });
  }
});
// one pic ( image) same spelling in your model Product بيانات الصوره يبيها ملتر على صورة<<req.file

router.get("/", productListFetch);

module.exports = router;
