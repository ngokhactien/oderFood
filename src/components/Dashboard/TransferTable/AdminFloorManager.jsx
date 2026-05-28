// pages/admin/floor/AdminFloorManager.jsx

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  PlusIcon,
  TrashIcon,
  BuildingOffice2Icon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";

import "./styles/AdminFloorManager.css";

// FLOOR
import {
  fetchFloors,
  createFloor,
  updateFloor,
  deleteFloor,
} from "../../../redux/admin/floors/floorSlice.js";

// TABLE
import {
  addTable,
  updateTable,
  deleteTable,
} from "../../../redux/admin/floors/tableSlice.js";

export default function AdminFloorManager() {
  const dispatch = useDispatch();

  const { floors = [], loading } = useSelector((state) => state.floors);

  const [saving, setSaving] = useState(false);

  const [localFloors, setLocalFloors] = useState([]);

  // =========================
  // FETCH
  // =========================

  useEffect(() => {
    dispatch(fetchFloors());
  }, [dispatch]);

  // redux -> local
  useEffect(() => {
    if (Array.isArray(floors) && floors.length > 0) {
      setLocalFloors(floors);
    } else {
      setLocalFloors([
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
  }, [floors]);

  // =========================
  // FLOOR
  // =========================

  const handleAddFloor = () => {
    setLocalFloors((prev) => [
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

  const handleRemoveFloor = async (floorIndex, floorId) => {
    if (floorId) {
      await dispatch(deleteFloor(floorId));
    }

    setLocalFloors((prev) => prev.filter((_, index) => index !== floorIndex));
  };

  const handleFloorName = (floorIndex, value) => {
    const updated = [...localFloors];

    updated[floorIndex].name = value;

    setLocalFloors(updated);
  };

  // =========================
  // TABLE
  // =========================

  const handleAddTable = (floorIndex) => {
    const updated = [...localFloors];

    updated[floorIndex].tables.push({
      name: "",
      capacity: 2,
    });

    setLocalFloors(updated);
  };

  const handleRemoveTable = async (
    floorIndex,
    tableIndex,
    floorId,
    tableId,
  ) => {
    if (tableId && floorId) {
      await dispatch(
        deleteTable({
          floorId,
          tableId,
        }),
      );
    }

    const updated = [...localFloors];

    updated[floorIndex].tables = updated[floorIndex].tables.filter(
      (_, index) => index !== tableIndex,
    );

    setLocalFloors(updated);
  };

  const handleUpdateTable = (floorIndex, tableIndex, field, value) => {
    const updated = [...localFloors];

    updated[floorIndex].tables[tableIndex][field] = value;

    setLocalFloors(updated);
  };

  // =========================
  // SAVE
  // =========================

  const handleSave = async () => {
    try {
      setSaving(true);

      for (const floor of localFloors) {
        // =====================
        // CREATE FLOOR
        // =====================

        if (!floor._id) {
          const createdFloor = await dispatch(
            createFloor({
              name: floor.name,
              tableCount: 0,
            }),
          ).unwrap();

          // create tables
          for (const table of floor.tables) {
            await dispatch(
              addTable({
                floorId: createdFloor._id,

                data: {
                  name: table.name,
                  capacity: table.capacity,
                },
              }),
            );
          }
        }

        // =====================
        // UPDATE FLOOR
        // =====================
        else {
          await dispatch(
            updateFloor({
              floorId: floor._id,
              name: floor.name,
            }),
          );

          for (const table of floor.tables) {
            // CREATE TABLE
            if (!table._id) {
              await dispatch(
                addTable({
                  floorId: floor._id,

                  data: {
                    name: table.name,
                    capacity: table.capacity,
                  },
                }),
              );
            }

            // UPDATE TABLE
            else {
              await dispatch(
                updateTable({
                  tableId: table._id,

                  data: {
                    name: table.name,
                    capacity: table.capacity,
                  },
                }),
              );
            }
          }
        }
      }

      await dispatch(fetchFloors());

      alert("Lưu thành công");
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
    return <div className="floor-manager-loading">Loading...</div>;
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
        {localFloors.map((floor, floorIndex) => (
          <div className="floor-card" key={floor._id || floorIndex}>
            {/* FLOOR TOP */}
            <div className="floor-card-top">
              <div className="floor-title">
                <BuildingOffice2Icon className="floor-icon" />

                <input
                  type="text"
                  placeholder="Tên tầng..."
                  value={floor.name}
                  onChange={(e) => handleFloorName(floorIndex, e.target.value)}
                />
              </div>

              <button
                className="delete-floor-btn"
                onClick={() => handleRemoveFloor(floorIndex, floor._id)}
              >
                <TrashIcon className="trash-icon" />
              </button>
            </div>

            {/* TABLES */}
            <div className="table-list">
              {floor.tables?.map((table, tableIndex) => (
                <div className="table-card" key={table._id || tableIndex}>
                  <div className="table-card-left">
                    <TableCellsIcon className="table-icon" />

                    <input
                      type="text"
                      placeholder="Tên bàn..."
                      value={table.name}
                      onChange={(e) =>
                        handleUpdateTable(
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
                        handleUpdateTable(
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
                      handleRemoveTable(
                        floorIndex,
                        tableIndex,
                        floor._id,
                        table._id,
                      )
                    }
                  >
                    <TrashIcon className="trash-icon" />
                  </button>
                </div>
              ))}

              {/* ADD TABLE */}
              <button
                className="add-table-btn"
                onClick={() => handleAddTable(floorIndex)}
              >
                <PlusIcon className="plus-icon" />
                Thêm bàn
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ADD FLOOR */}
      <button className="add-floor-btn" onClick={handleAddFloor}>
        <PlusIcon className="plus-icon" />
        Thêm tầng
      </button>
    </div>
  );
}
