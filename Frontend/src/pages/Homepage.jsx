import React from 'react';
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router-dom'
import Users from '../components/Home/Users';
import Places from '../components/Home/Places';
import TypingEffect from '../components/Common/TypingEffect'; // Adjust the path accordingly

const Homepage = () => {
  return (
    <div className='container px-4 md:px-10 mx-auto text-white'>
      {/* Hero section */}
      <div className='sm:my-20 my-10  sm:text-center'>
        <h1 className='text-4xl sm:text-6xl font-bold mb-4'>Find Your Perfect Space.</h1>
        <TypingEffect
          text="Searching for a cozy home or roommate? We’ve got options!"
          speed={30} // Adjust typing speed as needed
        />
      </div>

      {/* Cards Section */}
      <div className='mt-10 flex flex-col gap-4 lg:flex-row'>
        {/* Card 1: Need a roommate */}
        <div className='bg-gradient-to-r w-full lg:w-1/2 from-teal-400 to-teal-600 text-white px-5 sm:px-10 py-3 sm:py-5 rounded-lg shadow-lg'>
          <h2 className='text-2xl font-semibold'>Need a roommate?</h2>
          <p className='text-gray-100 mt-2 hidden sm:block'>
            Got an extra room? List your room here and find the perfect roommate to share your space with. It's fast, easy, and free.
          </p>
          <Link to='/listproperty'>
            <button className='bg-white text-black rounded-full py-1 px-4 mt-4 flex items-center transition-colors duration-300 hover:bg-gray-200'>
              List your room
              <div className='pt-[3px] pl-3 transition-transform duration-300 hover:translate-x-1'>
                <FaArrowRightLong />
              </div>
            </button>
          </Link>
        </div>

        {/* Card 2: Looking for a place */}
        <div className='bg-gradient-to-r w-full lg:w-1/2 from-teal-400 to-teal-600 text-white px-5 sm:px-10 py-3 sm:py-5 rounded-lg shadow-lg'>
          <h2 className='text-2xl font-semibold'>Looking for a place?</h2>
          <p className='text-gray-100 mt-2 hidden sm:block'>
            Searching for a new home? List yourself and let potential roommates know you're looking. Get matched with great spaces easily.
          </p>

          <Link to='/listyourself'>
            <button className='bg-white text-black rounded-full py-1 px-4 mt-4 flex items-center transition-colors duration-300 hover:bg-gray-200'>
              List yourself
              <div className='pt-[3px] pl-3 transition-transform duration-300 hover:translate-x-1'>
                <FaArrowRightLong />
              </div>
            </button>
          </Link>
        </div>
      </div>

      {/* Users and Places Sections */}
      <Users />
      <Places />
    </div>
  );
};

export default Homepage;
