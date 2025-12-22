import React, { useState, useEffect } from "react";
import { bookBaseUrl } from "../axiosinstance.js";
import { MdDelete } from 'react-icons/md';
import { FaPen } from 'react-icons/fa';

const Home = () => {
    const [bookForm, setBookForm] = useState({
        BookName: "",
        BookTitle: "",
        Author: "",
        SellingPrice: "",
        PublishYear: "",
    });

    const [bookList, setBookList] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const getAllbookList = async () => {
        try {
            const { data } = await bookBaseUrl.get('booklists');
            setBookList(data?.BookList);
            setFilteredBooks(data?.BookList); // Initialize filtered list
            console.log('booklist', data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllbookList();
    }, []);

    // Filter books when searchTerm changes
    useEffect(() => {
        if (!searchTerm) {
            setFilteredBooks(bookList);
        } else {
            const lowercasedTerm = searchTerm.toLowerCase();
            const filtered = bookList.filter(book =>
                book.BookName.toLowerCase().includes(lowercasedTerm) ||
                book.BookTitle.toLowerCase().includes(lowercasedTerm) ||
                book.Author.toLowerCase().includes(lowercasedTerm)
            );
            setFilteredBooks(filtered);
        }
    }, [searchTerm, bookList]);

    const handleformChange = (e) => {
        const { name, value } = e.target;
        setBookForm(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDelete = async (id) => {
        try {
            const { data } = await bookBaseUrl.post('deletebook', { Id: id });
            if (data?.Success) {
                alert(data?.message);
                getAllbookList();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async () => {
        try {
            if (!bookForm.BookName || !bookForm.BookTitle || !bookForm.Author || !bookForm.SellingPrice || !bookForm.PublishYear) {
                alert("All fields are required");
                return;
            }

            if (!isUpdating) {
                const { data } = await bookBaseUrl.post("/addBook", bookForm);
                if (data?.Success) {
                    alert("Book added successfully!");
                    getAllbookList();
                    setBookForm({ BookName: "", BookTitle: "", Author: "", SellingPrice: "", PublishYear: "" });
                } else {
                    alert(data?.message || "Failed to add book");
                }
            } else {
                const { data } = await bookBaseUrl.put("/updatebook", bookForm);
                if (data?.Success) {
                    alert(data?.message || "Book updated successfully");
                    getAllbookList();
                    setBookForm({ BookName: "", BookTitle: "", Author: "", SellingPrice: "", PublishYear: "" });
                    setIsUpdating(false);
                } else {
                    alert(data?.message || "Update failed");
                }
            }
        } catch (error) {
            console.log(error);
            alert("Something went wrong! Check console.");
        }
    };

    const handleUpdate = (book) => {
        setBookForm({
            _id: book._id,
            BookName: book.BookName,
            BookTitle: book.BookTitle,
            Author: book.Author,
            SellingPrice: book.SellingPrice,
            PublishYear: book.PublishYear,
        });
        setIsUpdating(true);
    };

    return (
       <div
  className="w-full h-screen overflow-auto flex flex-col items-center justify-start py-10"
  style={{
    backgroundImage: "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1600&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    opacity: 1,
  }}
>
  {/* ===== SEARCH BOX ===== */}
  <div className="w-11/12 md:w-3/4 lg:w-2/3 mb-6">
    <input
      type="text"
      placeholder="Search by Book Name, Title, or Author"
      className="w-full border-2 border-black rounded-md h-10 px-3 text-black placeholder-black bg-white/80 outline-none"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>

  {/* ===== BOOK FORM ===== */}
  <div className="w-11/12 md:w-3/4 lg:w-2/3 p-6 mb-8 rounded-lg bg-white/80">
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {/* Book Name */}
      <div className="flex flex-col gap-2">
        <label className="text-black font-semibold">Book Name</label>
        <input
          type="text"
          placeholder="Book Name"
          className="w-full border-2 border-black rounded-sm outline-none h-10 px-2 text-black placeholder-black bg-white/30"
          name="BookName"
          value={bookForm.BookName}
          onChange={handleformChange}
        />
      </div>

      {/* Book Title */}
      <div className="flex flex-col gap-2">
        <label className="text-black font-semibold">Book Title</label>
        <input
          type="text"
          placeholder="Book Title"
          className="w-full border-2 border-black rounded-sm outline-none h-10 px-2 text-black placeholder-black bg-white/30"
          name="BookTitle"
          value={bookForm.BookTitle}
          onChange={handleformChange}
        />
      </div>

      {/* Author */}
      <div className="flex flex-col gap-2">
        <label className="text-black font-semibold">Author</label>
        <input
          type="text"
          placeholder="Author"
          className="w-full border-2 border-black rounded-sm outline-none h-10 px-2 text-black placeholder-black bg-white/30"
          name="Author"
          value={bookForm.Author}
          onChange={handleformChange}
        />
      </div>

      {/* Selling Price */}
      <div className="flex flex-col gap-2">
        <label className="text-black font-semibold">Selling Price</label>
        <input
          type="text"
          placeholder="Selling Price"
          className="w-full border-2 border-black rounded-sm outline-none h-10 px-2 text-black placeholder-black bg-white/30"
          name="SellingPrice"
          value={bookForm.SellingPrice}
          onChange={handleformChange}
        />
      </div>

      {/* Publish Year */}
      <div className="flex flex-col gap-2">
        <label className="text-black font-semibold">Publish Year</label>
        <input
          type="text"
          placeholder="Publish Year"
          className="w-full border-2 border-black rounded-sm outline-none h-10 px-2 text-black placeholder-black bg-white/30"
          name="PublishYear"
          value={bookForm.PublishYear}
          onChange={handleformChange}
        />
      </div>
    </div>

    {/* Submit Button */}
    <div className="flex justify-center mt-6">
      <button
        className="bg-black text-white h-10 w-32 rounded-md cursor-pointer hover:bg-gray-800 transition"
        onClick={handleSubmit}
      >
        SUBMIT
      </button>
    </div>
  </div>

  {/* ===== SEARCH RESULTS TABLE ===== */}
  <div className="w-11/12 md:w-3/4 lg:w-2/3 overflow-auto bg-white/80 rounded-lg p-4">
    <table className="w-full divide-y divide-black">
      <thead>
        <tr>
          <th className="px-6 py-3 text-left text-black uppercase">Book Name</th>
          <th className="px-6 py-3 text-left text-black uppercase">Book Title</th>
          <th className="px-6 py-3 text-left text-black uppercase">Author</th>
          <th className="px-6 py-3 text-left text-black uppercase">Selling Price</th>
          <th className="px-6 py-3 text-left text-black uppercase">Publish Year</th>
          <th className="px-6 py-3 text-left text-black uppercase">Action</th>
        </tr>
      </thead>
      <tbody>
        {filteredBooks?.map((book, index) => (
          <tr key={index} className="hover:bg-black/10">
            <td className="px-6 py-3 text-black">{book?.BookName}</td>
            <td className="px-6 py-3 text-black">{book?.BookTitle}</td>
            <td className="px-6 py-3 text-black">{book?.Author}</td>
            <td className="px-6 py-3 text-black">{book?.SellingPrice}</td>
            <td className="px-6 py-3 text-black">{book?.PublishYear}</td>
            <td className="px-6 py-3 flex gap-3">
              <div className="cursor-pointer text-red-600" onClick={() => handleDelete(book._id)}><MdDelete /></div>
              <div className="cursor-pointer text-blue-600" onClick={() => handleUpdate(book)}><FaPen /></div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


    );
};

export default Home;
