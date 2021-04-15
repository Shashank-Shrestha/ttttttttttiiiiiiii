const mongoose = require("mongoose");

const SCHEMA = mongoose.Schema;

const CATEGORYSCHEMA = new SCHEMA({
  categoryName: {
    type: String,
    required: [true, "Category name is required"],
    trim: true,
  },
  categoryImage: {
    type: String,
    default: "noimage.jpg",
    trim: true,
  },
});

const Category = mongoose.model("Category", CATEGORYSCHEMA);
module.exports = Category;
