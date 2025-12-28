const Book = require("../model/book.model");
const fs = require("fs");
const path = require("path");

/* ===================== ADD BOOK ===================== */
const handleBookStoreController = async (req, res) => {
  try {
    const { BookTitle, Author, SellingPrice, PublishYear } = req.body;

    // Validation
    if (!BookTitle || !Author || !SellingPrice || !PublishYear) {
      return res.status(400).json({
        Success: false,
        message: "All fields are required",
      });
    }

    const bookData = {
      BookTitle,
      Author,
      SellingPrice,
      PublishYear,
      FileUrl: req.file ? `/uploads/${req.file.filename}` : null,
    };

    const bookAdd = await Book.create(bookData);

    return res.status(201).json({
      Success: true,
      message: "Book added successfully",
      book: bookAdd,
    });

  } catch (error) {
    return res.status(500).json({
      Success: false,
      message: error.message,
    });
  }
};

/* ===================== BOOK LIST ===================== */
const handleBookListController = async (req, res) => {
  try {
    const bookList = await Book.find().sort({ BookTitle: 1 });

    return res.status(200).json({
      Success: true,
      TotalCount: bookList.length,
      BookList: bookList,
    });

  } catch (error) {
    return res.status(500).json({
      Success: false,
      message: error.message,
    });
  }
};

/* ===================== DELETE BOOK ===================== */
const handleBookDeleteController = async (req, res) => {
  try {
    const { Id } = req.body;

    if (!Id) {
      return res.status(400).json({
        Success: false,
        message: "Book ID is required",
      });
    }

    const book = await Book.findById(Id);

    if (!book) {
      return res.status(404).json({
        Success: false,
        message: "Book not found",
      });
    }

    // Delete PDF file if exists
    if (book.FileUrl) {
      const filePath = path.join(__dirname, "..", book.FileUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await Book.deleteOne({ _id: Id });

    return res.json({
      Success: true,
      message: "Book deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      Success: false,
      message: error.message,
    });
  }
};

/* ===================== UPDATE BOOK ===================== */
const handleBookUpdateController = async (req, res) => {
  try {
    const { _id, BookTitle, Author, SellingPrice, PublishYear } = req.body;

    if (!_id) {
      return res.status(400).json({
        Success: false,
        message: "Book ID is required",
      });
    }

    const book = await Book.findById(_id);

    if (!book) {
      return res.status(404).json({
        Success: false,
        message: "Book not found",
      });
    }

    // Prepare update object
    const updateData = {
      BookTitle,
      Author,
      SellingPrice,
      PublishYear,
    };

    // If new PDF uploaded → delete old PDF
    if (req.file) {
      if (book.FileUrl) {
        const oldPath = path.join(__dirname, "..", book.FileUrl);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      updateData.FileUrl = `/uploads/${req.file.filename}`;
    }

    const updatedBook = await Book.findByIdAndUpdate(
      _id,
      { $set: updateData },
      { new: true }
    );

    return res.json({
      Success: true,
      message: "Book updated successfully",
      updatedBook,
    });

  } catch (error) {
    return res.status(500).json({
      Success: false,
      message: error.message,
    });
  }
};

module.exports = {
  handleBookStoreController,
  handleBookListController,
  handleBookDeleteController,
  handleBookUpdateController,
};
