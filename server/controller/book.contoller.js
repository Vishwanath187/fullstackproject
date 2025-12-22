const { Book } = require("../model/book.model");
const handleBookStoreController = async (req, res) => {
    try {
        const body = req.body;

        if (!body.BookName || !body.BookTitle || !body.Author || !body.SellingPrice || !body.PublishYear) {
            return res.status(400).json({ message: "All fields are required", Success: false });
        }

        const bookAdd = await Book.insertOne(body);
        if (bookAdd) {
            return res.status(201).json({ message: "Book added successfully", Success: true, Id: bookAdd._id });
        }
        
        console.log("bookAdd", bookAdd);
    } catch (error) {
        return res.status(500).json({ message: error.message, Success: false });
    };
};

const handleBookListController = async (req, res) => {
    try {
        const bookList = await Book.find({});
        return res.status(200).json({ message: "All Books are fetched successfully", Success: true, TotalCoun: bookList.length, BookList: bookList, });
    }
    catch (error) {
        return res.status(500).json({ message: error.message, Success: false });
    }
};


const handleBookDeleteController = async (req, res) => {
    const body = req.body;
    try {
        const deleted = await Book.deleteOne({ _id: body.Id });
        console.log("deleted", deleted);
        if (deleted.acknowledged) {
            return res.json({ message: "Book deleted successfully", Success: true });
        }
    }
    catch (error) {
        return res.status(400).json({ message: error.message, Success: false });
    }
};

const handleBookUpdateController = async (req, res) => {
  try {
    const { _id, ...updateData } = req.body;

    if (!_id) {
      return res.status(400).json({
        Success: false,
        message: "Book ID is required",
      });
    }

    const updated = await Book.updateOne(
      { _id },                 
      { $set: updateData }     
    );

    if (updated.modifiedCount > 0) {
      return res.json({
        message: "Book updated successfully",
        Success: true,
      });
    } else {
      return res.json({
        message: "No changes made or book not found",
        Success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      Success: false,
    });
  }
};



module.exports = { handleBookStoreController, handleBookListController, handleBookDeleteController,handleBookUpdateController };