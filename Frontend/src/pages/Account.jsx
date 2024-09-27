import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';

const Account = () => {
    const { isLoaded, user } = useUser();
    const [userData, setUserData] = useState(null);
    const [properties, setProperties] = useState([]);
    const [deleted, setDeleted] = useState(false);
    const [activeTab, setActiveTab] = useState('mate');

    useEffect(() => {
        if (isLoaded && user) {
            const userEmail = user.primaryEmailAddress?.emailAddress;

            const fetchUserData = async () => {
                try {
                    const mateResponse = await fetch(`https://matebackend.vercel.app/mates/allmates?email=${userEmail}`);
                    const mateData = await mateResponse.json();

                    if (mateData && mateData.length > 0) {
                        setUserData(mateData[0]);
                    } else {
                        console.log('No mate data found for this email');
                    }

                    const propertyResponse = await fetch(`https://matebackend.vercel.app/property/allproperties?email=${userEmail}`);
                    const propertyData = await propertyResponse.json();
                    setProperties(propertyData);
                } catch (err) {
                    console.error(err);
                }
            };

            fetchUserData();
        }
    }, [isLoaded, user]);

    const handleDeleteMate = async () => {
        if (userData) {
            try {
                const response = await fetch(`https://matebackend.vercel.app/mates/delete/${userData.userId}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    setDeleted(true);
                    alert('Mate deleted successfully');
                } else {
                    alert('Error deleting mate');
                }
            } catch (error) {
                console.error('Error deleting mate:', error);
            }
        }
    };

    const handleDeleteProperty = async (propertyId) => {
        try {
            const response = await fetch(`https://matebackend.vercel.app/property/delete/${propertyId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setProperties(properties.filter(property => property.propertyId !== propertyId));
                alert('Property deleted successfully');
            } else {
                alert('Error deleting property');
            }
        } catch (error) {
            console.error('Error deleting property:', error);
        }
    };

    if (deleted) {
        return null;
    }

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div className='container mx-auto'>
            <div className="flex justify-center mt-5 mb-4">
                <button
                    className={`py-2 px-4 ${activeTab === 'mate' ? 'border-b text-white' : 'text-white'}`}
                    onClick={() => setActiveTab('mate')}
                >
                    Mate
                </button>
                <button
                    className={`py-2 px-4 ${activeTab === 'place' ? 'border-b text-white' : 'text-white'}`}
                    onClick={() => setActiveTab('place')}
                >
                    Property
                </button>
            </div>
            
            <div className='flex justify-center items-center'>


                {activeTab === 'mate' ? (
                    userData ? (
                        <div className="p-4 text-white">
                            <div className="flex justify-center items-center">
                                <img
                                    src={userData.image}
                                    alt={userData.name}
                                    className="w-32 h-32 object-cover rounded-full mb-4"
                                />
                            </div>

                            <h2 className="text-xl font-bold text-center mb-2">{userData.name}</h2>
                            <p className="text-center text-gray-200 mb-2">{userData.email}</p>

                            <table className="table-auto text-white w-full max-w-xl mx-auto">
                                <tbody>
                                    <tr>
                                        <td className="font-semibold py-2 px-4">Age</td>
                                        <td>{userData.age}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold py-2 px-4">Place</td>
                                        <td>{userData.place}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold py-2 px-4">Budget</td>
                                        <td>{userData.budget}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold py-2 px-4">Habits</td>
                                        <td>{userData.habits.join(', ')}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold py-2 px-4">Occupation</td>
                                        <td>{userData.occupation}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold py-2 px-4">About</td>
                                        <td>{userData.about}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold py-2 px-4">Contact No</td>
                                        <td>{userData.contact_no}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold py-2 px-4">Instagram</td>
                                        <td><a href={`https://instagram.com/${userData.instagram}`} target="_blank" rel="noopener noreferrer">{userData.instagram}</a></td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold py-2 px-4">LinkedIn</td>
                                        <td><a href={`https://linkedin.com/in/${userData.linkedin}`} target="_blank" rel="noopener noreferrer">{userData.linkedin}</a></td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold py-2 px-4">Gender</td>
                                        <td>{userData.gender}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold py-2 px-4">Preferred Gender</td>
                                        <td>{userData.preferred_gender}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <button onClick={handleDeleteMate} className="bg-red-500 text-white px-4 py-2 ml-3 mt-3 rounded-lg">
                                Delete Mate
                            </button>
                        </div>
                    ) : (
                        <p className='text-center text-white mb-[400px]'>No user data found.</p>
                    )
                ) : (
                    <div className="p-4 text-white">
                        {properties.length > 0 ? (
                            properties.map((property) => (
                                <div key={property._id} className="mb-4 p-4">
                                    <div className="flex justify-center space-x-2 mb-5">
                                        {property.images.map((img, index) => (
                                            <img key={index} src={img} alt={`Property Image ${index + 1}`} className="w-30 h-20 object-cover rounded" />
                                        ))}
                                    </div>

                                    <table className="table-auto text-white w-full max-w-xl mx-auto">
                                        <tbody>
                                            <tr>
                                                <td className="font-semibold py-2 px-4">Name</td>
                                                <td>{property.name}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-semibold py-2 px-4">Type</td>
                                                <td>{property.property_type}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-semibold py-2 px-4">Occupancy</td>
                                                <td>{property.occupancy}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-semibold py-2 px-4">Rent</td>
                                                <td>{property.rent}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-semibold py-2 px-4">Security Deposit</td>
                                                <td>{property.security_deposit}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-semibold py-2 px-4">Address</td>
                                                <td>{property.address}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-semibold py-2 px-4">Contact No</td>
                                                <td>{property.contact_no}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-semibold py-2 px-4">About Room</td>
                                                <td>{property.about_room}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-semibold py-2 px-4">About Mates</td>
                                                <td>{property.about_mates}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    
                                    
                                    <button onClick={() => handleDeleteProperty(property.propertyId)} className="bg-red-500 ml-3 text-white px-4 py-2 rounded-lg mt-2">
                                        Delete Property
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className='text-center mb-[400px]'>No property listed.</p>
                        )}
                    </div>
                )}
            </div>

        </div>
    );
};

export default Account;
