import {
  ShoppingCartIcon,
  UserIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import "./styles/Header.css";

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import UserMenu from "./UserMenu";
import SearchBar from "./SearchBar";
import useMenuItems from "../../data/menuHeader";

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);

  const [lang, setLang] = useState("EN");
  const menuItems = useMenuItems();

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

          {/* SEARCH */}
          <SearchBar />

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
            </div>

            {/* CART */}
            <div className="cart-wrapper">
              <NavLink to="/cart" className="cart-icon-link">
                <ShoppingCartIcon className="icon" />
                <span className="cart-badge">
                  {cartItems.length}
                </span>
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