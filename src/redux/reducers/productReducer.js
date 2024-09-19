const initialState = { 
  products: [],  // Initial list of products is empty
  loading: true,  // Loading starts as true to show loading indicator
  error: null  // No error initially
};

// Reducer for handling product-related state
export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_PRODUCTS_SUCCESS':  // On successful product fetch
      return {
        ...state,  // Keep the existing state
        loading: false,  // Stop loading
        products: action.payload.products,  // Set fetched products
        totalProducts: action.payload.totalProducts,  // Set total products
        currentPage: action.payload.currentPage,  // Set current page
        pageSize: action.payload.pageSize  // Set page size
      };

    case 'FETCH_PRODUCTS_FAIL':  // On fetch failure
      return { 
        ...state, 
        loading: false,  // Stop loading
        error: action.payload  // Set the error message
      };

    default:
      return state;  // Return the current state by default
  }
}
