// TableManager.jsx

import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../Pagination";

import "../styles/table/TableManager.css";
import "../styles/table/Modal.css";
import TableActionMenu from "./MenuTable/TableActionMenu";
import ReserveTableModal from "./MenuTable/ReserveTableModal";
import MergeTableModal from "./MenuTable/MergeTableModal";
import TransferTableModal from "./MenuTable/TransferTableModal";

import { transferTable } from "../../redux/orderSlice";

import { transferDraftTable } from "../../redux/orderUiSlice";
import { getReservations } from "../../redux/admin/reservation/reservationSlice";

export default function TableManager({ onSelectTable, activeTable }) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const reservations = useSelector(
    (state) => state.reservations?.reservations || [],
  );

  const [menuTable, setMenuTable] = useState(null);

  const [reserveOpen, setReserveOpen] = useState(false);

  const [mergeOpen, setMergeOpen] = useState(false);

  const [transferOpen, setTransferOpen] = useState(false);
  const [actionTable, setActionTable] = useState(null);

  // =========================
  // DRAFT ITEMS
  // bàn chờ xác nhận
  // =========================
  const draftItems = useSelector((state) => state.orderUI.draftItems || {});

  // =========================
  // ORDERS
  // bàn đã xác nhận
  // =========================
  const orders = useSelector((state) => state.order.orders || []);

  const floors = user?.floors || [];

  const [selectedFloor, setSelectedFloor] = useState("all");

  const [statusFilter, setStatusFilter] = useState("all");

  const [active, setActive] = useState("Giao đi");

  const hasVIP = floors.some((f) => f.type === "vip");

  // =========================
  // FILTER FLOOR
  // =========================
  const filteredFloors =
    selectedFloor === "all"
      ? floors
      : floors.filter((f) =>
          selectedFloor === "vip" ? f.type === "vip" : f.name === selectedFloor,
        );

  // =========================
  // FLATTEN TABLE
  // =========================
  const allTables = filteredFloors.flatMap((f) =>
    f.tables.map((t) => ({
      ...t,

      floorName: f.name,

      id: `${f.name}-${t.name}`,

      displayName: t.name,

      tabName: f.type === "vip" ? t.name : `${t.name} / ${f.name}`,
    })),
  );

  // =========================
  // ACTIVE TABLE
  // =========================
  useEffect(() => {
    setActive(activeTable);
  }, [activeTable]);

  // =========================
  // PENDING TABLE IDS
  // bàn đang chờ xác nhận
  // =========================
  const pendingTableIds = useMemo(() => {
    return Object.keys(draftItems || {});
  }, [draftItems]);

  // =========================
  // CONFIRMED TABLE IDS
  // bàn đã xác nhận order
  // =========================
  const confirmedTableIds = useMemo(() => {
    return orders
      .filter((o) => o?.status === "active" || o?.status === "confirmed")
      .map((o) => o.tableId);
  }, [orders]);

  // =========================
  // FILTER STATUS
  // =========================
  const filteredTables = allTables.filter((t) => {
    const isPending = pendingTableIds.includes(t.id);

    const isConfirmed = confirmedTableIds.includes(t.id);

    // tất cả
    if (statusFilter === "all") {
      return true;
    }

    // sử dụng
    if (statusFilter === "using") {
      return isPending || isConfirmed;
    }

    // còn trống
    if (statusFilter === "empty") {
      return !isPending && !isConfirmed;
    }

    // đặt trước
    if (statusFilter === "reserved") {
      return t.status === "reserved";
    }

    return true;
  });

  // =========================
  // COUNT ALL
  // =========================
  const countAll = allTables.length;

  // =========================
  // COUNT USING
  // =========================
  const countUsing = allTables.filter((t) => {
    const isPending = pendingTableIds.includes(t.id);

    const isConfirmed = confirmedTableIds.includes(t.id);

    return isPending || isConfirmed;
  }).length;

  // =========================
  // COUNT EMPTY
  // =========================
  const countEmpty = allTables.filter((t) => {
    const isPending = pendingTableIds.includes(t.id);

    const isConfirmed = confirmedTableIds.includes(t.id);

    return !isPending && !isConfirmed;
  }).length;

  // =========================
  // COUNT RESERVED
  // =========================
  const countReserved = allTables.filter((t) => t.status === "reserved").length;

  // =========================
  // PAGINATION
  // =========================
  const [page, setPage] = useState(1);

  const pageSize = 35;

  const totalPages = Math.ceil(filteredTables.length / pageSize);

  const start = (page - 1) * pageSize;

  const currentTables = filteredTables.slice(start, start + pageSize);

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
  // CHECK RESERVATION ( check bàn đó đã đặt trước hay chưa)
  // =========================
  const getTableReservations = (tableId) => {
    const now = new Date();

    // lấy reservation của bàn
    const tableReservations = reservations
      .filter((r) => {
        if (r.tableId !== tableId) {
          return false;
        }

        const reserveDate = new Date(`${r.date}T${r.time}`);

        // chỉ lấy reservation còn hiệu lực
        return reserveDate > now;
      })

      // sort gần nhất -> xa nhất
      .sort((a, b) => {
        const aTime = new Date(`${a.date}T${a.time}`);

        const bTime = new Date(`${b.date}T${b.time}`);

        return aTime - bTime;
      });

    if (!tableReservations.length) {
      return null;
    }

    // reservation gần nhất
    const current = tableReservations[0];

    const reserveTime = new Date(`${current.date}T${current.time}`);

    const diff = reserveTime - now;

    let type = "reserved-future";

    // < 2 tiếng
    if (diff <= 2 * 60 * 60 * 1000) {
      type = "reserved-soon";
    }

    return {
      type,

      current,

      all: tableReservations,
    };
  };

  useEffect(() => {
    dispatch(getReservations());
  }, [dispatch]);

  return (
    <div className="table_manager">
      {/* FLOOR */}
      <div className="tabs">
        <button
          className={selectedFloor === "all" ? "active" : ""}
          onClick={() => setSelectedFloor("all")}
        >
          Tất cả
        </button>

        {floors
          .filter((f) => f.type === "normal")
          .map((f) => (
            <button
              key={f._id}
              className={selectedFloor === f.name ? "active" : ""}
              onClick={() => setSelectedFloor(f.name)}
            >
              {f.name}
            </button>
          ))}

        {hasVIP && (
          <button
            className={selectedFloor === "vip" ? "active" : ""}
            onClick={() => setSelectedFloor("vip")}
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
            checked={statusFilter === "all"}
            onChange={() => setStatusFilter("all")}
          />
          Tất cả ({countAll})
        </label>

        <label>
          <input
            type="radio"
            checked={statusFilter === "using"}
            onChange={() => setStatusFilter("using")}
          />
          Sử dụng ({countUsing})
        </label>

        <label>
          <input
            type="radio"
            checked={statusFilter === "empty"}
            onChange={() => setStatusFilter("empty")}
          />
          Còn trống ({countEmpty})
        </label>

        <label>
          <input
            type="radio"
            checked={statusFilter === "reserved"}
            onChange={() => setStatusFilter("reserved")}
          />
          Đặt trước ({countReserved})
        </label>
      </div>

      {/* GRID */}
      <div className="grid">
        {/* DELIVERY */}
        <div
          className={`table ${active === "Giao đi" ? "selected" : ""}`}
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
        {currentTables.map((table) => {
          // pending
          const isPending = pendingTableIds.includes(table.id);

          // confirmed
          const isConfirmed = confirmedTableIds.includes(table.id);
          // đặt trước
          const reservationStatus = getTableReservations(table.id);

          return (
            <div
              key={table.id}
              className={`
                table
                ${active === table.id ? "selected" : ""}
                ${isPending ? "pending" : ""}
                ${isConfirmed ? "confirmed" : ""}
                ${reservationStatus?.type || ""}
              `}
              // onClick={() =>
              //    onSelectTable(table)
              // }
              onClick={() => setMenuTable(table)}
            >
              <div className="shape"></div>

              <div className="table-info">
                <span>{table.displayName}</span>

                {reservationStatus && (
                  <div className="reserve-wrapper">
                    {/* chỉ hiện reservation gần nhất */}
                    <small className="reserve-badge">
                      🕒
                      {reservationStatus.current.time}
                    </small>

                    {/* hover mới hiện */}
                    <div className="reserve-tooltip">
                      {reservationStatus.all.map((r) => {
                        const reserveDate = new Date(r.date);

                        const today = new Date();

                        // reset giờ
                        today.setHours(0, 0, 0, 0);

                        const compareDate = new Date(reserveDate);

                        compareDate.setHours(0, 0, 0, 0);

                        // diff ngày
                        const diffDays =
                          (compareDate - today) / (1000 * 60 * 60 * 24);

                        let displayDate = r.date;

                        if (diffDays === 0) {
                          displayDate = "Hôm nay";
                        } else if (diffDays === 1) {
                          displayDate = "Ngày mai";
                        }

                        return (
                          <div key={r._id} className="tooltip-item">
                            <div className="tooltip-top">
                              <span>🕒 {r.time}</span>

                              <small>{displayDate}</small>
                            </div>

                            <strong>{r.customerName}</strong>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <TableActionMenu
        table={menuTable}
        onClose={() => setMenuTable(null)}
        onOpen={(table) => {
          onSelectTable(table);

          setMenuTable(null);
        }}
        onReserve={(table) => {
          setActionTable(table);

          setReserveOpen(true);

          setMenuTable(null);
        }}
        onMerge={(table) => {
          setActionTable(table);

          setMergeOpen(true);

          setMenuTable(null);
        }}
        onTransfer={(table) => {
          setActionTable(table);

          setTransferOpen(true);

          setMenuTable(null);
        }}
      />

      <ReserveTableModal
        open={reserveOpen}
        table={actionTable}
        onClose={() => {
          setReserveOpen(false);

          setActionTable(null);
        }}
      />

      <MergeTableModal
        open={mergeOpen}
        table={actionTable}
        tables={allTables}
        onClose={() => {
          setMergeOpen(false);

          setActionTable(null);
        }}
      />

      <TransferTableModal
        open={transferOpen}
        table={actionTable}
        tables={allTables}
        onClose={() => {
          setTransferOpen(false);

          setActionTable(null);
        }}
      />

      {/* PAGINATION */}
      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
