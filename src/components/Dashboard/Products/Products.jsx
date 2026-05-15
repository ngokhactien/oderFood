import { useState } from "react";
import Pagination from "../../Pagination";
import "../../styles/Dashboard/Products/Products.css";
import { NavLink } from "react-router-dom";

const productData = [
  {
    id: 1,
    name: "Burger Bò Sốt Tiêu Đen",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=300",
    oldPrice: "65,000₫",
    price: "51,000₫",
  },
  {
    id: 2,
    name: "Burger Gà Quay Flava",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=300",
    oldPrice: "60,000₫",
    price: "47,000₫",
  },
  {
    id: 3,
    name: "Burger Tôm",
    image:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=300",
    oldPrice: "50,000₫",
    price: "40,000₫",
  },
  {
    id: 4,
    name: "Burger Zinger",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=300",
    oldPrice: "65,000₫",
    price: "55,000₫",
  },
  {
    id: 5,
    name: "Mì Ý Bò Bằm Đút Lò",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=300",
    oldPrice: "55,000₫",
    price: "45,000₫",
  },
  {
    id: 6,
    name: "Pizza Hải Sản",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=300",
    oldPrice: "120,000₫",
    price: "99,000₫",
  },
  {
    id: 7,
    name: "Gà Rán",
    image:
      "https://images.unsplash.com/photo-1562967916-eb82221dfb92?q=80&w=300",
    oldPrice: "80,000₫",
    price: "65,000₫",
  },
];

export default function Products() {
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(5);
  const [page, setPage] = useState(1);

  // filter
  const filtered = productData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  // pagination
  const totalPages = Math.ceil(filtered.length / entries);

  const start = (page - 1) * entries;

  const currentData = filtered.slice(start, start + entries);

  return (
    <div className="products-page">
      {/* top */}
      <div className="products-top">
        {/* filter */}
        <div className="products-filter">
          <select
            value={entries}
            onChange={(e) => {
              setEntries(Number(e.target.value));
              setPage(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>

          <input
            type="text"
            placeholder="Tìm sản phẩm"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          <select>
            <option>Tất cả danh mục</option>
            <option>Burger</option>
            <option>Pizza</option>
            <option>Mì Ý</option>
          </select>

          <button>Lọc</button>
        </div>

        <div className="products-left">
          <NavLink to={'form/A'} className="add-product-btn">+ Thêm sản phẩm</NavLink>
        </div>
      </div>

      {/* table */}
      <div className="products-table-wrapper">
        <table className="products-table">
          <thead>
            <tr>
              <th>#</th>
              <th>SẢN PHẨM</th>
              <th>HÌNH ẢNH</th>
              <th>GIÁ GỐC</th>
              <th>GIÁ BÁN</th>
              <th>THAO TÁC</th>
            </tr>
          </thead>

          <tbody>
            {currentData.map((item, index) => (
              <tr key={item.id}>
                <td>{start + index + 1}</td>

                <td className="product-name">{item.name}</td>

                <td>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="product-image"
                  />
                </td>

                <td className="old-price">{item.oldPrice}</td>

                <td className="new-price">{item.price}</td>

                <td>
                  <button className="action-btn">⋮</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* footer */}
        <div className="products-footer">
          <span>
            Showing {start + 1} to {Math.min(start + entries, filtered.length)}{" "}
            of {filtered.length} entries
          </span>

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}
