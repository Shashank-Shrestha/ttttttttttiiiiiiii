const mongoose = require("mongoose");
const SCHEMA = mongoose.Schema;

const WISHLISTSCHEMA = new SCHEMA({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
});
const WISHLIST = mongoose.model("wishlist", WISHLISTSCHEMA);
module.exports = WISHLIST;
