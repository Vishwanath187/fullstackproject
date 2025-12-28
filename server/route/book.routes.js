const express = require("express");
const upload = require("../middleware/upload");

const {
  handleBookStoreController,
  handleBookListController,
  handleBookDeleteController,
  handleBookUpdateController,
} = require("../controller/book.controller.js"); // ✅ ADD .js

const router = express.Router();

router.post("/addbook", upload.single("File"), handleBookStoreController);
router.get("/booklists", handleBookListController);
router.post("/deletebook", handleBookDeleteController);
router.put("/updatebook", upload.single("File"), handleBookUpdateController);

module.exports = router;
