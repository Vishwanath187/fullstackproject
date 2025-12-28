import React, { useEffect, useState } from "react";
import { bookBaseUrl } from "../axiosinstance";
import { FaEye, FaBookOpen } from "react-icons/fa";

const Root = () => {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");

    const getBooks = async () => {
        const { data } = await bookBaseUrl.get("booklists");
        setBooks(data.BookList);
    };

    useEffect(() => {
        getBooks();
    }, []);

    const handleView = (fileUrl) => {
        if (fileUrl) {
            window.open(`http://localhost:8000${fileUrl}`, "_blank");
        } else {
            alert("No PDF available");
        }
    };

    const filteredBooks = books.filter(
        (b) =>
            b.BookTitle.toLowerCase().includes(search.toLowerCase()) ||
            b.Author.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div
            className="min-h-screen w-full"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1600&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* OVERLAY */}
            <div className="bg-black/60 min-h-screen px-6 py-12">

                {/* HERO */}
                <div className="text-center text-white mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 flex justify-center items-center gap-3">
                        <FaBookOpen /> Digital Library
                    </h1>
                    <p className="text-lg text-gray-200">
                        Explore and read books from our digital collection
                    </p>
                </div>

                {/* SEARCH */}
                <div className="max-w-xl mx-auto mb-10">
                    <input
                        type="text"
                        placeholder="Search by Book Title or Author"
                        className="
      w-full h-11 px-4 
      rounded-md 
      bg-white 
      text-black 
      placeholder-gray-500 
      outline-none 
      shadow-md
      focus:ring-2 
      focus:ring-white
    "
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>


                {/* BOOK GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {filteredBooks.map((book) => (
                        <div
                            key={book._id}
                            className="bg-white rounded-lg shadow-lg p-5 hover:scale-[1.02] transition"
                        >
                            <h2 className="text-xl font-semibold text-gray-800 mb-1">
                                {book.BookTitle}
                            </h2>
                            <p className="text-sm text-gray-600 mb-2">
                                by {book.Author}
                            </p>

                            <div className="text-sm text-gray-700 mb-4">
                                <p><b>Price:</b> ₹{book.SellingPrice}</p>
                                <p><b>Year:</b> {book.PublishYear}</p>
                            </div>

                            <button
                                onClick={() => handleView(book.FileUrl)}
                                className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                            >
                                <FaEye /> View PDF
                            </button>
                        </div>
                    ))}
                </div>

                {/* EMPTY STATE */}
                {filteredBooks.length === 0 && (
                    <p className="text-center text-white mt-10 text-lg">
                        No books found 📕
                    </p>
                )}
            </div>
        </div>
    );
};

export default Root;
