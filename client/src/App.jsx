import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./component/Navbar.jsx";

import Root from "./component/Root.jsx";
import Login from "./component/Login.jsx";
import Home from "./component/Home.jsx";
import About from "./component/About.jsx";
import Contact from "./component/Contact.jsx";
import BorrowHistory from "./component/BorrowHistory.jsx";
import Student from "./component/Student.jsx";

/* Wrapper to control Navbar visibility */
const Layout = () => {
  const location = useLocation();

  // ❌ Hide navbar on login page
  const hideNavbar = location.pathname === "/login";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Root />} />
        <Route path="/login" element={<Login />} />

        {/* ADMIN */}
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/borrow-history" element={<BorrowHistory />} />
        <Route path="/student" element={<Student />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

export default App;
