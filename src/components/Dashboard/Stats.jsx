import React from "react";

const Stats = () => {
  return (
    <div className="stats">
      <h3>Thống kê bán hàng</h3>

      <div className="stats-box">
        <div>
          <p>Tổng đã bán</p>
          <h2>28</h2>
        </div>
        <div>
          <p>Trung bình/ngày</p>
          <h2>2.8</h2>
        </div>
        <div>
          <p>Cao nhất</p>
          <h2>7</h2>
        </div>
        <div>
          <p>Thấp nhất</p>
          <h2>1</h2>
        </div>
      </div>
    </div>
  );
};

export default Stats;