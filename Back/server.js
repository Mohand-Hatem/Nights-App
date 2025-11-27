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
app.use(cookieParser());
app.use(
  cors({
    origin: `${process.env.FRONTEND_URL}`, // React frontend URL
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(express.json());

// //routes for users
app.use("/api/user", Users);

//routes for books
app.use("/api/book", Books);

//routes for categories
app.use("/api/category", Category);

//routes for carts
app.use("/api/cart", Cart);

ConnectDB();

app.listen(process.env.PORT_NUM || 7000, () => {
  console.log(`Server Running On Port ${process.env.PORT_NUM}`);
});
