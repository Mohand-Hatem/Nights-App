import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import ConnectDB from "./config/db.js";
import Users from "./routes/Users.js";
import Books from "./routes/Books.js";
import Category from "./routes/Category.js";
import Cart from "./routes/Cart.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: `${process.env.FRONTEND_URL}`, // React frontend URL
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  }),
);
ConnectDB();

// //routes for users
app.use("/api/user", Users);

//routes for books
app.use("/api/book", Books);

//routes for categories
app.use("/api/category", Category);

//routes for carts
app.use("/api/cart", Cart);

export default app;
