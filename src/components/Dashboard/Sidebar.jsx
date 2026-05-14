import React from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  ShoppingCartIcon,
  CubeIcon,
  CalendarIcon,
  CurrencyDollarIcon
} from "@heroicons/react/24/outline";

const Sidebar = ({ open }) => {
  return (
    <div className={`admin-sidebar ${open ? "" : "close"}`}>
      <h2 className="logo">EGA FOODY</h2>

      <nav>
        <NavLink to="/admin">
          <HomeIcon /> Dashboard
        </NavLink>

        <NavLink to="/admin/orders">
          <ShoppingCartIcon /> Đơn hàng
        </NavLink>

        <NavLink to="/admin/products">
          <CubeIcon /> Sản phẩm
        </NavLink>
       <NavLink to="/admin/bookings">
          <CalendarIcon/>  Đặt bàn
        </NavLink>
        <NavLink to="/admin/revenue">
          <CurrencyDollarIcon />  Doanh Thu
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
