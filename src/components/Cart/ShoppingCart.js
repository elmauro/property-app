import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import { useNavigate } from 'react-router-dom';
import { addToCart, removeFromCart, clearCart } from '../../redux/actions/cartActions';
import { processOrder } from '../../redux/actions/orderActions'; 

// ShoppingCart component handles the shopping cart logic
const ShoppingCart = () => {
  // Retrieve cart and order states from Redux store
  const cart = useSelector((state) => state.cart);
  const { cartItems = [] } = cart;  // Destructure cart items from cart state
  const order = useSelector((state) => state.order || {});  // Destructure order from Redux store
  const { orderId } = order;  // Extract orderId from the processed order

  const dispatch = useDispatch();
  const navigate = useNavigate();  // Allows programmatic navigation between pages

  const [isPopupVisible, setIsPopupVisible] = useState(false); // Controls popup visibility
  const [popupMessage, setPopupMessage] = useState('');  // Message to be displayed in the popup

  // Update the quantity of a product in the cart
  const updateQuantity = (product, qty) => {
    dispatch(addToCart(product, qty));  // Dispatch action to update cart quantity
  };

  // Delete an item from the cart
  const deleteItem = (product) => {
    dispatch(removeFromCart(product.productId));  // Dispatch action to remove item from cart
  };

  // Calculate total number of items and total price in the cart
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0);

  // Handle the process order action
  const handleProcessOrder = () => {
    if (cartItems.length === 0) {
      // Show popup if the cart is empty
      setPopupMessage('The cart is empty');
      setIsPopupVisible(true);
      return;
    }

    const customerId = '00000000-0000-0000-0000-000000000005'; // Replace with real customer ID

    // Map cart items to an array for the order
    const products = cartItems.map((item) => ({
      productId: item.product.productId,
      quantity: item.quantity,
    }));

    // Prepare order data
    const orderData = {
      totalAmount: totalPrice,
      orderDate: new Date().toISOString(),
      customerId,
      products,
    };

    // Dispatch action to process order and then show success message
    dispatch(processOrder(orderData)).then(() => {
      setPopupMessage('Order Processed Successfully');
      setIsPopupVisible(true);  // Show popup after order is processed
    });
  };

  // Handle closing the popup and clearing the cart
  const handleOkButtonClick = () => {
    dispatch(clearCart());  // Clear cart items
    setIsPopupVisible(false);  // Hide the popup
    navigate('/');  // Navigate back to the product list
  };

  // Update the popup message with the order ID when it is available
  useEffect(() => {
    if (orderId) {
      setPopupMessage(`Order Processed Successfully! Order ID: ${orderId}`);
    }
  }, [orderId]);  // This effect runs whenever orderId changes

  return (
    <div className="p-6 bg-gray-100">
      <div className="flex">
        <div className="w-2/3 p-6">
          <h2 className="text-2xl font-bold mb-4">My shopping cart</h2>
          <div className="border-b pb-4 mb-4">
            {cartItems.length > 0 ? (
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="py-2">Product</th>
                    <th className="py-2">Price</th>
                    <th className="py-2">Quantity</th>
                    <th className="py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.product.productId}
                      product={item.product}
                      quantity={item.quantity}
                      price={item.product.price}
                      updateQuantity={updateQuantity}
                      onDelete={() => deleteItem(item.product)}
                    />
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Your cart is empty.</p>  // Display message if cart is empty
            )}
          </div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => navigate('/')}  // Navigate back to product list
          >
            Back to Product List
          </button>
        </div>
        <div className="w-1/3 p-6 bg-gray-50">
          <h2 className="text-2xl font-bold mb-4">Shopping cart details</h2>
          {/* Pass handleProcessOrder to CartSummary */}
          <CartSummary totalItems={totalItems} totalPrice={totalPrice} handleProcessOrder={handleProcessOrder} />
        </div>
      </div>

      {/* Order Confirmation Popup */}
      {isPopupVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-xl mb-4">{popupMessage}</h2>
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleOkButtonClick}  // Close popup and navigate to product list
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
