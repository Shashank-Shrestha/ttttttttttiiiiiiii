const express = require("express");
const ReviewController = require("../Controller/reviewController");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

const APIROUTER = express.Router();

const review = new ReviewController();

// auth requests
APIROUTER.post("/insert",auth, review.addReview);
APIROUTER.delete("/delete/:id",auth, review.deleteReview);
APIROUTER.put("/update/:id", auth,review.updateReview);
APIROUTER.get("/show", review.showReview);
APIROUTER.get("/showSingle/:id", review.showSingleReview);

module.exports = APIROUTER;
