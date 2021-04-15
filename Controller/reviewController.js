const Review = require("../Model/reviewModel");
const Validation = require("../Validation/reviewValidation.js");

class ReviewController {
  //Insert
  async addReview(req, res) {
    const result = Validation.REVIEW(req.body);

    // if (result.error) {
    //   let error = result.error.details[0];
    //   res.status(422).json({
    //     success: false,
    //     status: 422,
    //     message: error.message,
    //   });
    // } else {
    try {
      // save the new Review in db
      let newReview = new Review({
        productId: req.body.productId,
        userId: req.authUser._id,
        review: req.body.review,
      });
      let review = await newReview.save();
      res.status(201).json({
        success: true,
        message: "Review added successfully!",
        review: review,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
    // }
  }

  //deleteReview
  async deleteReview(req, res) {
    try {
      let id = req.params.id;
      let reviews = await Review.findById({ _id: id });
      if (!reviews) {
        res.status(404).json({
          status: 404,
          success: false,
          message: "Review Not Found",
        });
      }
      let review = await Review.findByIdAndDelete({ _id: id });
      res.status(201).json({
        status: 201,
        success: true,
        message: "Review deleted successfully!",
        review: review,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  //displayAll Review
  async showReview(req, res) {
    try {
      let review = await Review.find().populate("productId");
      res.status(201).json({
        status: 201,
        success: true,
        message: "Reviews displayed successfully!",
        review: review,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  //displayProduct(Single)
  async showSingleReview(req, res) {
    try {
      // let id=req.params
      let review = await Review.find({ productId: req.params.id }).populate(
        "userId"
      );
      res.status(201).json({
        status: 201,
        success: true,
        message: "Single review retrieved successfully!",
        review: review,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  //update
  async updateReview(req, res) {
    const result = Validation.REVIEW(req.body);

    if (result.error) {
      let error = result.error.details[0];
      res.status(422).json({
        success: false,
        status: 422,
        message: error.message,
      });
    } else {
      try {
        // save the new user in db
        const reviewId = req.params.id;
        let { review } = result.value;
        let updateReview = await Review.findByIdAndUpdate(
          { _id: reviewId },
          { review },
          { new: true }
        );
        res.status(201).json({
          success: true,
          message: "Review updated successfully!",
          review: updateReview,
        });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    }
  }
}
module.exports = ReviewController;
