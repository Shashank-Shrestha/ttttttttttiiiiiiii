const Category = require("../Model/CategoryModel");
const Validation = require("../Validation/CategoryValidation");
const ImageUpload = require("../middleware/imageUpload");

class CategoryController {
  //Insert
  async addCategory(req, res) {
    console.log(req.body);
    const result = Validation.CATEGORY({
      ...req.body,
      categoryImage: req.file.filename,
    });

    if (result.error) {
      let error = result.error.details[0];
      res.status(422).json({
        success: false,
        status: 422,
        message: error.message,
      });
    } else {
      try {
        // save the new Category in db
        let newCategory = new Category(result.value);
        let category = await newCategory.save();
        res.status(201).json({
          success: true,
          message: "Category added successfully!",
          category: category,
        });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    }
  }

  //displayAll Category
  async showCategory(req, res) {
    try {
      let category = await Category.find();
      res.status(201).json({
        status: 201,
        success: true,
        message: "Categorys displayed successfully!",
        categorys: category,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  //update
  async updateCategory(req, res) {
    const result = Validation.CATEGORY(req.body);
    console.log(req.body);

    if (result.error) {
      let error = result.error.details[0];
      res.status(422).json({
        success: false,
        status: 422,
        message: error.message,
      });
    } else {
      try {
        // save the new category in db
        const categoryId = req.params._id;
        let { categoryName } = result.value;
        let updateCategory = await Category.findOneAndUpdate(
          { _id: req.params._id },
          { categoryName },
          { new: true }
        );
        res.status(201).json({
          success: true,
          message: "Category updated successfully!",
          product: updateCategory,
        });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    }
  }

  //deleteCategory
  async deleteCategory(req, res) {
    try {
      let id = req.params.id;
      let cat = await Category.findById({ _id: id });
      if (!cat) {
        res.status(404).json({
          status: 404,
          success: false,
          message: "Category Not Found",
        });
      }
      let category = await Category.findByIdAndDelete({ _id: id });
      res.status(201).json({
        status: 201,
        success: true,
        message: "Category deleted successfully!",
        category: category,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  //displayCategory(Single)
  async showSingleCategory(req, res) {
    try {
      // let id=req.params
      let Category = await Category.findById({ _id: req.params.id });
      res.status(201).json({
        status: 201,
        success: true,
        message: "Single Category retrieved successfully!",
        Category: Category,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
  async uploadDisplayPicture(request, response) {
    try {
      ImageUpload(request, response, (error) => {
        if (error) {
          response.status(500).json({ error: error });
        } else {
          Category.findByIdAndUpdate(
            { _id: request.params.id },
            { $set: { CategoryImage: request.file.filename } },
            { new: true },
            (err, updatedCategory) => {
              if (err) {
                // console.log(err.message);
                response
                  .status(500)
                  .json({ success: false, error: err.message });
              } else {
                response.status(200).json({
                  success: true,
                  message: "Picture uploaded successfully !",
                  image: request.file.filename,
                  updatedCategory: updatedCategory,
                });
              }
            }
          );
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = CategoryController;
