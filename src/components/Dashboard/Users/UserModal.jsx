// components/UserModal.jsx

import { useEffect, useState } from "react";

import "./styles/UserModal.css";

const initialState = {
  name: "",
  username: "",
  email: "",
  password: "",
  phone: "",
  avatar: "",
  role: "user",

  addresses: [
    {
      fullName: "",
      phone: "",
      address: "",
      ward: "",
      district: "",
      isDefault: true,
    },
  ],
};

const UserModal = ({ open, onClose, onSubmit, loading, user }) => {
  const isEdit = !!user;

  const [form, setForm] = useState(initialState);

  const [errors, setErrors] = useState({});

  // =========================
  // AUTO FILL
  // =========================
  useEffect(() => {
    setErrors({});

    if (user) {
      setForm({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        password: "",
        phone: user.phone || "",
        avatar: user.avatar || "",
        role: user.role || "user",

        addresses:
          user.addresses?.length > 0
            ? user.addresses
            : initialState.addresses,
      });
    } else {
      setForm(initialState);
    }
  }, [user, open]);

  if (!open) return null;

  // =========================
  // CHANGE
  // =========================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  // =========================
  // ADDRESS CHANGE
  // =========================
  const handleAddressChange = (index, field, value) => {
    setForm((prev) => {
      const updatedAddresses = [...prev.addresses];

      updatedAddresses[index] = {
        ...updatedAddresses[index],
        [field]: value,
      };

      return {
        ...prev,
        addresses: updatedAddresses,
      };
    });

    setErrors((prev) => ({
      ...prev,
      [`addresses.${index}.${field}`]: "",
    }));
  };

  // =========================
  // ADD ADDRESS
  // =========================
  const addAddress = () => {
    if (form.addresses.length >= 5) {
      return;
    }

    setForm({
      ...form,

      addresses: [
        ...form.addresses,

        {
          fullName: "",
          phone: "",
          address: "",
          ward: "",
          district: "",
          isDefault: false,
        },
      ],
    });
  };

  // =========================
  // DELETE ADDRESS
  // =========================
  const removeAddress = (index) => {
    const updated = [...form.addresses];

    updated.splice(index, 1);

    setForm({
      ...form,
      addresses: updated,
    });
  };

  // =========================
  // SET DEFAULT
  // =========================
  const setDefaultAddress = (index) => {
    const updated = form.addresses.map((item, i) => ({
      ...item,
      isDefault: i === index,
    }));

    setForm({
      ...form,
      addresses: updated,
    });
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    // =========================
    // BASIC VALIDATE
    // =========================

    if (!form.name.trim()) {
      newErrors.name = "Vui lòng nhập họ tên";
    }

    if (!form.username.trim()) {
      newErrors.username = "Vui lòng nhập username";
    }

    if (!form.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    }

    if (!isEdit && !form.password.trim()) {
      newErrors.password = "Vui lòng nhập password";
    }

    // =========================
    // AVATAR VALIDATE
    // =========================

    if (
      form.avatar.trim() &&
      !/^https?:\/\/.+/i.test(form.avatar)
    ) {
      newErrors.avatar = "Avatar phải là URL hợp lệ";
    }

    // =========================
    // ADDRESS VALIDATE
    // =========================

    form.addresses.forEach((address, index) => {
      if (!address.fullName.trim()) {
        newErrors[`addresses.${index}.fullName`] =
          "Vui lòng nhập người nhận";
      }

      if (!address.phone.trim()) {
        newErrors[`addresses.${index}.phone`] =
          "Vui lòng nhập số điện thoại";
      }

      if (!address.address.trim()) {
        newErrors[`addresses.${index}.address`] =
          "Vui lòng nhập địa chỉ";
      }
    });

    // =========================
    // HAS ERROR
    // =========================

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      return;
    }

    // clear old errors
    setErrors({});

    // =========================
    // CALL API
    // =========================

    const result = await onSubmit(form);

    if (!result.success) {
      // EMAIL
      if (result.message?.includes("Email")) {
        setErrors((prev) => ({
          ...prev,
          email: result.message,
        }));
      }

      // USERNAME
      if (result.message?.includes("Username")) {
        setErrors((prev) => ({
          ...prev,
          username: result.message,
        }));
      }

      return;
    }
  };

  return (
    <div className="admin-user-modal-overlay">
      <div className="admin-user-modal">
        {/* HEADER */}
        <div className="admin-user-modal-header">
          <h2>{isEdit ? "Sửa tài khoản" : "Thêm tài khoản"}</h2>

          <button
            className="admin-user-modal-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {/* FORM */}
        <form className="admin-user-form" onSubmit={handleSubmit}>
          <div className="admin-user-form__grid">
            {/* NAME */}
            <div className="admin-user-form__group">
              <label>Họ tên</label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={errors.name ? "input-error" : ""}
              />

              {errors.name && (
                <span className="error-text">{errors.name}</span>
              )}
            </div>

            {/* USERNAME */}
            <div className="admin-user-form__group">
              <label>Username</label>

              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className={errors.username ? "input-error" : ""}
              />

              {errors.username && (
                <span className="error-text">
                  {errors.username}
                </span>
              )}
            </div>

            {/* EMAIL */}
            <div className="admin-user-form__group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={errors.email ? "input-error" : ""}
              />

              {errors.email && (
                <span className="error-text">{errors.email}</span>
              )}
            </div>

            {/* PASSWORD */}
            {!isEdit && (
              <div className="admin-user-form__group">
                <label>Password</label>

                <input
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  value={form.password}
                  onChange={handleChange}
                  className={errors.password ? "input-error" : ""}
                />

                {errors.password && (
                  <span className="error-text">
                    {errors.password}
                  </span>
                )}
              </div>
            )}

            {/* PHONE */}
            <div className="admin-user-form__group">
              <label>Số điện thoại</label>

              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            {/* AVATAR */}
            <div className="admin-user-form__group">
              <label>Avatar URL</label>

              <input
                type="text"
                name="avatar"
                placeholder="https://example.com/avatar.jpg"
                value={form.avatar}
                onChange={handleChange}
                className={errors.avatar ? "input-error" : ""}
              />

              {errors.avatar && (
                <span className="error-text">
                  {errors.avatar}
                </span>
              )}
            </div>

            {/* ROLE */}
            <div className="admin-user-form__group">
              <label>Vai trò</label>

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
              >
                <option value="user">User</option>

                <option value="staff">Staff</option>

                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          {/* ADDRESS */}
          <div className="admin-user-address-section">
            <div className="admin-user-address-top">
              <h3>Danh sách địa chỉ</h3>

              <button
                type="button"
                className="admin-user-btn-add-address"
                onClick={addAddress}
              >
                + Thêm địa chỉ
              </button>
            </div>

            {form.addresses.map((address, index) => (
              <div
                className="admin-user-address-card"
                key={address._id || index}
              >
                <div className="admin-user-form__grid">
                  {/* FULL NAME */}
                  <div className="admin-user-form__group">
                    <label>Người nhận</label>

                    <input
                      type="text"
                      value={address.fullName || ""}
                      className={
                        errors[`addresses.${index}.fullName`]
                          ? "input-error"
                          : ""
                      }
                      onChange={(e) =>
                        handleAddressChange(
                          index,
                          "fullName",
                          e.target.value
                        )
                      }
                    />

                    {errors[`addresses.${index}.fullName`] && (
                      <span className="error-text">
                        {
                          errors[
                            `addresses.${index}.fullName`
                          ]
                        }
                      </span>
                    )}
                  </div>

                  {/* PHONE */}
                  <div className="admin-user-form__group">
                    <label>SĐT</label>

                    <input
                      type="text"
                      value={address.phone || ""}
                      className={
                        errors[`addresses.${index}.phone`]
                          ? "input-error"
                          : ""
                      }
                      onChange={(e) =>
                        handleAddressChange(
                          index,
                          "phone",
                          e.target.value
                        )
                      }
                    />

                    {errors[`addresses.${index}.phone`] && (
                      <span className="error-text">
                        {errors[`addresses.${index}.phone`]}
                      </span>
                    )}
                  </div>

                  {/* ADDRESS */}
                  <div className="admin-user-form__group">
                    <label>Địa chỉ</label>

                    <input
                      type="text"
                      value={address.address || ""}
                      className={
                        errors[`addresses.${index}.address`]
                          ? "input-error"
                          : ""
                      }
                      onChange={(e) =>
                        handleAddressChange(
                          index,
                          "address",
                          e.target.value
                        )
                      }
                    />

                    {errors[`addresses.${index}.address`] && (
                      <span className="error-text">
                        {
                          errors[
                            `addresses.${index}.address`
                          ]
                        }
                      </span>
                    )}
                  </div>

                  {/* WARD */}
                  <div className="admin-user-form__group">
                    <label>Phường/Xã</label>

                    <input
                      type="text"
                      value={address.ward || ""}
                      onChange={(e) =>
                        handleAddressChange(
                          index,
                          "ward",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  {/* DISTRICT */}
                  <div className="admin-user-form__group">
                    <label>Quận/Huyện</label>

                    <input
                      type="text"
                      value={address.district || ""}
                      onChange={(e) =>
                        handleAddressChange(
                          index,
                          "district",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>

                {/* ACTION */}
                <div className="admin-user-address-actions">
                  <button
                    type="button"
                    className={`admin-user-btn-default ${
                      address.isDefault ? "active" : ""
                    }`}
                    onClick={() => setDefaultAddress(index)}
                  >
                    {address.isDefault
                      ? "✓ Địa chỉ mặc định"
                      : "Đặt mặc định"}
                  </button>

                  {form.addresses.length > 1 && (
                    <button
                      type="button"
                      className="admin-user-btn-remove-address"
                      onClick={() => removeAddress(index)}
                    >
                      Xóa
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ACTION */}
          <div className="admin-user-modal__actions">
            <button
              type="button"
              className="admin-user-btn-cancel"
              onClick={onClose}
            >
              Đóng
            </button>

            <button
              type="submit"
              className="admin-user-btn-save"
              disabled={loading}
            >
              {loading
                ? "Đang lưu..."
                : isEdit
                ? "Cập nhật"
                : "Tạo tài khoản"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;