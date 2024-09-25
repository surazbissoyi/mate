import React from 'react';
import { Link, useNavigate } from 'react-router-dom'


const PlaceCard = ({ name, images, place, budget, rent, securityDeposit, propertyType, furnishing, aboutRoom, aboutMates, id }) => {

  // Helper function to truncate combined string
  const getCombinedPropertyString = (propertyType, furnishing) => {
    const combined = `${propertyType || ''} ・ ${furnishing || ''}`;
    return combined.length > 24 ? combined.substring(0, 24) + '...' : combined;
  };

  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/place/${id}`);
    window.scrollTo(0, 0);
  }

  return (
    <div className='rounded-lg shadow-lg bg-black text-white flex items-center'>
      {/* Image on the left */}
      <div className='w-1/2 mr-3 overflow-hidden rounded-lg'>
        {images && images.length > 0 ? (
          <img
            src={images[0]}
            alt={name}
            loading='lazy'
            className='w-full h-[250px] object-cover transition-transform duration-300 ease-in-out lg:hover:scale-110'
          />
        ) : (
          <div className='w-full h-[250px] bg-gray-500 flex items-center justify-center'>
            <p>No Image</p>
          </div>
        )}
      </div>

      {/* Details on the right */}
      <div className='w-1/2 pr-3'>
        <div className='justify-between items-center'>
          <h2 className='text-xl font-bold'>{name ? (name.length < 15 ? name : name.substring(0, 14) + '...') : 'N/A'}</h2>
          <h2 className='text-lg font-semibold'>₹{rent || 'N/A'}</h2>
        </div>

        <p className='text-gray-300 text-sm font-medium capitalize'>
          {getCombinedPropertyString(propertyType, furnishing)}
        </p>

        <p className='text-gray-400 h-[75px] overflow-hidden'>
          {aboutRoom ? (aboutRoom.length < 60 ? aboutRoom : aboutRoom.substring(0, 60) + '...') : 'No details about the room'}
        </p>

        <p className='text-gray-200 mb-2 font-semibold'>{place || 'N/A'}</p>

        <button onClick={handleViewDetails} className='px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-lg w-full transition-colors duration-300 hover:from-teal-600 hover:to-teal-800'>
          View Details
        </button>
      </div>
    </div>
  );
};

export default PlaceCard;
