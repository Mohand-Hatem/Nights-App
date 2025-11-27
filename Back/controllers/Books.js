import bookSchema from "../models/Books.js";

export const createBook = async (req, res) => {
  try {
    const { title, author, price, description, stock, onSale, category, star } =
      req.body;
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
    if (!title || !author || !price || !description) {
      res.status(400).json({
        message: "faill",
        error: "title-author-descirption-price are required",
      });
    }
    res.status(200).json({ message: "success", newBook });
  } catch (error) {
    res.status(400).json({
      message: "faill",
      error: error.message,
    });
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
