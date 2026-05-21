const ProductOptions = ({
  options,
  selectedOption,
  setSelectedOption,
}) => {
  if (options.length === 0) return null;

  return (
    <div className="product-detail__size-section">
      <span>Kích thước</span>

      <div className="product-detail__sizes">
        {options.map((option) => (
          <button
            key={option.label}
            className={`product-detail__size-btn ${
              selectedOption?.label === option.label
                ? "product-detail__size-btn--active"
                : ""
            }`}
            onClick={() => setSelectedOption(option)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductOptions;