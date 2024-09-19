import axios from 'axios';

// Fetch product list with pagination parameters
export const fetchProducts = (pageNumber = 1, pageSize = 10) => async (dispatch) => {
  try {
    // Send a GET request to fetch the products with pagination
    const { data } = await axios.get(`http://localhost:56508/v1/Product?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    
    // Dispatch success action with product data and pagination details
    dispatch({
      type: 'FETCH_PRODUCTS_SUCCESS',
      payload: {
        products: data.data,  // List of products for the current page
        totalProducts: data.totalProducts,  // Total number of products
        pageSize: data.pageSize,  // Number of products per page
        currentPage: data.currentPage,  // Current page number
      },
    });
  } catch (error) {
    // Dispatch failure action if the request fails
    dispatch({ 
      type: 'FETCH_PRODUCTS_FAIL', 
      payload: error.response.data 
    });
  }
};
