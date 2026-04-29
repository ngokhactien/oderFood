import { useState, useEffect } from "react";
import "./styles/CartItem.css";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import DEFAULT_IMAGE from "../assets/x.jpg";
import { NavLink } from "react-router-dom";
import { calculatePrice } from "../common/calculatePrice";
import { toast } from "react-toastify";

const CartItem = ({ product, onAdd }) => {
  const { name, brand, price, discount, _id } = product;

  // Tính giá sau khi giảm
  // const finalPrice = calculatePrice(price, discount);
  const finalPrice = calculatePrice(price, discount);

  // Lấy ảnh đầu tiên từ images hoặc fallback về image
  const initialImage = product?.images?.[0] || product?.image || DEFAULT_IMAGE;

  const [imgSrc, setImgSrc] = useState(initialImage);

  // Cập nhật lại ảnh khi product thay đổi
  useEffect(() => {
    setImgSrc(initialImage);
  }, [initialImage]);

  // Format giá tiền
  const formatPrice = (value) => value.toLocaleString("vi-VN") + "đ";

  // Khi ảnh lỗi, thay bằng ảnh mặc định
  const handleImageError = () => {
    console.error(`❌ Ảnh lỗi - ID ${_id}: ${name}`, initialImage);
    setImgSrc(DEFAULT_IMAGE);
  };

  return (
    <NavLink
      to={`/product/${_id}`}
      state={{ product }} // Truyền object product sang trang chi tiết
      className="card"
    >
      {/* Hình ảnh sản phẩm */}
      <div className="card-img">
        <img
          src={imgSrc}
          alt={name}
          onError={handleImageError}
          loading="lazy"
        />
        {discount > 0 && <span className="badge">{discount}%</span>}
      </div>

      {/* Thông tin sản phẩm */}
      <div className="card-body">
        <p className="category">{product.category}</p>
        <h4 className="name">{name}</h4>

        <div className="price-box">
          <div>
            {price && (
              <span className="old-price">{formatPrice(price)}</span>
            )}
            <span className="price">{formatPrice(finalPrice)}</span>
          </div>

          {/* Nút thêm vào giỏ hàng */}
          <button
            className="add-btn"
            onClick={(e) => {
              e.preventDefault(); // Ngăn NavLink chuyển trang
              e.stopPropagation(); // Ngăn bubbling
              onAdd(product);
              toast.success("Thêm vào giỏ hàng thành công!");
            }}
            aria-label="Thêm vào giỏ hàng"
          >
            <ShoppingCartIcon className="cart-icon" />
          </button>
        </div>
      </div>
    </NavLink>
  );
};

export default CartItem;
