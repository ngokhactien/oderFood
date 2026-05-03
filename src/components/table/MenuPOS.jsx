import { useEffect } from "react";
import "../styles/table/menuPOS.css";
import ProductList from "../ProductList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../productCard/Sidebar";
import { fetchTableProducts } from "../../redux/tableFoodSlice";
import Pagination from "../Pagination";

export default function MenuPOS({ onAdd }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    items = [],
    loading,
    page,
    totalPages,
  } = useSelector((state) => state.tableProducts || {});

  // =========================
  // FETCH DATA FROM URL
  // =========================
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    dispatch(
      fetchTableProducts({
        q: params.get("q") || "",
        category: params.get("category") || "",
        page: Number(params.get("page")) || 1,
      })
    );
  }, [location.search, dispatch]);

  // =========================
  // PAGINATION
  // =========================
  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(location.search);

    params.set("page", newPage);

    navigate(`${location.pathname}?${params.toString()}`);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="menu-pos">
      {/* SIDEBAR (HORIZONTAL MODE) */}
      <Sidebar layout="horizontal" />

      {/* PRODUCTS */}
      <div className="product-content">
        <div className="products">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ProductList products={items} onAdd={onAdd} size={'small'} />
          )}
        </div>

        {/* PAGINATION */}
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