// i call them from mongoose
const { Schema, model } = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");
const mongoose = require("mongoose");

const ShopSchema = Schema(
  {
    name: {
      type: String,
    },
    slug: String,
    image: { type: String },
    products: [
      {
        // to link them
        type: Schema.Types.ObjectId,
        // اسم المودل
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

ShopSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });

module.exports = mongoose.model("Shop", ShopSchema);
