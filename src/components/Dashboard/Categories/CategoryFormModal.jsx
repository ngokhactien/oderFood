import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  createCategory,
  updateCategory,
} from "../../../redux/admin/category/categorySlice";

import "./styles/CategoryFormModal.css";

import { slugify } from "../../../utils/slugify";

export default function CategoryFormModal({
  open,
  onClose,
  editItem,
}) {
  const dispatch = useDispatch();

  /**
   * FORM STATE
   */
  const [form, setForm] = useState({
    name: "",
    slug: "",
    image: "",
    status: "show",
  });

  /**
   * ERROR
   */
  const [error, setError] = useState("");

  /**
   * LOAD EDIT DATA
   */
  useEffect(() => {
    setError("");

    if (editItem) {
      setForm({
        name: editItem.name || "",
        slug: editItem.slug || "",
        image: editItem.image || "",
        status: editItem.status || "show",
      });
    } else {
      setForm({
        name: "",
        slug: "",
        image: "",
        status: "show",
      });
    }
  }, [editItem, open]);

  /**
   * RESET WHEN CLOSE
   */
  useEffect(() => {
    if (!open) {
      setError("");

      setForm({
        name: "",
        slug: "",
        image: "",
        status: "show",
      });
    }
  }, [open]);

  /**
   * CLOSE MODAL
   */
  const handleClose = () => {
    setError("");

    onClose();
  };

  /**
   * HANDLE CHANGE
   */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setError("");

    let newForm = {
      ...form,
      [name]: value,
    };

    /**
     * AUTO SLUG
     */
    if (name === "name") {
      newForm.slug = slugify(value);
    }

    setForm(newForm);
  };

  /**
   * SUBMIT
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    /**
     * VALIDATE
     */
    if (!form.name.trim()) {
      setError("Tên danh mục không được để trống");
      return;
    }

    if (!form.slug.trim()) {
      setError("Slug không hợp lệ");
      return;
    }

    try {
      /**
       * EDIT
       */
      if (editItem) {
        await dispatch(
          updateCategory({
            id: editItem._id,
            body: form,
          })
        ).unwrap();
      }

      /**
       * CREATE
       */
      else {
        await dispatch(
          createCategory(form)
        ).unwrap();
      }

      handleClose();
    } catch (err) {
      setError(
        typeof err === "string"
          ? err
          : err?.message || "Có lỗi xảy ra"
      );
    }
  };

  /**
   * HIDE
   */
  if (!open) return null;

  return (
    <div
      className="modal-overlay"
      onClick={handleClose}
    >
      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>
          {editItem
            ? "Sửa danh mục"
            : "Thêm danh mục"}
        </h3>

        <form onSubmit={handleSubmit}>
          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Tên danh mục"
            value={form.name}
            onChange={handleChange}
            className={
              error ? "input-error" : ""
            }
          />

          {/* ERROR */}
          {error && (
            <p className="error-text">
              {error}
            </p>
          )}

          {/* SLUG */}
          <input
            type="text"
            name="slug"
            placeholder="Slug"
            value={form.slug}
            disabled
          />

          {/* IMAGE */}
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
          />

          {/* STATUS */}
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="show">
              Hiển thị
            </option>

            <option value="hide">
              Ẩn
            </option>
          </select>

          {/* ACTIONS */}
          <div className="modal-actions">
            <button
              type="submit"
              disabled={!form.name.trim()}
            >
              {editItem
                ? "Cập nhật"
                : "Thêm"}
            </button>

            <button
              type="button"
              onClick={handleClose}
            >
              Huỷ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}