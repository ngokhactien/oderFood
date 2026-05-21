import { ShoppingCartIcon } from "@heroicons/react/24/outline";

const ProductActions = ({
  handleAddToCart,
  handleBuyNow,
  finalPrice,
  formatPrice,
}) => {
  return (
    <div className="product-detail__actions">
      {/* ADD CART */}
      <button
        className="product-detail__add-to-cart"
        onClick={handleAddToCart}
      >
        <ShoppingCartIcon className="product-detail__icon" />
        Thêm Vào Giỏ Hàng
      </button>

      {/* BUY NOW */}
      <button
        className="product-detail__buy-now"
        onClick={handleBuyNow}
      >
        Mua Với Voucher {formatPrice(finalPrice)}
      </button>
    </div>
  );
};

export default ProductActions;