import React from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  ShoppingCartIcon,
  CubeIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ArchiveBoxIcon,
  UsersIcon,
  ChatBubbleLeftRightIcon,
  DocumentChartBarIcon,
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
          <CalendarIcon /> Đặt bàn
        </NavLink>
        <NavLink to="/admin/revenue">
          <CurrencyDollarIcon /> Doanh Thu
        </NavLink>

         <NavLink to="/admin/categories">
          <CurrencyDollarIcon /> Doanh Mục
        </NavLink>

        <NavLink to="/admin/inventory">
          <ArchiveBoxIcon /> Quản lý Kho
        </NavLink>

        <NavLink to="/admin/comments">
          <ChatBubbleLeftRightIcon /> Bình Luận
        </NavLink>

        <NavLink to="/admin/reports">
          <DocumentChartBarIcon /> Báo cáo
        </NavLink>

        <NavLink to="/admin/members">
          <UsersIcon /> Thành Viên
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
