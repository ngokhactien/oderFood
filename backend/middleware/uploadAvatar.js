import multer from "multer";

const storage = multer.memoryStorage();

const uploadAvatar = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // max 2MB
  },
});

export default uploadAvatar;

// Bạn = có tài khoản Cloudinary
// User = upload ảnh

// → Bạn dùng tài khoản Cloudinary
// → Upload ảnh của user lên đó
// → Lấy link về
// → lưu vào DB
// khactien9d@gmail.com  khactien9d@