// src/pages/dashboard/products/ProductForm.jsx

import React, {
  useEffect,
  useState,
} from "react";

import {
  NavLink,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import "../../styles/Dashboard/Products/ProductForm.css";

import {
  addProduct,
  editProduct,
  fetchProduct,
} from "../../../redux/admin/products/adminProductSlice";

import { getShowCategories } from "../../../redux/categorySlice";

export default function ProductForm() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { id } = useParams();

  const isEdit = !!id;

  // PRODUCT REDUX
  const { product, loading } =
    useSelector(
      (state) =>
        state.adminProducts
    );

  // CATEGORY REDUX
  const { categories } =
    useSelector(
      (state) =>
        state.menuCategories
    );

  // FORM
  const [formData, setFormData] =
    useState({
      name: "",

      brand: "",

      category: "",

      price: "",

      importPrice: "",

      discount: "",

      stock: "",

      prepTime: "",

      ingredients: "",

      description: "",

      status: "available",

      options: [],

      images: [],
    });

  // PREVIEW
  const [preview, setPreview] =
    useState([]);

  // FETCH CATEGORY
  useEffect(() => {
    dispatch(
      getShowCategories()
    );
  }, [dispatch]);

  // FETCH PRODUCT
  useEffect(() => {
    if (isEdit && id) {
      dispatch(
        fetchProduct(id)
      );
    }
  }, [
    dispatch,
    isEdit,
    id,
  ]);

  // SET EDIT DATA
  useEffect(() => {
    if (
      isEdit &&
      product &&
      product._id === id
    ) {
      setFormData({
        name:
          product.name || "",

        brand:
          product.brand || "",

        category:
          product.category ||
          "",

        price:
          product.price || "",

        importPrice:
          product.importPrice ||
          "",

        discount:
          product.discount ||
          "",

        stock:
          product.stock || "",

        prepTime:
          product.prepTime ||
          "",

        ingredients:
          product.ingredients?.join(
            ", "
          ) || "",

        description:
          product.description ||
          "",

        status:
          product.status ||
          "available",

        options:
          product.options || [],

        images:
          product.images || [],
      });

      setPreview(
        product.images || []
      );
    }
  }, [
    product,
    isEdit,
    id,
  ]);

  // CHANGE
  const handleChange = (
    e
  ) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // MULTIPLE IMAGE
  const handleImage = (
    e
  ) => {
    const files = Array.from(
      e.target.files
    );

    if (!files.length) return;

    // lưu file
    setFormData((prev) => ({
      ...prev,
      images: [
        ...prev.images,
        ...files,
      ],
    }));

    // preview
    const newPreview =
      files.map((file) =>
        URL.createObjectURL(
          file
        )
      );

    setPreview((prev) => [
      ...prev,
      ...newPreview,
    ]);

    // reset input
    e.target.value = "";
  };

  // REMOVE IMAGE
  const handleRemoveImage = (
    index
  ) => {
    setPreview((prev) =>
      prev.filter(
        (_, i) => i !== index
      )
    );

    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter(
        (_, i) => i !== index
      ),
    }));
  };

  // ADD OPTION
  const handleAddOption =
    () => {
      setFormData((prev) => ({
        ...prev,
        options: [
          ...prev.options,
          {
            label: "",

            price: "",

            importPrice:
              "",

            stock: "",
          },
        ],
      }));
    };

  // CHANGE OPTION
  const handleOptionChange =
    (
      index,
      field,
      value
    ) => {
      const updated = [
        ...formData.options,
      ];

      updated[index][field] =
        value;

      setFormData((prev) => ({
        ...prev,
        options: updated,
      }));
    };

  // REMOVE OPTION
  const handleRemoveOption =
    (index) => {
      const updated =
        formData.options.filter(
          (_, i) =>
            i !== index
        );

      setFormData((prev) => ({
        ...prev,
        options: updated,
      }));
    };

  // SUBMIT
  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        const submitData =
          new FormData();

        submitData.append(
          "name",
          formData.name
        );

        submitData.append(
          "brand",
          formData.brand
        );

        submitData.append(
          "category",
          formData.category
        );

        submitData.append(
          "price",
          formData.price
        );

        submitData.append(
          "importPrice",
          formData.importPrice
        );

        submitData.append(
          "discount",
          formData.discount
        );

        submitData.append(
          "stock",
          formData.stock
        );

        submitData.append(
          "prepTime",
          formData.prepTime
        );

        submitData.append(
          "description",
          formData.description
        );

        submitData.append(
          "status",
          formData.status
        );

        submitData.append(
          "ingredients",
          JSON.stringify(
            formData.ingredients
              .split(",")
              .map((item) =>
                item.trim()
              )
          )
        );

        submitData.append(
          "options",
          JSON.stringify(
            formData.options
          )
        );

        // MULTIPLE IMAGES
        formData.images.forEach(
          (img) => {
            if (
              img instanceof
              File
            ) {
              submitData.append(
                "images",
                img
              );
            }
          }
        );

        // EDIT
        if (isEdit) {
          await dispatch(
            editProduct({
              id,
              product:
                submitData,
            })
          ).unwrap();

          alert(
            "Cập nhật thành công"
          );
        }

        // ADD
        else {
          await dispatch(
            addProduct(
              submitData
            )
          ).unwrap();

          alert(
            "Thêm sản phẩm thành công"
          );
        }

        navigate(
          "/admin/products"
        );
      } catch (error) {
        console.log(error);

        alert(
          "Có lỗi xảy ra"
        );
      }
    };

  return (
    <div className="admin-product-page">
      <form
        className="product-form"
        onSubmit={
          handleSubmit
        }
      >
        {/* LEFT */}
        <div className="left-content">
          {/* HEADER */}
          <div className="product-header">
            <NavLink to="/admin/products">
              Sản phẩm
            </NavLink>

            <span>/</span>

            <span>
              {isEdit
                ? "Cập nhật sản phẩm"
                : "Thêm sản phẩm"}
            </span>

            <span
              className={`product-mode ${
                isEdit
                  ? "edit"
                  : "add"
              }`}
            >
              {isEdit
                ? "edit"
                : "add"}
            </span>
          </div>

          {/* NAME */}
          <div className="form-group">
            <label>
              Tên sản phẩm
            </label>

            <input
              type="text"
              name="name"
              value={
                formData.name
              }
              onChange={
                handleChange
              }
              required
            />
          </div>

          {/* BRAND */}
          <div className="form-group">
            <label>
              Thương hiệu
            </label>

            <input
              type="text"
              name="brand"
              value={
                formData.brand
              }
              onChange={
                handleChange
              }
            />
          </div>

          {/* PRICE */}
          <div className="form-group">
            <label>
              Giá bán
            </label>

            <input
              type="number"
              name="price"
              value={
                formData.price
              }
              onChange={
                handleChange
              }
            />
          </div>

          {/* IMPORT PRICE */}
          <div className="form-group">
            <label>
              Giá nhập kho
            </label>

            <input
              type="number"
              name="importPrice"
              value={
                formData.importPrice
              }
              onChange={
                handleChange
              }
            />
          </div>

          {/* DISCOUNT */}
          <div className="form-group">
            <label>
              Giảm giá (%)
            </label>

            <input
              type="number"
              name="discount"
              value={
                formData.discount
              }
              onChange={
                handleChange
              }
            />
          </div>

          {/* STOCK */}
          <div className="form-group">
            <label>
              Tồn kho
            </label>

            <input
              type="number"
              name="stock"
              value={
                formData.stock
              }
              onChange={
                handleChange
              }
            />
          </div>

          {/* PREP TIME */}
          <div className="form-group">
            <label>
              Thời gian chuẩn bị
            </label>

            <input
              type="number"
              name="prepTime"
              value={
                formData.prepTime
              }
              onChange={
                handleChange
              }
            />
          </div>

          {/* INGREDIENTS */}
          <div className="form-group">
            <label>
              Nguyên liệu
            </label>

            <textarea
              rows="4"
              name="ingredients"
              value={
                formData.ingredients
              }
              onChange={
                handleChange
              }
              placeholder="bò, phô mai..."
            />
          </div>

          {/* DESCRIPTION */}
          <div className="form-group">
            <label>Mô tả</label>

            <textarea
              rows="7"
              name="description"
              value={
                formData.description
              }
              onChange={
                handleChange
              }
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="right-content">
          {/* IMAGE */}
          <div className="card-box">
            <label>
              Hình ảnh
            </label>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={
                handleImage
              }
            />

            <div className="preview-list">
              {preview.map(
                (
                  img,
                  index
                ) => (
                  <div
                    key={index}
                    className="preview-item"
                  >
                    <img
                      src={img}
                      alt="preview"
                      className="preview-image"
                    />

                    <button
                      type="button"
                      className="remove-image-btn"
                      onClick={() =>
                        handleRemoveImage(
                          index
                        )
                      }
                    >
                      ×
                    </button>
                  </div>
                )
              )}
            </div>
          </div>

          {/* CATEGORY */}
          <div className="card-box">
            <label>
              Danh mục
            </label>

            <select
              name="category"
              value={
                formData.category
              }
              onChange={
                handleChange
              }
            >
              <option value="">
                -- Chọn danh mục --
              </option>

              {categories?.map(
                (item) => (
                  <option
                    key={
                      item._id
                    }
                    value={
                      item.slug
                    }
                  >
                    {item.name}
                  </option>
                )
              )}
            </select>
          </div>

          {/* STATUS */}
          <div className="card-box">
            <label>
              Trạng thái
            </label>

            <select
              name="status"
              value={
                formData.status
              }
              onChange={
                handleChange
              }
            >
              <option value="available">
                Còn bán
              </option>

              <option value="out_of_stock">
                Hết hàng
              </option>
            </select>
          </div>

          {/* OPTIONS */}
          <div className="card-box">
            <label>
              Tuỳ chọn sản phẩm
            </label>

            <button
              type="button"
              className="option-btn"
              onClick={
                handleAddOption
              }
            >
              + Thêm option
            </button>

            {formData.options.map(
              (
                option,
                index
              ) => (
                <div
                  key={index}
                  className="option-item"
                >
                  <input
                    placeholder="Label"
                    value={
                      option.label
                    }
                    onChange={(
                      e
                    ) =>
                      handleOptionChange(
                        index,
                        "label",
                        e.target
                          .value
                      )
                    }
                  />

                  <input
                    type="number"
                    placeholder="Giá bán"
                    value={
                      option.price
                    }
                    onChange={(
                      e
                    ) =>
                      handleOptionChange(
                        index,
                        "price",
                        e.target
                          .value
                      )
                    }
                  />

                  <input
                    type="number"
                    placeholder="Giá nhập"
                    value={
                      option.importPrice
                    }
                    onChange={(
                      e
                    ) =>
                      handleOptionChange(
                        index,
                        "importPrice",
                        e.target
                          .value
                      )
                    }
                  />

                  <input
                    type="number"
                    placeholder="Kho"
                    value={
                      option.stock
                    }
                    onChange={(
                      e
                    ) =>
                      handleOptionChange(
                        index,
                        "stock",
                        e.target
                          .value
                      )
                    }
                  />

                  <button
                    type="button"
                    className="remove-option-btn"
                    onClick={() =>
                      handleRemoveOption(
                        index
                      )
                    }
                  >
                    Xoá
                  </button>
                </div>
              )
            )}

            <button
              type="submit"
              className="submit-btn"
              disabled={
                loading
              }
            >
              {loading
                ? "Đang xử lý..."
                : isEdit
                ? "Cập nhật"
                : "Thêm mới"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}