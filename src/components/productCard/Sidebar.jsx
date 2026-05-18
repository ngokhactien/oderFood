import { ChevronRightIcon } from "@heroicons/react/24/solid";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { getShowCategories } from "../../redux/categorySlice";

import "../styles/productCard/Sidebar.css";

export default function Sidebar({
  layout = "horizontal",
}) {
  // horizontal | vertical

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const tabRefs = useRef({});
  const tabsContainerRef = useRef(null);

  // REDUX CATEGORY
  const {
    categories = [],
    loading,
  } = useSelector(
    (state) => state.menuCategories
  );

  useEffect(() => {
    dispatch(getShowCategories());
  }, [dispatch]);

  // URL PARAMS
  const params = new URLSearchParams(
    location.search
  );

  const currentCategory =
    params.get("category") || "all";

  // PRICE
  const [minPrice, setMinPrice] =
    useState(0);

  const [maxPrice, setMaxPrice] =
    useState(5000000);

  const formatPrice = (price) =>
    price.toLocaleString("vi-VN");

  const parsePrice = (value) =>
    Number(value.replace(/\D/g, ""));

  useEffect(() => {
    const params = new URLSearchParams(
      location.search
    );

    const min = params.get("minPrice");
    const max = params.get("maxPrice");

    setMinPrice(min ? Number(min) : 0);

    setMaxPrice(
      max ? Number(max) : 5000000
    );
  }, [location.search]);

  // CHANGE CATEGORY
  const handleChangeCategory = (slug) => {
    const params = new URLSearchParams(
      location.search
    );

    if (slug === "all") {
      params.delete("category");
    } else {
      params.set("category", slug);
    }

    params.set("page", 1);

    navigate(
      `${location.pathname}?${params.toString()}`
    );
  };

  // AUTO SCROLL TAB ACTIVE
  useEffect(() => {
    if (layout !== "horizontal") return;

    const el =
      tabRefs.current[currentCategory];

    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [currentCategory, layout]);

  return (
    <>
      {layout === "horizontal" ? (
        <div className="menu-tabs-wrapper">
          {/* TAB ALL */}
          <button
            className={`tab ${
              currentCategory === "all"
                ? "active"
                : ""
            }`}
            onClick={() =>
              handleChangeCategory("all")
            }
          >
            Tất cả
          </button>

          {/* CATEGORY */}
          <div
            className="menu-tabs"
            ref={tabsContainerRef}
          >
            {loading ? (
              <p>Đang tải...</p>
            ) : (
              categories.map((cat) => (
                <button
                  key={cat._id}
                  ref={(el) =>
                    (tabRefs.current[cat.slug] =
                      el)
                  }
                  className={`tab ${
                    currentCategory === cat.slug
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    handleChangeCategory(
                      cat.slug
                    )
                  }
                >
                  {cat.name}
                </button>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="sidebar">
          <h3 className="title">
            DANH MỤC
          </h3>

          <ul className="menu">
            {/* ALL */}
            <li
              onClick={() =>
                handleChangeCategory("all")
              }
              className={`menu-item ${
                currentCategory === "all"
                  ? "active"
                  : ""
              }`}
            >
              <ChevronRightIcon className="icon" />
              Tất cả
            </li>

            {/* CATEGORY */}
            {categories.map((item) => (
              <li
                key={item._id}
                onClick={() =>
                  handleChangeCategory(
                    item.slug
                  )
                }
                className={`menu-item ${
                  currentCategory ===
                  item.slug
                    ? "active"
                    : ""
                }`}
              >
                <ChevronRightIcon className="icon" />
                {item.name}
              </li>
            ))}
          </ul>

          {/* PRICE FILTER */}
          <div className="price-filter">
            <h3 className="title">
              TÌM THEO GIÁ
            </h3>

            <input
              type="range"
              min="0"
              max="5000000"
              value={minPrice}
              onChange={(e) => {
                const value = Number(
                  e.target.value
                );

                if (value <= maxPrice)
                  setMinPrice(value);
              }}
            />

            <input
              type="range"
              min="0"
              max="5000000"
              value={maxPrice}
              onChange={(e) => {
                const value = Number(
                  e.target.value
                );

                if (value >= minPrice)
                  setMaxPrice(value);
              }}
            />

            <div className="price-inputs">
              <label>Giá từ:</label>

              <input
                value={formatPrice(minPrice)}
                onChange={(e) => {
                  const value =
                    parsePrice(
                      e.target.value
                    );

                  if (value <= maxPrice)
                    setMinPrice(value);
                }}
              />

              <label>đến:</label>

              <input
                value={formatPrice(maxPrice)}
                onChange={(e) => {
                  const value =
                    parsePrice(
                      e.target.value
                    );

                  if (value >= minPrice)
                    setMaxPrice(value);
                }}
              />
            </div>

            <button
              className="btn-filter"
              onClick={() => {
                const params =
                  new URLSearchParams(
                    location.search
                  );

                if (minPrice > 0)
                  params.set(
                    "minPrice",
                    minPrice
                  );
                else
                  params.delete(
                    "minPrice"
                  );

                if (maxPrice < 5000000)
                  params.set(
                    "maxPrice",
                    maxPrice
                  );
                else
                  params.delete(
                    "maxPrice"
                  );

                params.set("page", 1);

                navigate(
                  `/product-card?${params.toString()}`
                );
              }}
            >
              LỌC GIÁ
            </button>
          </div>
        </div>
      )}
    </>
  );
}