// import mongoose from 'mongoose';
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/finalassignment", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Database connected successfully..."))
  .catch((error) => console.log(error));
