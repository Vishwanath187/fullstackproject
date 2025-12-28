const mongoose = require("mongoose");

const borrowSchema = new mongoose.Schema({
  studentUID: { type: String, required: true },
  studentName: { type: String, required: true },
  department: { type: String, required: true },
  contactNo: { type: String, required: true },

  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },

  borrowDateTime: {
    type: Date,
    default: Date.now,
  },

  returned: {
    type: Boolean,
    default: false,
  },

  returnDateTime: {
    type: Date,
    default: null, // ✅ filled on return
  },
});

module.exports = mongoose.model("Borrow", borrowSchema);
