import '../styles/home/CategoryMenu.css';
import categories from '../../data/categories';
import { NavLink } from "react-router-dom";

const CategoryMenu = () => {
  return (
    <section className="menu-section">
      <h2 className="menu-title">Lựa chọn thực đơn</h2>

      <div className="category-container">
        {categories.map((item) => (
          <NavLink
            to={`/product-card/${item.id}`}   // 👉 truyền id qua URL
            key={item.id}
            className="category-card"
          >
            <div className="image-circle">
              <img src={item.img} alt={item.name} />
            </div>
            <p className="category-name">{item.name}</p>
          </NavLink>
        ))}
      </div>
    </section>
  );
};

export default CategoryMenu;