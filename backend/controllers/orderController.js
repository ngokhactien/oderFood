import Order from "../models/Order.js";

// 🔥 helper tính total
const calcTotal = (items) => items.reduce((sum, i) => sum + i.price * i.qty, 0);

// ==============================
// CREATE OR GET ORDER BY TABLE
// ==============================
export const getOrCreateOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { tableId, table } = req.body;

    let order = await Order.findOne({
      userId,
      tableId,
      status: { $ne: "paid" },
    });

    if (!order) {
      order = await Order.create({
        userId,
        tableId,
        table,
        status: "draft", // 🔥
        orderCode: "ORD-" + Date.now(),
      });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// ==============================
// ADD ITEM
// ==============================
export const addItem = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { product } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json("Order not found");

    const existed = order.items.find(
      (i) => i.productId.toString() === product._id.toString(),
    );

    if (existed) {
      existed.qty += 1;
    } else {
      order.items.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        qty: 1,
      });
    }

    order.total = calcTotal(order.items);

    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// ==============================
// UPDATE QTY
// ==============================
export const updateQty = async (req, res) => {
  try {
    const { orderId, itemId } = req.params;
    const { qty } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json("Order not found");

    const item = order.items.id(itemId);
    if (!item) return res.status(404).json("Item not found");

    item.qty = qty;

    order.total = calcTotal(order.items);

    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// ==============================
// REMOVE ITEM
// ==============================
export const removeItem = async (req, res) => {
  try {
    const { orderId, itemId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json("Order not found");

    order.items = order.items.filter((i) => i._id.toString() !== itemId);

    order.total = calcTotal(order.items);

    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// ==============================
// CONFIRM ORDER
// ==============================
export const confirmOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json("Order not found");

    order.status = "confirmed";

    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// ==============================
// UPDATE ITEM STATUS (bếp)
// ==============================
export const updateItemStatus = async (req, res) => {
  try {
    const { orderId, itemId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json("Order not found");

    const item = order.items.id(itemId);
    if (!item) return res.status(404).json("Item not found");
    item.status = status;

    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// ==============================
// PAY ORDER
// ==============================
export const payOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json("Order not found");

    order.status = "paid";
    order.paymentStatus = "paid";
    order.closedAt = new Date();

    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// ==============================
// GET ALL ACTIVE ORDERS
// ==============================
export const getActiveOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({
      userId,
      status: { $in: ["confirmed", "serving"] }, // 🔥 fix
    });

    res.json(orders);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// chuyển bàn
export const transferTable = async (req, res) => {
  try {
    const { id } = req.params;

    const { newTableId } = req.body;

    // tìm order
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // update bàn mới
    order.tableId = newTableId;

    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Click bàn
//    ↓
// getOrCreateOrder
//    ↓
// Add món
//    ↓
// OrderPanel hiển thị
//    ↓
// Confirm
//    ↓
// Bếp update item
//    ↓
// Thanh toán
//    ↓
// Order đóng
