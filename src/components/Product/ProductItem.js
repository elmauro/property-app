import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/actions/cartActions';
import productImage from '../../assets/product-image.jpg'; // Adjust the path based on your folder structure

const ProductItem = ({ product }) => {
  const [quantity, setQuantity] = useState(0);  // Start quantity at 1
  const dispatch = useDispatch();

  // Function to increase quantity and add to cart, ensuring it does not exceed stock
  const increaseQuantityAndAddToCart = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      if (newQuantity <= product.stock) {
        dispatch(addToCart(product, newQuantity));  // Add to cart only if within stock
        return newQuantity;
      }
      return prevQuantity;  // Do not increase if at max stock
    });
  };

  // Function to decrease quantity and add to cart
  const decreaseQuantityAndAddToCart = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity >= 0 ? prevQuantity - 1 : prevQuantity;
      if (newQuantity === 0) {
        dispatch(removeFromCart(product.productId)); // Remove item from cart if quantity becomes 0
      } else {
        dispatch(addToCart(product, newQuantity)); // Add to cart after updating quantity
      }
      return newQuantity;
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between mb-6">
      <div className="flex items-center">
        <img src={productImage} className="w-16 h-16 mr-4" alt={product.title} />
        <div>
          <h2 className="text-lg font-bold">{product.title}</h2>
          <p className="text-sm text-gray-500">
            Item No. <span className="font-medium">{product.code}</span> | 
            <span className="text-green-600">{product.stock} in stock</span>
          </p>
          <p className="text-sm text-gray-500">{product.description}</p>
        </div>
      </div>
      <div className="flex items-center">
        <span className="text-xl font-bold text-gray-700 mr-4">$ {product.price.toFixed(2)}</span>
        <div className="flex items-center border rounded">
          <button
            className="bg-blue-700 text-white px-2 py-1"
            onClick={decreaseQuantityAndAddToCart}
            disabled={quantity <= 0}  // Disable if at minimum
          >
            −
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => {
              const newQuantity = Math.min(Number(e.target.value), product.stock);  // Validate input
              setQuantity(newQuantity);
              dispatch(addToCart(product, newQuantity));  // Add to cart after validation
            }}
            className="w-12 text-center border-0"
            min="1"  // Minimum quantity should be 1
            max={product.stock}
          />
          <button
            className="bg-blue-700 text-white px-2 py-1"
            onClick={increaseQuantityAndAddToCart}
            disabled={quantity >= product.stock}  // Disable if stock is reached
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
