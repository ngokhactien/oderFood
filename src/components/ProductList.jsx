import Card from "./Card";
import "./productList.css";

const ProductList = ({ products, onAdd }) => {
  return (
    <div className="product-list">
      {products.map((item) => (
        <Card key={item.id} product={item} onAdd={onAdd} />
      ))}
    </div>
  );
};

export default ProductList;