import "../styles/home/FoodListSection.css";
import foodListSection from "../../data/foodListSection.js";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

const Card = ({ title, items }) => (
  <div className="food-column">
    <h3 className="food-title">{title}</h3>

    {items.map((item, index) => (
      <div className="food-item" key={index}>
        <img src={item.img} alt="" />
        <div className="food-info">
          <p className="food-name">{item.name}</p>
          <div className="food-rating">★★★★★</div>
          <span className="food-price">{item.price}</span>
        </div>
         <button
            className="add-btn"
            onClick={(e) => {
              e.preventDefault(); // Ngăn NavLink chuyển trang
              e.stopPropagation(); // Ngăn bubbling
              onAdd(product);
            }}
            aria-label="Thêm vào giỏ hàng"
          >
            <ShoppingCartIcon className="cart-icon" />
          </button>
      </div>
    ))}
  </div>
);

const FoodListSection = () => {
  return (
    <div className="food-container">
      <Card title="Xu hướng" items={foodListSection.trending} />
      <Card title="Bán chạy" items={foodListSection.popular} />
      <Card title="Hot sale" items={foodListSection.hot} />
    </div>
  );
};

export default FoodListSection;