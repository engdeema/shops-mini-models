const Shop = require("../../db/models/Shops");
const Product = require("../../db/models/Product");

exports.fetchShop = async (shopId, next) => {
  try {
    const shop = await Shop.findById(shopId);
    return shop;
  } catch (error) {
    next(error);
  }
};

exports.shopsListFetch = async (req, res, next) => {
  try {
    const shops = await Shop.find().populate("product");
    return res.json(shops);
  } catch (error) {
    next(error);
    // return res.status(500).json({ message: error.message });
  }
};

exports.shopCreate = async (req, res, next) => {
  try {
    //i called the product from the model and give it an Id
    req.body.product = req.params.productId;
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
    }
    const newProduct = await Product.create(req.body);
    //كل مره اسوي برودكت يديد اقول حق الشوب
    // اهيا تاخذ آي دي والشي اللي بغيره
    // ومابي اغير الأراي بس اسوي بوش حق شي يديد
    await Product.findByIdAndUpdate(
      { _id: req.params.productId },
      { $push: { products: newProduct._id } }
    );
    return res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};
exports.productCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
    }
    const newProduct = await Product.create(req.body);
    return res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

// Create
// Status: 201
// Content: newly created item

// Retrieve (List && Detail)
// Status: 200
// Content: Requested data

// Update
// Status: 200
// Content: updated item

// Delete
// Status: 204
// Content: No Content
