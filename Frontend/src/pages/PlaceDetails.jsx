import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ImageSlider from '../components/Common/ImageSlider';

const PlaceDetails = () => {
  const { id } = useParams();
  const [placeDetails, setPlaceDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('room'); // Added activeTab state

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const response = await axios.get(`https://matebackend.vercel.app/property/property/${id}`);
        setPlaceDetails(response.data);
      } catch (error) {
        console.error('Error fetching place details:', error);
        setError('Failed to load place details.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlaceDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!placeDetails) {
    return <div>Place not found</div>;
  }

  return (
    <div className="container mx-auto px-4 my-10 text-white">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-8">
        <div className="w-full">
          <ImageSlider images={placeDetails.images} />
        </div>

        <div className="text-sm font-medium text-center border-b border-gray-200 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px">
            <li>
              <button
                onClick={() => setActiveTab('room')}
                className={`inline-block p-2 sm:p-4 border-b-2 rounded-t-lg ${activeTab === 'room' ? 'text-white border-white' : 'text-gray-400 border-transparent hover:text-white hover:border-gray-300'}`}
              >
                Room Description
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('preferences')}
                className={`inline-block p-2 sm:p-4 border-b-2 rounded-t-lg ${activeTab === 'preferences' ? 'text-white border-white' : 'text-gray-400 border-transparent hover:text-white hover:border-gray-300'}`}
              >
                Preferences
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('contact')}
                className={`inline-block p-2 sm:p-4 border-b-2 rounded-t-lg ${activeTab === 'contact' ? 'text-white border-white' : 'text-gray-400 border-transparent hover:text-white hover:border-gray-300'}`}
              >
                Contact Details
              </button>
            </li>
          </ul>
        </div>

        <div className="w-full flex flex-col justify-center">
          {activeTab === 'room' && (
            <>
              <h1 className="text-4xl font-bold mb-6">{placeDetails.name}'s Room</h1>
              <p className="text-xl mb-4">Address: {placeDetails.address}</p>
              <h2 className="text-xl font-semibold">Property Details</h2>
              <div className="overflow-x-hidden mt-3">
                <table className="text-left text-sm">
                  <tbody>
                    <tr>
                      <td className="pr-3 sm:pr-20 py-2">Rent</td>
                      <td className="pr-3 sm:pr-20 py-2">{placeDetails.rent}</td>
                    </tr>
                    <tr>
                      <td className="pr-3 sm:pr-20 py-2">Security Deposit</td>
                      <td className="pr-3 sm:pr-20 py-2">{placeDetails.security_deposit}</td>
                    </tr>
                    <tr>
                      <td className="pr-3 sm:pr-20 py-2">Property Type</td>
                      <td className="pr-3 sm:pr-20 py-2">{placeDetails.property_type}</td>
                    </tr>
                    <tr>
                      <td className="pr-3 sm:pr-20 py-2">Furnishing</td>
                      <td className="pr-3 sm:pr-20 py-2">{placeDetails.furnishing}</td>
                    </tr>
                    <tr>
                      <td className="pr-3 sm:pr-20 py-2">Total Occupancy</td>
                      <td className="pr-3 sm:pr-20 py-2">{placeDetails.occupancy} People</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-xl font-semibold mt-6">Room Description</h2>
              <p className="mt-2 mb-6">{placeDetails.about_room}</p>
              <h2 className="text-xl font-semibold">About Housemates</h2>
              <p className="mt-2 mb-6">{placeDetails.about_mates}</p>
            </>
          )}

          {activeTab === 'preferences' && (
            <>
              <h2 className="text-xl font-semibold">Preferences</h2>
              <div className="overflow-x-hidden mt-3">
                <table className="text-left text-sm">
                  <tbody>
                    <tr>
                      <td className="pr-3 sm:pr-20 py-2">Gender</td>
                      <td className="pr-3 sm:pr-20 py-2">{placeDetails.gender}</td>
                    </tr>
                    <tr>
                      <td className="pr-3 sm:pr-20 py-2">Preferred Gender</td>
                      <td className="pr-3 sm:pr-20 py-2">{placeDetails.preferred_gender}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === 'contact' && (
            <>
              <h2 className="text-xl font-semibold">Contact Details</h2>
              <div className="overflow-x-hidden mt-3">
                <table className="text-left text-sm">
                  <tbody>
                    <tr>
                      <td className="pr-3 sm:pr-20 py-2">Phone</td>
                      <td className="pr-3 sm:pr-20 py-2">{placeDetails.contact_no}</td>
                    </tr>
                    <tr>
                      <td className="pr-3 sm:pr-20 py-2">Email</td>
                      <td className="pr-3 sm:pr-20 py-2">{placeDetails.email}</td>
                    </tr>
                    <tr>
                      <td className="pr-3 sm:pr-20 py-2">Instagram</td>
                      <td className="pr-3 sm:pr-20 py-2">@{placeDetails.instagram}</td>
                    </tr>
                    <tr>
                      <td className="pr-3 sm:pr-20 py-2">LinkedIn</td>
                      <td className="pr-3 sm:pr-20 py-2">@{placeDetails.linkedin}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaceDetails;
