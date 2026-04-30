import { useState } from "react";
import OrderPanel from "../components/table/OrderPanel";
import TableManager from "../components/table/TableManager";
import "../styles/POSLayout.css";

export default function POSLayout() {
  const [tab, setTab] = useState("tables");

  return (
    <div className="pos-table">

      {/* ===== LEFT SIDE ===== */}
      <main className="tables">

        {/* TOP TABS */}
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

        {/* CONTENT */}
        {tab === "tables" && <TableManager />}
        {tab === "menu" && <div>Menu ở đây</div>}
        {tab === "order" && <div>Order nhanh ở đây</div>}

      </main>

      {/* ===== RIGHT SIDE ===== */}
      <section className="orders">
        <OrderPanel />
      </section>

    </div>
  );
}