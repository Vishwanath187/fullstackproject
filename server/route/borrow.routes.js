const express = require("express");
const {
  handleBorrowBook,
  handleBorrowHistory,
  handleReturnBook,
} = require("../controller/borrow.controller");

const router = express.Router();

router.post("/borrow", handleBorrowBook);
router.get("/history", handleBorrowHistory);
router.put("/return", handleReturnBook); // ✅ NEW

module.exports = router;
