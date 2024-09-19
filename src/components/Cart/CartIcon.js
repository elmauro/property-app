import React from 'react';
import { useSelector } from 'react-redux'; // Importing useSelector to access Redux store
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for programmatic navigation
import { FaShoppingCart } from 'react-icons/fa'; // Importing an icon for the shopping cart

// CartIcon component to display cart summary (total items and price) with navigation to the cart page
const CartIcon = () => {
  const cart = useSelector((state) => state.cart); // Accessing cart state from Redux store
  const { cartItems } = cart;  // Destructuring cartItems from the cart state

  // Calculate total number of items in the cart
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Calculate total price of all items in the cart
  const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0);

  const navigate = useNavigate(); // Hook to programmatically navigate to the cart page

  return (
    <div className="relative cursor-pointer" onClick={() => navigate('/cart')}> {/* On click, navigate to /cart */}
      <FaShoppingCart className="text-2xl" /> {/* Display shopping cart icon */}
      {/* Display total items in the cart in a red badge */}
      <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs px-2">
        {totalItems}
      </span>
      {/* Display total price next to the icon */}
      <span className="ml-2 font-bold">${totalPrice.toFixed(2)}</span>
    </div>
  );
};

export default CartIcon;
