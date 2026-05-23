import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import { toast } from "react-toastify";

import "../styles/ProductDetail.css";

import DEFAULT_IMAGE from "../assets/x.jpg";

import { addToCartAsync } from "../redux/cartSlice";

import { calculatePrice } from "../common/calculatePrice";

import ProductGallery from "../components/detail/ProductGallery";

import ProductInfo from "../components/detail/ProductInfo";

import ProductOptions from "../components/detail/ProductOptions";

import ProductQuantity from "../components/detail/ProductQuantity";

import ProductActions from "../components/detail/ProductActions";

import ProductTabs from "../components/detail/tabs/ProductTabs";

import { getProductById } from "../redux/productSlice";

const ProductDetail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  /**
   * REDUX
   */
  const { productDetail, loading } = useSelector(
    (state) => state.products,
  );

  /**
   * PRODUCT
   */
  const product = productDetail;

  /**
   * FETCH PRODUCT
   */
  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
    }
  }, [dispatch, id]);

  /**
   * STATES
   */
  const [mainImage, setMainImage] =
    useState(DEFAULT_IMAGE);

  const [selectedOption, setSelectedOption] =
    useState(null);

  const [quantity, setQuantity] = useState(1);

  /**
   * UPDATE DATA WHEN PRODUCT CHANGE
   */
  useEffect(() => {
    if (product) {
      const imageList =
        product.images?.length > 0
          ? product.images
          : [DEFAULT_IMAGE];

      setMainImage(imageList[0]);

      setSelectedOption(
        product.options?.length > 0
          ? product.options[0]
          : null,
      );
    }
  }, [product]);

  /**
   * LOADING
   */
  if (loading) {
    return (
      <div className="product-detail loading">
        <p>Đang tải sản phẩm...</p>
      </div>
    );
  }

  /**
   * NOT FOUND
   */
  if (!product) {
    return (
      <div className="product-detail not-found">
        <p>
          Không tìm thấy thông tin sản phẩm.
        </p>
      </div>
    );
  }

  /**
   * DATA
   */
  const {
    name,
    price,
    images = [],
    options = [],
    discount = 0,
    stock = 0,
    description = "",
    ingredients = [],
  } = product;

  /**
   * IMAGE
   */
  const imageList =
    images.length > 0
      ? images
      : [DEFAULT_IMAGE];

  /**
   * PRICE
   */
  const currentPrice =
    selectedOption?.price || price;

  const finalPrice = calculatePrice(
    currentPrice,
    discount,
  );

  /**
   * FORMAT PRICE
   */
  const formatPrice = (value) =>
    Number(value).toLocaleString("vi-VN") +
    "đ";

  /**
   * ADD TO CART
   */
  const handleAddToCart = async () => {
    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        toast.warning("Bạn cần đăng nhập");

        return;
      }

      if (!selectedOption) {
        toast.error("Vui lòng chọn size");

        return;
      }

      await dispatch(
        addToCartAsync({
          productId: product._id,

          optionId: selectedOption._id,

          quantity,
        }),
      ).unwrap();

      toast.success(
        "Thêm vào giỏ hàng thành công!",
      );
    } catch (err) {
      toast.error(err || "Lỗi thêm giỏ hàng");
    }
  };

  /**
   * BUY NOW
   */
  const handleBuyNow = async () => {
    await handleAddToCart();
  };

  return (
    <>
      <div className="product-detail">
        <div className="product-detail__container">
          {/* LEFT */}
          <ProductGallery
            name={name}
            imageList={imageList}
            mainImage={mainImage}
            setMainImage={setMainImage}
          />

          {/* RIGHT */}
          <div className="product-detail__right">
            <ProductInfo
              product={product}
              currentPrice={currentPrice}
              finalPrice={finalPrice}
              formatPrice={formatPrice}
            />

            <ProductOptions
              options={options}
              selectedOption={
                selectedOption
              }
              setSelectedOption={
                setSelectedOption
              }
            />

            <ProductQuantity
              quantity={quantity}
              setQuantity={setQuantity}
              stock={stock}
              selectedOption={
                selectedOption
              }
            />

            <ProductActions
              handleAddToCart={
                handleAddToCart
              }
              handleBuyNow={handleBuyNow}
              finalPrice={finalPrice}
              formatPrice={formatPrice}
            />
          </div>
        </div>
      </div>

      {/* TABS */}
      <ProductTabs
        productId={product._id}
        description={description}
        ingredients={ingredients}
        reviews={product.reviews || 0}
        onReloadProduct={() =>
          dispatch(getProductById(id))
        }
      />
    </>
  );
};

export default ProductDetail;