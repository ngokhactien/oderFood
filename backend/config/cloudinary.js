import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export default cloudinary;

// Bạn = có tài khoản Cloudinary
// User = upload ảnh

// → Bạn dùng tài khoản Cloudinary
// → Upload ảnh của user lên đó
// → Lấy link về
// → lưu vào DB