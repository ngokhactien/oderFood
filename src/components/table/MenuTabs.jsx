import categories from "../../data/sidebar";
import '../styles/table/MenuTabs.css'

const MenuTabs = ({ active, onChange }) => {
  return (
    <div className="menu-tabs">
      {categories.map((cat) => (
        <button
          key={cat.value}
          className={`tab ${active === cat.value ? "active" : ""}`}
          onClick={() => onChange(cat.value)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default MenuTabs;