import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../../Pagination";
import "../../styles/Dashboard/TransferTable/AdminTransferTable.css";


const AdminTransferTable = () => {
  const [reservations, setReservations] = useState([]);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");

  const fetchReservations = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/reservations?page=${page}&limit=5&search=${search}`,
      );

      setReservations(res.data.data);

      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [page, search]);

  return (
    <div className="reservation-page">
      <div className="reservation-header">
        <h2>Đặt bàn</h2>

        <input
          type="text"
          placeholder="Tìm khách hàng..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />
      </div>

      <table className="reservation-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Khách hàng</th>
            <th>SĐT</th>
            <th>Bàn</th>
            <th>Ngày</th>
            <th>Giờ</th>
            <th>Số người</th>
            <th>Trạng thái</th>
          </tr>
        </thead>

        <tbody>
          {reservations.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>

              <td>{item.customerName}</td>

              <td>{item.phone}</td>

              <td>{item.tableName}</td>

              <td>{item.date}</td>

              <td>{item.time}</td>

              <td>{item.guests}</td>

              <td>
                <span className="status">
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default AdminTransferTable;