import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlaceCard from '../Common/PlaceCard'; 

const Places = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('http://localhost:2000/property/allproperties'); // Fetch all properties
        setProfiles(response.data.reverse()); // Reverse the array to show last added first
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <div className='mt-10'>
      <h1 className='text-2xl font-bold py-5'>Places</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {profiles.map(profile => (
          <PlaceCard 
            key={profile.propertyId}
            id={profile.propertyId}
            name={profile.name}
            budget={profile.budget}
            rent={profile.rent}
            securityDeposit={profile.security_deposit}
            propertyType={profile.property_type}
            furnishing={profile.furnishing}
            aboutRoom={profile.about_room}
            aboutMates={profile.about_mates}
            place={profile.place}
            address={profile.address}
            images={profile.images}
          />
        ))}
      </div>
    </div>
  );
};

export default Places;
