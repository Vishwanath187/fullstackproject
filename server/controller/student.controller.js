const Student = require("../model/student.model");

/* ================= ADD STUDENT ================= */
const handleAddStudent = async (req, res) => {
  try {
    const {
      studentUID,
      studentName,
      department,
      semester,
      contactNo,
    } = req.body;

    // 🔒 BASIC VALIDATION
    if (
      !studentUID ||
      !studentName ||
      !department ||
      !semester ||
      !contactNo
    ) {
      return res.status(400).json({
        Success: false,
        message: "All fields are required",
      });
    }

    // 🔒 CONTACT NUMBER VALIDATION
    if (!/^\d{10}$/.test(contactNo)) {
      return res.status(400).json({
        Success: false,
        message: "Contact number must be exactly 10 digits",
      });
    }

    // 🔒 DUPLICATE UID CHECK
    const exists = await Student.findOne({ studentUID });
    if (exists) {
      return res.status(400).json({
        Success: false,
        message: "Student UID already exists",
      });
    }

    // ✅ CREATE STUDENT
    const student = await Student.create({
      studentUID: studentUID.trim(),
      studentName: studentName.trim(),
      department: department.trim(),
      semester: semester.trim(),
      contactNo: contactNo.trim(),
    });

    return res.status(201).json({
      Success: true,
      message: "Student added successfully",
      student,
    });

  } catch (error) {
    console.error("Add Student Error:", error);

    return res.status(500).json({
      Success: false,
      message: error.message,
    });
  }
};

/* ================= LIST STUDENTS ================= */
const handleStudentList = async (req, res) => {
  try {
    const students = await Student.find().sort({ studentUID: 1 });

    return res.json({
      Success: true,
      StudentList: students,
    });
  } catch (error) {
    return res.status(500).json({
      Success: false,
      message: error.message,
    });
  }
};

/* ================= UPDATE STUDENT ================= */
const handleUpdateStudent = async (req, res) => {
  try {
    const { _id, studentName, department, semester, contactNo } = req.body;

    if (!_id) {
      return res.status(400).json({
        Success: false,
        message: "Student ID is required",
      });
    }

    if (!studentName || !department || !semester || !contactNo) {
      return res.status(400).json({
        Success: false,
        message: "All fields are required",
      });
    }

    if (!/^\d{10}$/.test(contactNo)) {
      return res.status(400).json({
        Success: false,
        message: "Contact number must be exactly 10 digits",
      });
    }

    const updated = await Student.findByIdAndUpdate(
      _id,
      {
        studentName: studentName.trim(),
        department: department.trim(),
        semester: semester.trim(),
        contactNo: contactNo.trim(),
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        Success: false,
        message: "Student not found",
      });
    }

    return res.json({
      Success: true,
      message: "Student updated successfully",
      student: updated,
    });

  } catch (error) {
    return res.status(500).json({
      Success: false,
      message: error.message,
    });
  }
};

/* ================= DELETE STUDENT ================= */
const handleDeleteStudent = async (req, res) => {
  try {
    const { Id } = req.body;

    if (!Id) {
      return res.status(400).json({
        Success: false,
        message: "Student ID is required",
      });
    }

    const deleted = await Student.findByIdAndDelete(Id);

    if (!deleted) {
      return res.status(404).json({
        Success: false,
        message: "Student not found",
      });
    }

    return res.json({
      Success: true,
      message: "Student deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      Success: false,
      message: error.message,
    });
  }
};

module.exports = {
  handleAddStudent,
  handleStudentList,
  handleUpdateStudent,
  handleDeleteStudent,
};
