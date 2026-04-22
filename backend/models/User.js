import mongoose from "mongoose";

// 🧩 Address schema (1 user có nhiều địa chỉ)
const addressSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true }, // tên người nhận
    phone: { type: String, required: true },
    street: { type: String, required: true }, // số nhà, đường
    ward: String,
    district: String,
    city: String,
    isDefault: { type: Boolean, default: false }, // địa chỉ mặc định
  },
  { _id: true }, // mỗi address có id riêng
);

// 🧩 User schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // tên hiển thị
    username: { type: String, unique: true, required: true }, // tên tài khoản
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },

    phone: { type: String }, // số điện thoại chính

    // 🔥 nhiều địa chỉ
    addresses: [addressSchema],

    // 🔥 role (phân quyền)
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  },
);

export default mongoose.model("User", userSchema);


// {
//   "name": "Tiến",
//   "username": "tien123",
//   "email": "tien@gmail.com",
//   "password": "123456",
//   "phone": "0901234567",
//   "addresses": [
//     {
//       "fullName": "Tiến",
//       "phone": "0901234567",
//       "street": "123 Lê Lợi",
//       "city": "HCM"
//     },
//     {
//       "fullName": "Tiến",
//       "phone": "0908888888",
//       "street": "456 Trần Hưng Đạo",
//       "city": "Hà Nội"
//     }
//   ]
// }