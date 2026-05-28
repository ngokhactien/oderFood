import { useEffect, useMemo, useState } from "react";

import {
  BanknotesIcon,
  ShoppingBagIcon,
  CubeIcon,
  MagnifyingGlassIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

import { useDispatch, useSelector } from "react-redux";

import "./styles/RevenueOverview.css";

import Pagination from "../../Pagination";

import { getRevenue } from "../../../redux/admin/revenue/revenueSlice";
import { NavLink } from "react-router-dom";
import { formatDateTime } from "../../../common/dateFormat";

export default function AdminRevenue() {
  const dispatch = useDispatch();

  // =========================
  // REDUX
  // =========================
  const revenueState = useSelector((state) => state.adminRevenue);

  const orders = revenueState?.orders || [];

  const totalRevenue = revenueState?.totalRevenue || 0;

  const totalOrders = revenueState?.totalOrders || 0;

  const totalProducts = revenueState?.totalProducts || 0;

  const loading = revenueState?.loading || false;

  // =========================
  // STATES
  // =========================
  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(5);

  const [search, setSearch] = useState("");

  const [orderType, setOrderType] = useState("");

  // =========================
  // FETCH
  // =========================
  useEffect(() => {
    dispatch(getRevenue());
  }, [dispatch]);

  // =========================
  // FILTER
  // =========================
  const filteredData = useMemo(() => {
    let data = Array.isArray(orders) ? [...orders] : [];

    // SEARCH
    if (search) {
      data = data.filter((item) =>
        item?.orderCode?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // ORDER TYPE
    if (orderType) {
      data = data.filter((item) => item?.orderType === orderType);
    }

    return data;
  }, [orders, search, orderType]);

  // =========================
  // PAGINATION
  // =========================
  const totalPages = Math.ceil(filteredData.length / limit);

  const currentData = filteredData.slice((page - 1) * limit, page * limit);

  useEffect(() => {
    setPage(1);
  }, [search, limit, orderType]);

  // =========================
  // ORDER TYPE LABEL
  // =========================
  const getOrderType = (type) => {
    switch (type) {
      case "online":
        return "Online";

      case "table":
        return "Tại bàn";

      case "takeaway":
        return "Mang đi";

      default:
        return "Online";
    }
  };

  // =========================
  // PAYMENT LABEL
  // =========================
  const getPaymentStatus = (status) => {
    switch (status) {
      case "paid":
        return "Đã thanh toán";

      case "pending":
        return "Chờ thanh toán";

      case "failed":
        return "Thất bại";

      default:
        return status;
    }
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return <div className="admin-revenue-loading">Loading...</div>;
  }

  return (
    <div className="admin-revenue">
      {/* ========================= */}
      {/* STATS */}
      {/* ========================= */}
      <div className="admin-revenue-stats">
        {/* REVENUE */}
        <div className="admin-revenue-card">
          <div className="admin-revenue-icon revenue">
            <BanknotesIcon />
          </div>

          <div>
            <p>Tổng doanh thu</p>

            <h3>{Number(totalRevenue || 0).toLocaleString("vi-VN")}₫</h3>
          </div>
        </div>

        {/* ORDERS */}
        <div className="admin-revenue-card">
          <div className="admin-revenue-icon orders">
            <ShoppingBagIcon />
          </div>

          <div>
            <p>Đơn hoàn thành</p>

            <h3>{totalOrders}</h3>
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="admin-revenue-card">
          <div className="admin-revenue-icon products">
            <CubeIcon />
          </div>

          <div>
            <p>Sản phẩm bán</p>

            <h3>{totalProducts}</h3>
          </div>
        </div>
      </div>

      {/* ========================= */}
      {/* TABLE */}
      {/* ========================= */}
      <div className="admin-revenue-table-card">
        {/* TOP */}
        <div className="admin-revenue-top">
          {/* LIMIT */}
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          >
            <option value={5}>5</option>

            <option value={10}>10</option>

            <option value={20}>20</option>
          </select>

          {/* SEARCH */}
          <div className="admin-revenue-search">
            <MagnifyingGlassIcon className="admin-revenue-search-icon" />

            <input
              type="text"
              placeholder="Tìm mã đơn..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* FILTER */}
          <select
            value={orderType}
            onChange={(e) => setOrderType(e.target.value)}
          >
            <option value="">Tất cả loại</option>

            <option value="online">Online</option>

            <option value="table">Tại bàn</option>

            <option value="takeaway">Mang đi</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="admin-revenue-table-wrap">
          <table className="admin-revenue-table">
            <thead>
              <tr>
                <th className="stt">#</th>

                <th>MÃ ĐƠN</th>

                <th>KHÁCH HÀNG</th>

                <th>SĐT</th>

                <th>THỜI GIAN</th>

                <th>LOẠI ĐƠN</th>

                <th>TỔNG TIỀN</th>

                <th>XEM</th>
              </tr>
            </thead>

            <tbody>
              {currentData.length > 0 ? (
                currentData.map((item, index) => (
                  <tr key={item._id}>
                    {/* STT */}
                    <td>{(page - 1) * limit + index + 1}</td>

                    {/* CODE */}
                    <td>
                      <span className="order-code">{item.orderCode}</span>
                    </td>

                    {/* CUSTOMER */}
                    <td>{item.shippingAddress?.fullName || "Khách lẻ"}</td>

                    {/* PHONE */}
                    <td>{item.shippingAddress?.phone || "---"}</td>

                    {/* DATE */}
                    <td>{formatDateTime(item.createdAt)}</td>

                    {/* TYPE */}
                    <td>
                      <span className={`order-type ${item.orderType}`}>
                        {getOrderType(item.orderType)}
                      </span>
                    </td>

                    {/* PRICE */}
                    <td className="price">
                      {Number(item.totalPrice || 0).toLocaleString("vi-VN")}₫
                    </td>

                    {/* ACTION */}
                    <td>
                      <NavLink
                        to={`/admin/orders/detail/view/${item._id}`}
                        className="view-btn"
                      >
                        <EyeIcon className="action-icon" />
                      </NavLink>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">Không có dữ liệu</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        {filteredData.length > 0 && (
          <div className="admin-revenue-bottom">
            <p>
              Showing {(page - 1) * limit + 1} to{" "}
              {Math.min(page * limit, filteredData.length)} of{" "}
              {filteredData.length} entries
            </p>

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
}
