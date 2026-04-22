import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
    if (existUsername)
      return res.status(400).json("Username đã tồn tại");

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
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json("Không tìm thấy user");

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json("Sai mật khẩu");

    // tạo token
    const token = jwt.sign({ id: user._id }, "SECRET_KEY", {
      expiresIn: "7d",
    });

    res.json({ user, token });
  } catch (err) {
    res.status(500).json(err.message);
  }
};
