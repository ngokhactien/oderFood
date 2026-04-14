import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import "./Header.css";

import menuItems from "../data/menuHeader";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      {/* Thanh trên */}
      <div className="header-top">
        <div className="header-container">
          {/* Logo */}
          <div className="header-logo">
            <span className="logo-text">Tiến NK</span>
          </div>

          <nav className="nav-menu">
            <ul  className="menu-header">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.link}
                    className="header-action header-list"
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Thanh tìm kiếm */}
          <div className="header-search">
            <MagnifyingGlassIcon className="search-icon" />
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="search-input"
            />
          </div>

          {/* Giỏ hàng và Đăng nhập */}
          <div className="header-actions">
            <button className="header-action">
              <ShoppingCartIcon className="icon" />
              <span>Giỏ hàng</span>
            </button>
            <button className="header-action">
              <UserIcon className="icon" />
              <span>Đăng nhập</span>
            </button>
          </div>
        </div>
      </div>

      {/* Thanh màu xám phía dưới */}
      <div className="header-bottom"></div>
    </header>
  );
};

export default Header;
