import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Sidebar from "../components/productCard/Sidebar";
import { fetchProducts } from "../redux/productSlice";
import { useLocation } from "react-router-dom";
import ProductList from "../components/ProductList";
import "../styles/ProductCard.css";

function ProductCard() {
  const dispatch = useDispatch();
  const { items = [], loading } = useSelector((state) => state.products || {});
  const location = useLocation();

  const [filters, setFilters] = useState({
    q: "",
    category: "",
    minPrice: 0,
    maxPrice: 5000000,
    page: 1,
  });

  // 👉 gọi API mỗi khi filter đổi
  const handleSearch = (customFilters = filters) => {
    const finalFilters = {
      ...customFilters,
      page: 1,
    };

    if (finalFilters.minPrice === 0) delete finalFilters.minPrice;
    if (finalFilters.maxPrice === 5000000) delete finalFilters.maxPrice;

    if (!finalFilters.category || finalFilters.category === "all") {
      delete finalFilters.category;
    }

    dispatch(fetchProducts(finalFilters));
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const newFilters = {
      q: params.get("q") || "",
      category: params.get("category") || "",
      minPrice: params.get("minPrice") ? Number(params.get("minPrice")) : 0,
      maxPrice: params.get("maxPrice")
        ? Number(params.get("maxPrice"))
        : 5000000,
      page: 1,
    };

    setFilters(newFilters);
    handleSearch(newFilters);
  }, [location.search]);

  return (
    <div className="product-card">
      <Sidebar
      />
      <div className="products">
        {loading ? <p>Loading...</p> : <ProductList products={items} />}
      </div>
    </div>
  );
}

export default ProductCard;
