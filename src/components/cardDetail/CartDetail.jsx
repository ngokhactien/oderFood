import { useState } from "react";
import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/outline";
import { formatPrice, calculatePrice } from "../../common/calculatePrice";
import { CalculatorIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import "../styles/cardDetail/CardDetail.css";
import { NavLink } from "react-router-dom";
// ✅ luôn lấy giá cuối cùng
const getFinalPrice = (item) => {
  if (item.discount) {
    return calculatePrice(item.price, item.discount);
  }
  return item.price || 0;
};

const CartDetail = ({
  carts,
  onIncrease,
  onDecrease,
  onRemove,
  onChangeQty,
}) => {
  const [shippingInput, setShippingInput] = useState("0");

  console.log("carts", carts);

  // ✅ subtotal (đã giảm)
  const subtotal = carts.reduce((total, item) => {
    const finalPrice = getFinalPrice(item);
    return total + finalPrice * item.quantity;
  }, 0);

  // ✅ tính phí ship
  const calculateShipping = () => {
    if (!shippingInput) return 0;

    // dạng %
    if (shippingInput.includes("%")) {
      const percent = parseInt(shippingInput.replace("%", ""));
      if (isNaN(percent)) return 0;
      return Math.round((subtotal * percent) / 100);
    }

    // dạng số tiền
    const value = Number(shippingInput);
    return isNaN(value) ? 0 : value;
  };

  const shippingFee = calculateShipping();

  // ✅ tổng cuối
  const finalTotal = subtotal + shippingFee;

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
            <div className="cart__item" key={item.id + item.size}>
              {/* IMAGE */}
              <NavLink to={`/product/${item.id}`} className="cart__item-link">
                <img
                  src={item.image || item.images?.[0]}
                  alt={item.name}
                  className="thumb"
                />

                {/* INFO */}
                <div className="info">
                  <h4>{item.name}</h4>
                  <div className="size">
                    Size: <span>{item.size || "Mặc định"}</span>
                  </div>
                </div>
              </NavLink>
              
              {/* PRICE */}
              <div className="price">
                <p>ĐƠN GIÁ:</p>

                <span className="old-price">{formatPrice(item.price)}</span>

                <span className="new-price">{formatPrice(finalPrice)}</span>

                {item.discount && (
                  <span className="discount">{item.discount}</span>
                )}
              </div>
              {/* QUANTITY */}
              <div className="qty">
                <button onClick={() => onDecrease(item.id, item.size)}>
                  -
                </button>

                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => {
                    let val = Number(e.target.value);
                    if (!val || val < 1) val = 1;
                    onChangeQty(item.id, item.size, val);
                  }}
                />

                <button onClick={() => onIncrease(item.id, item.size)}>
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
                onClick={() => onRemove(item.id, item.size)}
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

          {/* INPUT SHIP */}
          <div className="row">
            <span>Phí vận chuyển:</span>
            <input
              className="shipping-input"
              value={shippingInput}
              onChange={(e) => setShippingInput(e.target.value)}
              placeholder="VD: 20000 hoặc 10%"
            />
          </div>

          {/* HIỂN THỊ SHIP */}
          <div className="row">
            <span>Phí ship:</span>
            <span>{formatPrice(shippingFee)}</span>
          </div>

          <hr />

          <div className="total-price">
            <span>Tổng cộng:</span>
            <span>{formatPrice(finalTotal)}</span>
          </div>

          <button className="btn-cod">Thanh Toán COD</button>
          <button className="btn-momo">Thanh Toán MoMo</button>

          <p className="secure">Giao dịch bảo mật & an toàn</p>
        </div>
      </div>
    </div>
  );
};

export default CartDetail;
