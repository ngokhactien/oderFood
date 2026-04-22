import { useDispatch, useSelector } from "react-redux";
import CartDetail from "../components/cardDetail/CartDetail";
import {
  increaseQty,
  decreaseQty,
  removeItem,
  updateQuantity,
} from "../redux/cartSlice";
import { toast } from "react-toastify";

const Cart = () => {
  const carts = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const onChangeQty = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const onRemoveItem = (id) => {
    dispatch(removeItem(id));
    toast.success("Xóa khỏi giỏ hàng thành công!");
  };

  const onIncrease = (id) => {
    dispatch(increaseQty(id));
    toast.info("Đã tăng số lượng");
  };

  const onDecrease = (id) => {
    dispatch(decreaseQty(id));
    toast.info("Đã giảm số lượng");
  };

  return (
    <CartDetail
      carts={carts}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onRemove={onRemoveItem}
      onChangeQty={onChangeQty}
    />
  );
};

export default Cart;
