import React from "react";

const Card = ({ title, value, extra }) => {
  return (
    <div className="card">
      <h4>{title}</h4>
      <h2>{value}</h2>
      <span>{extra}</span>
    </div>
  );
};

export default Card;