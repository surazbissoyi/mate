import React from 'react';
import {useNavigate} from 'react-router-dom'

const Card = ({ id, name, image, about, age, gender, place, budget }) => {

  const navigate = useNavigate();
  const handleViewProfile = () => {
    navigate(`/profile/${id}`);
    window.scrollTo(0, 0);
  }

  return (
    <div className='rounded-lg shadow-lg bg-black text-white flex items-center'>
      {/* Image on the left */}
      <div className='w-1/2 mr-3 overflow-hidden rounded-lg'>
        <img 
          src={image} 
          alt={name} 
          loading='lazy' 
          className='w-full h-[250px] object-cover transition-transform duration-300 ease-in-out lg:hover:scale-110' 
        />
      </div>

      {/* Details on the right */}
      <div className='w-1/2 pr-3'>
        <div className='justify-between items-center'>
          <h2 className='text-xl font-bold'>{name.length < 13 ? name : name.substring(0, 10) + '...'}</h2>
          <h2 className='text-lg font-semibold'>₹{budget}</h2>
        </div>
        <p className='text-gray-300 text-sm font-medium'>
          {age} Years ・ {gender}
        </p>
        <p className='text-gray-400 h-[75px] overflow-hidden'>
          {about.length < 60 ? about : about.substring(0, 60) + '...'}
        </p>
        <p className='text-gray-200 mb-2 font-semibold'>{place}</p>
        <button onClick={handleViewProfile} className='px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-lg w-full transition-colors duration-300 hover:from-teal-600 hover:to-teal-800'>
          View Details
        
        </button>
      </div>
    </div>
  );
};

export default Card;
