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

  const onChangeQty = (id, option, quantity) => {
    dispatch(updateQuantity({ id, option, quantity }));
  };

  const onRemoveItem = (id, option) => {
    dispatch(removeItem({ id, option }));
    toast.success("Xóa khỏi giỏ hàng thành công!");
  };

  const onIncrease = (id, option) => {
    dispatch(increaseQty({ id, option }));
  };

  const onDecrease = (id, option) => {
    dispatch(decreaseQty({ id, option }));
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
