import { useState, useRef, useEffect } from "react";
import "../styles/table/OrderPanel.css";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Pagination from "../Pagination";

export default function OrderPanel({ tabs, setTabs, activeTab, setActiveTab }) {
  const currentTab = tabs.find((t) => t.id === activeTab) || { items: [] };
  const tabRefs = useRef({});
  const tabsContainerRef = useRef(null);

  const [page, setPage] = useState(1);
  const pageSize = 6;

  const totalPages = Math.ceil(currentTab.items.length / pageSize);
  const start = (page - 1) * pageSize;
  const currentItems = currentTab.items.slice(start, start + pageSize);

  const updateQty = (id, delta) => {
    setTabs((prev) =>
      prev.map((tab) =>
        tab.id === activeTab
          ? {
              ...tab,
              items: tab.items.map((i) =>
                i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i,
              ),
            }
          : tab,
      ),
    );
  };

  const removeItem = (id) => {
    setTabs((prev) =>
      prev.map((tab) =>
        tab.id === activeTab
          ? { ...tab, items: tab.items.filter((i) => i.id !== id) }
          : tab,
      ),
    );
  };

  const removeTab = (id) => {
    const tab = tabs.find((t) => t.id === id);

    if (tab?.fixed) return;

    const newTabs = tabs.filter((t) => t.id !== id);
    setTabs(newTabs);

    if (activeTab === id && newTabs.length) {
      setActiveTab(newTabs[0].id);
    }
  };

  const total = currentTab.items.reduce((s, i) => s + i.price * i.qty, 0);

  // scroll khi tab nhiều quá
  useEffect(() => {
    const el = tabRefs.current[activeTab];

    if (!el) return;

    requestAnimationFrame(() => {
      el.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    });
  }, [activeTab, tabs]);

  const handlePageChange = (p) => {
    setPage(p);

    // scroll list lên đầu thay vì window
    document.querySelector(".order-list")?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="orders">
      <div className="order-tabs">
        {/* 👉 TAB CỐ ĐỊNH */}
        {tabs
          .filter((t) => t.fixed)
          .map((tab) => (
            <div
              key={tab.id}
              className={`tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.name}
            </div>
          ))}

        {/* 👉 VÙNG SCROLL */}
        <div className="tabs-scroll" ref={tabsContainerRef}>
          {tabs
            .filter((t) => !t.fixed)
            .map((tab) => (
              <div
                key={tab.id}
                ref={(el) => (tabRefs.current[tab.id] = el)}
                className={`tab ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.name}

                <span
                  className="close"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTab(tab.id);
                  }}
                >
                  <XMarkIcon className="icon-close" />
                </span>
              </div>
            ))}
        </div>
      </div>

      <div className="order-header">
        <input placeholder="Tìm khách hàng" />
      </div>

      <div className="order-list">
        {currentTab.items.map((item, i) => (
          <div key={item.id} className="item">
            <div className="left">
              <b>
                {i + 1}. {item.name}
              </b>
            </div>

            <div className="right">
              <div className="qty">
                <button onClick={() => updateQty(item.id, -1)}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item.id, 1)}>+</button>
              </div>

              <div className="unit">{item.price.toLocaleString()}</div>

              <div className="price">
                {(item.price * item.qty).toLocaleString()}
              </div>

              <div className="delete" onClick={() => removeItem(item.id)}>
                🗑️
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{margin: '1rem 0'}}>
        {totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      <div className="order-footer">
        <div className="total">
          Tổng tiền: <b>{total.toLocaleString()}</b>
        </div>

        <div className="btn-pay">
          <button className="pay">Thanh toán</button>
          <button className="notify">Thông báo</button>
        </div>
      </div>
    </div>
  );
}
