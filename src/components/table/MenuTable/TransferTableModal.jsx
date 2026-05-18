// TransferTableModal.jsx

import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { transferTable, getActiveOrders } from "../../../redux/orderSlice";

import { transferDraftTable } from "../../../redux/orderUISlice";

export default function TransferTableModal({ open, table, tables, onClose }) {
  // =========================
  // HOOKS
  // =========================
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.order.orders || []);

  const reservations = useSelector(
    (state) => state.reservations?.reservations || [],
  );

  const draftItems = useSelector((state) => state.orderUI.draftItems || {});

  const [targetTableId, setTargetTableId] = useState("");

  // =========================
  // HELPER
  // =========================
  const hasDraftData = (data) => {
    if (!data) {
      return false;
    }

    if (Array.isArray(data)) {
      return data.length > 0;
    }

    if (Array.isArray(data.items)) {
      return data.items.length > 0;
    }

    return false;
  };

  // =========================
  // CURRENT ORDER
  // =========================
  const currentOrder = table
    ? orders.find(
        (o) =>
          o.tableId === table.id &&
          (o.status === "active" || o.status === "confirmed"),
      )
    : null;

  // =========================
  // CHECK ITEMS
  // =========================
  const hasConfirmedItems = currentOrder?.items?.length > 0;

  const hasDraftItems = table ? hasDraftData(draftItems[table.id]) : false;

  const hasItems = hasConfirmedItems || hasDraftItems;

  // =========================
  // AVAILABLE TABLES
  // =========================
  const availableTables = useMemo(() => {
    if (!table) {
      return [];
    }

    const now = new Date();

    return tables.filter((t) => {
      // bỏ bàn hiện tại
      if (t.id === table.id) {
        return false;
      }

      // đang dùng
      const isUsing = orders.some(
        (o) =>
          o.tableId === t.id &&
          (o.status === "active" || o.status === "confirmed"),
      );

      if (isUsing) {
        return false;
      }

      // draft
      const isPending = hasDraftData(draftItems[t.id]);

      if (isPending) {
        return false;
      }

      // reservation
      const hasReservation = reservations.some((r) => {
        if (r.tableId !== t.id) {
          return false;
        }

        const reserveDate = new Date(`${r.date}T${r.time}`);

        return reserveDate > now;
      });

      if (hasReservation) {
        return false;
      }

      return true;
    });
  }, [table, tables, orders, reservations, draftItems]);

  // =========================
  // RETURN NULL SAU HOOKS
  // =========================
  if (!open || !table) {
    return null;
  }

  // =========================
  // HANDLE TRANSFER
  // =========================
  const handleTransfer = async () => {
    if (!targetTableId) {
      return;
    }

    try {
      // chuyển order DB
      if (currentOrder) {
        await dispatch(
          transferTable({
            orderId: currentOrder._id,
            newTableId: targetTableId,
          }),
        ).unwrap();
      }

      // chuyển draft frontend
      if (hasDraftItems) {
        dispatch(
          transferDraftTable({
            fromTableId: table.id,
            toTableId: targetTableId,
          }),
        );
      }

      dispatch(getActiveOrders());

      setTargetTableId("");

      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Chuyển bàn</h3>

        <p>
          Từ: <strong>{table.displayName}</strong>
        </p>

        {!hasItems && (
          <div className="empty-warning">Bàn này chưa có món để chuyển</div>
        )}

        {hasItems && (
          <>
            <select
              value={targetTableId}
              onChange={(e) => setTargetTableId(e.target.value)}
            >
              <option value="">Chọn bàn cần chuyển</option>

              {availableTables.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.tabName}
                </option>
              ))}
            </select>

            {!availableTables.length && (
              <div className="empty-warning">Không còn bàn trống</div>
            )}
          </>
        )}

        <div className="actions">
          <button onClick={onClose}>Huỷ</button>

          <button
            disabled={!hasItems || !targetTableId || !availableTables.length}
            onClick={handleTransfer}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
