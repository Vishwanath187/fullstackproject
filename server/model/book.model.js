const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  BookTitle: String,
  Author: String,
  SellingPrice: Number,
  PublishYear: Number,
  FileUrl: String,
});

module.exports = mongoose.model("Book", bookSchema);
