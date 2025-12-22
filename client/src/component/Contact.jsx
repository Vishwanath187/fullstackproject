import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Contact</h2>

        <div className="space-y-4 text-gray-700">
        

          <p>
            <span className="font-semibold">Email:</span><br />
            <a href="mailto:vishwanathnugganatti5493.com" className="text-blue-600 hover:underline">vishwanathnugganatti5493@gmail.com</a>
          </p>

          <p>
            <span className="font-semibold">Phone:</span><br />
            +91 9353393658
          </p>

          <p>
            <span className="font-semibold">Address:</span><br />
            Belgavi, Karnataka, India
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
