const express = require("express");
const cors = require("cors");
const path = require("path");

const databaseConnection = require("./database");

// ROUTES
const bookRouter = require("./route/book.routes");
const studentRouter = require("./route/student.routes");
const borrowRouter = require("./route/borrow.routes"); // ✅ ADD THIS

databaseConnection();

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= STATIC FILES ================= */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================= TEST ROUTE ================= */
app.get("/", (req, res) => {
  res.send("Server is running");
});

/* ================= API ROUTES ================= */
app.use("/book", bookRouter);
app.use("/student", studentRouter);
app.use("/borrow", borrowRouter); // ✅ ADD THIS

/* ================= SERVER ================= */
app.listen(8000, () => {
  console.log("🚀 Server running on port 8000");
});
