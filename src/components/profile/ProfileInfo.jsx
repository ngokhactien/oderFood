import { PencilSquareIcon } from "@heroicons/react/24/outline";
import "../styles/profile/ProfileInfo.css";

export default function ProfileInfo({user}) {

  return (
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
  );
}
