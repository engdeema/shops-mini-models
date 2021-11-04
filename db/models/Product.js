const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: String,
    image: { type: String },
    price: {
      type: Number,
      default: 5,
    },
    description: String,
    color: String,
    quantity: {
      type: Number,
      min: 0,
    },
    // قاعده اسوي ريفرنس حق المودل الكبير
    shops: {
      type: mongoose.Schema.Types.ObjectId,
      // لازم نفس اسم المودل بالضبط
      ref: "Shops",
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });

module.exports = mongoose.model("Product", ProductSchema);
