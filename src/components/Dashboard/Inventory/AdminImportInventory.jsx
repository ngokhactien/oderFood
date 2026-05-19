// src/pages/AdminImportInventory.jsx

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { NavLink } from "react-router-dom";

import {
  fetchProducts,
  editProduct,
} from "../../../redux/admin/products/adminProductSlice";

import "../../styles/Dashboard/Inventory/AdminImportInventory.css";

const AdminImportInventory = () => {
  const dispatch = useDispatch();

  //
  // REDUX
  //
  const { products, loading } =
    useSelector(
      (state) => state.adminProducts,
    );

  //
  // STATES
  //
  const [selectedId, setSelectedId] =
    useState("");

  const [importQty, setImportQty] =
    useState(1);

  const [importPrice, setImportPrice] =
    useState("");

  //
  // FETCH PRODUCTS
  //
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  //
  // AUTO SELECT FIRST PRODUCT
  //
  useEffect(() => {
    if (
      products.length > 0 &&
      !selectedId
    ) {
      setSelectedId(products[0]._id);
    }
  }, [products, selectedId]);

  //
  // SELECTED PRODUCT
  //
  const selectedProduct = useMemo(() => {
    return products.find(
      (item) =>
        item._id === selectedId,
    );
  }, [products, selectedId]);

  //
  // TOTAL STOCK
  //
  const totalQuantity =
    Number(selectedProduct?.stock || 0) +
    Number(importQty || 0);

  //
  // FORMAT PRICE
  //
  const formatPrice = (price) => {
    return (
      Number(price).toLocaleString(
        "vi-VN",
      ) + "₫"
    );
  };

  //
  // SUBMIT
  //
  const handleSubmit = async (e) => {
    e.preventDefault();

    //
    // VALIDATE
    //
    if (!selectedProduct) {
      return alert(
        "Vui lòng chọn sản phẩm",
      );
    }

    if (
      Number(importQty) <= 0
    ) {
      return alert(
        "Số lượng nhập phải lớn hơn 0",
      );
    }

    try {
      //
      // UPDATED PRODUCT
      //
      const updatedProduct = {
        ...selectedProduct,

        stock:
          Number(
            selectedProduct.stock,
          ) +
          Number(importQty),
      };

      //
      // UPDATE PRICE
      //
      if (importPrice) {
        updatedProduct.price =
          Number(importPrice);
      }

      //
      // CALL API
      //
      await dispatch(
        editProduct({
          id: selectedProduct._id,

          product:
            updatedProduct,
        }),
      );

      //
      // SUCCESS
      //
      alert(
        "Nhập hàng thành công",
      );

      //
      // RESET
      //
      setImportQty(1);

      setImportPrice("");
    } catch (error) {
      console.log(error);

      alert(
        "Có lỗi xảy ra",
      );
    }
  };

  return (
    <div className="inventory-import-page">
      <form
        onSubmit={handleSubmit}
      >
        <div className="inventory-import-wrapper">
          {/* LEFT */}
          <div className="inventory-import-left">
            {/* HEADER */}
            <div className="inventory-import-header">
              <NavLink to="/admin/inventory">
                Quản lý kho hàng
              </NavLink>

              <span>/</span>

              <h2>
                Nhập hàng vào kho
              </h2>
            </div>

            {/* SELECT PRODUCT */}
            <div className="inventory-import-group">
              <label>
                Chọn sản phẩm{" "}
                <span>*</span>
              </label>

              <select
                value={
                  selectedId
                }
                onChange={(e) =>
                  setSelectedId(
                    e.target.value,
                  )
                }
              >
                {products.map(
                  (item) => (
                    <option
                      key={
                        item._id
                      }
                      value={
                        item._id
                      }
                    >
                      {item.name} (
                      Tồn:{" "}
                      {item.stock}
                      )
                    </option>
                  ),
                )}
              </select>
            </div>

            {/* PRODUCT INFO */}
            <div className="inventory-product-info">
              <h3>
                Thông tin sản phẩm
              </h3>

              <div className="inventory-product-row">
                <span>
                  Tên sản phẩm:
                </span>

                <strong>
                  {
                    selectedProduct?.name
                  }
                </strong>
              </div>

              <div className="inventory-product-row">
                <span>
                  Tồn kho hiện tại:
                </span>

                <strong className="stock">
                  {
                    selectedProduct?.stock
                  }
                </strong>
              </div>

              <div className="inventory-product-row">
                <span>
                  Giá bán hiện tại:
                </span>

                <strong>
                  {formatPrice(
                    selectedProduct?.price,
                  )}
                </strong>
              </div>
            </div>

            {/* IMPORT QTY */}
            <div className="inventory-import-group">
              <label>
                Số lượng nhập{" "}
                <span>*</span>
              </label>

              <input
                type="number"
                min="1"
                value={
                  importQty
                }
                onChange={(e) =>
                  setImportQty(
                    e.target.value,
                  )
                }
              />

              <small>
                Số lượng sản phẩm
                muốn nhập vào kho
              </small>
            </div>

            {/* IMPORT PRICE */}
            <div className="inventory-import-group">
              <label>
                Giá nhập (tùy
                chọn)
              </label>

              <input
                type="number"
                placeholder="Nhập giá nếu muốn cập nhật"
                value={
                  importPrice
                }
                onChange={(e) =>
                  setImportPrice(
                    e.target.value,
                  )
                }
              />

              <small>
                Nếu nhập giá mới,
                hệ thống sẽ cập
                nhật giá bán của
                sản phẩm
              </small>
            </div>
          </div>

          {/* RIGHT */}
          <div className="inventory-import-right">
            {/* TOTAL */}
            <div className="inventory-total-box">
              <p>
                Tổng số lượng sau
                khi nhập
              </p>

              <div className="inventory-total-content">
                <span>
                  Tổng số lượng:
                </span>

                <h3>
                  {
                    totalQuantity
                  }
                </h3>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="inventory-import-actions">
              <button
                type="submit"
                className="confirm-btn"
                disabled={
                  loading
                }
              >
                {loading
                  ? "Đang xử lý..."
                  : "Xác nhận nhập hàng"}
              </button>

              <NavLink
                to="/admin/inventory"
                className="cancel-btn"
              >
                Hủy
              </NavLink>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminImportInventory;