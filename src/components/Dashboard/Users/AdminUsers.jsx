// pages/admin/AdminUsers.jsx

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";

import {
  MagnifyingGlassIcon,
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

import Pagination from "../../Pagination";

import "./styles/AdminUsers.css";

import {
  fetchUsers,
  deleteUser,
  createUser,
  updateUser,
} from "../../../redux/admin/users/userSlice";

import UserModal from "./UserModal";
import DeleteModal from "../../../common/DeleteModal";

export default function AdminUsers() {
  const dispatch = useDispatch();

  const { users, totalPages, total, loading } = useSelector(
    (state) => state.users,
  );

  // ======================
  // STATE
  // ======================
  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(5);

  const [searchInput, setSearchInput] = useState("");

  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  // DELETE MODAL
  const [openDelete, setOpenDelete] = useState(false);

  const [deleteItem, setDeleteItem] = useState(null);

  // ======================
  // DEBOUNCE SEARCH
  // ======================
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);

      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // ======================
  // FETCH USERS
  // ======================
  useEffect(() => {
    dispatch(
      fetchUsers({
        page,
        limit,
        search,
      }),
    );
  }, [dispatch, page, limit, search]);

  // ======================
  // ADD USER
  // ======================
  const handleAdd = () => {
    setSelectedUser(null);

    setOpenModal(true);
  };

  // ======================
  // EDIT USER
  // ======================
  const handleEdit = (user) => {
    setSelectedUser(user);

    setOpenModal(true);
  };

  // ======================
  // OPEN DELETE MODAL
  // ======================
  const handleDelete = (user) => {
    setDeleteItem(user);

    setOpenDelete(true);
  };

  // ======================
  // CONFIRM DELETE
  // ======================
  const handleConfirmDelete = async () => {
    if (!deleteItem) return;

    try {
      await dispatch(deleteUser(deleteItem._id));

      toast.success("Xóa tài khoản thành công");

      setOpenDelete(false);

      setDeleteItem(null);

      dispatch(
        fetchUsers({
          page,
          limit,
          search,
        }),
      );
    } catch (err) {
      console.log(err);

      toast.error("Xóa thất bại");
    }
  };

  // ======================
  // SUBMIT
  // ======================
  const handleSubmit = async (formData) => {
    let result;

    // avatar mặc định
    const submitData = {
      ...formData,

      avatar: formData.avatar?.trim() || "/default-avatar.png",
    };

    if (selectedUser) {
      result = await dispatch(
        updateUser({
          id: selectedUser._id,
          data: submitData,
        }),
      );
    } else {
      result = await dispatch(createUser(submitData));
    }

    // FAIL
    if (result.meta.requestStatus === "rejected") {
      return {
        success: false,

        message: result.payload?.message || "Có lỗi xảy ra",

        errors: result.payload?.errors || {},
      };
    }

    // SUCCESS
    toast.success(
      selectedUser ? "Cập nhật thành công" : "Tạo tài khoản thành công",
    );

    setOpenModal(false);

    setSelectedUser(null);

    dispatch(
      fetchUsers({
        page,
        limit,
        search,
      }),
    );

    return {
      success: true,
    };
  };

  return (
    <div className="admin-users">
      {/* HEADER */}
      <div className="admin-users__header">
        <div>
          <h1>Danh sách tài khoản</h1>

          <p>Quản lý người dùng trong hệ thống</p>
        </div>

        <button className="admin-users__add-btn" onClick={handleAdd}>
          <PlusIcon className="admin-users__add-icon" />
          Thêm tài khoản
        </button>
      </div>

      {/* CARD */}
      <div className="admin-users__card">
        {/* TOP */}
        <div className="admin-users__top">
          {/* SHOW */}
          <div className="admin-users__show">
            <span>Show</span>

            <select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));

                setPage(1);
              }}
            >
              <option value={5}>5</option>

              <option value={10}>10</option>

              <option value={20}>20</option>
            </select>

            <span>entries</span>
          </div>

          {/* SEARCH */}
          <div className="admin-users__search">
            <MagnifyingGlassIcon className="admin-users__search-icon" />

            <input
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="admin-users__table-wrap">
          <table className="admin-users__table">
            <thead>
              <tr>
                <th>#</th>

                <th>ẢNH</th>

                <th>HỌ TÊN</th>

                <th>EMAIL</th>

                <th>SỐ ĐIỆN THOẠI</th>

                <th>ĐỊA CHỈ</th>

                <th>VAI TRÒ</th>

                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="8"
                    style={{
                      textAlign: "center",
                    }}
                  >
                    Loading...
                  </td>
                </tr>
              ) : users?.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user._id}>
                    {/* STT */}
                    <td>{(page - 1) * limit + index + 1}</td>

                    {/* AVATAR */}
                    <td>
                      <img
                        src={user.avatar || "/default-avatar.png"}
                        alt={user.name}
                        className="admin-users__avatar"
                        onError={(e) => {
                          e.target.src = "/default-avatar.png";
                        }}
                      />
                    </td>

                    {/* NAME */}
                    <td className="admin-users__name">{user.name}</td>

                    {/* EMAIL */}
                    <td>
                      <div className="admin-users__info">
                        <EnvelopeIcon className="admin-users__info-icon" />

                        {user.email}
                      </div>
                    </td>

                    {/* PHONE */}
                    <td>
                      <div className="admin-users__info">
                        <PhoneIcon className="admin-users__info-icon" />

                        {user.phone || "Chưa có"}
                      </div>
                    </td>

                    {/* ADDRESS */}
                    <td>
                      {(() => {
                        const defaultAddress = user.addresses?.find(
                          (a) => a.isDefault,
                        );

                        if (!defaultAddress) return "Chưa có";

                        return (
                          <div className="admin-users__tooltip">
                            <span className="admin-users__address">
                              {defaultAddress.address}
                            </span>

                            <div className="admin-users__tooltip-content">
                              {defaultAddress.address}

                              {defaultAddress.ward &&
                                `, ${defaultAddress.ward}`}

                              {defaultAddress.district &&
                                `, ${defaultAddress.district}`}
                            </div>
                          </div>
                        );
                      })()}
                    </td>

                    {/* ROLE */}
                    <td>
                      <div className="admin-users__role">
                        <UserIcon className="admin-users__role-icon" />

                        {user.role}
                      </div>
                    </td>

                    {/* ACTION */}
                    <td>
                      <div className="admin-users__actions">
                        <button
                          className="btn-edit"
                          onClick={() => handleEdit(user)}
                        >
                          Sửa
                        </button>

                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(user)}
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    style={{
                      textAlign: "center",
                    }}
                  >
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* BOTTOM */}
        <div className="admin-users__bottom">
          <p>
            Showing {total === 0 ? 0 : (page - 1) * limit + 1} to{" "}
            {Math.min(page * limit, total)} of {total} entries
          </p>

          {totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </div>
      </div>

      {/* USER MODAL */}
      <UserModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);

          setSelectedUser(null);
        }}
        onSubmit={handleSubmit}
        loading={loading}
        user={selectedUser}
      />

      {/* DELETE MODAL */}
      <DeleteModal
        open={openDelete}
        onClose={() => {
          setOpenDelete(false);

          setDeleteItem(null);
        }}
        onConfirm={handleConfirmDelete}
        productName={deleteItem?.name || ""}
      />
    </div>
  );
}