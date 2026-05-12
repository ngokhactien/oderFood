import "../styles/table/OrderRequest.css";

import { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getOrCreateOrder,
  addItem,
  confirmOrder,
  getActiveOrders,
} from "../../redux/orderSlice";

import {
  clearDraft,
  removeExpiredDrafts,
  setActiveTab,
  openTab,
} from "../../redux/orderUiSlice";

import { toast } from "react-toastify";

export default function OrderRequest() {
  const dispatch = useDispatch();

  // =========================
  // STORE
  // =========================
  const draftItems = useSelector((state) => state.orderUI.draftItems);

  const orders = useSelector((state) => state.order.orders || []);

  // =========================
  // AUTO REMOVE EMPTY DRAFT
  // =========================
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(removeExpiredDrafts());
    }, 10000);

    return () => clearInterval(interval);
  }, [dispatch]);

  // =========================
  // ALL TABLES
  // =========================
  const tables = useMemo(() => {
    return (
      Object.entries(draftItems || {})
        .map(([tableId, draft]) => ({
          tableId,
          ...draft,
        }))
        // sort cũ -> mới
        .sort((a, b) => a.updatedAt - b.updatedAt)
    );
  }, [draftItems]);

  // =========================
  // SELECTED TABLE
  // =========================
  const [selectedTableId, setSelectedTableId] = useState(null);

  // auto select first table
  useEffect(() => {
    if (tables.length > 0 && !selectedTableId) {
      setSelectedTableId(tables[0].tableId);

      dispatch(
        openTab({
          id: tables[0].tableId,

          name: tables[0].tableInfo?.name || tables[0].tableId,

          tabName: `${tables[0].tableInfo?.name || ""}${
            tables[0].tableInfo?.floor ? ` / ${tables[0].tableInfo.floor}` : ""
          }`,
        }),
      );
    }

    // nếu bàn hiện tại bị xoá
    if (selectedTableId && !tables.find((t) => t.tableId === selectedTableId)) {
      const nextTable = tables[0]?.tableId || null;

      setSelectedTableId(nextTable);

      if (nextTable) {
        const nextData = tables.find((t) => t.tableId === nextTable);

        if (nextData) {
          dispatch(
            openTab({
              id: nextData.tableId,

              name: nextData.tableInfo?.name || nextData.tableId,

              tabName: `${nextData.tableInfo?.name || ""}${
                nextData.tableInfo?.floor
                  ? ` / ${nextData.tableInfo.floor}`
                  : ""
              }`,
            }),
          );
        }
      }
    }
  }, [tables, selectedTableId]);

  // =========================
  // CURRENT DRAFT
  // =========================
  const currentDraft = draftItems?.[selectedTableId];

  const items = Array.isArray(currentDraft?.items) ? currentDraft.items : [];

  // =========================
  // TABLE INFO
  // =========================
  const tableInfo = currentDraft?.tableInfo || {};

  // =========================
  // TOTAL
  // =========================
  const total = items.reduce((sum, item) => {
    return sum + Number(item.price || 0) * Number(item.qty || 0);
  }, 0);

  // =========================
  // CONFIRM
  // =========================
  const handleConfirm = async () => {
    try {
      if (!selectedTableId) {
        toast.warning("Chưa chọn bàn");

        return;
      }

      if (!items.length) {
        toast.warning("Chưa có món");

        return;
      }

      let order = orders.find((o) => o?.tableId === selectedTableId);

      // create order
      if (!order) {
        const result = await dispatch(
          getOrCreateOrder({
            tableId: selectedTableId,

            table: {
              id: selectedTableId,
              name: tableInfo.name,
              floor: tableInfo.floor,
            },
          }),
        );

        order = result?.payload;
      }

      if (!order?._id) {
        toast.error("Không tạo được order");

        return;
      }

      // add items
      for (const item of items) {
        for (let i = 0; i < item.qty; i++) {
          await dispatch(
            addItem({
              orderId: order._id,
              product: item,
            }),
          );
        }
      }

      // confirm
      await dispatch(confirmOrder(order._id));

      // reload
      await dispatch(getActiveOrders());

      // remove draft
      dispatch(clearDraft(selectedTableId));

      toast.success("Đã gửi bếp");
    } catch (err) {
      console.log(err);

      toast.error("Có lỗi");
    }
  };

  // =========================
  // CANCEL
  // =========================
  const handleCancel = () => {
    if (!selectedTableId) return;

    dispatch(clearDraft(selectedTableId));

    toast.info("Đã huỷ");
  };

  // =========================
  // TIME AGO
  // =========================
  const getTimeAgo = (time) => {
    if (!time) return "vài giây trước";

    const diff = Date.now() - time;

    const seconds = Math.floor(diff / 1000);

    const minutes = Math.floor(diff / 60000);

    const hours = Math.floor(diff / 3600000);

    // < 1 phút
    if (seconds < 60) {
      return `${seconds} giây trước`;
    }

    // < 1 giờ
    if (minutes < 60) {
      return `${minutes} phút trước`;
    }

    // >= 1 giờ
    return `${hours} giờ trước`;
  };

  return (
    <div className="order-container">
      {/* SIDEBAR */}
      <div className="order-sidebar">
        {tables.length > 0 ? (
          tables.map((table) => (
            <div
              key={table.tableId}
              className={`table-item ${
                selectedTableId === table.tableId ? "active" : ""
              }`}
              onClick={() => {
                setSelectedTableId(table.tableId);

                dispatch(
                  openTab({
                    id: table.tableId,

                    name: table.tableInfo?.name || table.tableId,

                    tabName: `${table.tableInfo?.name || ""}${
                      table.tableInfo?.floor
                        ? ` / ${table.tableInfo.floor}`
                        : ""
                    }`,
                  }),
                );
              }}
            >
              <div className="table-name">
                {table.tableInfo?.name || table.tableId}

                {table.tableInfo?.floor ? ` / ${table.tableInfo.floor}` : ""}
              </div>

              <div className="table-time">{getTimeAgo(table.updatedAt)}</div>
            </div>
          ))
        ) : (
          <div className="empty-order">Chưa có yêu cầu nào</div>
        )}
      </div>

      {/* CONTENT */}
      <div className="order-content">
        <h3>
          Yêu cầu gọi món từ {tableInfo?.name || ""}
          {tableInfo?.floor ? ` / ${tableInfo.floor}` : ""}
        </h3>

        <div className="order-list">
          {items.length > 0 ? (
            items.map((item, index) => (
              <div key={item._id || index} className="order-row">
                <div className="left">
                  <span className="name">{item.name}</span>

                  <span className="qty">{item.qty}x</span>
                </div>

                <div className="right">
                  {(item.price * item.qty).toLocaleString()}đ
                </div>
              </div>
            ))
          ) : (
            <div className="empty-order">Chưa có món nào</div>
          )}
        </div>

        <div className="order-total">Tổng tiền: {total.toLocaleString()}đ</div>

        <div className="order-actions">
          <button className="btn cancel" onClick={handleCancel}>
            Từ chối
          </button>

          <button className="btn confirm" onClick={handleConfirm}>
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
