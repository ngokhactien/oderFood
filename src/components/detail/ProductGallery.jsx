const ProductGallery = ({
  name,
  imageList,
  mainImage,
  setMainImage,
}) => {
  return (
    <div className="product-detail__left">
      <img
        src={mainImage}
        alt={name}
        className="product-detail__main-image"
      />

      {/* THUMBNAILS */}
      <div className="product-detail__thumbnail-list">
        {imageList.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`thumbnail-${index}`}
            className={`product-detail__thumbnail ${
              mainImage === img
                ? "product-detail__thumbnail--active"
                : ""
            }`}
            onClick={() => setMainImage(img)}
          />
        ))}
      </div>

      {/* SHARE */}
      <div className="product-detail__share">
        <span>Chia sẻ:</span>

        <i className="social fb">f</i>

        <i className="social mess">m</i>

        <i className="social pin">p</i>
      </div>
    </div>
  );
};

export default ProductGallery;