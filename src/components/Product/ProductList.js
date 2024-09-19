import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/actions/productActions';
import ProductItem from './ProductItem';
import CartIcon from '../Cart/CartIcon'; // Import the CartIcon component

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);  // Track the current page
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { products, loading, error, totalProducts, pageSize } = productList;

  // Calculate total number of pages for pagination
  const totalPages = Math.ceil(totalProducts / pageSize);

  useEffect(() => {
    dispatch(fetchProducts(currentPage, pageSize));  // Fetch products for the current page whenever page or page size changes
  }, [dispatch, currentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page); // Change the current page when a pagination button is clicked
  };

  return (
    <div className="p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <CartIcon /> {/* Display cart icon on the ProductList page */}
      </div>

      {/* Display loading, error, or product list based on state */}
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <div className="product-list grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Check if products exist before mapping */}
            {products?.length > 0 ? (
              products.map((product) => (
                <ProductItem key={product.productId} product={product} />
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="pagination mt-4">
            {[...Array(totalPages).keys()].map((pageNumber) => (
              <button
                key={pageNumber + 1}
                className={`px-3 py-1 mx-1 ${currentPage === pageNumber + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                onClick={() => handlePageChange(pageNumber + 1)}
              >
                {pageNumber + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
