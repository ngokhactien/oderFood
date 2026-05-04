import { useDispatch } from "react-redux";
import ProductList from "../components/ProductList";
import { addToCart } from "../redux/cartSlice.js";
import FoodSlider from "../components/home/FoodSlider.jsx";
import CategoryMenu from "../components/home/CategoryMenu.jsx";
import PromoHeader from "../components/home/PromoHeader.jsx";
import ViewAllButton from "../components/home/ViewAllButton.jsx";
import FoodHeroBanner from "../components/home/FoodHeroBanner.jsx";
import FoodListSection from "../components/home/FoodListSection.jsx";
import CustomerReviews from "../components/home/CustomerReviews.jsx";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  const handleAdd = (product) => {
    dispatch(
      addToCart({
        ...product,
        id: product._id, // 🔥 FIX
        option: "default", // hoặc size nếu có
      }),
    );
  };

  // 🔥 gọi API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products?limit=10`,
        );
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        toast.error("Lỗi fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div>
        <FoodSlider />
        <CategoryMenu />

        {/* sản phẩm khuyến mãi */}
        <PromoHeader title={"Khuyến mãi Online"} hour={true} />
        <ProductList products={products} onAdd={handleAdd} size={"large"} />
        <ViewAllButton />

        <FoodHeroBanner />

        {/* sản bán chạy */}
        <PromoHeader title={"Sản phẩm bán chạy"} hour={false} />
        <ProductList products={products} onAdd={handleAdd} size={"large"} />
        <ViewAllButton />

        <FoodListSection />
        <CustomerReviews />
      </div>
    </>
  );
};

export default Home;
