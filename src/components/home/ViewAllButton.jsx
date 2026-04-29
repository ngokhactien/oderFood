import React from 'react';
import '../styles/home/ViewAllButton.css';

const ViewAllButton = ({ onClick, label = "Xem tất cả" }) => {
  return (
    <div className="view-all-wrapper">
      <button className="view-all-btn" onClick={onClick}>
        {label}
      </button>
    </div>
  );
};

export default ViewAllButton;