import React, { useState } from 'react';
import PropertyList from './PropertyList';
import PropertyCrud from './PropertyCrud'; // Component for CRUD operations

const PropertyTabs = () => {
  const [activeTab, setActiveTab] = useState('list'); // Manage active tab
  const [selectedProperty, setSelectedProperty] = useState(null); // To store selected property data

  const handleSelectProperty = (property) => {
    setSelectedProperty(property); // Set the selected property data
    setActiveTab('crud'); // Switch to the CRUD tab for updating
  };

  const handleNewProperty = () => {
    setSelectedProperty(null); // Clear selected property to create a new one
    setActiveTab('crud'); // Switch to the CRUD tab for creating a new property
  };

  return (
    <div className="p-6 bg-gray-100">
      {/* Conditionally render tab headers */}
      {activeTab === 'list' ? (
        <div className="flex justify-around mb-6">
          <button
            className={`px-4 py-2 ${activeTab === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
            onClick={() => setActiveTab('list')}
          >
            Property List with Filters
          </button>
        </div>
      ) : (
        <div className="flex justify-around mb-6">
          <button
            className={`px-4 py-2 ${activeTab === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
            onClick={() => setActiveTab('list')}
          >
            Property List with Filters
          </button>
          {/* Show Property Administration tab only when creating or updating */}
          <button
            className={`px-4 py-2 ${activeTab === 'crud' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
            onClick={() => setActiveTab('crud')}
          >
            Property Administration
          </button>
        </div>
      )}

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'list' && <PropertyList onSelectProperty={handleSelectProperty} onNewProperty={handleNewProperty} />}
        {activeTab === 'crud' && <PropertyCrud propertyData={selectedProperty} onTabChange={setActiveTab} />}
      </div>
    </div>
  );
};

export default PropertyTabs;
