import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";

import ProductList from "../components/ProductList";
import FoodSlider from "../components/home/FoodSlider.jsx";
import CategoryMenu from "../components/home/CategoryMenu.jsx";
import PromoHeader from "../components/home/PromoHeader.jsx";
import ViewAllButton from "../components/home/ViewAllButton.jsx";
import FoodHeroBanner from "../components/home/FoodHeroBanner.jsx";
import FoodListSection from "../components/home/FoodListSection.jsx";
import CustomerReviews from "../components/home/CustomerReviews.jsx";

import { addToCartAsync } from "../redux/cartSlice.js";

const Home = () => {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  // =========================
  // ADD TO CART
  // =========================
  const handleAdd = (product) => {
    const firstOption = product.options?.[0];

    if (!firstOption) {
      toast.error("Sản phẩm chưa có option");
      return;
    }

    dispatch(
      addToCartAsync({
        productId: product._id,
        optionId: firstOption._id,
        quantity: 1,
      }),
    );
    toast.success("Đã thêm vào giỏ hàng");
  };

  // =========================
  // FETCH PRODUCTS
  // =========================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products?limit=10`,
        );

        const data = await res.json();

        // nếu backend trả:
        // { products: [] }
        if (data.products) {
          setProducts(data.products);
        }

        // nếu backend trả []
        else {
          setProducts(data);
        }
      } catch (err) {
        toast.error("Lỗi tải sản phẩm");

        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <FoodSlider />

      <CategoryMenu />

      {/* KHUYẾN MÃI */}
      <PromoHeader title="Khuyến mãi Online" hour={true} />

      <ProductList
        products={products}
        onAdd={handleAdd}
        size="large"
        loading={loading}
      />

      <ViewAllButton />

      <FoodHeroBanner />

      {/* BÁN CHẠY */}
      <PromoHeader title="Sản phẩm bán chạy" hour={false} />

      <ProductList
        products={products}
        onAdd={handleAdd}
        size="large"
        loading={loading}
      />

      <ViewAllButton />

      <FoodListSection />

      <CustomerReviews />
    </div>
  );
};

export default Home;
