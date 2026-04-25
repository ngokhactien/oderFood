import User from "../models/User.js";
import bcrypt from "bcryptjs"; // ✅ chỉ 1 lần thôi
import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
import nodemailer from "nodemailer";

// ĐĂNG KÝ
export const register = async (req, res) => {
  try {
    const { name, username, email, password, phone, addresses } = req.body;

    // validate
    if (!username || !email || !password) {
      return res.status(400).json("Thiếu thông tin");
    }

    // check email
    const existEmail = await User.findOne({ email });
    if (existEmail) return res.status(400).json("Email đã tồn tại");

    // check username
    const existUsername = await User.findOne({ username });
    if (existUsername) return res.status(400).json("Username đã tồn tại");

    // validate address
    if (!addresses || addresses.length === 0) {
      return res.status(400).json("Phải có ít nhất 1 địa chỉ");
    }

    // xử lý default address
    const processedAddresses = addresses.map((addr, index) => ({
      ...addr,
      isDefault: index === 0,
    }));

    // hash password
    const hashed = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      username,
      email,
      password: hashed,
      phone,
      addresses: processedAddresses,
    });

    res.json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      addresses: user.addresses,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// ĐĂNG NHẬP
// ĐĂNG NHẬP (email hoặc username)
export const login = async (req, res) => {
  try {
    const { account, password } = req.body;

    if (!account || !password) {
      return res.status(400).json("Thiếu thông tin");
    }

    // 🔥 tìm theo email hoặc username
    const user = await User.findOne({
      $or: [{ email: account }, { username: account }],
    });

    if (!user) return res.status(400).json("Không tìm thấy tài khoản");

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json("Sai mật khẩu");

    // tạo token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // ❌ bỏ password
    const { password: _, ...userData } = user._doc;

    res.json({
      user: userData,
      token,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// POST /api/auth/forgot
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json("Vui lòng nhập email");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json("Email không tồn tại");
    }

    // 🔥 tạo token
    const resetToken = randomBytes(32).toString("hex");

    user.resetToken = resetToken;
    user.resetTokenExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    // 🔥 link reset
    const link = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

    // 🔥 cấu hình mail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 🔥 gửi mail
    await transporter.sendMail({
      from: `"Tiến NK  🔥" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset mật khẩu",
      html: `
        <h3>Yêu cầu đặt lại mật khẩu</h3>
        <p>Click vào link bên dưới để đặt lại mật khẩu:</p>
        <a href="${link}" target="_blank">${link}</a>
        <p>Link hết hạn sau 10 phút</p>
      `,
    });

    res.json("Đã gửi email reset password");
  } catch (err) {
    console.log("FORGOT ERROR:", err);
    res.status(500).json("Lỗi server");
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json("Thiếu dữ liệu");
    }

    // 🔥 tìm user theo token + còn hạn
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json("Token không hợp lệ hoặc đã hết hạn");
    }

    // 🔥 hash password mới
    const hashed = await bcrypt.hash(password, 10);

    user.password = hashed;

    // 🔥 xóa token sau khi dùng
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;

    await user.save();

    res.json("Đổi mật khẩu thành công");
  } catch (err) {
    console.log(err);
    res.status(500).json("Lỗi server");
  }
};
