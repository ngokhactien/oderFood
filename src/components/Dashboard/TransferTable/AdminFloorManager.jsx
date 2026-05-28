// pages/admin/floor/AdminFloorManager.jsx

import { useEffect, useState } from "react";
import axios from "axios";

import {
  PlusIcon,
  TrashIcon,
  BuildingOffice2Icon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";

import "./styles/AdminFloorManager.css";

export default function AdminFloorManager() {
  const [floors, setFloors] = useState([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  // =========================
  // FETCH FLOORS
  // =========================

  useEffect(() => {
    fetchFloors();
  }, []);

  const fetchFloors = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/api/floor");

      if (res.data?.length > 0) {
        setFloors(res.data);
      } else {
        setFloors([
          {
            name: "",
            tables: [
              {
                name: "",
                capacity: 2,
              },
            ],
          },
        ]);
      }
    } catch (error) {
      console.log(error);

      setFloors([
        {
          name: "",
          tables: [
            {
              name: "",
              capacity: 2,
            },
          ],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FLOOR
  // =========================

  const addFloor = () => {
    setFloors((prev) => [
      ...prev,
      {
        name: "",
        tables: [
          {
            name: "",
            capacity: 2,
          },
        ],
      },
    ]);
  };

  const removeFloor = (floorIndex) => {
    setFloors((prev) => prev.filter((_, index) => index !== floorIndex));
  };

  const updateFloorName = (floorIndex, value) => {
    const updated = [...floors];

    updated[floorIndex].name = value;

    setFloors(updated);
  };

  // =========================
  // TABLE
  // =========================

  const addTable = (floorIndex) => {
    const updated = [...floors];

    updated[floorIndex].tables.push({
      name: "",
      capacity: 2,
    });

    setFloors(updated);
  };

  const removeTable = (floorIndex, tableIndex) => {
    const updated = [...floors];

    updated[floorIndex].tables = updated[floorIndex].tables.filter(
      (_, index) => index !== tableIndex,
    );

    setFloors(updated);
  };

  const updateTable = (floorIndex, tableIndex, field, value) => {
    const updated = [...floors];

    updated[floorIndex].tables[tableIndex][field] = value;

    setFloors(updated);
  };

  // =========================
  // SAVE
  // =========================

  const handleSave = async () => {
    try {
      setSaving(true);

      await axios.post("/api/floor", {
        floors,
      });

      alert("Lưu sơ đồ bàn thành công");
    } catch (error) {
      console.log(error);

      alert("Có lỗi xảy ra");
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="floor-manager-loading">
        Loading...
      </div>
    );
  }

  return (
    <div className="floor-manager-page">
      {/* HEADER */}
      <div className="floor-manager-header">
        <div>
          <h1>Cài đặt sơ đồ bàn</h1>

          <p>Quản lý tầng và bàn trong nhà hàng</p>
        </div>

        <button
          className="floor-save-btn"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
      </div>

      {/* FLOORS */}
      <div className="floor-list">
        {floors.map((floor, floorIndex) => (
          <div className="floor-card" key={floorIndex}>
            {/* FLOOR TOP */}
            <div className="floor-card-top">
              <div className="floor-title">
                <BuildingOffice2Icon className="floor-icon" />

                <input
                  type="text"
                  placeholder="Tên tầng..."
                  value={floor.name}
                  onChange={(e) =>
                    updateFloorName(floorIndex, e.target.value)
                  }
                />
              </div>

              <button
                className="delete-floor-btn"
                onClick={() => removeFloor(floorIndex)}
              >
                <TrashIcon className="trash-icon" />
              </button>
            </div>

            {/* TABLES */}
            <div className="table-list">
              {floor.tables.map((table, tableIndex) => (
                <div className="table-card" key={tableIndex}>
                  <div className="table-card-left">
                    <TableCellsIcon className="table-icon" />

                    <input
                      type="text"
                      placeholder="Tên bàn..."
                      value={table.name}
                      onChange={(e) =>
                        updateTable(
                          floorIndex,
                          tableIndex,
                          "name",
                          e.target.value,
                        )
                      }
                    />

                    <input
                      type="number"
                      min={1}
                      placeholder="Sức chứa"
                      value={table.capacity}
                      onChange={(e) =>
                        updateTable(
                          floorIndex,
                          tableIndex,
                          "capacity",
                          Number(e.target.value),
                        )
                      }
                    />
                  </div>

                  <button
                    className="delete-table-btn"
                    onClick={() =>
                      removeTable(floorIndex, tableIndex)
                    }
                  >
                    <TrashIcon className="trash-icon" />
                  </button>
                </div>
              ))}

              {/* ADD TABLE */}
              <button
                className="add-table-btn"
                onClick={() => addTable(floorIndex)}
              >
                <PlusIcon className="plus-icon" />

                Thêm bàn
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ADD FLOOR */}
      <button
        className="add-floor-btn"
        onClick={addFloor}
      >
        <PlusIcon className="plus-icon" />

        Thêm tầng
      </button>
    </div>
  );
}