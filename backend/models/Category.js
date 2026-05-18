import mongoose from "mongoose";

/**
 * CATEGORY SCHEMA
 * Dùng để lưu danh mục món ăn (sidebar menu)
 * Ví dụ: Pizza, Burger, Sushi...
 */
const categorySchema = new mongoose.Schema(
  {
    /**
     * Tên danh mục hiển thị trên UI
     * Ví dụ: "Pizza", "Gà rán"
     */
    name: {
      type: String,
      required: true,
      trim: true, // tự động xoá khoảng trắng đầu/cuối
    },

    /**
     * slug dùng cho URL và filter
     * Ví dụ: pizza, fried-chicken
     * unique: không được trùng
     * lowercase: luôn chuyển về chữ thường
     */
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    /**
     * Ảnh đại diện category
     * nếu không có sẽ dùng ảnh mặc định
     */
    image: {
      type: String,
      default:
        "https://cdn-icons-png.flaticon.com/512/1829/1829586.png",
    },

    /**
     * Trạng thái hiển thị category trên frontend
     * show = hiển thị
     * hide = ẩn
     */
    status: {
      type: String,
      enum: ["show", "hide"],
      default: "show",
    },

    /**
     * Người tạo category (admin/staff)
     * ref tới User model
     * giúp biết ai tạo ra category này
     */
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },

  /**
   * timestamps:
   * tự động thêm:
   * - createdAt: ngày tạo
   * - updatedAt: ngày cập nhật
   */
  {
    timestamps: true,
  },
);

export default mongoose.model("Category", categorySchema);