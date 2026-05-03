import { useState, useEffect } from "react";
import "./styles/CartItem.css";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import DEFAULT_IMAGE from "../assets/x.jpg";
import { NavLink } from "react-router-dom";
import { calculatePrice } from "../common/calculatePrice";
import { toast } from "react-toastify";

const CartItem = ({ product, onAdd, size = "small" }) => {
  const { name, price, discount, _id, category } = product;

  const finalPrice = calculatePrice(price, discount);

  const initialImage =
    product?.images?.[0] || product?.image || DEFAULT_IMAGE;

  const [imgSrc, setImgSrc] = useState(initialImage);

  useEffect(() => {
    setImgSrc(initialImage);
  }, [product]);

  const formatPrice = (value) => value.toLocaleString("vi-VN") + "đ";

  return (
    <NavLink
      to={`/product/${_id}`}
      state={{ product }}
      className={`card ${size}`}
    >
      <div className="card-img">
        <img
          src={imgSrc}
          alt={name}
          onError={() => setImgSrc(DEFAULT_IMAGE)}
        />
        {discount > 0 && <span className="badge">{discount}%</span>}
      </div>

      <div className="card-body">
        {size === "large" && <p className="category">{category}</p>}

        <h4 className="name">{name}</h4>

        <div className="price-box">
          <div>
            {size === "large" && price && (
              <span className="old-price">{formatPrice(price)}</span>
            )}
            <span className="price">{formatPrice(finalPrice)}</span>
          </div>

          <button
            className="add-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (onAdd) onAdd(product);
              toast.success("Thêm vào giỏ hàng thành công!");
            }}
          >
            <ShoppingCartIcon className="cart-icon" />
          </button>
        </div>
      </div>
    </NavLink>
  );
};

export default CartItem;