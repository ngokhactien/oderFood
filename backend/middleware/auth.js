import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json("Không có token");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // 🔥 cực kỳ quan trọng

    next();
  } catch (err) {
    return res.status(403).json("Token không hợp lệ");
  }
};