const initialState = {
  // Load cart items from local storage, or initialize with an empty array
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    // Handles adding an item to the cart
    case 'ADD_TO_CART':
      const item = action.payload;
      // Check if the item already exists in the cart
      const existingItem = state.cartItems.find((i) => i.product.productId === item.product.productId);

      if (existingItem) {
        // If the item exists, update it
        return {
          ...state,
          cartItems: state.cartItems.map((i) => i.product.productId === existingItem.product.productId ? item : i),
        };
      } else {
        // If the item is new, add it to the cart
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    // Handles removing an item from the cart
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (x) => x.product.productId !== action.payload
        ),
      };

    // Clears all items from the cart
    case 'CLEAR_CART':
      return { cartItems: [] };  // Reset cart to an empty state

    // Default case returns the current state
    default:
      return state;
  }
}
