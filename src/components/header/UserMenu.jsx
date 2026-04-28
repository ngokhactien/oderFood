import { UserIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/header/UserMenu.css";

export default function UserMenu({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // 👉 chuyển về trang chủ
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
        <NavLink to="/info" className="dropdown-item">
          👤 Thông tin cá nhân
        </NavLink>

        <div className="dropdown-divider"></div>

        <div className="dropdown-item logout" onClick={handleLogout}>
          🚪 Đăng xuất
        </div>
      </div>
    </div>
  );
}
