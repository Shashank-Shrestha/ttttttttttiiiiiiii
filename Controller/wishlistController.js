const WishList = require("../Model/wishListModel");
const Validation = require("../Validation/wishlistValidation.js");

class WishListController {
  //Insert
  async addWishList(req, res) {
    const result = Validation.WISHLIST(req.body);

    if (result.error) {
      let error = result.error.details[0];
      res.status(422).json({
        success: false,
        status: 422,
        message: error.message,
      });
    } else {
      try {
        // save the new WishList in db
        let newWishList = new WishList(result.value);
        let wishList = await newWishList.save();
        res.status(201).json({
          success: true,
          message: "WishList added successfully!",
          wishList: wishList,
        });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    }
  }

  //deleteWishList
  async deleteWishList(req, res) {
    try {
      let id = req.params.id;
      let wish = await WishList.findById({ _id: id });
      if (!wish) {
        res.status(404).json({
          status: 404,
          success: false,
          message: "WishList Not Found",
        });
      }
      let wishList = await WishList.findByIdAndDelete({ _id: id });
      res.status(201).json({
        status: 201,
        success: true,
        message: "WishList deleted successfully!",
        wishList: wishList,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  //displayAll Product
  async showWishList(req, res) {
    try {
      let wishlist = await WishList.find().populate("productId");
      res.status(201).json({
        status: 201,
        success: true,
        message: "Wishlists displayed successfully!",
        wishlist: wishlist,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  //displayProduct(Single)
  async showSingleWishList(req, res) {
    try {
      // let id=req.params
      let wishList = await WishList.findById({ _id: req.params.id });
      res.status(201).json({
        status: 201,
        success: true,
        message: "Single wishList retrieved successfully!",
        wishList: wishList,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}
module.exports = WishListController;
