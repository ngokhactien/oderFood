export default function OrderSummary({ cartItems, total }) {
  return (
    <div className="checkout-right">
      <div className="order-header">
        <h3>Đơn Hàng Của Bạn</h3>
        <span className="badge">{cartItems.length} sản phẩm</span>
      </div>

      <div className="order-list">
        {cartItems.map((item, index) => (
          <div key={index} className="order-item">
            <span>
              {index + 1}. {item.name}
              {item.option && ` (${item.option.label})`}
            </span>

            <span className="price">
              {item.quantity} x{" "}
              {(item.option?.price || item.price).toLocaleString()}đ
            </span>
          </div>
        ))}
      </div>

      <div className="summary-box">
        <div>
          <span>Tạm tính:</span>
          <span>{total.toLocaleString()}đ</span>
        </div>

        <div>
          <span>Phí vận chuyển:</span>
          <span className="free">Miễn phí</span>
        </div>

        <div className="total">
          <span>Tổng cộng:</span>
          <span>{total.toLocaleString()}đ</span>
        </div>
      </div>

      <div className="payment-box">
        💳 Thanh toán qua MoMo
      </div>

      <button className="btn-payment">
        Thanh Toán MoMo
      </button>

      <p className="secure-text">
        Giao dịch được bảo mật và mã hóa
      </p>
    </div>
  );
}