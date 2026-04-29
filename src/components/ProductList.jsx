import CartItem from "./CartItem";
import "./styles/productList.css";

const ProductList = ({ products = [], onAdd }) => {
  return (
    <div className="product-list">
      {products.length > 0 ? (
        products.map((item) => (
          <CartItem key={item._id} product={item} onAdd={onAdd} />
        ))
      ) : (
        <p style={{display:'block'}}>Không có sản phẩm</p>
      )}
    </div>
  );
};

export default ProductList;