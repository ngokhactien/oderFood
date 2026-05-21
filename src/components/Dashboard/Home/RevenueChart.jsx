import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";


import "./styles/RevenueChart.css";

export default function RevenueChart({
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
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}