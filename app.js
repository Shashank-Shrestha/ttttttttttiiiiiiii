const express = require("express");
const db = require("./config/dbConfig");
const userRouter = require("./route/userRoute");
const productRouter = require("./route/productRoute");
const categoryRouter = require("./route/categoryRoute");
const cors = require("cors");
const wishListRouter = require("./route/wishListRoute");
const cartRouter = require("./route/cartRoute");
const reviewRouter = require("./route/reviewRoute");
const salesRouter = require("./route/salesRoute");
var app = express();

app.use(cors());

// app.use(express.static("./public"));
app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/wishlist", wishListRouter);
app.use("/api/cart", cartRouter);
app.use("/api/review", reviewRouter);
app.use("/api/sales", salesRouter);
const PORT = 7777;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
