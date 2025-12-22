import React from "react";
import aboutBg from "../assets/about-bg.jpeg";

const About = () => {
    return (
        <div
            className="w-full min-h-screen bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: `url(${aboutBg})` }}
        >
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-lg shadow-lg max-w-2xl">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">
                    About Digital Library
                </h2>
                <p className="text-gray-700 leading-relaxed">
                    Digital Library is a modern platform to manage, explore,
                    and organize books digitally using the MERN stack.
                </p>
            </div>
        </div>
    );
};

export default About;
