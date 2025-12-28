const express = require("express");
const {
  handleAddStudent,
  handleStudentList,
  handleUpdateStudent,
  handleDeleteStudent,
} = require("../controller/student.controller");

const router = express.Router();

router.post("/add", handleAddStudent);
router.get("/list", handleStudentList);
router.put("/update", handleUpdateStudent);
router.post("/delete", handleDeleteStudent);

module.exports = router;
