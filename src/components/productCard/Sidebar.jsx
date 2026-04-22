import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/productCard/Sidebar.css";
import categories from "../../data/sidebar";
import { useState } from "react";

export default function Sidebar() {
  const navigate = useNavigate();
  const { id } = useParams(); // 🔥 lấy id từ URL

  const activeIndex = Number(id) || 0;

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000000);

  const formatPrice = (price) => price.toLocaleString("vi-VN");

  const parsePrice = (value) => Number(value.replace(/\D/g, ""));

  return (
    <div className="sidebar">
      <h3 className="title">DANH MỤC</h3>

      <ul className="menu">
        {categories.map((item, index) => (
          <li
            key={index}
            onClick={() => navigate(`/product-card/${index}`)} // 🔥 đổi URL
            className={`menu-item ${
              activeIndex === index ? "active" : ""
            }`}
          >
            <ChevronRightIcon className="icon" />
            {item}
          </li>
        ))}
      </ul>

      {/* FILTER GIÁ */}
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
            console.log("Filter:", minPrice, maxPrice);
          }}
        >
          LỌC GIÁ
        </button>
      </div>
    </div>
  );
}