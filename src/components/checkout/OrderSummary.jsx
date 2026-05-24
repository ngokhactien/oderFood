import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";

import { clearCartAsync } from "../../redux/cartSlice";
import { createCheckout } from "../../redux/admin/checkout/checkoutSlice";

export default function OrderSummary({
  cartItems,
  total,
  paymentMethod,
  selectedAddress,
  note,
}) {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.checkout);

  console.log("selectedAddress", selectedAddress);

  // =========================
  // HANDLE PAYMENT
  // =========================
  const handlePayment = async () => {
    try {
      // CHECK ADDRESS
      if (!selectedAddress) {
        toast.error("Vui lòng chọn địa chỉ giao hàng");

        return;
      }

      // DATA GỬI BACKEND
      const orderCode = `DH-${Date.now().toString().slice(-6)}-${Math.floor(
        1000 + Math.random() * 9000,
      )}`;

      const orderData = {
        orderCode,

        paymentMethod,

        shippingAddress: {
          fullName: selectedAddress.fullName,

          phone: selectedAddress.phone,

          address: selectedAddress.address,
        },

        note: note || "",
      };

      // =========================
      // CREATE ORDER
      // =========================
      const resultAction = await dispatch(createCheckout(orderData));

      // ERROR
      if (createCheckout.rejected.match(resultAction)) {
        return;
      }

      // =========================
      // CLEAR CART
      // =========================
      await dispatch(clearCartAsync());

      // =========================
      // PAYMENT METHOD
      // =========================
      if (paymentMethod === "MOMO") {
        // navigate("/payment/momo");
        navigate("/checkout/success");
      } else {
        navigate("/checkout/success");
      }
    } catch (error) {
      console.log(error);

      toast.error("Thanh toán thất bại");
    }
  };

  return (
    <div className="checkout-right">
      {/* HEADER */}
      <div className="order-header">
        <h3>Đơn Hàng Của Bạn</h3>

        <span className="badge">{cartItems.length} sản phẩm</span>
      </div>

      {/* PRODUCT LIST */}
      <div className="order-list">
        {cartItems.map((item, index) => (
          <div key={index} className="order-item">
            <span>
              {index + 1}. {item.name}
            </span>

            <span className="price">
              {item.quantity} x{" "}
              {(item.option?.price || item.price).toLocaleString()}đ
            </span>
          </div>
        ))}
      </div>

      {/* SUMMARY */}
      <div className="summary-box">
        <div>
          <span>Tạm tính:</span>

          <span>{total.toLocaleString()}đ</span>
        </div>

        <div>
          <span>Phí vận chuyển:</span>

          <span className="free">Miễn phí</span>
        </div>

        <div className="total">
          <span>Tổng cộng:</span>

          <span>{total.toLocaleString()}đ</span>
        </div>
      </div>

      {/* PAYMENT */}
      <div
        className={`payment-box ${
          paymentMethod === "MOMO" ? "momo-box" : "cod-box"
        }`}
      >
        {paymentMethod === "MOMO"
          ? "💳 Thanh toán qua MoMo"
          : "🚚 Thanh toán khi nhận hàng"}
      </div>

      {/* BUTTON */}
      <button
        className={`btn-payment ${
          paymentMethod === "MOMO" ? "btn-momo" : "btn-cod"
        }`}
        onClick={handlePayment}
        disabled={loading}
      >
        {loading
          ? "Đang xử lý..."
          : paymentMethod === "MOMO"
            ? "Thanh Toán MoMo"
            : "Đặt Hàng COD"}
      </button>

      {/* SECURE */}
      <p className="secure-text">Giao dịch được bảo mật và mã hóa</p>
    </div>
  );
}
