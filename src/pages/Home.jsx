import { useDispatch } from "react-redux";
import ProductList from "../components/ProductList";
import products from "../data/products.js";
import { addToCart } from "../redux/cartSlice.js";
import FoodSlider from "../components/home/FoodSlider.jsx";
import CategoryMenu from "../components/CategoryMenu.jsx";
import PromoHeader from "../components/PromoHeader.jsx";
import ViewAllButton from "../components/ViewAllButton.jsx";
import FoodHeroBanner from "../components/home/FoodHeroBanner.jsx";
import FoodListSection from "../components/home/FoodListSection.jsx";
import CustomerReviews from "../components/home/CustomerReviews.jsx";

const Home = () => {
  const dispatch = useDispatch();

  const handleAdd = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <>
      <div>
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
        <CustomerReviews/>
      </div>
    </>
  );
};

export default Home;
