import { useSelector } from "react-redux";
import { useState } from "react";
import CheckoutLeft from "../components/checkout/CheckoutLeft";
import OrderSummary from "../components/checkout/OrderSummary";
import "../styles/Checkout.css";
import { NavLink } from "react-router-dom";

export default function CheckoutPage() {
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.items);

  const [selectedAddress, setSelectedAddress] = useState(
    user?.addresses?.find((a) => a.isDefault) || user?.addresses?.[0]
  );

  const total = cartItems.reduce(
    (sum, item) =>
      sum + (item.option?.price || item.price) * item.quantity,
    0
  );

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h2>Thanh Toán Đơn Hàng</h2>
        <NavLink to={'/cart'} className="back">← Quay lại giỏ hàng</NavLink>
      </div>

      <div className="checkout-grid">
        <CheckoutLeft
          addresses={user?.addresses || []}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />

        <OrderSummary cartItems={cartItems} total={total} />
      </div>
    </div>
  );
}