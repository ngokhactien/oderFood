import { useState } from "react";
import OrderPanel from "../components/table/OrderPanel";
import TableManager from "../components/table/TableManager";
import "../styles/POSLayout.css";
import MenuPOS from "../components/table/MenuPOS";
import { useSelector } from "react-redux";
import SearchBar from "../components/header/SearchBar";
import OrderRequest from "../components/table/OrderRequest";

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
  const user = useSelector((state) => state.auth.user);
  const [tabs, setTabs] = useState([
    {
      id: "Giao đi",
      name: "Giao đi",
      fixed: true,
      items: mockItems.map((i) => ({ ...i })),
    },
  ]);

  console.log("user", user);

  const { items = [] } = useSelector((state) => state.products || {});

  const handleSelectTable = (table) => {
    const existed = tabs.find((t) => t.id === table.id);

    if (existed) {
      setActiveTab(existed.id);
    } else {
      const newTab = {
        id: table.id,
        name: table.tabName,
        items: [],
      };

      setTabs((prev) => [...prev, newTab]);
      setActiveTab(table.id);
    }
  };

  return (
    <div className="pos-table">
      {/* ===== LEFT SIDE ===== */}
      <main className="tables">
        {/* TOP TABS */}
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

        {/* CONTENT */}
        {tab === "tables" && (
          <TableManager
            onSelectTable={handleSelectTable}
            activeTable={activeTab}
          />
        )}
        {tab === "menu" && (
          <MenuPOS
            products={items}
            onAdd={(item) => {
              setTabs((prev) =>
                prev.map((t) => {
                  if (t.id !== activeTab) return t;

                  const existed = t.items.find((i) => i.id === item._id);

                  if (existed) {
                    return {
                      ...t,
                      items: t.items.map((i) =>
                        i.id === item._id ? { ...i, qty: i.qty + 1 } : i,
                      ),
                    };
                  }

                  return {
                    ...t,
                    items: [...t.items, { ...item, id: item._id, qty: 1 }],
                  };
                }),
              );
            }}
          />
        )}
        {tab === "order" && <OrderRequest />}
      </main>

      {/* ===== RIGHT SIDE ===== */}
      {/* <section className="order-container"> */}
      <section className="orders-pay">
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
