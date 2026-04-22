import ProductDetail from "../components/detail/ProductDetail";
import ProductTabs from "../components/detail/ProductTabs";

function Detail() {
  return (
    <>
      <ProductDetail comments={2}/>
      <ProductTabs comments={2} />
    </>
  );
}

export default Detail;
