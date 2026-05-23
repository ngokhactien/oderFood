import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import CartDetail from "../components/cardDetail/CartDetail";

import { updateQuantityAsync, removeItemAsync } from "../redux/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();

  // redux state
  const carts = useSelector((state) => state.cart.items);

  const totalAmount = useSelector((state) => state.cart.totalAmount);

  // =========================
  // UPDATE INPUT
  // =========================
  const onChangeQty = (productId, optionId, quantity) => {
    dispatch(
      updateQuantityAsync({
        productId,
        optionId,
        quantity,
      }),
    );
  };

  // =========================
  // REMOVE
  // =========================
  const onRemoveItem = (productId, optionId) => {
    dispatch(
      removeItemAsync({
        productId,
        optionId,
      }),
    );

    toast.success("Xóa thành công");
  };

  // =========================
  // INCREASE
  // =========================
  const onIncrease = (productId, optionId, currentQty, stock) => {
    if (currentQty >= stock) return;

    dispatch(
      updateQuantityAsync({
        productId,
        optionId,
        quantity: currentQty + 1,
      }),
    );
  };

  // =========================
  // DECREASE
  // =========================
  const onDecrease = (productId, optionId, currentQty) => {
    if (currentQty <= 1) return;

    dispatch(
      updateQuantityAsync({
        productId,
        optionId,
        quantity: currentQty - 1,
      }),
    );
  };

  return (
    <CartDetail
      carts={carts}
      totalAmount={totalAmount}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onRemove={onRemoveItem}
      onChangeQty={onChangeQty}
    />
  );
};

export default Cart;
