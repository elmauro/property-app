import axios from 'axios';

// Action to process the order
export const processOrder = (orderData) => async (dispatch) => {
  try {
    // Send a POST request to the backend with the order data
    const response = await axios.post('http://localhost:56508/v1/Order', orderData);

    // Access the 'Location' header from the response to get the order's URL
    const locationHeader = response.headers['location'];

    // Extract the 'orderId' from the Location URL in the response header
    const orderId = new URL(locationHeader).searchParams.get('orderId');

    // Dispatch success action with the extracted orderId
    dispatch({ type: 'PROCESS_ORDER_SUCCESS', payload: { orderId } });
  } catch (error) {
    // Dispatch failure action if the request fails
    dispatch({ type: 'PROCESS_ORDER_FAIL', payload: error.response.data });
  }
};
