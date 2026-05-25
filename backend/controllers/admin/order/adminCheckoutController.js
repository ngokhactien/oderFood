

import Checkout from "../../../models/Checkout.js";
// =========================
// GET ALL ORDERS (ADMIN)
// =========================
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Checkout.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

// =========================
// GET ORDER DETAIL ADMIN
// =========================
export const getAdminOrderDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Checkout.findById(id)
      .populate("user", "name email")
      .lean();

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn hàng",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

// =========================
// UPDATE STATUS
// =========================
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const { orderStatus } = req.body;

    const order = await Checkout.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn hàng",
      });
    }

    order.orderStatus = orderStatus;

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Cập nhật trạng thái thành công",
      order,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

// =========================
// CANCEL ORDER ADMIN
// =========================
export const cancelOrderAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Checkout.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn hàng",
      });
    }

    order.orderStatus = "cancelled";

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Admin đã hủy đơn hàng",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};
