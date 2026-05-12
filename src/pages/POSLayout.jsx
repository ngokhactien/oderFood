// POSLayout.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import OrderPanel from "../components/table/OrderPanel";
import TableManager from "../components/table/TableManager";
import MenuPOS from "../components/table/MenuPOS";
import SearchBar from "../components/header/SearchBar";
import OrderRequest from "../components/table/OrderRequest";

import "../styles/POSLayout.css";

import { openTab, addDraftItem } from "../redux/orderUiSlice";
import { getActiveOrders } from "../redux/orderSlice";

export default function POSLayout() {
  const dispatch = useDispatch();

  const [tab, setTab] = useState("tables");

  const loading = useSelector((state) => state.order.loading);
  const actionType = useSelector((state) => state.order.actionType);

  const activeTable = useSelector((state) => state.orderUI.activeTable);

  // =========================
  // LOAD ACTIVE ORDERS
  // =========================
  useEffect(() => {
    dispatch(getActiveOrders());
  }, [dispatch]);

  // =========================
  // SELECT TABLE
  // =========================
  const handleSelectTable = (table) => {
    dispatch(
      openTab({
        ...table,
        id: table.id,
        name: table.displayName || table.name,
        tabName: table.tabName || table.name,
        floor: table.floorName || "",
        fixed: table.fixed || false,
      }),
    );
  };

  return (
    <div className="pos-table">
      {/* ========================= */}
      {/* LEFT */}
      {/* ========================= */}
      <main className="tables">
        <div className="tables-top">
          <div className="top-tabs">
            <div
              className={tab === "tables" ? "active" : ""}
              onClick={() => setTab("tables")}
            >
              Phòng bàn
            </div>

            <div
              className={tab === "menu" ? "active" : ""}
              onClick={() => setTab("menu")}
            >
              Thực đơn
            </div>

            <div
              className={tab === "order" ? "active" : ""}
              onClick={() => setTab("order")}
            >
              Đặt gọi món
            </div>
          </div>

          <SearchBar />
        </div>

        {/* ========================= */}
        {/* LOADING */}
        {/* ========================= */}
        {loading && (
          <div className="loading-overlay">
            {actionType === "pay" && "Đang thanh toán..."}
            {actionType === "confirm" && "Đang xác nhận..."}
            {actionType === "addItem" && "Đang thêm món..."}
            {actionType === "updateQty" && "Đang cập nhật..."}
            {actionType === "removeItem" && "Đang xoá món..."}
            {actionType === "getOrCreate" && "Đang mở bàn..."}
            {actionType === "getActive" && "Đang tải đơn..."}
          </div>
        )}

        {/* ========================= */}
        {/* CONTENT */}
        {/* ========================= */}

        {tab === "tables" && (
          <TableManager
            onSelectTable={handleSelectTable}
            activeTable={activeTable?.id}
          />
        )}

        {tab === "menu" && (
          <MenuPOS
            onAdd={(item) => {
              if (!activeTable) {
                alert("Chọn bàn trước!");
                return;
              }

              dispatch(
                addDraftItem({
                  tableId: activeTable.id,

                  product: item,

                  tableInfo: {
                    id: activeTable.id,
                    name: activeTable.name,
                    floor: activeTable.floor,
                  },
                }),
              );
            }}
          />
        )}

        {tab === "order" && <OrderRequest />}
      </main>

      {/* ========================= */}
      {/* RIGHT */}
      {/* ========================= */}
      <section className="orders-pay">
        <OrderPanel />
      </section>
    </div>
  );
}
