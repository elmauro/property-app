import React from 'react';
import PropertyOperations from './PropertyOperations';
import PropertyImages from './PropertyImages';

const PropertyCrud = ({ propertyData, onTabChange }) => { // Accept onTabChange as a prop
  return (
    <div className="flex">
      {/* Left Column: Property Operations */}
      <div className="w-1/2 p-4">
        <PropertyOperations propertyData={propertyData} onTabChange={onTabChange} />
      </div>

      {/* Right Column: Only show Property Images when a property is selected (for update) */}
      {propertyData && (
        <div className="w-1/2 p-4">
          <PropertyImages propertyId={propertyData?.propertyId} propertyImages={propertyData?.propertyImages} />
        </div>
      )}
    </div>
  );
};

export default PropertyCrud;
