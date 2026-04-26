import {
  UserIcon,
  ClipboardDocumentListIcon,
  MapPinIcon,
  ArrowRightOnRectangleIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import "../styles/profile.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import ProfileInfo from "../components/profile/ProfileInfo";
import Address from "../components/profile/Address";
import ConfirmLogout from "../components/profile/ConfirmLogout";
import { logout } from "../redux/authSlice";

export default function Profile() {
  const user = useSelector((state) => state.auth.user);
  const [tab, setTab] = useState("profile");
  const [showLogout, setShowLogout] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="profile">
      {/* LEFT SIDEBAR */}
      <div className="profile__sidebar">
        <div className="user">
          <div className="avatar"></div>
          <div>
            <h4>{user.name}</h4>
            <p className="role">{user.role}</p>
          </div>
        </div>

        <ul className="menu">
          <li onClick={() => setTab("profile")}>
            {" "}
            <UserIcon className="icon" /> Hồ sơ
          </li>
          <li onClick={() => setTab("orders")}>
            <ClipboardDocumentListIcon className="icon" /> Đơn mua
          </li>
          <li onClick={() => setTab("address")}>
            {" "}
            <MapPinIcon className="icon" /> Địa chỉ
          </li>
          <li onClick={() => setShowLogout(true)}>
            <ArrowRightOnRectangleIcon className="icon" />
            Đăng xuất
          </li>
        </ul>
      </div>

      {/* RIGHT CONTENT */}
      <div className="profile__content">
        {tab === "profile" && <ProfileInfo user={user} />}
        {tab === "address" && <Address addresses={user.addresses} />}
      </div>
      <ConfirmLogout
        open={showLogout}
        onClose={() => setShowLogout(false)}
        onConfirm={() => {
          dispatch(logout());
          localStorage.removeItem("token");
          // window.location.href = "/"; // hoặc navigate
        }}
      />
    </div>
  );
}
