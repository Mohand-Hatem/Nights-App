import jwt from "jsonwebtoken";
export const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(400)
        .json({ message: "faill", error: "Not Authorized" });
    }
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    if (!decode.role == "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
