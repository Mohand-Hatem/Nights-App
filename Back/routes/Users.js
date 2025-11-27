import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
  googleLogin,
  sendEmail,
} from "../controllers/Users.js";
import { verifyUser } from "../middlewares/auth.js";
const router = express.Router();

router.get("/me", verifyUser, getProfile);
router.post("/register", registerUser);
router.post("/google-login", googleLogin);
router.post("/login", loginUser);
router.post("/logout", verifyUser, logoutUser);
router.post("/send-email", verifyUser, sendEmail);

export default router;
