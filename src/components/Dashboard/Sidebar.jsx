import React, { useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";

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
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import ConfirmLogout from "../../common/ConfirmLogout";

// import ConfirmLogout from "../../../common/ConfirmLogout";

const Sidebar = ({ open }) => {
  const navigate = useNavigate();

  const [openLogout, setOpenLogout] = useState(false);

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    // xóa token / user
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    // đóng modal
    setOpenLogout(false);

    // chuyển trang
    navigate("/login");
  };

  return (
    <>
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
            <CurrencyDollarIcon /> Danh Mục
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

          {/* LOGOUT */}
          <button
            className="sidebar-logout-btn"
            onClick={() => setOpenLogout(true)}
          >
            <ArrowLeftStartOnRectangleIcon />
            Đăng xuất
          </button>
        </nav>
      </div>

      {/* MODAL LOGOUT */}
      <ConfirmLogout
        open={openLogout}
        onClose={() => setOpenLogout(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Sidebar;