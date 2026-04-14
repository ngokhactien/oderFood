import "./card.css";
import { PlusIcon } from '@heroicons/react/24/outline';

const Card = ({ product, onAdd }) => {
  const { name, brand, price, oldPrice, discount, image } = product;

  const formatPrice = (v) => v.toLocaleString("vi-VN") + "đ";

  console.log('image', image);
  
  return (
    <div className="card">
      <div className="card-img">
        <img src={image} alt={name} />
        {discount && <span className="badge">{discount}</span>}
      </div>

      <div className="card-body">
        <p className="brand">{brand}</p>
        <h4 className="name">{name}</h4>

        <div className="price-box">
          <div>
            {oldPrice && (
              <span className="old-price">{formatPrice(oldPrice)}</span>
            )}
            <span className="price">{formatPrice(price)}</span>
          </div>

          <button className="add-btn" onClick={() => onAdd(product)}>
             <PlusIcon className="plusIcon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;