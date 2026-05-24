import { useSelector } from "react-redux";

import { useState } from "react";

import { NavLink, useLocation } from "react-router-dom";

import CheckoutLeft from "../components/checkout/CheckoutLeft";

import OrderSummary from "../components/checkout/OrderSummary";

import "../styles/Checkout.css";

export default function CheckoutPage() {
  const location = useLocation();
  const [note, setNote] = useState("");

  // PAYMENT METHOD
  const paymentMethod = location.state?.paymentMethod || "COD";

  // USER
  const user = useSelector((state) => state.auth.user);

  // CART
  const cartItems = useSelector((state) => state.cart.items);

  // ADDRESS
  const [selectedAddress, setSelectedAddress] = useState(
    user?.addresses?.find((a) => a.isDefault) || user?.addresses?.[0] || null,
  );

  // TOTAL
  const total = cartItems.reduce((sum, item) => {
    const price = item.option?.price || item.price || 0;

    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="checkout-container">
      {/* HEADER */}
      <div className="checkout-header">
        <h2>Thanh Toán Đơn Hàng</h2>

        <NavLink to="/cart" className="back">
          ← Quay lại giỏ hàng
        </NavLink>
      </div>

      {/* GRID */}
      <div className="checkout-grid">
        {/* LEFT */}
        <CheckoutLeft
          addresses={user?.addresses || []}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
          user={user}
          note={note}
          setNote={setNote}
        />
        {/* RIGHT */}
        <OrderSummary
          cartItems={cartItems}
          total={total}
          paymentMethod={paymentMethod}
          selectedAddress={selectedAddress}
          note={note}
        />
      </div>
    </div>
  );
}
