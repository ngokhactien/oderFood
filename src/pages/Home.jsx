import ProductList from "../components/ProductList";
import products from "../data/products.js";

const Home = () => {

  return (
    <>
    <div style={{ padding: "20px" }}>
      <h2>Hot deal</h2>

      <ProductList
        products={products}
        // onAdd={handleAdd}
      />
    </div>
    </>
  );
};

export default Home;