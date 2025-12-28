const Borrow = require("../model/borrow.model");

/* ================= BORROW BOOK ================= */
const handleBorrowBook = async (req, res) => {
  try {
    const {
      studentUID,
      studentName,
      department,
      contactNo,
      bookId,
    } = req.body;

    // Validation
    if (!studentUID || !studentName || !department || !contactNo || !bookId) {
      return res.status(400).json({
        Success: false,
        message: "All fields are required",
      });
    }

    // 🔴 Check if book is already borrowed and not returned
    const alreadyBorrowed = await Borrow.findOne({
      bookId,
      returned: false,
    });

    if (alreadyBorrowed) {
      return res.status(400).json({
        Success: false,
        message: "This book is already borrowed",
      });
    }

    const borrow = await Borrow.create({
      studentUID,
      studentName,
      department,
      contactNo,
      bookId,
      returned: false,
    });

    return res.status(201).json({
      Success: true,
      message: "Book borrowed successfully",
      borrow,
    });

  } catch (error) {
    return res.status(500).json({
      Success: false,
      message: error.message,
    });
  }
};

/* ================= BORROW HISTORY ================= */
const handleBorrowHistory = async (req, res) => {
  try {
    const history = await Borrow.find()
      .populate("bookId", "BookTitle Author")
      .sort({ borrowDateTime: -1 });

    return res.json({
      Success: true,
      BorrowHistory: history,
    });
  } catch (error) {
    return res.status(500).json({
      Success: false,
      message: error.message,
    });
  }
};

/* ================= RETURN BOOK ================= */
const handleReturnBook = async (req, res) => {
  try {
    const { borrowId } = req.body;

    if (!borrowId) {
      return res.status(400).json({
        Success: false,
        message: "Borrow ID is required",
      });
    }

    const borrow = await Borrow.findById(borrowId);

    if (!borrow) {
      return res.status(404).json({
        Success: false,
        message: "Borrow record not found",
      });
    }

    // 🔒 Prevent returning twice
    if (borrow.returned) {
      return res.status(400).json({
        Success: false,
        message: "Book already returned",
      });
    }

    borrow.returned = true;
    borrow.returnDateTime = new Date();

    await borrow.save();

    return res.json({
      Success: true,
      message: "Book returned successfully",
      borrow,
    });

  } catch (error) {
    return res.status(500).json({
      Success: false,
      message: error.message,
    });
  }
};

module.exports = {
  handleBorrowBook,
  handleBorrowHistory,
  handleReturnBook,
};
