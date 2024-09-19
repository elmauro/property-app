const initialState = {
  properties: [],
  loading: true,
  error: null,
};

export default function propertyReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_PROPERTIES_SUCCESS':
      return {
        ...state,
        loading: false,
        properties: action.payload.properties,
        totalProperties: action.payload.totalProperties,
        currentPage: action.payload.currentPage,
        pageSize: action.payload.pageSize,
      };

    case 'FETCH_PROPERTIES_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case 'CREATE_PROPERTY_SUCCESS':
      return {
        ...state,
        loading: false,
        successMessage: 'Property Created successfully!',
      };

    case 'CREATE_PROPERTY_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case 'UPDATE_PROPERTY_SUCCESS':
      return {
        ...state,
        loading: false,
        successMessage: 'Property updated successfully!',
      };

    case 'UPDATE_PROPERTY_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case 'CLEAR_ERRORS':
      return {
        ...state,
        error: null, // Clear the errors
        priceError: null
      };

    case 'CLEAR_SUCCESS_MESSAGE':
      return {
        ...state,
        successMessage: null, // Clear the success message
      };

    case 'PROPERTY_UPDATE_PRICE_REQUEST':
      return { ...state, loading: true, priceError: null };

    case 'PROPERTY_UPDATE_PRICE_SUCCESS':
      return { ...state, loading: false, successMessage: 'Price updated successfully' };

    case 'PROPERTY_UPDATE_PRICE_FAIL':
      return { ...state, loading: false, priceError: action.payload };

    default:
      return state;
  }
}
