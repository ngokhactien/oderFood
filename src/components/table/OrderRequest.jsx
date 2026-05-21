import "./styles/OrderRequest.css";

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
  openTab,
} from "../../redux/orderUiSlice";

import { toast } from "react-toastify";

export default function OrderRequest() {
  const dispatch = useDispatch();

  // =========================
  // STORE
  // =========================
  const draftItems = useSelector(
    (state) => state.orderUI.draftItems || {},
  );

  const orders = useSelector(
    (state) => state.order.orders || [],
  );

  // =========================
  // AUTO REMOVE
  // =========================
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(removeExpiredDrafts());
    }, 10000);

    return () => clearInterval(interval);
  }, [dispatch]);

  // =========================
  // TABLES
  // =========================
  const tables = useMemo(() => {
    return Object.entries(draftItems)
      .map(([tableId, draft]) => ({
        tableId,
        ...draft,
      }))
      .sort((a, b) => a.updatedAt - b.updatedAt);
  }, [draftItems]);

  // =========================
  // SELECTED TABLE
  // =========================
  const [selectedTableId, setSelectedTableId] =
    useState(null);

  // =========================
  // AUTO SELECT TABLE
  // =========================
  useEffect(() => {
    // chưa có selected
    if (
      tables.length > 0 &&
      !selectedTableId
    ) {
      const firstTable = tables[0];

      setSelectedTableId(firstTable.tableId);

      dispatch(
        openTab({
          id: firstTable.tableId,
          name:
            firstTable.tableInfo?.name ||
            firstTable.tableId,
          tabName: `${
            firstTable.tableInfo?.name || ""
          }${
            firstTable.tableInfo?.floor
              ? ` / ${firstTable.tableInfo.floor}`
              : ""
          }`,
        }),
      );

      return;
    }

    // selected bị xoá sau khi chuyển bàn
    const stillExists = tables.some(
      (t) => t.tableId === selectedTableId,
    );

    if (
      selectedTableId &&
      !stillExists
    ) {
      const nextTable = tables[0] || null;

      if (nextTable) {
        setSelectedTableId(
          nextTable.tableId,
        );

        dispatch(
          openTab({
            id: nextTable.tableId,
            name:
              nextTable.tableInfo?.name ||
              nextTable.tableId,
            tabName: `${
              nextTable.tableInfo?.name || ""
            }${
              nextTable.tableInfo?.floor
                ? ` / ${nextTable.tableInfo.floor}`
                : ""
            }`,
          }),
        );
      } else {
        setSelectedTableId(null);
      }
    }
  }, [
    tables,
    selectedTableId,
    dispatch,
  ]);

  // =========================
  // CURRENT DRAFT
  // =========================
  const currentDraft =
    draftItems?.[selectedTableId] || {};

  const items = Array.isArray(
    currentDraft?.items,
  )
    ? currentDraft.items
    : [];

  // =========================
  // TABLE INFO
  // =========================
  const tableInfo =
    currentDraft?.tableInfo || {};

  // =========================
  // TOTAL
  // =========================
  const total = items.reduce(
    (sum, item) => {
      return (
        sum +
        Number(item.price || 0) *
          Number(item.qty || 0)
      );
    },
    0,
  );

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

      let order = orders.find(
        (o) =>
          o?.tableId === selectedTableId,
      );

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
        toast.error(
          "Không tạo được order",
        );

        return;
      }

      // add items
      for (const item of items) {
        for (
          let i = 0;
          i < item.qty;
          i++
        ) {
          await dispatch(
            addItem({
              orderId: order._id,
              product: item,
            }),
          );
        }
      }

      // confirm
      await dispatch(
        confirmOrder(order._id),
      );

      // reload
      await dispatch(
        getActiveOrders(),
      );

      // clear draft
      dispatch(
        clearDraft(selectedTableId),
      );

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
    if (!selectedTableId) {
      return;
    }

    dispatch(
      clearDraft(selectedTableId),
    );

    toast.info("Đã huỷ");
  };

  // =========================
  // TIME AGO
  // =========================
  const getTimeAgo = (time) => {
    if (!time) {
      return "vài giây trước";
    }

    const diff = Date.now() - time;

    const seconds = Math.floor(
      diff / 1000,
    );

    const minutes = Math.floor(
      diff / 60000,
    );

    const hours = Math.floor(
      diff / 3600000,
    );

    if (seconds < 60) {
      return `${seconds} giây trước`;
    }

    if (minutes < 60) {
      return `${minutes} phút trước`;
    }

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
                selectedTableId ===
                table.tableId
                  ? "active"
                  : ""
              }`}
              onClick={() => {
                setSelectedTableId(
                  table.tableId,
                );

                dispatch(
                  openTab({
                    id: table.tableId,
                    name:
                      table.tableInfo
                        ?.name ||
                      table.tableId,
                    tabName: `${
                      table.tableInfo
                        ?.name || ""
                    }${
                      table.tableInfo
                        ?.floor
                        ? ` / ${table.tableInfo.floor}`
                        : ""
                    }`,
                  }),
                );
              }}
            >
              <div className="table-name">
                {table.tableInfo?.name ||
                  table.tableId}

                {table.tableInfo?.floor
                  ? ` / ${table.tableInfo.floor}`
                  : ""}
              </div>

              <div className="table-time">
                {getTimeAgo(
                  table.updatedAt,
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="empty-order">
            Chưa có yêu cầu nào
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="order-content">
        <h3>
          Yêu cầu gọi món từ{" "}
          {tableInfo?.name || ""}

          {tableInfo?.floor
            ? ` / ${tableInfo.floor}`
            : ""}
        </h3>

        <div className="order-list">
          {items.length > 0 ? (
            items.map((item, index) => (
              <div
                key={
                  item._id || index
                }
                className="order-row"
              >
                <div className="left">
                  <span className="name">
                    {item.name}
                  </span>

                  <span className="qty">
                    {item.qty}x
                  </span>
                </div>

                <div className="right">
                  {(
                    item.price *
                    item.qty
                  ).toLocaleString()}
                  đ
                </div>
              </div>
            ))
          ) : (
            <div className="empty-order">
              Chưa có món nào
            </div>
          )}
        </div>

        <div className="order-total">
          Tổng tiền:
          {" "}
          {total.toLocaleString()}đ
        </div>

        <div className="order-actions">
          <button
            className="btn cancel"
            onClick={handleCancel}
          >
            Từ chối
          </button>

          <button
            className="btn confirm"
            onClick={handleConfirm}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}