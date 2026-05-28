import { NavLink, Outlet, useNavigate } from "react-router-dom";

import {
  ClipboardDocumentListIcon,
  TableCellsIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

import { useEffect, useState } from "react";

import "./styles/AdminReservationTabs.css";

export default function AdminReservationTabs() {
  const navigate = useNavigate();

  const [hasTableConfig, setHasTableConfig] = useState(false);

  // CHECK TABLE CONFIG
  useEffect(() => {
    const tableConfig = localStorage.getItem("tableConfig");

    if (tableConfig) {
      setHasTableConfig(true);
    }
  }, []);

  const handleTableSetup = () => {
    navigate("/admin/bookings/table-management");
  };

  return (
    <div className="reservation-tabs-page">
      <div className="reservation-tabs-header">
        <div className="reservation-tabs-left">
          <NavLink
            to="/admin/bookings"
            end
            className={({ isActive }) =>
              `reservation-tab-card ${isActive ? "active" : ""}`
            }
          >
            <ClipboardDocumentListIcon className="reservation-tab-icon" />

            <div className="reservation-tab-info">
              <h3>Danh sách đặt bàn</h3>
              <p>Quản lý đặt bàn</p>
            </div>
          </NavLink>

          <NavLink
            to="/admin/bookings/using"
            className={({ isActive }) =>
              `reservation-tab-card ${isActive ? "active" : ""}`
            }
          >
            <TableCellsIcon className="reservation-tab-icon" />

            <div className="reservation-tab-info">
              <h3>Bàn đang sử dụng</h3>
              <p>Theo dõi bàn hiện tại</p>
            </div>
          </NavLink>
        </div>

        {/* TABLE SETUP BUTTON */}
        <button className="reservation-setup-btn" onClick={handleTableSetup}>
          <Cog6ToothIcon className="reservation-setup-icon" />

          {hasTableConfig ? "Chỉnh sửa bàn" : "Cài đặt bàn"}
        </button>
      </div>

      <div className="reservation-tabs-content">
        <Outlet />
      </div>
    </div>
  );
}
