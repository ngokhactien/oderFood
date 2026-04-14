import { useState } from "react";
import TableSelector from "../components/TableSelector";
import MenuList from "../components/MenuList";
import Cart from "../components/Cart";

const Home = () => {
  const [table, setTable] = useState(null);
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => {
      const exist = prev.find((i) => i.id === item.id);
      if (exist) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id, change) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Order Đồ Ăn Tại Bàn</h1>
      <TableSelector table={table} setTable={setTable} />
      {table && (
        <>
          <MenuList addToCart={addToCart} />
          <Cart
            cart={cart}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
          />
        </>
      )}
    </div>
  );
};

export default Home;