import React, { useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ChangePasswordModal from "./ChangePasswordModal";
import "./styles/ProfileInfo.css";
import EditProfileModal from "./EditProfileModal";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/authSlice";
import ConfirmRemoveAvatar from "./ConfirmRemoveAvatar";

export default function ProfileInfo() {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const defaultAddress = user.addresses?.find((item) => item.isDefault);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState(user.avatar || "");
  const [showRemove, setShowRemove] = useState(false);

  const dispatch = useDispatch();

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/avatar`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();

    // UI
    setPreviewAvatar(data.avatar);

    // 🔥 UPDATE REDUX + localStorage
    dispatch(
      updateUser({
        ...user,
        avatar: data.avatar,
      }),
    );
  };

  // set mặc định ảnh
  const handleRemoveAvatar = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/avatar`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    setPreviewAvatar(data.avatar);

    dispatch(
      updateUser({
        ...user,
        avatar: data.avatar,
      }),
    );

    setShowRemove(false);
  };

  return (
    <div className="profile__content">
      <div className="content-header">
        <div>
          <h2>Thông tin tài khoản</h2>
          <p>Quản lý thông tin cá nhân của bạn</p>
        </div>

        <button className="outline" onClick={() => setShowEdit(true)}>
          <PencilSquareIcon className="icon" />
          Sửa hồ sơ
        </button>
      </div>

      <div className="info">
        <div className="row avatar-row">
          <span>Ảnh đại diện</span>

          <div className="avatar-box">
            <div className="avatar-wrapper">
              <img
                src={previewAvatar || "https://i.imgur.com/6VBx3io.png"}
                alt=""
              />

              {/* ❌ NÚT XOÁ */}
              {previewAvatar && (
                <button
                  className="remove-avatar"
                  onClick={() => setShowRemove(true)}
                >
                  ✕
                </button>
              )}
            </div>

            {/* UPLOAD */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                handleUpload(file);
              }}
            />
          </div>
        </div>
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
          <button
            className="link-btn"
            onClick={() => setShowChangePassword(true)}
          >
            Thay đổi
          </button>
        </div>

        <div className="row">
          <span>Địa chỉ</span>

          <div>
            {defaultAddress ? (
              <div>
                {defaultAddress.fullName}({defaultAddress.phone})
                <p>{defaultAddress.address}</p>
              </div>
            ) : (
              <span>Chưa có địa chỉ</span>
            )}
          </div>

          <NavLink to="/address" className="link-btn">
            Thêm địa chỉ
          </NavLink>
        </div>
      </div>
      <ChangePasswordModal
        open={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />
      <EditProfileModal open={showEdit} onClose={() => setShowEdit(false)} />
      <ConfirmRemoveAvatar
        open={showRemove}
        onClose={() => setShowRemove(false)}
        onConfirm={handleRemoveAvatar}
      />
    </div>
  );
}
