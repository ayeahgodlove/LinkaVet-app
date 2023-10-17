const useShoppingCart = () => {
  function getItemQuantity(id: string) {
    console.log(id)
  }
  function increaseCartQuantity(id: string) {
    console.log(id)
  }
  function decreaseCartQuantity(id: string) {
    console.log(id)
  }
  function removeFromCart(id: string) {
    console.log(id)
  }

  return {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  };
};

export {
    useShoppingCart
}