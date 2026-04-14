import menu from "../data/menu";

const MenuList = ({ addToCart }) => {
  return (
    <div>
      <h2>Thực đơn</h2>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {menu.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              width: "150px",
              textAlign: "center",
            }}
          >
            <img src={item.image} alt={item.name} width="100" />
            <h4>{item.name}</h4>
            <p>{item.price.toLocaleString()}đ</p>
            <button onClick={() => addToCart(item)}>Thêm</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuList;