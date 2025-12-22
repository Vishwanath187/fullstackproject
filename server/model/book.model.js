const mongoose = require("mongoose")
const bookSchema = new mongoose.Schema({
    BookName: {
        type: String,
        required: true
    },
    BookTitle: {
        type: String,
        required: true
    },
    Author: {
        type: String,
        required: true
    },
    SellingPrice: {
        type: Number,
        required: true
    },
    PublishYear: {
        type: Number,
        required: true
    }
},
    { timestamps: true }
);
const Book = mongoose.model("Books", bookSchema);
module.exports = {Book};