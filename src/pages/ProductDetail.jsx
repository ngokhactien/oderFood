import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import "../styles/ProductDetail.css";

import products from "../data/products";
import DEFAULT_IMAGE from "../assets/x.jpg";

import { addToCart } from "../redux/cartSlice";
import { calculatePrice } from "../common/calculatePrice";

import ProductGallery from "../components/detail/ProductGallery";
import ProductInfo from "../components/detail/ProductInfo";
import ProductOptions from "../components/detail/ProductOptions";
import ProductQuantity from "../components/detail/ProductQuantity";
import ProductActions from "../components/detail/ProductActions";
import ProductTabs from "../components/detail/tabs/ProductTabs";

const ProductDetail = () => {
  const { id } = useParams();

  const location = useLocation();

  const dispatch = useDispatch();

  /**
   * PRODUCT
   */
  const product = useMemo(() => {
    if (location.state?.product) {
      return location.state.product;
    }

    return products.find((p) => String(p._id || p.id) === String(id));
  }, [location.state, id]);

  /**
   * NOT FOUND
   */
  if (!product) {
    return (
      <div className="product-detail not-found">
        <p>Không tìm thấy thông tin sản phẩm.</p>
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
  const imageList = images.length > 0 ? images : [DEFAULT_IMAGE];

  const [mainImage, setMainImage] = useState(imageList[0]);

  /**
   * OPTION
   */
  const [selectedOption, setSelectedOption] = useState(
    options.length > 0 ? options[0] : null,
  );

  /**
   * QUANTITY
   */
  const [quantity, setQuantity] = useState(1);

  /**
   * UPDATE IMAGE
   */
  useEffect(() => {
    setMainImage(imageList[0]);
  }, [product]);

  /**
   * PRICE
   */
  const currentPrice = selectedOption?.price || price;

  const finalPrice = calculatePrice(currentPrice, discount);

  /**
   * FORMAT PRICE
   */
  const formatPrice = (value) => Number(value).toLocaleString("vi-VN") + "đ";

  /**
   * ADD CART
   */
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        quantity,
        selectedOption,
        price: currentPrice,
      }),
    );

    toast.success("Thêm vào giỏ hàng thành công!");
  };

  /**
   * BUY NOW
   */
  const handleBuyNow = () => {
    handleAddToCart();
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
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />

            <ProductQuantity
              quantity={quantity}
              setQuantity={setQuantity}
              stock={stock}
              selectedOption={selectedOption}
            />

            <ProductActions
              handleAddToCart={handleAddToCart}
              handleBuyNow={handleBuyNow}
              finalPrice={finalPrice}
              formatPrice={formatPrice}
            />
          </div>
        </div>
      </div>

      <ProductTabs
        productId={product._id}
        description={description}
        ingredients={ingredients}
        reviews={product.reviews || []}
      />
    </>
  );
};

export default ProductDetail;
