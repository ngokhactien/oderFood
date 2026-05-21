import { StarIcon } from "@heroicons/react/24/outline";

const ProductInfo = ({
  product,
  currentPrice,
  finalPrice,
  formatPrice,
}) => {
  const {
    name,
    category = "",
    rating = 5,
    reviews = 0,
    sold = 0,
    discount = 0,
    description = "",
  } = product;

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
    <>
      {/* TITLE */}
      <h2 className="product-detail__title">{name}</h2>

      {/* CATEGORY */}
      <p className="category">
        Danh mục: <span>{category.replaceAll("-", " ")}</span>
      </p>

      {/* RATING */}
      <div className="product-detail__rating">
        <div className="product-detail__rating-item product-detail__rating-score">
          <span className="product-detail__score">{rating}</span>

          <div className="product-detail__stars">
            {renderStars(rating)}
          </div>
        </div>

        <div className="product-detail__rating-item">
          <span className="product-detail__reviews">{reviews}</span>

          <span className="product-detail__label">Đánh Giá</span>
        </div>

        <div className="product-detail__rating-item">
          <span className="product-detail__sold">{sold}</span>

          <span className="product-detail__label">Đã bán</span>
        </div>
      </div>

      {/* PRICE */}
      <div className="product-detail__price-box">
        <div>
          {discount > 0 && (
            <span
              style={{
                fontSize: "16px",
              }}
              className="old-price"
            >
              {formatPrice(currentPrice)}
            </span>
          )}

          <span className="product-detail__price">
            {formatPrice(finalPrice)}
          </span>
        </div>

        <span className="product-detail__voucher">
          Giá Sau Voucher
        </span>
      </div>

      {/* DISCOUNT */}
      {discount > 0 && (
        <div className="product-detail__voucher-box">
          <span>Giảm {discount}%</span>
        </div>
      )}

      {/* SHIPPING */}
      <div className="product-detail__shipping">
        <span>Vận chuyển:</span>

        <span>Nhận từ 17 Th04 - 20 Th04</span>

        <span className="product-detail__free-ship">
          Phí ship 0đ
        </span>
      </div>

      {/* DESCRIPTION */}
      <div className="product__policy">
        <span>Mô Tả</span>

        <p>
          {description ||
            "Sản phẩm chất lượng cao, giao nhanh trong ngày."}
        </p>
      </div>
    </>
  );
};

export default ProductInfo;