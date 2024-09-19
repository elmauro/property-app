import React from 'react';
import productImage from '../../assets/product-image.jpg'; // Importing product image from assets folder

// CartItem component represents a single item in the shopping cart
const CartItem = ({ product, quantity, price, updateQuantity, onDelete }) => {
  // Handles change in quantity, ensuring the new value is a valid number
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);  // Convert input value to a number
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      updateQuantity(product, newQuantity);  // Update cart with new quantity if valid
    }
  };

  return (
    <tr className="border-b">
      {/* Displaying product information, image, and delete button */}
      <td className="py-4 flex items-center">
        <img src={productImage} className="mr-4 w-16 h-16" />  {/* Product image */}
        <div>
          <div className="font-bold">{product.title}</div>  {/* Product title */}
          <div className="text-sm text-gray-500">Item No.: {product.code}</div>  {/* Product code */}
          <button className="text-blue-500 mt-2 flex items-center" onClick={onDelete}>  {/* Delete button */}
            🗑 Delete
          </button>
        </div>
      </td>
      {/* Displaying price and quantity controls */}
      <td className="py-4">$ {price.toFixed(2)}</td>
      <td className="py-4">
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}  // Handling quantity changes
          min="1"
          className="w-16 border rounded p-1"
        />
      </td>
      {/* Displaying total cost for the item */}
      <td className="py-4">$ {(price * quantity).toFixed(2)}</td>
    </tr>
  );
};

export default CartItem;
