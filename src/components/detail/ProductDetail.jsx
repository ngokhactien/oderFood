import { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  ShoppingCartIcon,
  StarIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";
import { addToCart } from "../../redux/cartSlice";
import { useLocation, useParams } from "react-router-dom";
import products from "../../data/products"; // Dữ liệu fallback
import DEFAULT_IMAGE from "../../assets/x.jpg";
import "./styles/ProductDetail.css";
import { calculatePrice } from "../../common/calculatePrice";
import { toast } from "react-toastify";

const ProductDetail = ({ comments }) => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  // Ưu tiên lấy từ state, nếu không thì tìm theo id
  const product = useMemo(() => {
    if (location.state?.product) return location.state.product;
    return products.find((p) => String(p.id) === String(id));
  }, [location.state, id]);

  // Nếu không tìm thấy sản phẩm
  if (!product) {
    return (
      <div className="product-detail not-found">
        <p>Không tìm thấy thông tin sản phẩm.</p>
      </div>
    );
  }

  const {
    name,
    price,
    images = [],
    sizes = [],
    rating = 5,
    reviews = 0,
    sold = 0,
    discount,
  } = product;

  const imageList = images.length ? images : [DEFAULT_IMAGE];
  const [mainImage, setMainImage] = useState(imageList[0]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const formatPrice = (value) => Number(value).toLocaleString("vi-VN") + "đ";
  // Tính giá sau khi giảm
  const finalPrice = calculatePrice(price, discount);

  const handleImageError = (e) => {
    e.target.src = DEFAULT_IMAGE;
  };

  const handleAddToCart = () => {
    if (!selectedSize && sizes.length > 0) {
      toast.warning("Vui lòng chọn size!");
      return;
    }

    dispatch(
      addToCart({
        ...product,
        quantity,
        size: selectedSize,
      }),
    );

    toast.success("Thêm vào giỏ hàng thành công!");
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Có thể điều hướng sang trang thanh toán nếu cần
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <StarIcon key={`full-${i}`} className="product-detail__star" />
        ))}
        {[...Array(emptyStars)].map((_, i) => (
          <StarIcon
            key={`empty-${i}`}
            className="product-detail__star product-detail__star--empty"
          />
        ))}
      </>
    );
  };

  return (
    <div className="product-detail">
      <div className="product-detail__container">
        {/* ===== LEFT: IMAGE SECTION ===== */}
        <div className="product-detail__left">
          <img
            src={mainImage}
            alt={name}
            className="product-detail__main-image"
            onError={handleImageError}
          />

          <div className="product-detail__thumbnail-list">
            {imageList.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumbnail-${index}`}
                onError={handleImageError}
                className={`product-detail__thumbnail ${
                  mainImage === img ? "product-detail__thumbnail--active" : ""
                }`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>

          <div className="product-detail__share">
            <span>Chia sẻ:</span>
            <i className="social fb">f</i>
            <i className="social mess">m</i>
            <i className="social pin">p</i>
          </div>
        </div>

        {/* ===== RIGHT: PRODUCT INFO ===== */}
        <div className="product-detail__right">
          <h2 className="product-detail__title">{name}</h2>

          <p className="category">
            Danh mục: <span>Pizza & Burger</span>
          </p>

          <div className="product-detail__rating">
            <div className="product-detail__rating-item product-detail__rating-score">
              <span className="product-detail__score">{rating}</span>
              <div className="product-detail__stars">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="product-detail__star" />
                ))}
              </div>
            </div>

            <div className="product-detail__rating-item">
              <span className="product-detail__reviews">{comments}</span>
              <span className="product-detail__label">Đánh Giá</span>
            </div>

            <div className="product-detail__rating-item">
              <span className="product-detail__sold">{sold}</span>
              <span className="product-detail__label">Đã bán</span>
            </div>
          </div>

          <div className="product-detail__price-box">
            <div>
              {price && (
                <span style={{ fontSize: "16px" }} className="old-price">
                  {formatPrice(price)}
                </span>
              )}
              <span className="product-detail__price">
                {formatPrice(finalPrice)}
              </span>
            </div>
            {/* <span className="product-detail__price">{formatPrice(finalPrice)}</span> */}
            <span className="product-detail__voucher">Giá Sau Voucher</span>
          </div>

          <div className="product-detail__voucher-box">
            <span>Giảm {discount}</span>
          </div>

          <div className="product-detail__shipping">
            <span>Vận chuyển:</span>
            <span>Nhận từ 17 Th04 - 20 Th04</span>
            <span className="product-detail__free-ship">Phí ship 0đ</span>
          </div>

          {/* Policy (text, không phải list) */}
          <div className="product__policy">
            <span>Mô Tả</span>
            <p>
              🚚 Giao hàng miễn phí trong 24h (nội thành) Giao hàng miễn phí
              trong 24h (nội thành) Giao hàng miễn phí trong 24h (nội thành)
              Giao hàng miễn phí trong 24h (nội thành) Giao hàng miễn phí trong
              24h (nội thành).........
            </p>
          </div>

          {/* ===== SIZE SECTION ===== */}
          {sizes.length > 0 && (
            <div className="product-detail__size-section">
              <span>Size</span>
              <div className="product-detail__sizes">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`product-detail__size-btn ${
                      selectedSize === size
                        ? "product-detail__size-btn--active"
                        : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ===== QUANTITY SECTION ===== */}
          <div className="product-detail__quantity-section">
            <span>Số lượng</span>
            <div className="product-detail__quantity-control">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                <MinusIcon className="product-detail__icon" />
              </button>
              <input type="text" value={quantity} readOnly />
              <button onClick={() => setQuantity((q) => q + 1)}>
                <PlusIcon className="product-detail__icon" />
              </button>
              <span className="product-detail__stock">{"Còn hàng"}</span>
            </div>
          </div>

          {/* ===== ACTION BUTTONS ===== */}
          <div className="product-detail__actions">
            <button
              className="product-detail__add-to-cart"
              onClick={handleAddToCart}
            >
              <ShoppingCartIcon className="product-detail__icon" />
              Thêm Vào Giỏ Hàng
            </button>

            <button className="product-detail__buy-now" onClick={handleBuyNow}>
              Mua Với Voucher {formatPrice(price)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
