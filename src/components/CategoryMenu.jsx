import React from 'react';
import './styles/CategoryMenu.css';

import categories from '../data/categories'

const CategoryMenu = () => {
  return (
    <section className="menu-section">
      <h2 className="menu-title">Lựa chọn thực đơn</h2>
      
      <div className="category-container">
        {categories.map((item) => (
          <div key={item.id} className="category-card">
            <div className="image-circle">
              <img src={item.img} alt={item.name} />
            </div>
            <p className="category-name">{item.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryMenu;