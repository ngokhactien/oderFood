import Checkout from "../../../models/Checkout.js";

// =========================
// GET REVENUE
// =========================
export const getRevenue = async (req, res) => {
  try {
    const orders = await Checkout.find({
      orderStatus: "completed",
    })
      .sort({ createdAt: -1 })
      .lean();

    // =========================
    // TOTAL
    // =========================
    const totalRevenue = orders.reduce((sum, item) => sum + item.totalPrice, 0);

    const totalOrders = orders.length;

    const totalProducts = orders.reduce(
      (sum, item) => sum + item.totalQuantity,
      0,
    );

    return res.status(200).json({
      success: true,

      totalRevenue,

      totalOrders,

      totalProducts,

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
