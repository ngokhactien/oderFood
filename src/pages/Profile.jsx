import {
  UserIcon,
  ClipboardDocumentListIcon,
  MapPinIcon,
  ArrowRightOnRectangleIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import "../styles/profile.css";
import { useSelector } from "react-redux";

export default function Profile() {
  const user = useSelector((state) => state.auth.user);
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
          <li className="active">
            <UserIcon className="icon" />
            Hồ sơ
          </li>
          <li>
            <ClipboardDocumentListIcon className="icon" />
            Đơn mua
          </li>
          <li>
            <MapPinIcon className="icon" />
            Địa chỉ
          </li>
          <li>
            <ArrowRightOnRectangleIcon className="icon" />
            Đăng xuất
          </li>
        </ul>
      </div>

      {/* RIGHT CONTENT */}
      <div className="profile__content">
        <div className="content-header">
          <div>
            <h2>Thông tin tài khoản</h2>
            <p>Quản lý thông tin cá nhân của bạn</p>
          </div>

          <button className="outline">
            <PencilSquareIcon className="icon" />
            Sửa hồ sơ
          </button>
        </div>

        <div className="info">
          <div className="row">
            <span>Họ tên</span>
            <span>{user.name}</span>
          </div>

          <div className="row">
            <span>Email</span>
            <span>{user.email}</span>
          </div>

          <div className="row">
            <span>Số điện thoại</span>
            <span>{user.phone}</span>
          </div>

          <div className="row">
            <span>Tên tài khoản</span>
            <span>{user.username}</span>
          </div>

          <div className="row">
            <span>Mật khẩu</span>
            <span>********</span>
            <button className="link-btn">Thay đổi</button>
          </div>

          <div className="row">
            <span>Địa chỉ</span>

            <div>
              {user.addresses?.map((item) => (
                <div key={item._id}>
                  {item.address} ({item.phone})
                </div>
              ))}
            </div>
            <button className="link-btn">Thêm địa chỉ</button>
          </div>
        </div>
      </div>
    </div>
  );
}
