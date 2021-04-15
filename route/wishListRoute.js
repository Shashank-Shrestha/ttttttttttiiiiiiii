const express = require("express");
const WishListController = require("../Controller/wishListController");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

const APIROUTER = express.Router();

const wishList = new WishListController();

// auth requests
APIROUTER.post("/insert", wishList.addWishList);
APIROUTER.delete("/delete/:id", wishList.deleteWishList);
APIROUTER.get("/show/", wishList.showWishList);
APIROUTER.get("/showSingle/:id", wishList.showSingleWishList);

module.exports = APIROUTER;
