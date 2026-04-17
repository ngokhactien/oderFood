import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
  ChevronDownIcon, // Thêm icon này nếu muốn giống ảnh
} from "@heroicons/react/24/outline";
import "./styles/Header.css";

import menuItems from "../data/menuHeader";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const Header = () => {
  // Lấy danh sách sản phẩm trong giỏ hàng
  const cartItems = useSelector((state) => state.cart.items);
  const [lang, setLang] = useState("EN");
  const [showLangMenu, setShowLangMenu] = useState(false);

  // Tính tổng số lượng sản phẩm
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-container">
          <div className="header-logo">
            <span className="logo-text">Tiến NK</span>
          </div>

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

          <div className="header-search">
            <MagnifyingGlassIcon className="search-icon" />
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="search-input"
            />
          </div>

          <div className="header-actions">
            {/* Cụm Ngôn ngữ và Toggle */}
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

            {/* Giỏ hàng có Badge số 3 */}
            <button className="header-action cart-btn">
              <div className="icon-wrapper">
                <ShoppingCartIcon className="icon" />
                <span className="cart-badge">{cartCount}</span>
              </div>
            </button>

            <button className="header-action">
              <UserIcon className="icon" />
              <span>Đăng nhập</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
