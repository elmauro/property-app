import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProperties, clearErrors } from '../../redux/actions/propertyActions';
import PropertyItem from './PropertyItem';
import { useNavigate } from 'react-router-dom';

const PropertyList = ({ onSelectProperty, onNewProperty }) => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    Name: '',
    Address: '',
    CodeInternal: '',
    MinPrice: '',
    MaxPrice: '',
    MinYear: '',
    MaxYear: '',
    OwnerId: '',
    CreatedAfter: '',
    CreatedBefore: '',
  });

  const dispatch = useDispatch();
  const propertyList = useSelector((state) => state.propertyList);
  const { properties, loading, error, totalProperties, pageSize } = propertyList;

  const renderErrorMessages = (error) => {
    if (typeof error === 'object' && error !== null) {
      if (error.Unauthorized) {
        // Redirect to /login if Unauthorized error is detected
        navigate('/login');
      }

      // Extract and display the messages from the error object
      return Object.values(error).flat().map((message, index) => (
        <p key={index} className="text-red-500">{message}</p>
      ));
    }
    return <p className="text-red-500">{error}</p>;  // Display error as is if it's a string
  };

  // Fetch properties with filters
  const fetchPropertyData = () => {
    dispatch(clearErrors()); // Clear any previous errors before fetching
    dispatch(fetchProperties(currentPage, pageSize, filters));
  };

  useEffect(() => {
    fetchPropertyData(); // Initial fetch
  }, [dispatch, currentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset to the first page when searching
    fetchPropertyData(); // Fetch properties based on current filters
  };

  const handleNewProperty = () => {
    onNewProperty(); // Trigger the creation of a new property (switch tab)
  };

  const handleSelectProperty = (property) => {
    onSelectProperty(property); // Trigger tab change with property data
  };

  const totalPages = Math.ceil(totalProperties / pageSize);

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Properties</h1>

      {/* Filters */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Filter by Name</label>
          <input
            type="text"
            name="Name"
            value={filters.Name}
            onChange={handleInputChange}
            placeholder="Filter by Name"
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Filter by Address</label>
          <input
            type="text"
            name="Address"
            value={filters.Address}
            onChange={handleInputChange}
            placeholder="Filter by Address"
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Filter by Code Internal</label>
          <input
            type="text"
            name="CodeInternal"
            value={filters.CodeInternal}
            onChange={handleInputChange}
            placeholder="Filter by Code Internal"
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Min Price</label>
          <input
            type="number"
            name="MinPrice"
            value={filters.MinPrice}
            onChange={handleInputChange}
            placeholder="Min Price"
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Max Price</label>
          <input
            type="number"
            name="MaxPrice"
            value={filters.MaxPrice}
            onChange={handleInputChange}
            placeholder="Max Price"
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Min Year</label>
          <input
            type="number"
            name="MinYear"
            value={filters.MinYear}
            onChange={handleInputChange}
            placeholder="Min Year"
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Max Year</label>
          <input
            type="number"
            name="MaxYear"
            value={filters.MaxYear}
            onChange={handleInputChange}
            placeholder="Max Year"
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Filter by Owner ID</label>
          <input
            type="text"
            name="OwnerId"
            value={filters.OwnerId}
            onChange={handleInputChange}
            placeholder="Filter by Owner ID"
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Created After</label>
          <input
            type="date"
            name="CreatedAfter"
            value={filters.CreatedAfter}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Created Before</label>
          <input
            type="date"
            name="CreatedBefore"
            value={filters.CreatedBefore}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
      </div>


      {/* Buttons for Search and New */}
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
        <button
          onClick={handleNewProperty}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          New
        </button>
      </div>

      {/* Property List */}
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2 className="text-red-500">{renderErrorMessages(error)}</h2>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-6">Result</h1>
          <div className="property-list grid grid-cols-1 md:grid-cols-2 gap-6">
            {properties?.length > 0 ? (
              properties.map((property) => (
                <PropertyItem
                  key={property.propertyId}
                  property={property}
                  onSelect={handleSelectProperty}
                />
              ))
            ) : (
              <p>No properties found.</p>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="pagination mt-4">
            {[...Array(totalPages).keys()].map((pageNumber) => (
              <button
                key={pageNumber + 1}
                className={`px-3 py-1 mx-1 ${
                  currentPage === pageNumber + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}
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

export default PropertyList;
