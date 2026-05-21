// pages/admin/AdminReport.jsx

import { useState } from "react";

import {
  CurrencyDollarIcon,
  ShoppingBagIcon,
  CubeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

import "./styles/Dashboard.css";

import RevenueChart from "./RevenueChart";
import ProductChart from "./ProductChart";
import StatCard from "./StatCard";

/* =========================
   DOANH THU
========================= */

const revenueData = {
  week: [
    { name: "12/05 - T2", revenue: 2000000 },
    { name: "13/05 - T3", revenue: 3500000 },
    { name: "14/05 - T4", revenue: 2800000 },
    { name: "15/05 - T5", revenue: 5000000 },
    { name: "16/05 - T6", revenue: 4200000 },
    { name: "17/05 - T7", revenue: 7000000 },
    { name: "18/05 - CN", revenue: 6500000 },
  ],

  month: [
    { name: "01-07/05", revenue: 12000000 },
    { name: "08-14/05", revenue: 18000000 },
    { name: "15-21/05", revenue: 15000000 },
    { name: "22-31/05", revenue: 22000000 },
  ],

  year: [
    { name: "01/2026", revenue: 30000000 },
    { name: "02/2026", revenue: 42000000 },
    { name: "03/2026", revenue: 50000000 },
    { name: "04/2026", revenue: 45000000 },
    { name: "05/2026", revenue: 60000000 },
    { name: "06/2026", revenue: 70000000 },
  ],
};

/* =========================
   SẢN PHẨM BÁN
========================= */

const productData = {
  week: [
    { name: "12/05", products: 12 },
    { name: "13/05", products: 18 },
    { name: "14/05", products: 15 },
    { name: "15/05", products: 20 },
    { name: "16/05", products: 25 },
    { name: "17/05", products: 35 },
    { name: "18/05", products: 30 },
  ],

  month: [
    { name: "01-07/05", products: 50 },
    { name: "08-14/05", products: 75 },
    { name: "15-21/05", products: 62 },
    { name: "22-31/05", products: 90 },
  ],

  year: [
    { name: "01/2026", products: 180 },
    { name: "02/2026", products: 220 },
    { name: "03/2026", products: 260 },
    { name: "04/2026", products: 240 },
    { name: "05/2026", products: 310 },
    { name: "06/2026", products: 350 },
  ],
};

export default function Dashboard() {
  const [filter, setFilter] = useState("week");

  return (
    <div className="admin-report">
      {/* HEADER */}
      <div className="admin-report__header">
        <div>
          <h1>Thống kê</h1>

          <p>Tổng quan doanh thu và sản phẩm bán ra</p>
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="admin-report__select"
        >
          <option value="week">Theo tuần</option>

          <option value="month">Theo tháng</option>

          <option value="year">Theo năm</option>
        </select>
      </div>

      {/* STATS */}
      <div className="admin-report__stats">
        <StatCard
          title="Tổng doanh thu"
          value="120.000.000đ"
          growth={18}
          icon={<CurrencyDollarIcon />}
        />

        <StatCard
          title="Sản phẩm đã bán"
          value="1.250"
          growth={12}
          icon={<ShoppingBagIcon />}
        />

        <StatCard
          title="Tổng sản phẩm"
          value="320"
          growth={8}
          icon={<CubeIcon />}
        />

        <StatCard
          title="Khách hàng"
          value="540"
          growth={15}
          icon={<UsersIcon />}
        />
      </div>

      {/* CHART */}
      <div className="admin-report__charts">
        <RevenueChart
          title={`Doanh thu ${
            filter === "week"
              ? "theo tuần"
              : filter === "month"
                ? "theo tháng"
                : "theo năm"
          }`}
          data={revenueData[filter]}
        />

        <ProductChart
          title={`Sản phẩm bán ${
            filter === "week"
              ? "theo tuần"
              : filter === "month"
                ? "theo tháng"
                : "theo năm"
          }`}
          data={productData[filter]}
        />
      </div>
    </div>
  );
}
