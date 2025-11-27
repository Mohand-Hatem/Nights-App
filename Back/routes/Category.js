import express from "express";
import { createCategory, getAllCategories } from "../controllers/Categories.js";
import { verifyUser } from "../middlewares/auth.js";
import { verifyAdmin } from "../middlewares/admin.js";
const router = express.Router();

//Create Category
router.post("/", verifyUser, verifyAdmin, createCategory);

//Get All Categories
router.get("/", getAllCategories);

export default router;
