import express from "express";
import { verifyUser } from "../middlewares/auth.js";
import {
  addToCart,
  checkOut,
  getAllCart,
  getCartCount,
  removeCart,
} from "../controllers/Cart.js";
const router = express.Router();

router.post("/", verifyUser, addToCart);

router.post("/create-checkout-session", verifyUser, checkOut);

router.get("/", verifyUser, getAllCart);

router.delete("/:id", verifyUser, removeCart);

router.get("/count", verifyUser, getCartCount);

export default router;
