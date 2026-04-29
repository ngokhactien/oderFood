import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
  ChevronDownIcon, // Thêm icon này nếu muốn giống ảnh
} from "@heroicons/react/24/outline";
import "../styles/header/Header.css";

import menuItems from "../../data/menuHeader";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import UserMenu from "./UserMenu";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);

  const [keyword, setKeyword] = useState("");
  const [lang, setLang] = useState("EN");

  const inputRef = useRef();
  const searchRef = useRef();
  const lastKeyword = useRef("");

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ SEARCH
  const handleSearch = () => {
    const params = new URLSearchParams(location.search);

    if (keyword.trim()) {
      params.set("q", keyword);
    } else {
      params.delete("q");
    }

    params.set("page", 1); // reset page

    navigate(`/product-card?${params.toString()}`);
  };

  // ✅ CLEAR
  const handleClear = () => {
    setKeyword("");

    const params = new URLSearchParams(location.search);
    params.delete("q");
    params.set("page", 1);

    navigate(`/product-card?${params.toString()}`);

    inputRef.current.focus();
  };

  // ✅ ENTER
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // ✅ sync input với URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setKeyword(params.get("q") || "");
  }, [location.search]);

  // ✅ click outside → search (không spam)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target)
      ) {
        if (keyword !== lastKeyword.current) {
          lastKeyword.current = keyword;
          handleSearch();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [keyword]);

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-container">

          {/* LOGO */}
          <div className="header-logo">
            <NavLink to="/" className="logo-text">
              Tiến NK
            </NavLink>
          </div>

          {/* MENU */}
          <nav className="nav-menu">
            <ul className="menu-header">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <NavLink to={item.link} className="header-action header-list">
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* SEARCH */}
          <div className="header-search" ref={searchRef}>
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="search-input"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
              ref={inputRef}
            />

            {keyword && (
              <button className="clear-btn" onClick={handleClear}>
                <XMarkIcon className="clear-icon" />
              </button>
            )}

            <button className="search-btn" onClick={handleSearch}>
              <MagnifyingGlassIcon className="search-icon" />
            </button>
          </div>

          {/* ACTIONS */}
          <div className="header-actions">

            {/* LANG */}
            <div className="language-selector">
              <div className="lang-wrapper">
                <div className="language-selector">
                  <span>{lang}</span>
                  <ChevronDownIcon className="chevron-icon" />
                </div>

                <ul className="lang-dropdown">
                  <li onClick={() => setLang("VN")}>VN</li>
                  <li onClick={() => setLang("EN")}>EN</li>
                </ul>
              </div>

              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider round"></span>
              </label>
            </div>

            {/* CART */}
            <div className="cart-wrapper">
              <NavLink to="/cart" className="cart-icon-link">
                <ShoppingCartIcon className="icon" />
                <span className="cart-badge">{cartItems.length}</span>
              </NavLink>
            </div>

            {/* USER */}
            {user ? (
              <UserMenu user={user} />
            ) : (
              <NavLink to="/login" className="header-action">
                <UserIcon className="icon" />
                <span>Đăng nhập</span>
              </NavLink>
            )}

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
