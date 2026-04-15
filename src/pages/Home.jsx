import { useDispatch } from "react-redux";
import ProductList from "../components/ProductList";
import products from "../data/products.js";
import { addToCart } from "../redux/cartSlice.js";

const Home = () => {
  const dispatch = useDispatch();

  const handleAdd = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <>
    <div style={{ padding: "20px" }}>
      <h2>Hot deal</h2>

      <ProductList
        products={products}
        onAdd={handleAdd}
      />
    </div>
    </>
  );
};

export default Home;