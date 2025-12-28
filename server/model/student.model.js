const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    studentUID: {
      type: String,
      required: [true, "Student UID is required"],
      unique: true,
      trim: true,
    },

    studentName: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
      minlength: [3, "Student name must be at least 3 characters"],
    },

    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },

    semester: {
      type: String,
      required: [true, "Semester is required"],
      trim: true,
    },

    contactNo: {
      type: String,
      required: [true, "Contact number is required"],
      match: [/^\d{10}$/, "Contact number must be 10 digits"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
