import { useState } from "react";
import {
  ArchiveBoxXMarkIcon,
  CalculatorIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

import { formatPrice, calculatePrice } from "../../common/calculatePrice";

import "./styles/CardDetail.css";

// =========================
// GET FINAL PRICE
// =========================
const getFinalPrice = (item) => {
  const basePrice = item.price || 0;

  if (item.discount) {
    return calculatePrice(basePrice, item.discount);
  }

  return basePrice;
};

const CartDetail = ({
  carts,
  totalAmount,
  onIncrease,
  onDecrease,
  onRemove,
  onChangeQty,
}) => {
  const [shippingInput, setShippingInput] = useState("0");

  // =========================
  // SHIPPING
  // =========================
  const calculateShipping = () => {
    if (!shippingInput) return 0;

    // ship %
    if (shippingInput.includes("%")) {
      const percent = parseInt(shippingInput.replace("%", ""));

      if (isNaN(percent)) return 0;

      return Math.round((totalAmount * percent) / 100);
    }

    // ship fixed
    const value = Number(shippingInput);

    return isNaN(value) ? 0 : value;
  };

  const shippingFee = calculateShipping();

  const finalTotal = totalAmount + shippingFee;
  // =========================
  // CHECKOUT
  // =========================
  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.warning("Bạn cần đăng nhập");

        return;
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          items: carts,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Checkout failed");

        return;
      }

      toast.success("Đặt hàng thành công 🎉");

      window.location.reload();
    } catch (err) {
      toast.error("Lỗi server: " + err.message);
    }
  };

  return (
    <div className="cart">
      {/* LEFT */}
      <div className="cart__left">
        <div className="cart__header">
          <ShoppingCartIcon className="cart-icon" />
          GIỎ HÀNG
          <span>{carts.length} sản phẩm</span>
        </div>

        {/* EMPTY */}
        {carts.length === 0 && <div className="empty-cart">Giỏ hàng trống</div>}

        {/* ITEMS */}
        {carts.map((item) => {
          const finalPrice = getFinalPrice(item);

          return (
            <div className="cart__item" key={item.productId + item.optionId}>
              {/* IMAGE */}
              <NavLink
                to={`/product/${item.productId}`}
                className="cart__item-link"
              >
                <img src={item.image} alt={item.name} className="thumb" />

                <div className="info">
                  <h4>{item.name}</h4>

                  <div className="size">
                    Size:
                    <span>{item.option}</span>
                  </div>
                </div>
              </NavLink>

              {/* PRICE */}
              <div className="price">
                <p>ĐƠN GIÁ:</p>

                <span className="new-price">{formatPrice(finalPrice)}</span>

                {item.discount > 0 && (
                  <>
                    <span className="old-price">{formatPrice(item.price)}</span>

                    <span className="discount">-{item.discount}%</span>
                  </>
                )}
              </div>

              {/* QUANTITY */}
              <div className="qty">
                <button
                  onClick={() =>
                    onDecrease(item.productId, item.optionId, item.quantity)
                  }
                >
                  -
                </button>

                <input
                  type="number"
                  min={1}
                  max={item.stock}
                  value={item.quantity}
                  onChange={(e) => {
                    let val = Number(e.target.value);

                    if (isNaN(val) || val < 1) {
                      val = 1;
                    }

                    if (val > item.stock) {
                      val = item.stock;
                    }

                    onChangeQty(item.productId, item.optionId, val);
                  }}
                />

                <button
                  onClick={() =>
                    onIncrease(
                      item.productId,
                      item.optionId,
                      item.quantity,
                      item.stock,
                    )
                  }
                >
                  +
                </button>
              </div>

              {/* TOTAL */}
              <div className="total">
                <p>TỔNG:</p>

                <span>{formatPrice(finalPrice * item.quantity)}</span>
              </div>

              {/* DELETE */}
              <button
                className="delete"
                onClick={() => onRemove(item.productId, item.optionId)}
              >
                <ArchiveBoxXMarkIcon className="icon-delete" />
              </button>
            </div>
          );
        })}

        {/* ACTIONS */}
        <div className="cart__actions">
          <NavLink to="/product-card" className="back">
            Tiếp tục mua sắm
          </NavLink>
        </div>
      </div>

      {/* RIGHT */}
      <div className="cart__right">
        <div className="summary">
          <h3>
            <CalculatorIcon
              style={{
                width: "24px",
                height: "24px",
              }}
            />

            <span>TỔNG ĐƠN HÀNG</span>
          </h3>

          <div className="row">
            <span>Số lượng sản phẩm:</span>

            <span>{carts.length}</span>
          </div>

          <div className="row">
            <span>Tạm tính:</span>

            <span>{formatPrice(totalAmount)}</span>
          </div>

          <div className="row">
            <span>Phí vận chuyển:</span>

            <input
              className="shipping-input"
              value={shippingInput}
              onChange={(e) => setShippingInput(e.target.value)}
              placeholder="VD: 20000 hoặc 10%"
            />
          </div>

          <div className="row">
            <span>Phí ship:</span>

            <span>{formatPrice(shippingFee)}</span>
          </div>
          <hr />
          <div className="total-price">
            <span>Tổng cộng:</span>

            <span>{formatPrice(finalTotal)}</span>
          </div>

          {/* COD */}
         <NavLink to="/checkout" className="btn-cod" onClick={handleCheckout}>
            Thanh Toán COD
          </NavLink>

          {/* MOMO */}
          <NavLink to="/checkout" className="btn-momo">
            Thanh toán Momo
          </NavLink>

          <p className="secure">Giao dịch bảo mật & an toàn</p>
        </div>
      </div>
    </div>
  );
};

export default CartDetail;
