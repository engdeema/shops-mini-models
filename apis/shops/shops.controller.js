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
    // هذا اللي عليه البوبيوليت برودكت ،، داخل المودل شوب
    const shops = await Shop.find().populate("products");
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
    req.body.owner = req.user._id;
    const newShop = await Shop.create(req.body);
    const populated = await newShop.populate({
      path: "owner", // نفس سبلنق مودا يوزر
      select: "-password", // بدون الباسوورد
    });
    //كل مره اسوي برودكت يديد اقول حق الشوب
    // اهيا تاخذ آي دي والشي اللي بغيره
    // ومابي اغير الأراي بس اسوي بوش حق شي يديد
    //   await Product.findByIdAndUpdate(
    //     { _id: req.params.productId },
    //     { $push: { products: newProduct._id } }
    //   );
    return res.status(201).json(newShop);
  } catch (error) {
    next(error);
  }
};

exports.productCreate = async (req, res, next) => {
  try {
    if (req.user._id.toString() !== req.shop.owner._id.toString()) {
      return next({
        status: 401,
        message: "you are not the owner})",
      });
    }
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
    }
    req.body.shop = req.params.shopId;
    const newProduct = await Product.create(req.body);
    await Shop.findByIdAndUpdate(req.shop, {
      $push: { products: newProduct._id },
    });
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
