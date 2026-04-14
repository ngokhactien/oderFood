const Cart = ({ cart, updateQuantity, removeItem }) => {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2>Giỏ hàng</h2>
      {cart.length === 0 && <p>Chưa có món nào</p>}
      {cart.map((item) => (
        <div key={item.id}>
          <span>{item.name}</span>
          <button onClick={() => updateQuantity(item.id, -1)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => updateQuantity(item.id, 1)}>+</button>
          <span>{(item.price * item.quantity).toLocaleString()}đ</span>
          <button onClick={() => removeItem(item.id)}>Xóa</button>
        </div>
      ))}
      <h3>Tổng: {total.toLocaleString()}đ</h3>
    </div>
  );
};

export default Cart;