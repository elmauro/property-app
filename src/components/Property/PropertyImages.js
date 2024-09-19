import React, { useState } from 'react';
import axios from 'axios';

const PropertyImages = ({ propertyId, propertyImages: initialPropertyImages }) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [newImageFile, setNewImageFile] = useState(null);
  const [propertyImages, setPropertyImages] = useState(initialPropertyImages); // Local state to manage the images

  const openImageModal = () => {
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  const handleImageChange = (e) => {
    setNewImageFile(e.target.files[0]);
  };

  const handleAddImage = async () => {
    if (!newImageFile) return;

    const formData = new FormData();
    formData.append('file', newImageFile);

    try {
      const token = sessionStorage.getItem('jwt');  // Retrieve the token from session storage
      const response = await axios.post(
        `http://localhost:56510/v1/properties/${propertyId}/images`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,  // Include the token in the Authorization header
          },
        }
      );

      // After successful upload, update the local state with the new image
      const newImage = {
        file: newImageFile.name, // Assuming the backend uses the file name as the image identifier
        enabled: 0,
      };

      setPropertyImages([...propertyImages, newImage]); // Add the new image to the carousel

      // Reset file input and close modal
      setNewImageFile(null);
      closeImageModal();
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Property Images</h2>

      {/* Image Carousel */}
      <div className="mb-4">
        <div className="flex overflow-x-auto">
          {propertyImages?.length > 0 ? (
            propertyImages.map((image, index) => (
              <div key={index} className="mr-4">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/${image.file}`}
                  alt={`Property Image ${index}`}
                  className="w-32 h-32 object-cover"
                />
              </div>
            ))
          ) : (
            <p>No images available</p>
          )}
        </div>
      </div>

      {/* Manage Images Button */}
      <button onClick={openImageModal} className="bg-blue-600 text-white px-4 py-2 rounded">
        Manage Images
      </button>

      {/* Modal for Image Management */}
      {isImageModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md w-1/2">
            <h2 className="text-lg font-bold mb-4">Manage Property Images</h2>

            {/* Add new image */}
            <input type="file" onChange={handleImageChange} className="mb-4" />
            <div className="flex">
              <button onClick={handleAddImage} className="bg-green-600 text-white px-4 py-2 rounded">
                Add Image
              </button>
              <button onClick={closeImageModal} className="ml-2 bg-red-600 text-white px-4 py-2 rounded">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyImages;
