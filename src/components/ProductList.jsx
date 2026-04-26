import CartItem from "./CartItem";
import "./styles/productList.css";

const ProductList = ({ products, onAdd }) => {
  return (
    <div className="product-list">
      {products.map((item) => (
        <CartItem key={item._id} product={item} onAdd={onAdd} />
      ))}
    </div>
  );
};

export default ProductList;
