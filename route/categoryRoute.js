const express = require("express");
const CategoryController = require("../Controller/categoryController");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const upload = require("../middleware/imageUpload");

const APIROUTER = express.Router();

const Category = new CategoryController();

// auth requests
APIROUTER.post(
  "/insert",
  auth,
  isAdmin,
  upload.single("categoryImage"),
  Category.addCategory
);
APIROUTER.put("/upload/:id", auth, isAdmin, Category.uploadDisplayPicture);
APIROUTER.put("/update/:_id", auth, isAdmin, Category.updateCategory);
APIROUTER.get("/showcategory", Category.showCategory);
APIROUTER.get("/showSingle/:id", Category.showSingleCategory);
APIROUTER.delete("/delete/:id", auth, isAdmin, Category.deleteCategory);

module.exports = APIROUTER;
