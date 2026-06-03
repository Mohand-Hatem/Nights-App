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
const allowedOrigins = [
  "*",
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "https://nights-gold.vercel.app",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
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

app.listen(process.env.PORT_NUM, () => {
  console.log(`Server is running on port ${process.env.PORT_NUM}`);
});
