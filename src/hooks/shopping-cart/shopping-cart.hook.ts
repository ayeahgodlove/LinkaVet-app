import { useProduct } from "hooks/product.hook";
import { useLocalStorage } from "hooks/shared/local-storage.hook";
import { useDispatch, useSelector } from "react-redux";
import {
  ShoppingCartState,
  shoppingCartActions,
} from "redux/shared/shopping-cart.slice";

const useShoppingCart = () => {
  const isOpen = useSelector((state: ShoppingCartState) => state.isOpen);
  const cartItems = useSelector((state: ShoppingCartState) => state.cartItems);
  const cartQuantity = useSelector(
    (state: ShoppingCartState) => state.cartQuantity
  );

  const dispatch = useDispatch();

  const openCart = () => dispatch(shoppingCartActions.openCart);
  const closeCart = () => dispatch(shoppingCartActions.closeCart);

  function getItemQuantity(id: string) {
    const quantity = cartItems.find((item) => item.id === id)?.quantity || 0;
    if (quantity) {
      return quantity;
    } else {
      return 0;
    }
  }

  const increaseCartQuantity = (id: string) =>
    dispatch(shoppingCartActions.increaseCartQuantity(id));
  const decreaseCartQuantity = (id: string) =>
    dispatch(shoppingCartActions.decreaseCartQuantity(id));
  const removeFromCart = (id: string) =>
    dispatch(shoppingCartActions.removeFromCart(id));

  return {
    isOpen,
    cartItems,
    cartQuantity,
    openCart,
    closeCart,
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  };
};

export { useShoppingCart };
