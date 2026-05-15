import { useMemo, useState } from "react";

import {
  ChartBarIcon,
  ChartPieIcon,
  FireIcon,
} from "@heroicons/react/24/outline";

import "../../styles/Dashboard/Reports/AdminProductsReport.css";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";


const productsData = [
  { id: 1, name: "Trà sữa", sold: 420 },
  { id: 2, name: "Gà rán", sold: 390 },
  { id: 3, name: "Pizza", sold: 320 },
  { id: 4, name: "Burger", sold: 280 },
  { id: 5, name: "Mì Ý", sold: 250 },
  { id: 6, name: "Cơm gà", sold: 210 },
  { id: 7, name: "Khoai tây", sold: 190 },
  { id: 8, name: "Coca", sold: 170 },
  { id: 9, name: "Pepsi", sold: 150 },
  { id: 10, name: "Hotdog", sold: 120 },
  { id: 11, name: "Tokbokki", sold: 100 },
  { id: 12, name: "Bánh mì", sold: 90 },
  { id: 13, name: "Xúc xích", sold: 80 },
  { id: 14, name: "Kem", sold: 75 },
  { id: 15, name: "Phô mai que", sold: 60 },
  { id: 16, name: "Mochi", sold: 55 },
  { id: 17, name: "Bánh gạo", sold: 50 },
  { id: 18, name: "Soda", sold: 45 },
  { id: 19, name: "Cà phê", sold: 40 },
  { id: 20, name: "Nước cam", sold: 30 },
];

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#ec4899",
  "#22c55e",
  "#6366f1",
  "#f97316",
];

export default function AdminProductsReport() {
  const [chartType, setChartType] = useState("bar");
  const [limit, setLimit] = useState(5);

  const topProducts = useMemo(() => {
    return [...productsData]
      .sort((a, b) => b.sold - a.sold)
      .slice(0, limit);
  }, [limit]);

  return (
    <div className="top-products">
      {/* header */}
      <div className="top-products__header">
        <div>
          <h1>
            <FireIcon className="top-products__title-icon" />
            Top sản phẩm bán chạy
          </h1>

          <p>
            Thống kê sản phẩm bán chạy nhất hệ thống
          </p>
        </div>

        <div className="top-products__actions">
          {/* top filter */}
          <select
            value={limit}
            onChange={(e) =>
              setLimit(Number(e.target.value))
            }
            className="top-products__select"
          >
            <option value={5}>Top 5</option>
            <option value={10}>Top 10</option>
            <option value={15}>Top 15</option>
            <option value={20}>Top 20</option>
          </select>

          {/* chart type */}
          <div className="top-products__types">
            <button
              className={`top-products__type-btn ${
                chartType === "bar"
                  ? "top-products__type-btn--active"
                  : ""
              }`}
              onClick={() => setChartType("bar")}
            >
              <ChartBarIcon />
            </button>

            <button
              className={`top-products__type-btn ${
                chartType === "pie"
                  ? "top-products__type-btn--active"
                  : ""
              }`}
              onClick={() => setChartType("pie")}
            >
              <ChartPieIcon />
            </button>
          </div>
        </div>
      </div>

      {/* chart */}
      <div className="top-products__chart-card">
        {chartType === "bar" ? (
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="sold"
                fill="#3b82f6"
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height={500}>
            <PieChart>
              <Pie
                data={topProducts}
                dataKey="sold"
                nameKey="name"
                outerRadius={180}
                label
              >
                {topProducts.map((item, index) => (
                  <Cell
                    key={item.id}
                    fill={
                      COLORS[
                        index % COLORS.length
                      ]
                    }
                  />
                ))}
              </Pie>

              <Tooltip />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* table */}
      <div className="top-products__table-card">
        <h3>Danh sách sản phẩm bán chạy</h3>

        <table className="top-products__table">
          <thead>
            <tr>
              <th>#</th>
              <th>SẢN PHẨM</th>
              <th>ĐÃ BÁN</th>
            </tr>
          </thead>

          <tbody>
            {topProducts.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>

                <td>{item.name}</td>

                <td>{item.sold}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}