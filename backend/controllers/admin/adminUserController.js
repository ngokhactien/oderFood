// controllers/admin/adminUserController.js

import bcrypt from "bcryptjs";

import User from "../../models/User.js";

// =========================
// GET ALL USERS
// =========================
export const getAllUsers = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 5;

    const search = req.query.search || "";

    const query = {
      $or: [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },

        {
          email: {
            $regex: search,
            $options: "i",
          },
        },

        {
          phone: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    };

    const total = await User.countDocuments(query);

    const users = await User.find(query)
      .select("-password")
      .sort({
        createdAt: -1,
      })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      users,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// =========================
// CREATE USER
// =========================
export const createUser = async (req, res) => {
  try {
    const {
      name,
      username,
      email,
      password,
      phone,
      avatar,
      role,
      addresses,
    } = req.body;

    // VALIDATE
    if (
      !name ||
      !username ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        message:
          "Vui lòng nhập đầy đủ thông tin",
      });
    }

    // CHECK EMAIL
    const existEmail =
      await User.findOne({
        email,
      });

    if (existEmail) {
      return res.status(400).json({
        message: "Email đã tồn tại",
      });
    }

    // CHECK USERNAME
    const existUsername =
      await User.findOne({
        username,
      });

    if (existUsername) {
      return res.status(400).json({
        message:
          "Username đã tồn tại",
      });
    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // CREATE USER
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      phone,
      avatar,
      role,

      addresses:
        addresses?.length > 0
          ? addresses
          : [
              {
                fullName: "",
                phone: "",
                address: "",
                ward: "",
                district: "",
                isDefault: true,
              },
            ],
    });

    res.status(201).json({
      message:
        "Tạo user thành công",

      user,
    });
  } catch (err) {
    console.log("CREATE USER ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// =========================
// UPDATE USER
// =========================
export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "Không tìm thấy user",
      });
    }

    const {
      name,
      email,
      phone,
      role,
      username,
      avatar,
      addresses,
    } = req.body;

    // =========================
    // CHECK EMAIL
    // =========================
    const existingEmail = await User.findOne({
      email,
      _id: { $ne: req.params.id },
    });

    if (existingEmail) {
      return res.status(400).json({
        message: "Email đã tồn tại",
      });
    }

    // =========================
    // CHECK USERNAME
    // =========================
    const existingUsername = await User.findOne({
      username,
      _id: { $ne: req.params.id },
    });

    if (existingUsername) {
      return res.status(400).json({
        message: "Username đã tồn tại",
      });
    }

    // =========================
    // UPDATE
    // =========================
    user.name = name;
    user.email = email;
    user.phone = phone;
    user.role = role;
    user.username = username;
    user.avatar = avatar;
    user.addresses = addresses || [];

    await user.save();

    res.json({
      message: "Cập nhật thành công",
      user,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};
// =========================
// DELETE USER
// =========================
export const deleteUser = async (
  req,
  res,
) => {
  try {
    const user =
      await User.findById(
        req.params.id,
      );

    if (!user) {
      return res
        .status(404)
        .json({
          message:
            "Không tìm thấy user",
        });
    }

    await user.deleteOne();

    res.json({
      message:
        "Xóa user thành công",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};