import { FaceFrownIcon } from "@heroicons/react/24/outline";
import CartItem from "./CartItem";
import "./styles/productList.css";

const ProductList = ({ products = [], onAdd, size = "small" }) => {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <FaceFrownIcon className="empty-icon" />
        <h3>Không tìm thấy sản phẩm</h3>
        <p>Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
      </div>
    );
  }

  return (
    <div className={`product-list ${size}`}>
      {products.map((item) => (
        <CartItem
          key={item._id}
          product={item}
          onAdd={onAdd}
          size={size}
        />
      ))}
    </div>
  );
};

export default ProductList;