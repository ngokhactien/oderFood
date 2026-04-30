import { useState } from "react";

export default function OrderPanel() {
  const [tabs, setTabs] = useState([
    {
      id: 1,
      name: "1",
      items: [
        { id: 1, name: "Phomai dây Nga", price: 125000, qty: 1 }
      ]
    }
  ]);

  const [activeTab, setActiveTab] = useState(1);

  const currentTab = tabs.find((t) => t.id === activeTab);

  const updateQty = (id, delta) => {
    setTabs((prev) =>
      prev.map((tab) =>
        tab.id === activeTab
          ? {
              ...tab,
              items: tab.items.map((i) =>
                i.id === id
                  ? { ...i, qty: Math.max(1, i.qty + delta) }
                  : i
              )
            }
          : tab
      )
    );
  };

  const removeItem = (id) => {
    setTabs((prev) =>
      prev.map((tab) =>
        tab.id === activeTab
          ? { ...tab, items: tab.items.filter((i) => i.id !== id) }
          : tab
      )
    );
  };

  const addTab = () => {
    const newId = Date.now();
    setTabs([
      ...tabs,
      { id: newId, name: tabs.length + 1, items: [] }
    ]);
    setActiveTab(newId);
  };

  const removeTab = (id) => {
    if (tabs.length === 1) return;

    const newTabs = tabs.filter((t) => t.id !== id);
    setTabs(newTabs);

    if (activeTab === id) {
      setActiveTab(newTabs[0].id);
    }
  };

  const total = currentTab.items.reduce(
    (s, i) => s + i.price * i.qty,
    0
  );

  return (
    <div className="orders">

      {/* ===== TABS ===== */}
      <div className="order-tabs">
        {tabs.map((tab) => (
          <div
            key={tab.id}
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
              ×
            </span>
          </div>
        ))}

        <div className="tab add" onClick={addTab}>
          +
        </div>
      </div>

      {/* ===== HEADER ===== */}
      <div className="order-header">
        <input placeholder="Tìm khách hàng" />
      </div>

      {/* ===== LIST ===== */}
      <div className="order-list">
        {currentTab.items.map((item, i) => (
          <div key={item.id} className="item">
            <div className="left">
              <b>{i + 1}. {item.name}</b>
            </div>

            <div className="right">
              <div className="qty">
                <button onClick={() => updateQty(item.id, -1)}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item.id, 1)}>+</button>
              </div>

              <div className="unit">
                {item.price.toLocaleString()}
              </div>

              <div className="price">
                {(item.price * item.qty).toLocaleString()}
              </div>

              <div
                className="delete"
                onClick={() => removeItem(item.id)}
              >
                🗑️
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== FOOTER ===== */}
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