import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/productCard/Sidebar.css";
import categories from "../../data/sidebar";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const currentCategory = params.get("category") || "all";

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000000);

  const formatPrice = (price) => price.toLocaleString("vi-VN");
  const parsePrice = (value) => Number(value.replace(/\D/g, ""));

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const min = params.get("minPrice");
    const max = params.get("maxPrice");

    setMinPrice(min ? Number(min) : 0);
    setMaxPrice(max ? Number(max) : 5000000);
  }, [location.search]);

  return (
    <div className="sidebar">
      <h3 className="title">DANH MỤC</h3>

      <ul className="menu">
        {categories.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              const params = new URLSearchParams(location.search);

              if (item.value === "all") {
                params.delete("category");
              } else {
                params.set("category", item.value);
              }

              navigate(`/product-card?${params.toString()}`);
            }}
            className={`menu-item ${
              currentCategory === item.value ? "active" : ""
            }`}
          >
            <ChevronRightIcon className="icon" />
            {item.label}
          </li>
        ))}
      </ul>

      <div className="price-filter">
        <h3 className="title">TÌM THEO GIÁ</h3>

        <input
          type="range"
          min="0"
          max="5000000"
          value={minPrice}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value <= maxPrice) setMinPrice(value);
          }}
        />

        <input
          type="range"
          min="0"
          max="5000000"
          value={maxPrice}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value >= minPrice) setMaxPrice(value);
          }}
        />

        <div className="price-inputs">
          <label>Giá từ:</label>
          <input
            value={formatPrice(minPrice)}
            onChange={(e) => {
              const value = parsePrice(e.target.value);
              if (value <= maxPrice) setMinPrice(value);
            }}
          />

          <label>đến:</label>
          <input
            value={formatPrice(maxPrice)}
            onChange={(e) => {
              const value = parsePrice(e.target.value);
              if (value >= minPrice) setMaxPrice(value);
            }}
          />
        </div>

        <button
          className="btn-filter"
          onClick={() => {
            const params = new URLSearchParams(location.search);

            if (minPrice > 0) params.set("minPrice", minPrice);
            else params.delete("minPrice");

            if (maxPrice < 5000000) params.set("maxPrice", maxPrice);
            else params.delete("maxPrice");

            navigate(`/product-card?${params.toString()}`);
          }}
        >
          LỌC GIÁ
        </button>
      </div>
    </div>
  );
}
