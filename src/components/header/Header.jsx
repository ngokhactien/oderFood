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
import { useState } from "react";
import UserMenu from "./UserMenu";

const Header = () => {
  // Lấy danh sách sản phẩm trong giỏ hàng
  const cartItems = useSelector((state) => state.cart.items);
  const [lang, setLang] = useState("EN");
  const user = useSelector((state) => state.auth.user);

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-container">
          <div className="header-logo">
            <NavLink to={'/'} className="logo-text">Tiến NK</NavLink>
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

            <div className="cart-wrapper">
              <NavLink to="/cart" className="cart-icon-link">
                <ShoppingCartIcon className="icon" />
                <span className="cart-badge">{cartItems.length}</span>
              </NavLink>

              {/* DROPDOWN */}
              <div className="cart-dropdown">
                <h4>Sản phẩm mới thêm</h4>
                {[...cartItems]
                  .reverse()
                  .slice(0, 5)
                  .map((item, index) => (
                    <NavLink
                      to={`/product/${item.id}`}
                      className="cart-item"
                      key={index}
                    >
                      <img
                        src={item.images || "https://via.placeholder.com/40"}
                        alt=""
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/40";
                        }}
                      />

                      <div className="cart-info">
                        <p className="name">{item.name}</p>
                        {/* 👉 SỐ LƯỢNG */}
                        <span className="quantity">x{item.quantity}</span>
                      </div>

                      <span className="price">
                        {item.price.toLocaleString("vi-VN")}đ
                      </span>
                    </NavLink>
                  ))}
                <div className="cart-footer">
                  <span>{cartItems.length} Thêm Hàng Vào Giỏ</span>
                  <NavLink to="/cart">
                    <button>Xem Giỏ Hàng</button>
                  </NavLink>
                </div>
              </div>
            </div>

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
