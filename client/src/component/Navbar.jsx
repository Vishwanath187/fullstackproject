import React from 'react';
import logo from "../assets/logo.jpeg";
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="w-full h-16 flex items-center justify-between bg-gray-200 shadow px-5">

            {/* Left: Logo + Title */}
            <div className="flex items-center gap-3 whitespace-nowrap">
                <img
                    src={logo}
                    alt="Logo"
                    className="h-12 w-auto"
                />
                <h1 className="text-2xl font-semibold text-gray-800">
                    Digital Library
                </h1>
            </div>

            {/* Right: Menu */}
            <div className="flex items-center gap-4">
                <Link
                    to="/"
                    className="px-4 py-1 border border-gray-400 rounded-md bg-white text-gray-800 font-medium hover:bg-gray-100"
                >
                    Home
                </Link>

                <Link
                    to="/about"
                    className="px-4 py-1 border border-gray-400 rounded-md bg-white text-gray-800 font-medium hover:bg-gray-100"
                >
                    About
                </Link>

                <Link
                    to="/contact"
                    className="px-4 py-1 border border-gray-400 rounded-md bg-white text-gray-800 font-medium hover:bg-gray-100"
                >
                    Contact
                </Link>
            </div>

        </div>
    );
};

export default Navbar;
