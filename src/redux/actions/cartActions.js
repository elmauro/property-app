// Adds product to the cart and saves the updated cart to localStorage
export const addToCart = (product, quantity) => (dispatch, getState) => {
  dispatch({
    type: 'ADD_TO_CART',
    payload: {
      product,
      quantity,
    },
  });
  // Save updated cart items to localStorage after adding the item
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

// Action type for removing an item from the cart
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

// Removes product from the cart and updates localStorage
export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: productId,
  });
  // Save updated cart items to localStorage after removing the item
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

// Clears the cart and removes all items from localStorage
export const clearCart = () => (dispatch) => {
  dispatch({ type: 'CLEAR_CART' });
  localStorage.removeItem('cartItems'); // Remove cart data from localStorage
};
