import userSchema from "../models/Users.js";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
import { Resend } from "resend";
dotenv.config();

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "faill All username email password are required" });
    }
    const createdUser = await userSchema.create({
      username,
      email,
      password,
      role,
    });

    return res.status(200).json({ message: "success", createdUser });
  } catch (error) {
    return res.status(400).json({ message: "faill ", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "faill", error: "email and password are requierd" });
    }
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "faill", error: "Account not found" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "faill", error: "Email or Passowrd are Invalid" });
    }
    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });
    const viewUser = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    return res.status(200).json({ message: "success", data: viewUser, token });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "faill", message: "Error logging in user" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "faill", error: "Not Authorized" });
    }

    const signdUser = jwt.verify(token, process.env.SECRET_KEY);
    return res.status(200).json({ message: "success", signdUser });
  } catch (error) {
    return res.status(401).json({ message: "faill", error: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(200).json({ message: "faill", error: error.message });
  }
};

// Google Login
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      return res
        .status(400)
        .json({ message: "faill", error: "ID Token is required" });
    }
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub, email, name } = payload;

    let user = await userSchema.findOne({ email });

    if (!user) {
      user = await userSchema.create({
        username: name,
        email,
        password: sub, // ممكن تستخدم googleId كـ password مؤقت
        googleId: sub,
      });
    } else if (!user.googleId) {
      user.googleId = sub;
      await user.save();
    }
    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });
    const viewUser = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    return res.status(200).json({ message: "success", data: viewUser, token });
  } catch (error) {
    console.error("Google Login Error:", error);
    return res.status(500).json({ message: "faill", error: error.message });
  }
};
//Google Login

//Send Email
const resend = new Resend(process.env.SEND_EMAIL);
export const sendEmail = async (req, res) => {
  try {
    const { name, email, subject } = req.body;

    const response = await resend.emails.send({
      from: "Nights App <onboarding@resend.dev>",
      to: "mohanedhatem44@gmail.com",
      subject: `Message from ${name}`,
      reply_to: email,
      text: `You have a new message from your website contact form: Email: ${email}      
Message: **
${subject}
**`,
    });

    res.json({ success: true, response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: err });
  }
};
//Send Email

//Token Generate
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      gender: user.gender,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1d" }
  );
};
