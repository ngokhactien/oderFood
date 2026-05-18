import {
  UserIcon,
  ArrowLeftStartOnRectangleIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

import { useDispatch } from "react-redux";

import { logout } from "../../redux/authSlice";

import { NavLink, useNavigate } from "react-router-dom";

import "../styles/header/UserMenu.css";

export default function UserMenu({ user }) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());

    navigate("/");
  };

  return (
    <div className="header-action user-menu">
      <img
        src={user.avatar || "https://i.imgur.com/6VBx3io.png"}
        alt="avatar"
        className="header-avatar"
      />

      <span>{user.username || user.name}</span>

      <div className="user-dropdown">
        {/* PROFILE */}
        <NavLink to="/info" className="dropdown-item">
          <UserIcon className="dropdown-icon" />

          Thông tin cá nhân
        </NavLink>

        {/* ADMIN */}
        {user?.role === "admin" && (
          <NavLink to="/admin" className="dropdown-item">
            <ShieldCheckIcon className="dropdown-icon" />

            Quản lý (Admin)
          </NavLink>
        )}

        <div className="dropdown-divider"></div>

        {/* LOGOUT */}
        <div className="dropdown-item logout" onClick={handleLogout}>
          <ArrowLeftStartOnRectangleIcon className="dropdown-icon" />

          Đăng xuất
        </div>
      </div>
    </div>
  );
}