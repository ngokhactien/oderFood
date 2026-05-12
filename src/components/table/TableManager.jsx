// TableManager.jsx
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Pagination from "../Pagination";

import "../styles/table/TableManager.css";

export default function TableManager({
  onSelectTable,
  activeTable,
}) {
  const user = useSelector(
    (state) => state.auth.user,
  );

  const floors = user?.floors || [];

  const [selectedFloor, setSelectedFloor] =
    useState("all");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [active, setActive] =
    useState("Giao đi");

  const hasVIP = floors.some(
    (f) => f.type === "vip",
  );

  // =========================
  // FILTER FLOOR
  // =========================
  const filteredFloors =
    selectedFloor === "all"
      ? floors
      : floors.filter((f) =>
          selectedFloor === "vip"
            ? f.type === "vip"
            : f.name === selectedFloor,
        );

  // =========================
  // FLATTEN TABLE
  // =========================
  const allTables =
    filteredFloors.flatMap((f) =>
      f.tables.map((t) => ({
        ...t,

        floorName: f.name,

        id: `${f.name}-${t.name}`,

        displayName: t.name,

        tabName:
          f.type === "vip"
            ? t.name
            : `${t.name} / ${f.name}`,
      })),
    );

  // =========================
  // FILTER STATUS
  // =========================
  const filteredTables =
    statusFilter === "all"
      ? allTables
      : allTables.filter(
          (t) =>
            t.status === statusFilter,
        );

  // =========================
  // COUNT
  // =========================
  const countAll = allTables.length;

  const countUsing = allTables.filter(
    (t) => t.status === "using",
  ).length;

  const countEmpty = allTables.filter(
    (t) => t.status === "empty",
  ).length;

  const countReserved =
    allTables.filter(
      (t) => t.status === "reserved",
    ).length;

  // =========================
  // PAGINATION
  // =========================
  const [page, setPage] = useState(1);

  const pageSize = 35;

  const totalPages = Math.ceil(
    filteredTables.length / pageSize,
  );

  const start = (page - 1) * pageSize;

  const currentTables =
    filteredTables.slice(
      start,
      start + pageSize,
    );

  const handlePageChange = (p) => {
    setPage(p);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // RESET PAGE
  // =========================
  useEffect(() => {
    setPage(1);
  }, [selectedFloor, statusFilter]);

  // =========================
  // ACTIVE TABLE
  // =========================
  useEffect(() => {
    setActive(activeTable);
  }, [activeTable]);

  return (
    <div className="table_manager">
      {/* FLOOR */}
      <div className="tabs">
        <button
          className={
            selectedFloor === "all"
              ? "active"
              : ""
          }
          onClick={() =>
            setSelectedFloor("all")
          }
        >
          Tất cả
        </button>

        {floors
          .filter(
            (f) => f.type === "normal",
          )
          .map((f) => (
            <button
              key={f._id}
              className={
                selectedFloor === f.name
                  ? "active"
                  : ""
              }
              onClick={() =>
                setSelectedFloor(f.name)
              }
            >
              {f.name}
            </button>
          ))}

        {hasVIP && (
          <button
            className={
              selectedFloor === "vip"
                ? "active"
                : ""
            }
            onClick={() =>
              setSelectedFloor("vip")
            }
          >
            Phòng VIP
          </button>
        )}
      </div>

      {/* FILTER */}
      <div className="filters">
        <label>
          <input
            type="radio"
            checked={
              statusFilter === "all"
            }
            onChange={() =>
              setStatusFilter("all")
            }
          />
          Tất cả ({countAll})
        </label>

        <label>
          <input
            type="radio"
            checked={
              statusFilter === "using"
            }
            onChange={() =>
              setStatusFilter("using")
            }
          />
          Sử dụng ({countUsing})
        </label>

        <label>
          <input
            type="radio"
            checked={
              statusFilter === "empty"
            }
            onChange={() =>
              setStatusFilter("empty")
            }
          />
          Còn trống ({countEmpty})
        </label>

        <label>
          <input
            type="radio"
            checked={
              statusFilter === "reserved"
            }
            onChange={() =>
              setStatusFilter("reserved")
            }
          />
          Đặt trước ({countReserved})
        </label>
      </div>

      {/* GRID */}
      <div className="grid">
        {/* DELIVERY */}
        <div
          className={`table ${
            active === "Giao đi"
              ? "selected"
              : ""
          }`}
          onClick={() =>
            onSelectTable({
              id: "Giao đi",
              name: "Giao đi",
              displayName: "Giao đi",
              tabName: "Giao đi",
              fixed: true,
            })
          }
        >
          <div className="shape"></div>

          <span>Giao đi</span>
        </div>

        {/* TABLES */}
        {currentTables.map((table) => (
          <div
            key={table.id}
            className={`table ${
              table.status
            } ${
              active === table.id
                ? "selected"
                : ""
            }`}
            onClick={() =>
              onSelectTable(table)
            }
          >
            <div className="shape"></div>

            <span>
              {table.displayName}
            </span>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={
            handlePageChange
          }
        />
      )}
    </div>
  );
}