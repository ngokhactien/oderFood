import {
  UserIcon,
  ClipboardDocumentListIcon,
  MapPinIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

import "../styles/profile.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import ConfirmLogout from "../components/profile/ConfirmLogout";
import { logout } from "../redux/authSlice";

export default function Profile() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [showLogout, setShowLogout] = useState(false);

  // ✅ active menu theo URL
  const isActive = (path) => location.pathname === path;

  return (
    <div className="profile">
      {/* SIDEBAR */}
      <div className="profile__sidebar">
        <div className="user">
          <div className="avatar">
            <img
              src={user?.avatar || "https://i.imgur.com/6VBx3io.png"}
              alt="avatar"
            />
          </div>
          <div>
            <h4>{user?.name}</h4>
            <p className="role">{user?.role}</p>
          </div>
        </div>

        <ul className="menu">
          <li
            className={isActive("/info") ? "active" : ""}
            onClick={() => navigate("/info")}
          >
            <UserIcon className="icon" /> Hồ sơ
          </li>

          <li
            className={isActive("/orders") ? "active" : ""}
            onClick={() => navigate("/orders")}
          >
            <ClipboardDocumentListIcon className="icon" /> Đơn mua
          </li>

          <li
            className={isActive("/address") ? "active" : ""}
            onClick={() => navigate("/address")}
          >
            <MapPinIcon className="icon" /> Địa chỉ
          </li>

          <li onClick={() => setShowLogout(true)}>
            <ArrowRightOnRectangleIcon className="icon" />
            Đăng xuất
          </li>
        </ul>
      </div>

      {/* CONTENT THAY ĐỔI */}
      <div className="profile__content">
        <Outlet />
      </div>

      {/* LOGOUT */}
      <ConfirmLogout
        open={showLogout}
        onClose={() => setShowLogout(false)}
        onConfirm={() => {
          dispatch(logout());
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      />
    </div>
  );
}
