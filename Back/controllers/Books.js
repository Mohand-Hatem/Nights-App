import bookSchema from "../models/Books.js";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const createBook = async (req, res) => {
  try {
    const { title, author, price, description, stock, onSale, category, star } =
      req.body;

    if (!title || !author || !price || !description) {
      return res.status(400).json({
        message: "faill",
        error: "title-author-descirption-price are required",
      });
    }

    const newBook = await bookSchema.create({
      title,
      author,
      price,
      description,
      stock,
      onSale,
      category,
      bookImage: req.file?.path,
      star,
    });

    res.status(200).json({ message: "success", newBook });

    console.log("Sending to n8n:", process.env.N8N_WEBHOOK_URL);

    axios
      .post(process.env.N8N_WEBHOOK_URL, {
        title: newBook.title,
        author: newBook.author,
        price: newBook.price,
        description: newBook.description,
        stock: newBook.stock,
        onSale: newBook.onSale,
        category: newBook.category,
        bookImage: newBook.bookImage,
        star: newBook.star,
      })
      .then(() => console.log("n8n webhook sent successfully"))
      .catch((err) => console.error("n8n webhook failed:", err.message));
  } catch (error) {
    console.error("createBook error:", error.message);
    if (!res.headersSent) {
      res.status(400).json({ message: "faill", error: error.message });
    }
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const AllBooks = await bookSchema.find().populate("category", "name");
    if (!AllBooks) {
      res.status(404).json({ message: "faill", error: error.message });
    }
    res.status(200).json({ message: "success", AllBooks });
  } catch (error) {
    res.status(404).json({ message: "faill", error: error.message });
  }
};

export const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;
    const foundedBook = await bookSchema.findById(id).populate("category");
    if (!foundedBook) {
      res.status(404).json({ message: "Book Not Found" });
    }
    res.status(201).json({ message: "success", foundedBook });
  } catch (error) {
    res.status(404).json({ message: "faill", error: error.message });
  }
};

export const updateBookByID = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await bookSchema.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      message: "Book updated successfully",
      updatedBook,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update book",
      error: error.message,
    });
  }
};

export const deleteBookByID = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await bookSchema.findByIdAndDelete(id);
    const allBooksAfterDelete = await bookSchema.find();
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      message: "Book deleted successfully",
      allBooksAfterDelete,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete book",
      error: error.message,
    });
  }
};
