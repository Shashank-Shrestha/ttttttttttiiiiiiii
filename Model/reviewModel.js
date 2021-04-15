const mongoose = require("mongoose");
const SCHEMA = mongoose.Schema;

const REVIEWSCHEMA = new SCHEMA({
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
  reviewText: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const REVIEW = mongoose.model("review", REVIEWSCHEMA);
module.exports = REVIEW;
