import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";

const Student = () => {
  const [students, setStudents] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    _id: "",
    studentUID: "",
    studentName: "",
    department: "",
    semester: "",
    contactNo: "",
  });

  /* ================= FETCH STUDENTS ================= */
  const fetchStudents = async () => {
    const { data } = await axios.get("http://localhost:8000/student/list");
    if (data?.Success) setStudents(data.StudentList);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  /* ================= CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= VALIDATION ================= */
  const validateForm = () => {
    if (
      !form.studentUID.trim() ||
      !form.studentName.trim() ||
      !form.department.trim() ||
      !form.semester.trim() ||
      !form.contactNo.trim()
    ) {
      alert("All fields are required");
      return false;
    }

    if (!/^\d{10}$/.test(form.contactNo)) {
      alert("Contact number must be 10 digits");
      return false;
    }

    return true;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const payload = {
        studentUID: form.studentUID.trim(),
        studentName: form.studentName.trim(),
        department: form.department.trim(),
        semester: form.semester.trim(),
        contactNo: form.contactNo.trim(),
      };

      const res = isUpdating
        ? await axios.put("http://localhost:8000/student/update", {
          _id: form._id,
          ...payload,
        })
        : await axios.post("http://localhost:8000/student/add", payload);

      if (res.data?.Success) {
        alert(res.data.message);
        fetchStudents();   // 🔄 refresh table
        setForm({
          _id: "",
          studentUID: "",
          studentName: "",
          department: "",
          semester: "",
          contactNo: "",
        });
        setIsUpdating(false);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save student");
    } finally {
      setLoading(false);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (student) => {
    setForm(student);
    setIsUpdating(true);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;

    const res = await axios.post("http://localhost:8000/student/delete", {
      Id: id,
    });

    if (res.data?.Success) fetchStudents();
  };

  return (
    <div
      className="w-full h-screen overflow-auto flex flex-col items-center justify-start py-10"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* ================= FORM ================= */}
      <div className="w-11/12 md:w-3/4 lg:w-2/3 p-6 mb-8 rounded-lg bg-white/80">
        <h2 className="text-xl font-bold text-black mb-4">
          {isUpdating ? "Update Student" : "Add Student"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            ["studentUID", "Student UID"],
            ["studentName", "Student Name"],
            ["department", "Department"],
            ["semester", "Semester"],
            ["contactNo", "Contact No"],
          ].map(([key, label]) => (
            <div key={key} className="flex flex-col gap-2">
              <label className="text-black font-semibold">{label}</label>
              <input
                type="text"
                name={key}
                value={form[key]}
                onChange={handleChange}
                disabled={isUpdating && key === "studentUID"}
                className="w-full border-2 border-black h-10 px-2 text-black bg-white/30 outline-none"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`bg-black text-white h-10 w-32 rounded-md ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
              }`}
          >
            {loading ? "Saving..." : isUpdating ? "UPDATE" : "SUBMIT"}
          </button>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="max-w-full overflow-x-auto bg-white/80 rounded-lg p-4">
        <table className="w-max min-w-full divide-y divide-black">
          <thead>
            <tr>
              <th className="px-6 py-3 text-center text-black uppercase">UID</th>
              <th className="px-6 py-3 text-center text-black uppercase">Name</th>
              <th className="px-6 py-3 text-center text-black uppercase">Department</th>
              <th className="px-6 py-3 text-center text-black uppercase">Semester</th>
              <th className="px-6 py-3 text-center text-black uppercase">Contact</th>
              <th className="px-6 py-3 text-center text-black uppercase">Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr key={s._id} className="hover:bg-black/10">
                <td className="px-6 py-3 text-center align-middle text-black">
                  {s.studentUID}
                </td>
                <td className="px-6 py-3 text-center align-middle text-black">
                  {s.studentName}
                </td>
                <td className="px-6 py-3 text-center align-middle text-black">
                  {s.department}
                </td>
                <td className="px-6 py-3 text-center align-middle text-black">
                  {s.semester}
                </td>
                <td className="px-6 py-3 text-center align-middle text-black">
                  {s.contactNo}
                </td>
                <td className="px-6 py-3 text-center align-middle text-black">
                  <div className="flex justify-center gap-4">
                    <FaPen
                      className="cursor-pointer text-blue-600"
                      onClick={() => handleEdit(s)}
                    />
                    <MdDelete
                      className="cursor-pointer text-red-600"
                      onClick={() => handleDelete(s._id)}
                    />
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

export default Student;
