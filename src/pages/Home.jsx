import { useDispatch } from "react-redux";
import ProductList from "../components/ProductList";
import products from "../data/products.js";
import { addToCart } from "../redux/cartSlice.js";
import FoodSlider from "../components/FoodSlider.jsx";
import CategoryMenu from "../components/CategoryMenu.jsx";
import PromoHeader from "../components/PromoHeader.jsx";
import ViewAllButton from "../components/ViewAllButton.jsx";
import FoodHeroBanner from "../components/FoodHeroBanner.jsx";
import FoodListSection from "../components/FoodListSection.jsx";

const Home = () => {
  const dispatch = useDispatch();

  const handleAdd = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <>
      <div style={{ padding: "var(--padding-app)" }}>
        <FoodSlider />
        <CategoryMenu />

        {/* sản phẩm khuyến mãi */}
        <PromoHeader title={"Khuyến mãi Online"} hour={true}/>
        <ProductList products={products} onAdd={handleAdd} />
        <ViewAllButton />

        <FoodHeroBanner />

        {/* sản bán chạy */}
        <PromoHeader title={"Sản phẩm bán chạy"} hour={false} />
        <ProductList products={products} onAdd={handleAdd} />
        <ViewAllButton />

        <FoodListSection/>

      </div>
    </>
  );
};

export default Home;
