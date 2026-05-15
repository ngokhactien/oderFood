import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import "../../styles/Dashboard/Home/ProductChart.css";

export default function ProductChart({
  data,
  title,
}) {
  return (
    <div className="dashboard-chart">
      <div className="dashboard-chart__header">
        <h3>{title}</h3>
      </div>

      <div className="dashboard-chart__body">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="products"
              fill="#10b981"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}