import { useEffect, useState } from "react";
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
  const user = useSelector((state) => state.auth.user);
  const { items = [] } = useSelector((state) => state.products || {});

  const STORAGE_TABS = "pos_tabs_v1";
  const STORAGE_ACTIVE = "pos_activeTab_v1";

  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem(STORAGE_ACTIVE) || "Giao đi";
  });

  const [tabs, setTabs] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_TABS);
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: "Giao đi",
              name: "Giao đi",
              fixed: true,
              items: [],
            },
          ];
    } catch {
      return [
        {
          id: "Giao đi",
          name: "Giao đi",
          fixed: true,
          items: [],
        },
      ];
    }
  });

  const handleSelectTable = (table) => {
    const tableId = typeof table === "string" ? table : table.id;
    const tableName = typeof table === "string" ? table : table.tabName;

    const existed = tabs.find((t) => t.id === tableId);

    if (existed) {
      setActiveTab(existed.id);
    } else {
      const newTab = {
        id: tableId,
        name: tableName,
        items: [],
      };

      setTabs((prev) => [...prev, newTab]);
      setActiveTab(tableId);
    }
  };

  //set tab localStorage
  useEffect(() => {
    const exists = tabs.find((t) => t.id === activeTab);
    if (!exists && tabs.length) {
      setActiveTab(tabs[0].id);
    }
  }, [tabs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_TABS, JSON.stringify(tabs));
  }, [tabs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_ACTIVE, activeTab);
  }, [activeTab]);

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
