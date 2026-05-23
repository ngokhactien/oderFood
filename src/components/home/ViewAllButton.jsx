import React from 'react';
import './styles/ViewAllButton.css';
import { NavLink } from 'react-router-dom';

const ViewAllButton = ({label = "Xem tất cả" }) => {
  return (
    <div className="view-all-wrapper">
      <NavLink to={'/product-card'} className="view-all-btn">
        {label}
      </NavLink>
    </div>
  );
};

export default ViewAllButton;