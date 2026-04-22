import { useDispatch } from "react-redux";
import Sidebar from "../components/productCard/Sidebar";
import { addToCart } from "../redux/cartSlice";
import products from "../data/products.js";
import ProductList from "../components/ProductList.jsx";
import '../styles/ProductCard.css';

function ProductCard() {
  const dispatch = useDispatch();

  const handleAdd = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <div className="product-card">
      <Sidebar />

      <div className="products">
        <ProductList products={products} onAdd={handleAdd} />
      </div>
    </div>
  );
}

export default ProductCard;
