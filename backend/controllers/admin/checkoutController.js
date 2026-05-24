import Cart from "../../models/Cart.js";
import Checkout from "../../models/Checkout.js";
import Product from "../../models/Product.js";

// =========================
// CREATE ORDER
// =========================
export const createOrder = async (req, res) => {
  try {
    // =========================
    // USER
    // =========================
    const userId = req.user.id;

    // =========================
    // BODY
    // =========================
    const { paymentMethod = "COD", shippingAddress, note } = req.body;

    // =========================
    // VALIDATE ADDRESS
    // =========================
    if (
      !shippingAddress?.fullName ||
      !shippingAddress?.phone ||
      !shippingAddress?.address
    ) {
      return res.status(400).json({
        success: false,
        message: "Thiếu thông tin giao hàng",
      });
    }

    // =========================
    // ORDER CODE
    // =========================
    const orderCode = `DH${Date.now()}${Math.floor(100 + Math.random() * 900)}`;

    // =========================
    // FIND CART
    // =========================
    const cart = await Cart.findOne({
      user: userId,
    })
      .populate({
        path: "items.productId",
        select: "name images options discount importPrice",
        options: {
          lean: true,
        },
      })
      .lean();

    // =========================
    // EMPTY CART
    // =========================
    if (!cart?.items?.length) {
      return res.status(400).json({
        success: false,
        message: "Giỏ hàng trống",
      });
    }

    // =========================
    // TOTAL
    // =========================
    let totalPrice = 0;

    let totalQuantity = 0;

    const orderItems = [];

    // =========================
    // LOOP CART ITEMS
    // =========================
    for (const item of cart.items) {
      const product = item.productId;

      // PRODUCT NOT FOUND
      if (!product) continue;

      // =========================
      // FIND OPTION
      // =========================
      const option = product.options.find(
        (opt) => opt._id.toString() === item.optionId.toString(),
      );

      // OPTION NOT FOUND
      if (!option) {
        return res.status(400).json({
          success: false,
          message: "Option không tồn tại",
        });
      }

      // =========================
      // FINAL PRICE
      // =========================
      let finalPrice = option.price || product.price || 0;

      // DISCOUNT
      if (product.discount > 0) {
        finalPrice = Math.round(finalPrice * (1 - product.discount / 100));
      }

      // =========================
      // ITEM TOTAL
      // =========================
      const itemTotal = finalPrice * item.quantity;

      // =========================
      // UPDATE STOCK SAFE
      // =========================
      const updatedProduct = await Product.findOneAndUpdate(
        {
          _id: product._id,

          "options._id": option._id,

          "options.stock": {
            $gte: item.quantity,
          },
        },
        {
          $inc: {
            "options.$.stock": -item.quantity,

            sold: item.quantity,
          },
        },
        {
          new: true,
        },
      );

      // STOCK FAIL
      if (!updatedProduct) {
        return res.status(400).json({
          success: false,
          message: `${product.name} không đủ hàng`,
        });
      }

      // =========================
      // RECALCULATE STOCK
      // =========================
      updatedProduct.stock = updatedProduct.options.reduce(
        (sum, item) => sum + item.stock,
        0,
      );

      updatedProduct.status =
        updatedProduct.stock > 0 ? "available" : "out_of_stock";

      await updatedProduct.save();

      // =========================
      // PUSH ORDER ITEM
      // =========================
      orderItems.push({
        productId: product._id,

        optionId: option._id,

        name: product.name,

        image: product.images?.[0] || "",

        optionLabel: option.label || "",

        price: finalPrice,

        importPrice: option.importPrice || product.importPrice || 0,

        discount: product.discount || 0,

        quantity: item.quantity,

        totalPrice: itemTotal,
      });

      // =========================
      // TOTAL
      // =========================
      totalPrice += itemTotal;

      totalQuantity += item.quantity;
    }

    // =========================
    // PAYMENT STATUS
    // =========================
    const paymentStatus = paymentMethod === "MOMO" ? "paid" : "pending";

    // =========================
    // CREATE ORDER
    // =========================
    const checkout = await Checkout.create({
      orderCode,

      user: userId,

      items: orderItems,

      totalPrice,

      totalQuantity,

      shippingFee: 0,

      paymentMethod,

      paymentStatus,

      orderStatus: "pending",

      shippingAddress: {
        fullName: shippingAddress.fullName,

        phone: shippingAddress.phone,

        address: shippingAddress.address,
      },

      note: note || "",
    });

    // =========================
    // CLEAR CART
    // =========================
    await Cart.updateOne(
      {
        user: userId,
      },
      {
        $set: {
          items: [],
        },
      },
    );

    // =========================
    // RESPONSE
    // =========================
    return res.status(201).json({
      success: true,

      message: "Đặt hàng thành công",

      checkout,
    });
  } catch (error) {
    console.log("CREATE ORDER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

// =========================
// GET MY ORDERS
// =========================
export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Checkout.find({
      user: userId,
    })
      .select(`
        orderCode
        totalPrice
        totalQuantity
        paymentMethod
        paymentStatus
        orderStatus
        createdAt
        items
      `)
      .sort({
        createdAt: -1,
      })
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
// GET ORDER DETAIL
// =========================
export const getOrderDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Checkout.findOne({
      _id: id,

      user: req.user.id,
    })
      .select("-__v")
      .lean();

    // NOT FOUND
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
// CANCEL ORDER
// =========================
export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Checkout.findOne({
      _id: id,

      user: req.user.id,
    });

    // NOT FOUND
    if (!order) {
      return res.status(404).json({
        success: false,

        message: "Không tìm thấy đơn hàng",
      });
    }

    // ALREADY CANCELLED
    if (order.orderStatus === "cancelled") {
      return res.status(400).json({
        success: false,

        message: "Đơn hàng đã hủy",
      });
    }

    // =========================
    // RESTORE STOCK
    // =========================
    for (const item of order.items) {
      const updatedProduct = await Product.findOneAndUpdate(
        {
          _id: item.productId,

          "options._id": item.optionId,
        },
        {
          $inc: {
            "options.$.stock": item.quantity,

            sold: -item.quantity,
          },
        },
        {
          new: true,
        },
      );

      if (!updatedProduct) continue;

      // =========================
      // RECALCULATE STOCK
      // =========================
      updatedProduct.stock = updatedProduct.options.reduce(
        (sum, item) => sum + item.stock,
        0,
      );

      updatedProduct.status =
        updatedProduct.stock > 0 ? "available" : "out_of_stock";

      await updatedProduct.save();
    }

    // =========================
    // UPDATE ORDER
    // =========================
    order.orderStatus = "cancelled";

    await order.save();

    return res.status(200).json({
      success: true,

      message: "Hủy đơn hàng thành công",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};
