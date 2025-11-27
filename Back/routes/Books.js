import express from "express";
import { verifyUser } from "../middlewares/auth.js";
import { verifyAdmin } from "../middlewares/admin.js";
import {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBookByID,
  deleteBookByID,
} from "../controllers/Books.js";
import upload from "../config/multer.js";
const router = express.Router();

//Get All Books
router.get("/", getAllBooks);

//Get Book By ID
router.get("/:id", getSingleBook);

//Create Book
router.post(
  "/",
  verifyUser,
  verifyAdmin,
  upload.single("bookImage"),
  createBook
);

//Update Book By ID
router.put("/:id", verifyUser, verifyAdmin, updateBookByID);

//Delete Book By ID
router.delete("/:id", verifyUser, verifyAdmin, deleteBookByID);

export default router;
