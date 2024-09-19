import React from 'react';
import placeholderImage from '../../assets/placeholder.jpg'; // Add a placeholder image

const PropertyItem = ({ property, onSelect }) => {
  const firstImage = property.propertyImages && property.propertyImages.length > 0
    ? `${process.env.PUBLIC_URL}/assets/${property.propertyImages[0].file}`
    : placeholderImage; // Fallback to a placeholder if no image is available

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between mb-6">
      <div className="flex items-center">
        <img 
          src={firstImage} 
          className="w-16 h-16 mr-4" 
          alt={property.name || 'Property Image'} 
        />
        <div>
          <h2 className="text-lg font-bold">{property.name}</h2>
          <p className="text-sm text-gray-500">
            Address: <span className="font-medium">{property.address}</span>
          </p>
          <p className="text-sm text-gray-500">
            Owner: <span className="font-medium">{property.owner?.name || 'Unknown'}</span>
          </p>
          <p className="text-sm text-gray-500">
            Year Built: <span className="font-medium">{property.year}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <span className="text-xl font-bold text-gray-700 mr-4">$ {property.price.toFixed(2)}</span>
        <button
          className="bg-yellow-500 text-white px-3 py-1 rounded"
          onClick={() => onSelect(property)}
        >
          Select
        </button>
      </div>
    </div>
  );
};

export default PropertyItem;
