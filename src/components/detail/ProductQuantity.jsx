import {
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";

const ProductQuantity = ({
  quantity,
  setQuantity,
  stock,
  selectedOption,
}) => {
  return (
    <div className="product-detail__quantity-section">
      <span>Số lượng</span>

      <div className="product-detail__quantity-control">
        <button
          onClick={() =>
            setQuantity((q) => Math.max(1, q - 1))
          }
        >
          <MinusIcon className="product-detail__icon" />
        </button>

        <input type="text" value={quantity} readOnly />

        <button onClick={() => setQuantity((q) => q + 1)}>
          <PlusIcon className="product-detail__icon" />
        </button>

        <span className="product-detail__stock">
          Còn {selectedOption?.stock || stock} sản phẩm
        </span>
      </div>
    </div>
  );
};

export default ProductQuantity;