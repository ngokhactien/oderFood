import React, { useEffect, useState } from "react";

import "./styles/OrdersCheckout.css";

import Pagination from "../../Pagination";

import { NavLink } from "react-router-dom";

import {
  EyeIcon,
  PencilSquareIcon,
  XMarkIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";

import { useDispatch, useSelector } from "react-redux";

import {
  getAllOrders,
  cancelOrderAdmin,
} from "../../../redux/admin/order/orderManagementSlice";

const OrdersCheckout = () => {
  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.adminOrders);

  const [page, setPage] = useState(1);

  const [entries, setEntries] = useState(5);

  const [search, setSearch] = useState("");

  // FILTER STATUS
  const [statusFilter, setStatusFilter] = useState(() => {
    return localStorage.getItem("orderStatusFilter") || "pending";
  });

  // =========================
  // FETCH ORDERS
  // =========================
  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  // =========================
  // FILTER
  // =========================
  const filtered = orders.filter((item) => {
    // SEARCH NAME
    const matchSearch = item.shippingAddress?.fullName
      ?.toLowerCase()
      .includes(search.toLowerCase());

    // FILTER STATUS
    const matchStatus =
      statusFilter === "all" ? true : item.orderStatus === statusFilter;

    return matchSearch && matchStatus;
  });

  // =========================
  // PAGINATION
  // =========================
  const totalPages = Math.ceil(filtered.length / entries);

  const start = (page - 1) * entries;

  const currentData = filtered.slice(start, start + entries);

  // =========================
  // CANCEL ORDER
  // =========================
  const handleCancel = (id) => {
    const confirmCancel = window.confirm("Bạn có chắc muốn hủy đơn hàng này?");

    if (!confirmCancel) return;

    dispatch(cancelOrderAdmin(id));
  };

  // =========================
  // STATUS LABEL
  // =========================
  const getStatusLabel = (status) => {
    switch (status) {
      case "pending":
        return "Chờ xác nhận";

      case "confirmed":
        return "Đã xác nhận";

      case "shipping":
        return "Đang giao";

      case "completed":
        return "Hoàn thành";

      case "cancelled":
        return "Đã hủy";

      default:
        return status;
    }
  };

  return (
    <div className="Orders-checkout">
      {/* TOP */}
      <div className="products-top">
        <div className="products-filter">
          {/* ENTRIES */}
          <select
            value={entries}
            onChange={(e) => {
              setEntries(Number(e.target.value));

              setPage(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>

          {/* FILTER STATUS */}
          <select
            value={statusFilter}
            onChange={(e) => {
              const value = e.target.value;
              setStatusFilter(value);
              localStorage.setItem("orderStatusFilter", value);
              setPage(1);
            }}
          >
            <option value="all">Tất cả trạng thái</option>

            <option value="pending">Chờ xác nhận</option>

            <option value="confirmed">Đã xác nhận</option>

            <option value="shipping">Đang giao</option>

            <option value="completed">Hoàn thành</option>

            <option value="cancelled">Đã hủy</option>
          </select>

          {/* SEARCH */}
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);

              setPage(1);
            }}
            placeholder="Tìm đơn hàng..."
          />
        </div>

        {/* RIGHT */}
        <div className="products-left">
          <NavLink to="#" className="add-product-btn">
            <ArrowDownTrayIcon className="download-icon" /> Xuất đơn hàng
          </NavLink>
        </div>
      </div>

      {/* TABLE */}
      <div className="products-table-wrapper">
        <table className="products-table">
          <thead>
            <tr>
               <th className="stt">#</th>

              <th>MÃ HÓA ĐƠN</th>

              <th>TÊN KHÁCH HÀNG</th>

              <th>NGÀY ĐẶT</th>

              <th>TỔNG TIỀN</th>

              <th>TRẠNG THÁI</th>

              <th>CHỈNH SỬA</th>
            </tr>
          </thead>

          <tbody>
            {currentData.map((item, index) => (
              <tr key={item._id}>
                {/* STT */}
                <td>{start + index + 1}</td>

                {/* ORDER CODE */}
                <td>
                  <span className="invoice-code">{item.orderCode}</span>
                </td>

                {/* CUSTOMER */}
                <td className="product-name">
                  {item.shippingAddress?.fullName}
                </td>

                {/* DATE */}
                <td>{new Date(item.createdAt).toLocaleString("vi-VN")}</td>

                {/* TOTAL */}
                <td className="new-price">
                  {item.totalPrice.toLocaleString()}đ
                </td>

                {/* STATUS */}
                <td>
                  <span className={`product-badge ${item.orderStatus}`}>
                    {getStatusLabel(item.orderStatus)}
                  </span>
                </td>

                {/* ACTION */}
                <td>
                  <div className="products-actions">
                    {/* VIEW DETAIL */}
                    <NavLink
                      to={`detail/view/${item._id}`}
                      className="edit-btn"
                    >
                      <EyeIcon className="action-icon" />
                    </NavLink>

                    {/* ONLY PENDING / CONFIRMED / SHIPPING */}
                    {!["completed", "cancelled"].includes(item.orderStatus) && (
                      <>
                        {/* EDIT STATUS */}
                        <NavLink
                          to={`detail/edit/${item._id}`}
                          className="edit-btn"
                        >
                          <PencilSquareIcon className="action-icon" />
                        </NavLink>

                        {/* CANCEL */}
                        <button
                          className="delete-btn"
                          onClick={() => handleCancel(item._id)}
                        >
                          <XMarkIcon className="action-icon" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* EMPTY */}
        {filtered.length === 0 && (
          <div className="empty-orders">Không có đơn hàng nào</div>
        )}

        {/* FOOTER */}
        {filtered.length > 0 && (
          <div className="products-footer">
            <span>
              Showing {start + 1} to{" "}
              {Math.min(start + entries, filtered.length)} of {filtered.length}{" "}
              entries
            </span>

            {totalPages > 1 && (
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersCheckout;
