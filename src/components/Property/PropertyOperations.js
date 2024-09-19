import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createProperty, updateProperty, clearSuccessMessage, clearErrors } from '../../redux/actions/propertyActions';
import { useNavigate } from 'react-router-dom';
import { updatePropertyPrice } from '../../redux/actions/propertyActions';  // Import the new action

const ownerList = [
  {
    ownerId: '00000000-0000-0000-0000-000000000001',
    name: 'John Doe',
    address: '123 Main St, Springfield',
    photo: '/assets/johndoe.jpg',
  },
  {
    ownerId: '00000000-0000-0000-0000-000000000002',
    name: 'Jane Smith',
    address: '456 Oak Ave, Springfield',
    photo: '/assets/janesmith.jpg',
  },
  {
    ownerId: '00000000-0000-0000-0000-000000000003',
    name: 'Robert Brown',
    address: '789 Pine Rd, Springfield',
    photo: '/assets/robertbrown.jpg',
  },
];

const PropertyOperations = ({ propertyData: selectedPropertyData, onTabChange }) => {  // Add onTabChange as prop
  const dispatch = useDispatch();

  const navigate = useNavigate();
  
  const { error, priceError, loading, successMessage } = useSelector((state) => state.propertyList);
  const [propertyData, setPropertyData] = useState({
    name: '',
    address: '',
    price: 0,
    year: 0,
    codeInternal: '',
    ownerId: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false); // Modal for price update
  const [newPrice, setNewPrice] = useState(0); // New price input
  //const [priceError, setPriceError] = useState(null); // To display error during price update
  const [isSuccessPopupVisible, setIsSuccessPopupVisible] = useState(false);

  // Populate the form when a property is selected for update
  useEffect(() => {
    if (selectedPropertyData) {
      setPropertyData({
        name: selectedPropertyData.name || '',
        address: selectedPropertyData.address || '',
        price: selectedPropertyData.price || 0,
        year: selectedPropertyData.year || 0,
        codeInternal: selectedPropertyData.codeInternal || '',
        ownerId: selectedPropertyData.ownerId || '',
      });
      setNewPrice(selectedPropertyData.price);
    } else {
      // Reset form when no property is selected (for new property creation)
      setPropertyData({
        name: '',
        address: '',
        price: 0,
        year: 0,
        codeInternal: '',
        ownerId: '',
      });
      setNewPrice(0);
    }
  }, [selectedPropertyData]);

  useEffect(() => {
    if (successMessage) {
      setIsSuccessPopupVisible(true);  // Show the success popup when a property is created or updated
    }
  }, [successMessage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreate = async () => {
    dispatch(createProperty(propertyData));
  };

  const handleUpdate = async () => {
    dispatch(updateProperty(selectedPropertyData.propertyId, propertyData));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOwnerSelect = (ownerId) => {
    setPropertyData((prevData) => ({
      ...prevData,
      ownerId,
    }));
    closeModal();
  };

  // Price modal handlers
  const openPriceModal = () => {
    setIsPriceModalOpen(true);
  };

  const closePriceModal = () => {
    dispatch(clearErrors());
    setIsPriceModalOpen(false);

    // Switch to "Property List with Filters" tab
    onTabChange('crud');  // Change to the "list" tab when closing the popup
  };

  const handleUpdatePrice = async () => {
    dispatch(updatePropertyPrice(selectedPropertyData.propertyId, newPrice)); 
  };

  const handleSuccessPopupClose = () => {
    setIsSuccessPopupVisible(false);   // Hide the popup
    dispatch(clearSuccessMessage());   // Clear the success message from Redux
    
    // Switch to "Property List with Filters" tab
    onTabChange('list');  // Change to the "list" tab when closing the popup
  };

  // Function to render errors
  const renderErrorMessages = (field) => {
    if (error && error.Unauthorized) {
        // Redirect to /login if Unauthorized error is detected
        navigate('/login');
    }
    if (error && error[field]) {
      return error[field].map((msg, index) => (
        <p key={index} className="text-red-500">{msg}</p>
      ));
    }
    return null;
  };

  // Function to render errors
  const renderPriceErrorMessages = (field) => {
    if (priceError && priceError[field]) {
      return priceError[field].map((msg, index) => (
        <p key={index} className="text-red-500">{msg}</p>
      ));
    }
    return null;
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Property Operations</h1>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">Property Name</label>
        <input
          type="text"
          name="name"
          value={propertyData.name}
          onChange={handleInputChange}
          placeholder="Property Name"
          className="p-2 border border-gray-300 rounded w-full"
        />
        {renderErrorMessages('Name')}

        <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">Property Address</label>
        <input
          type="text"
          name="address"
          value={propertyData.address}
          onChange={handleInputChange}
          placeholder="Property Address"
          className="p-2 border border-gray-300 rounded w-full"
        />
        {renderErrorMessages('Address')}

        <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          name="price"
          value={propertyData.price}
          onChange={handleInputChange}
          placeholder="Price"
          className="p-2 border border-gray-300 rounded"
          disabled={!!selectedPropertyData}
        />
        {selectedPropertyData && (
        <button onClick={openPriceModal} className="ml-2 bg-blue-600 text-white px-4 py-2 rounded">
            Update Price
        </button>
        )}

        {renderErrorMessages('Price')}
        
        {/* Modal for price update */}
        {isPriceModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-md w-1/2">
              <h2 className="text-lg font-bold mb-4">Update Property Price</h2>
              <input
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                className="p-2 border border-gray-300 rounded w-full"
              />
              {renderPriceErrorMessages('Price')}
              <div className="mt-4 flex justify-end">
                <button onClick={handleUpdatePrice} className="bg-green-600 text-white px-4 py-2 rounded mr-2">
                  Save
                </button>
                <button onClick={closePriceModal} className="bg-red-600 text-white px-4 py-2 rounded">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">Year</label>
        <input
          type="number"
          name="year"
          value={propertyData.year}
          onChange={handleInputChange}
          placeholder="Year"
          className="p-2 border border-gray-300 rounded w-full"
        />
        {renderErrorMessages('Year')}

        <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">Code Internal</label>
        <input
          type="text"
          name="codeInternal"
          value={propertyData.codeInternal}
          onChange={handleInputChange}
          placeholder="Code Internal"
          className="p-2 border border-gray-300 rounded w-full"
        />
        {renderErrorMessages('CodeInternal')}

        {selectedPropertyData && (
          <>
            <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">Property ID</label>
            <input
              type="text"
              name="propertyId"
              value={selectedPropertyData.propertyId}
              disabled
              className="p-2 border border-gray-300 rounded w-full"
            />
          </>
        )}

        <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">Owner ID</label>
        <div className="flex items-center mt-2">
          <input
            type="text"
            name="ownerId"
            value={propertyData.ownerId}
            placeholder="Owner ID"
            className="p-2 border border-gray-300 rounded w-full"
            readOnly
          />
          <button onClick={openModal} className="ml-2 bg-blue-600 text-white px-4 py-2 rounded">
            Select Owner
          </button>
        </div>
      </div>

      <div className="flex">
        {!selectedPropertyData ? (
          <button onClick={handleCreate} className="bg-green-600 text-white px-4 py-2 rounded">
            {loading ? 'Creating...' : 'Create'}
          </button>
        ) : (
          <button onClick={handleUpdate} className="bg-yellow-600 text-white px-4 py-2 ml-2 rounded">
            {loading ? 'Updating...' : 'Update'}
          </button>
        )}
      </div>

      {/* Success Popup */}
      {isSuccessPopupVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-xl mb-4">{successMessage}</h2>
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleSuccessPopupClose}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Modal for Owner Selection */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md w-1/2">
            <h2 className="text-lg font-bold mb-4">Select an Owner</h2>
            <ul className="list-disc pl-5">
              {ownerList.map((owner) => (
                <li key={owner.ownerId} className="flex items-center mb-4">
                  <img
                    src={`${process.env.PUBLIC_URL}${owner.photo}`}
                    alt={owner.name}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <button
                    onClick={() => handleOwnerSelect(owner.ownerId)}
                    className="text-blue-600 hover:underline"
                  >
                    {owner.name} (ID: {owner.ownerId})
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={closeModal} className="mt-4 bg-red-600 text-white px-4 py-2 rounded">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyOperations;
