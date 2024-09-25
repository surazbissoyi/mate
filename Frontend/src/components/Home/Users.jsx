import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import Card from '../Common/Card'; // Import the Card component

const HomeSection = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('http://localhost:2000/mates/allmates'); // Fetch all mates
        setProfiles(response.data.reverse()); // Reverse the array to show last added first
      } catch (error) {
        console.error('Error fetching profiles:', error); // Handle errors
      }
    };

    fetchProfiles(); // Call the fetch function
  }, []);

  return (
    <div className='mt-10'>
      <h1 className='text-2xl font-bold py-5'>Mates</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {profiles.map(profile => (
          <Card 
            id={profile.userId} // Make sure to use userId here
            key={profile.userId} // Make sure to use userId here
            age={profile.age}
            gender={profile.gender}
            occupation={profile.occupation}
            budget={profile.budget}
            name={profile.name}
            image={profile.image}
            about={profile.about}
            place={profile.place}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeSection;
