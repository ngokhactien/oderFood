import { useState } from "react";
import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/outline";
import { formatPrice, calculatePrice } from "../../common/calculatePrice";
import { CalculatorIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import "../styles/cardDetail/CardDetail.css";
import { NavLink } from "react-router-dom";

// ✅ luôn lấy giá cuối cùng (có option nếu có)
const getFinalPrice = (item) => {
  const basePrice = item.optionPrice || item.price;

  if (item.discount) {
    return calculatePrice(basePrice, item.discount);
  }
  return basePrice || 0;
};

const CartDetail = ({
  carts,
  onIncrease,
  onDecrease,
  onRemove,
  onChangeQty,
}) => {
  const [shippingInput, setShippingInput] = useState("0");

  // ✅ subtotal
  const subtotal = carts.reduce((total, item) => {
    const finalPrice = getFinalPrice(item);
    return total + finalPrice * item.quantity;
  }, 0);

  // ✅ tính phí ship
  const calculateShipping = () => {
    if (!shippingInput) return 0;

    if (shippingInput.includes("%")) {
      const percent = parseInt(shippingInput.replace("%", ""));
      if (isNaN(percent)) return 0;
      return Math.round((subtotal * percent) / 100);
    }

    const value = Number(shippingInput);
    return isNaN(value) ? 0 : value;
  };

  const shippingFee = calculateShipping();
  const finalTotal = subtotal + shippingFee;

  // 🔥 CHECKOUT (thêm mới)
  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Bạn cần đăng nhập");
        return;
      }

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            items: carts,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data);
        return;
      }

      alert("Đặt hàng thành công 🎉");

      // 👉 tạm reload (sau có thể dispatch clearCart)
      window.location.reload();
    } catch (err) {
      console.log(err);
      alert("Lỗi server");
    }
  };

  return (
    <div className="cart">
      {/* LEFT */}
      <div className="cart__left">
        <div className="cart__header">
          <ShoppingCartIcon className="cart-icon" /> GIỎ HÀNG
          <span>{carts.length} sản phẩm</span>
        </div>

        {carts.map((item) => {
          const finalPrice = getFinalPrice(item);

          return (
            <div
              className="cart__item"
              key={item.id + (item.option || "default")}
            >
              {/* IMAGE */}
              <NavLink
                to={`/product/${item.id}`}
                className="cart__item-link"
              >
                <img
                  src={item.image || item.images?.[0]}
                  alt={item.name}
                  className="thumb"
                />

                <div className="info">
                  <h4>{item.name}</h4>
                  <div className="size">
                    Size: <span>{item.option || "Mặc định"}</span>
                  </div>
                </div>
              </NavLink>

              {/* PRICE */}
              <div className="price">
                <p>ĐƠN GIÁ:</p>

                <span className="old-price">
                  {formatPrice(item.price)}
                </span>

                <span className="new-price">
                  {formatPrice(finalPrice)}
                </span>

                {item.discount && (
                  <span className="discount">{item.discount}%</span>
                )}
              </div>

              {/* QUANTITY */}
              <div className="qty">
                <button
                  onClick={() =>
                    onDecrease(item.id, item.option)
                  }
                >
                  -
                </button>

                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => {
                    let val = Number(e.target.value);
                    if (!val || val < 1) val = 1;

                    onChangeQty(item.id, item.option, val);
                  }}
                />

                <button
                  onClick={() =>
                    onIncrease(item.id, item.option)
                  }
                >
                  +
                </button>
              </div>

              {/* TOTAL */}
              <div className="total">
                <p>TỔNG:</p>
                <span>
                  {formatPrice(finalPrice * item.quantity)}
                </span>
              </div>

              {/* DELETE */}
              <button
                className="delete"
                onClick={() =>
                  onRemove(item.id, item.option)
                }
              >
                <ArchiveBoxXMarkIcon className="icon-delete" />
              </button>
            </div>
          );
        })}

        <div className="cart__actions">
          <NavLink to={"/product-card/0"} className="back">
            Tiếp tục mua sắm
          </NavLink>
        </div>
      </div>

      {/* RIGHT */}
      <div className="cart__right">
        <div className="summary">
          <h3>
            <CalculatorIcon style={{ width: "24px", height: "24px" }} />
            <span>TỔNG ĐƠN HÀNG</span>
          </h3>

          <div className="row">
            <span>Số lượng sản phẩm:</span>
            <span>{carts.length}</span>
          </div>

          <div className="row">
            <span>Tạm tính:</span>
            <span>{formatPrice(subtotal)}</span>
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

          {/* 🔥 GẮN CHECKOUT */}
          <button className="btn-cod" onClick={handleCheckout}>
            Thanh Toán COD
          </button>

          <NavLink to={'/checkout'} className="btn-momo">
            Thanh toán Momo
          </NavLink>

          <p className="secure">Giao dịch bảo mật & an toàn</p>
        </div>
      </div>
    </div>
  );
};

export default CartDetail;