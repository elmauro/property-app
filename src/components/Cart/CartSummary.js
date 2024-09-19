import React from 'react';

// CartSummary component displays the summary of the cart, including total items, price, and a button to process the order.
const CartSummary = ({ totalItems, totalPrice, handleProcessOrder }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
      <h1 className="text-2xl font-bold mb-6">Shopping cart details</h1>

      {/* Displays the number of items and the total price */}
      <div className="mb-4">
        <div className="flex justify-between text-gray-700">
          <span>Items ({totalItems} units)</span>
          <span>$ {totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <hr className="mb-4" />

      {/* Displays the total price in bold */}
      <div className="flex justify-between text-gray-700 font-bold mb-6">
        <span>Total</span>
        <span>$ {totalPrice.toFixed(2)}</span>
      </div>

      {/* Button to process the order; calls the handleProcessOrder function when clicked */}
      <button
        onClick={handleProcessOrder}  // Process order action is triggered here
        className="w-full bg-blue-800 text-white py-3 rounded-lg hover:bg-blue-900 transition"
      >
        Process Order
      </button>
    </div>
  );
};

export default CartSummary;
