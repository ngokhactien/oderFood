import { useState } from "react";
import OrderPanel from "../components/table/OrderPanel";
import TableManager from "../components/table/TableManager";
import "../styles/POSLayout.css";

const mockItems = [
  {
    id: 1,
    name: "Cà phê sữa",
    price: 25000,
    qty: 1,
  },
  {
    id: 2,
    name: "Trà đào",
    price: 30000,
    qty: 2,
  },
];

export default function POSLayout() {
  const [tab, setTab] = useState("tables");
  const [activeTab, setActiveTab] = useState("Giao đi");
  const [tabs, setTabs] = useState([
    {
      id: "Giao đi",
      name: "Giao đi",
      fixed: true,
      items: mockItems.map(i => ({ ...i })),
    },
  ]);

  const handleSelectTable = (tableName) => {
    const existed = tabs.find((t) => t.id === tableName);

    if (existed) {
      setActiveTab(existed.id);
    } else {
      const newTab = {
        id: tableName,
        name: formatTableName(tableName),
        items: mockItems.map(i => ({ ...i })),
      };

      setTabs((prev) => [...prev, newTab]);
      setActiveTab(tableName);
    }
  };

  // format tên tab
  const formatTableName = (name) => {
    if (name.startsWith("Bàn ")) {
      const num = name.replace("Bàn ", "");
      return `B${num}`; // 👉 B1, B2
    }
    return name;
  };

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
        {tab === "tables" && <TableManager onSelectTable={handleSelectTable} activeTable={activeTab}/>}
        {tab === "menu" && <div>Menu ở đây</div>}
        {tab === "order" && <div>Order nhanh ở đây</div>}
      </main>

      {/* ===== RIGHT SIDE ===== */}
      <section className="orders">
        <OrderPanel
          tabs={tabs}
          setTabs={setTabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </section>
    </div>
  );
}
