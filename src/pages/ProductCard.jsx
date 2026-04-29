import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Sidebar from "../components/productCard/Sidebar";
import { fetchProducts } from "../redux/productSlice";
import ProductList from "../components/ProductList";
import "../styles/ProductCard.css";
import { useNavigate, useLocation } from "react-router-dom";
import Pagination from "../components/Pagination";

function ProductCard() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // 👈 thêm
  const location = useLocation(); // 👈 thêm
  const {
    items = [],
    loading,
    page,
    totalPages,
  } = useSelector((state) => state.products || {});

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
      page: params.get("page") ? Number(params.get("page")) : 1,
    };

    setFilters(newFilters);
    handleSearch(newFilters);
  }, [location.search]);

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(location.search);

    params.set("page", newPage);

    navigate(`/product-card?${params.toString()}`);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="product-card">
      <Sidebar />

      <div className="product-content">
        <div className="products">
          {loading ? <p>Loading...</p> : <ProductList products={items} />}
        </div>

        {items.length > 0 && totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}

export default ProductCard;
