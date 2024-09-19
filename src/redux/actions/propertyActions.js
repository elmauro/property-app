import axios from 'axios';

// Helper function to extract error messages from API responses
const extractErrorMessages = (errorResponse) => {

  var errorsData = {};

  if(errorResponse.errors)
  {
    errorsData = errorResponse; 
  }
  else
  {
    errorsData.errors = {
      Unauthorized: ["Unauthorized"]
    }
  }
  
  const errors = errorsData.errors || {};
  let formattedErrors = {};

  Object.keys(errors).forEach((key) => {
    formattedErrors[key] = errors[key]; // Keep the error array as is
  });

  return formattedErrors;
};

// Fetch properties with pagination and filters
export const fetchProperties = (pageNumber = 1, pageSize = 10, filters = {}) => async (dispatch) => {
  try {
    const token = sessionStorage.getItem('jwt');  // Retrieve the token from session storage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,  // Include the token in the Authorization header
      },
    };

    // Build the query string with filters
    let queryString = `pageNumber=${pageNumber}&pageSize=${pageSize}`;

    if (filters.Name) queryString += `&Name=${encodeURIComponent(filters.Name)}`;
    if (filters.Address) queryString += `&Address=${encodeURIComponent(filters.Address)}`;
    if (filters.CodeInternal) queryString += `&CodeInternal=${encodeURIComponent(filters.CodeInternal)}`;
    if (filters.MinPrice) queryString += `&MinPrice=${filters.MinPrice}`;
    if (filters.MaxPrice) queryString += `&MaxPrice=${filters.MaxPrice}`;
    if (filters.MinYear) queryString += `&MinYear=${filters.MinYear}`;
    if (filters.MaxYear) queryString += `&MaxYear=${filters.MaxYear}`;
    if (filters.OwnerId) queryString += `&OwnerId=${filters.OwnerId}`;
    if (filters.CreatedAfter) queryString += `&CreatedAfter=${filters.CreatedAfter}`;
    if (filters.CreatedBefore) queryString += `&CreatedBefore=${filters.CreatedBefore}`;

    const { data } = await axios.get(`http://localhost:56510/v1/Property?${queryString}`, config);
    
    dispatch({
      type: 'FETCH_PROPERTIES_SUCCESS',
      payload: {
        properties: data.data,
        totalProperties: data.totalProperties,
        pageSize: data.pageSize,
        currentPage: data.currentPage,
      },
    });
  } catch (error) {
    const errorMessages = extractErrorMessages(error.response? error.response.data : error);
    dispatch({
      type: 'FETCH_PROPERTIES_FAIL',
      payload: errorMessages,
    });
  }
};

// Create a property (POST)
export const createProperty = (propertyData) => async (dispatch) => {
  try {
    const token = sessionStorage.getItem('jwt');  // Retrieve the token from session storage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,  // Include the token in the Authorization header
        'Content-Type': 'application/json',  // Content type for JSON
      },
    };

    // Make the POST request
    const response = await axios.post('http://localhost:56510/v1/Property', propertyData, config);

    // Access the 'Location' header from the response to get the order's URL
    const locationHeader = response.headers['location'];

    // Extract the 'orderId' from the Location URL in the response header
    const propertyId = new URL(locationHeader).searchParams.get('propertyId');

    response.data.data.propertyId = propertyId;

    dispatch({ type: 'CREATE_PROPERTY_SUCCESS', payload: response.data, });
  } catch (error) {
    const errorMessages = extractErrorMessages(error.response? error.response.data : error);
    dispatch({
      type: 'CREATE_PROPERTY_FAIL',
      payload: errorMessages,
    });
  }
};

// Action to update the property price
export const updatePropertyPrice = (propertyId, newPrice) => async (dispatch) => {
  try {
    dispatch({ type: 'PROPERTY_UPDATE_PRICE_REQUEST' });

    const token = sessionStorage.getItem('jwt');  // Add token if required for authentication
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,  // Add token if needed
      },
    };

    const body = { price: newPrice }; // Body with the price structure

    await axios.patch(`http://localhost:56510/v1/Property/${propertyId}/price`, body, config);

    dispatch({
      type: 'PROPERTY_UPDATE_PRICE_SUCCESS',
    });
  } catch (error) {
    const errorMessages = extractErrorMessages(error.response? error.response.data : error);
    dispatch({
      type: 'PROPERTY_UPDATE_PRICE_FAIL',
      payload: errorMessages,
    });
  }
};

// Update a property (PUT)
export const updateProperty = (propertyId, propertyData) => async (dispatch) => {
  try {
    const token = sessionStorage.getItem('jwt');  // Retrieve the token from session storage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,  // Include the token in the Authorization header
        'Content-Type': 'application/json',  // Content type for JSON
      },
    };

    await axios.put(`http://localhost:56510/v1/Property/${propertyId}`, propertyData, config);
    dispatch({ type: 'UPDATE_PROPERTY_SUCCESS', payload: {} });
  } catch (error) {
    const errorMessages = extractErrorMessages(error.response? error.response.data : error);
    dispatch({
      type: 'UPDATE_PROPERTY_FAIL',
      payload: errorMessages,
    });
  }
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: 'CLEAR_ERRORS' });
};

export const clearSuccessMessage = () => (dispatch) => {
  dispatch({ type: 'CLEAR_SUCCESS_MESSAGE' });
};
