import { useDispatch, useSelector } from "react-redux";
import "./styles/OrderPanel.css";
import {
  updateQty,
  removeItem,
  payOrder,
  getActiveOrders,
} from "../../redux/orderSlice";
import { closeTab, setActiveTab } from "../../redux/orderUiSlice";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function OrderPanel() {
  const dispatch = useDispatch();

  // ✅ lấy từ Redux
  const { tabs, activeTab } = useSelector((state) => state.orderUI);

  const orders = useSelector((state) => state.order.orders);

  // // ✅ map tab → order
const activeOrder =
  activeTab === "Giao đi"
    ? orders?.find((o) => o.tableId === "Giao đi")
    : orders?.find((o) => o._id === activeTab || o.tableId === activeTab);

  const items = activeOrder?.items || [];
  const total = activeOrder?.total || 0;

  const [page, setPage] = useState(1);
  const pageSize = 6;

  const currentItems = items.slice((page - 1) * pageSize, page * pageSize);

  const handleUpdateQty = (item, delta) => {
    dispatch(
      updateQty({
        orderId: activeOrder._id,
        itemId: item._id,
        qty: Math.max(1, item.qty + delta),
      }),
    );
  };

  const handleRemove = (itemId) => {
    dispatch(
      removeItem({
        orderId: activeOrder._id,
        itemId,
      }),
    );
  };

  const handlePay = async () => {
    await dispatch(payOrder(activeOrder._id));
    dispatch(getActiveOrders());
  };

  return (
    <div className="orders">
      {/* ===== TABS ===== */}
      <div className="order-tabs">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => dispatch(setActiveTab(tab.id))}
          >
            {tab.name}
            
            {!tab.fixed && (
              <span
                className="close"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(closeTab(tab.id));
                }}
              >
                <XMarkIcon className="icon-close" />
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="order-list">
        {currentItems.map((item, i) => (
          <div key={item._id} className="item">
            <div className="left">
              <b>
                {i + 1}. {item.name}
              </b>
            </div>

            <div className="right">
              <div className="qty">
                <button onClick={() => handleUpdateQty(item, -1)}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => handleUpdateQty(item, 1)}>+</button>
              </div>

              <div className="unit">{item.price.toLocaleString()}</div>

              <div className="price">
                {(item.price * item.qty).toLocaleString()}
              </div>

              <div className="delete" onClick={() => handleRemove(item._id)}>
                🗑️
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="order-footer">
        <div className="total">
          Tổng tiền: <b>{total.toLocaleString()}</b>
        </div>

        <button
          className="pay"
          onClick={handlePay}
          disabled={!activeOrder || currentItems.length === 0}
        >
          Thanh toán
        </button>
      </div>
    </div>
  );
}
