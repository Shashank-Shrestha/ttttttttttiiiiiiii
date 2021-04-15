const mongoose = require("mongoose");

const SCHEMA = mongoose.Schema;

const PRODUCTSCHEMA = new SCHEMA({
  productName: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
  },
  productPrice: {
    type: Number,
    required: [true, "Product price is required"],
    trim: true,
  },
  productDescription: {
    type: String,
    required: [true, "Product description is required"],
    trim: true,
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    trim: true,
    enum: ["Water Pump", "Hand Tool", "Power Tool", "Gardening Tool"],
  },
  productImage: {
    type: String,
    default: "noimage.jpg",
    trim: true,
  },
  // productRating: [
  //   {
  //     userId: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "user",
  //       required: true,
  //     },

  //     rating: {
  //       type: Number,
  //       required: true,
  //     },
  //   },
  // ],

  // hotDeals: {
  //   type: Boolean,
  //   default: false,
  // },
});

const PRODUCT = mongoose.model("product", PRODUCTSCHEMA);
module.exports = PRODUCT;
