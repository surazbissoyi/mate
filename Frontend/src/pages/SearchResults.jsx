import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../components/Common/Card';
import PlaceCard from '../components/Common/PlaceCard';

const SearchResults = () => {
    const location = useLocation();
    const { results } = location.state || { results: { mates: [], properties: [] } };

    const mates = results.mates || [];
    const properties = results.properties || [];

    // State to manage the number of visible cards
    const [visibleMates, setVisibleMates] = useState(6);
    const [visibleProperties, setVisibleProperties] = useState(6);

    const handleLoadMoreMates = () => {
        setVisibleMates(prev => prev + 6);
    };

    const handleLoadMoreProperties = () => {
        setVisibleProperties(prev => prev + 6);
    };

    return (
        <div className='container mx-auto px-4 text-white py-8'>
            <h1 className='text-2xl font-bold mb-4'>Mates</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {mates.length > 0 ? (
                    [...mates].reverse().slice(0, visibleMates).map((mate) => ( // Show only visible mates
                        <Card 
                            key={mate.userId}
                            id={mate.userId}
                            name={mate.name}
                            image={mate.image}
                            about={mate.about}
                            age={mate.age}
                            gender={mate.gender}
                            place={mate.place}
                            budget={mate.budget}
                        />
                    ))
                ) : (
                    <p>No mates found.</p>
                )}
            </div>
            {visibleMates < mates.length && (
                <button className='mt-4 px-4 py-2 bg-teal-600 text-white rounded' onClick={handleLoadMoreMates}>
                    Load More
                </button>
            )}

            <h1 className='text-2xl text-white mt-5 font-bold mb-4'>Properties</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {properties.length > 0 ? (
                    [...properties].reverse().slice(0, visibleProperties).map((property) => ( // Show only visible properties
                        <PlaceCard 
                            key={property.propertyId}
                            id={property.propertyId}
                            name={property.name}
                            images={property.images}
                            place={property.place}
                            budget={property.budget}
                            rent={property.rent}
                            securityDeposit={property.security_deposit}
                            propertyType={property.property_type}
                            furnishing={property.furnishing}
                            aboutRoom={property.about_room}
                            aboutMates={property.about_mates}
                        />
                    ))
                ) : (
                    <p>No properties found.</p>
                )}
            </div>
            {visibleProperties < properties.length && (
                <button className='mt-4 px-4 py-2 bg-teal-600 text-white rounded' onClick={handleLoadMoreProperties}>
                    Load More Properties
                </button>
            )}
        </div>
    );
};

export default SearchResults;
