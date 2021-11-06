const express = require("express");
const passport = require("passport");
const upload = require("../../middleware/multer");
const {
  shopsListFetch,
  shopCreate,
  productCreate,
  fetchShop,
  // shopDelete,
  // shopDetail,
} = require("./shops.controller");

// Create a mini express application
const router = express.Router();

// Param Middleware
router.param("shopId", async (req, res, next, shopId) => {
  const shop = await fetchShop(shopId, next);
  if (shop) {
    req.shop = shop;
    next();
  } else {
    next({ status: 404, message: "shop Not Found!" });
  }
});
// one pic ( image) same spelling in your model Product بيانات الصوره يبيها ملتر على صورة<<req.file
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  shopCreate
);
router.post(
  "/:shopId/products",
  passport.authenticate("jwt", { session: false }),

  upload.single("image"),
  productCreate
);
router.get("/", shopsListFetch);
// router.post("/:shopId", shopDetail);
// router.delete("/:shopId", shopDelete);

module.exports = router;
