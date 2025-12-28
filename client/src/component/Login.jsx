// src/component/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleLogin = () => {
    const username = form.username.trim();
    const password = form.password.trim();

    // 🔒 Empty validation
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    // 🔐 Credential validation
    if (username === "mca@123" && password === "mca@123") {
      // save login state
      localStorage.setItem("isAdminLoggedIn", "true");

      // redirect ONLY after success
      navigate("/home", { replace: true });
    } else {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded-lg w-96 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 mb-4 outline-none"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-6 outline-none"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          onClick={handleLogin}
        >
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default Login;
