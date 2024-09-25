import React from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../components/Common/Card';
import PlaceCard from '../components/Common/PlaceCard';

const SearchResults = () => {
    const location = useLocation();
    const { results } = location.state || { results: { mates: [], properties: [] } };

    // Access mates and properties directly from results
    const mates = results.mates || [];
    const properties = results.properties || [];

    return (
        <div className='container mx-auto px-4 text-white py-8'>
            <h1 className='text-2xl font-bold mb-4'>Mates</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {mates.length > 0 ? (
                    [...mates].reverse().map((mate) => ( // Reverse mates array
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

            <h1 className='text-2xl text-white mt-5 font-bold mb-4'>Properties</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {properties.length > 0 ? (
                    [...properties].reverse().map((property) => ( // Reverse properties array
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
        </div>
    );
};

export default SearchResults;
