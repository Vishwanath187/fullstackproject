import React, { useEffect, useState } from "react";
import axios from "axios";

const BorrowHistory = () => {
  const [history, setHistory] = useState([]);
  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);

  const [form, setForm] = useState({
    studentUID: "",
    bookId: "",
  });

  const borrowDateTime = new Date().toLocaleString();

  /* ================= FETCH DATA ================= */
  const fetchHistory = async () => {
    const res = await axios.get("http://localhost:8000/borrow/history");
    if (res.data?.Success) setHistory(res.data.BorrowHistory);
  };

  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:8000/student/list");
    if (res.data?.Success) setStudents(res.data.StudentList);
  };

  const fetchBooks = async () => {
    const res = await axios.get("http://localhost:8000/book/booklists");
    if (res.data?.Success) setBooks(res.data.BookList);
  };

  useEffect(() => {
    fetchHistory();
    fetchStudents();
    fetchBooks();
  }, []);

  /* ================= FORM CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= BORROW ================= */
  const handleBorrow = async () => {
    if (!form.studentUID || !form.bookId) {
      alert("Student and Book are required");
      return;
    }

    const student = students.find(
      (s) => s.studentUID === form.studentUID
    );

    if (!student) {
      alert("Invalid student");
      return;
    }

    const payload = {
      studentUID: student.studentUID,
      studentName: student.studentName,
      department: student.department,
      contactNo: student.contactNo,
      bookId: form.bookId,
    };

    const res = await axios.post(
      "http://localhost:8000/borrow/borrow",
      payload
    );

    if (res.data?.Success) {
      alert("Book borrowed successfully");
      setForm({ studentUID: "", bookId: "" });
      fetchHistory();
    } else {
      alert(res.data.message);
    }
  };

  /* ================= RETURN ================= */
  const handleReturn = async (borrowId) => {
    if (!window.confirm("Return this book?")) return;

    const res = await axios.put(
      "http://localhost:8000/borrow/return",
      { borrowId }
    );

    if (res.data?.Success) {
      fetchHistory();
    }
  };

  return (
    <div
      className="w-full h-screen overflow-auto flex flex-col items-center justify-start py-10"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* ================= BORROW FORM ================= */}
      <div className="w-11/12 md:w-3/4 lg:w-2/3 p-6 mb-8 rounded-lg bg-white/80">
        <h2 className="text-xl font-bold text-black mb-4">
          Borrow Book
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* STUDENT UID */}
          <div className="flex flex-col gap-2">
            <label className="text-black font-semibold">Student</label>
            <select
              name="studentUID"
              value={form.studentUID}
              onChange={handleChange}
              className="w-full border-2 border-black h-10 px-2 text-black bg-white/30 outline-none"
            >
              <option value="">Select Student</option>
              {students.map((s) => (
                <option key={s._id} value={s.studentUID}>
                  {s.studentUID} - {s.studentName}
                </option>
              ))}
            </select>
          </div>

          {/* BOOK */}
          <div className="flex flex-col gap-2">
            <label className="text-black font-semibold">Book</label>
            <select
              name="bookId"
              value={form.bookId}
              onChange={handleChange}
              className="w-full border-2 border-black h-10 px-2 text-black bg-white/30 outline-none"
            >
              <option value="">Select Book</option>
              {books.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.BookTitle}
                </option>
              ))}
            </select>
          </div>

          {/* DATE */}
          <div className="flex flex-col gap-2">
            <label className="text-black font-semibold">
              Borrow Date & Time
            </label>
            <input
              value={borrowDateTime}
              readOnly
              className="w-full border-2 border-black h-10 px-2 text-black bg-white/30 outline-none"
            />
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleBorrow}
            className="bg-black text-white h-10 w-32 rounded-md cursor-pointer hover:bg-gray-800 transition"
          >
            BORROW
          </button>
        </div>
      </div>

      {/* ================= HISTORY TABLE ================= */}
      <div className="w-11/12 md:w-10/12 lg:w-11/12 xl:w-[95%] overflow-x-auto bg-white/80 rounded-lg p-4">
        <h2 className="text-2xl font-bold text-black mb-4 text-center">
          Borrow History
        </h2>

        <table className="w-full min-w-[1200px] divide-y divide-black">
          <thead>
            <tr>
              <th className="px-6 py-3 text-center text-black uppercase">
                Student UID
              </th>
              <th className="px-6 py-3 text-center text-black uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-center text-black uppercase">
                Department
              </th>
              <th className="px-6 py-3 text-center text-black uppercase">
                Book
              </th>
              <th className="px-6 py-3 text-center text-black uppercase">
                Borrow Date
              </th>
              <th className="px-6 py-3 text-center text-black uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-center text-black uppercase">
                Return
              </th>
            </tr>
          </thead>

          <tbody>
            {history.map((h) => (
              <tr key={h._id} className="hover:bg-black/10">
                <td className="px-6 py-3 text-center align-middle text-black">
                  {h.studentUID}
                </td>

                <td className="px-6 py-3 text-center align-middle text-black">
                  {h.studentName}
                </td>

                <td className="px-6 py-3 text-center align-middle text-black">
                  {h.department}
                </td>

                <td className="px-6 py-3 text-center align-middle text-black">
                  {h.bookId?.BookTitle}
                </td>

                <td className="px-6 py-3 text-center align-middle text-black">
                  {new Date(h.borrowDateTime).toLocaleString()}
                </td>

                <td
                  className={`px-6 py-3 text-center align-middle font-semibold ${h.returned ? "text-green-600" : "text-red-600"
                    }`}
                >
                  {h.returned ? "Returned" : "Borrowed"}
                </td>

                <td className="px-6 py-3 text-center align-middle">
                  <div className="flex flex-col items-center gap-1">
                    <button
                      disabled={h.returned}
                      onClick={() => handleReturn(h._id)}
                      className={`px-4 py-1 text-white rounded ${h.returned
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                      Return
                    </button>

                    {h.returned && h.returnDateTime && (
                      <div className="text-xs text-black">
                        {new Date(h.returnDateTime).toLocaleString()}
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default BorrowHistory;
