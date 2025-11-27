import jwt, { decode } from "jsonwebtoken";

export const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "faill", error: "Not Authorized" });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
      if (err)
        return res
          .status(403)
          .json({ message: "faill", error: "Invalid Token" });
      req.user = decode;
      next();
    });
  } catch (error) {
    return res.status(401).json({ message: "faill", error: error.message });
  }
};
