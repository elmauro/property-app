const orderReducer = (state = {}, action) => {
  switch (action.type) {
    // On successful order processing, store the order ID and mark success
    case 'PROCESS_ORDER_SUCCESS':
      return { ...state, orderId: action.payload.orderId, success: true };
    
    // On order processing failure, store the error message
    case 'PROCESS_ORDER_FAIL':
      return { ...state, error: action.payload };

    // Return current state by default if no matching action type
    default:
      return state;
  }
};

export default orderReducer;  // Export the reducer for use in the Redux store
