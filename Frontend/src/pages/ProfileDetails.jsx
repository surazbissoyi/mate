import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProfileDetails = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('about');

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch(`https://matebackend.vercel.app/mates/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProfile(data);
            } catch (error) {
                console.error('Failed to fetch profile data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!profile) {
        return <div>Profile not found</div>;
    }

    return (
        <div className="container mx-auto px-4 my-10 text-white">
            <div className="flex justify-center mb-5">
                <img src={`${profile.image}`} alt="Profile Picture" className="w-[770px] sm:h-[500px] object-cover rounded" />
            </div>
            <div className="max-w-3xl mx-auto flex flex-col items-center gap-8">
                {/* Tabs Navigation */}
                <div className="text-sm font-medium text-center border-b border-gray-200 dark:border-gray-700">
                    <ul className="flex flex-wrap -mb-px">
                        <li>
                            <button
                                onClick={() => setActiveTab('about')}
                                className={`inline-block p-2 sm:p-4 border-b-2 rounded-t-lg ${activeTab === 'about' ? 'text-white border-white dark:border-white' : 'text-gray-400 border-transparent hover:text-white hover:border-gray-300 dark:hover:text-gray-300'}`}
                            >
                                About
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveTab('additional')}
                                className={`inline-block p-2 sm:p-4 border-b-2 rounded-t-lg ${activeTab === 'additional' ? 'text-white border-white dark:border-white' : 'text-gray-400 border-transparent hover:text-white hover:border-gray-300 dark:hover:text-gray-300'}`}
                            >
                                Additional Info
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveTab('contact')}
                                className={`inline-block p-2 sm:p-4 border-b-2 rounded-t-lg ${activeTab === 'contact' ? 'text-white border-white dark:border-white' : 'text-gray-400 border-transparent hover:text-white hover:border-gray-300 dark:hover:text-gray-300'}`}
                            >
                                Contact Details
                            </button>
                        </li>

                    </ul>
                </div>

                {/* Tab Content */}
                <div className="w-full flex flex-col justify-center">
                    {activeTab === 'about' && (
                        <>
                            <h1 className="text-4xl font-bold mb-2">{profile.name}, {profile.age}</h1>
                            <p className="text-xl">{profile.occupation}, {profile.place}</p>
                            <p className="mt-2 mb-6">{profile.about}</p>
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
                                            <td className="pr-3 sm:pr-20 py-2">{profile.contact_no}</td>
                                        </tr>
                                        <tr>
                                            <td className="pr-3 sm:pr-20 py-2">Email</td>
                                            <td className="pr-3 sm:pr-20 py-2">{profile.email}</td>
                                        </tr>
                                        <tr>
                                            <td className="pr-3 sm:pr-20 py-2">Instagram</td>
                                            <td className="pr-3 sm:pr-20 py-2">@{profile.instagram}</td>
                                        </tr>
                                        <tr>
                                            <td className="pr-3 sm:pr-20 py-2">LinkedIn</td>
                                            <td className="pr-3 sm:pr-20 py-2">@{profile.linkedin}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    {activeTab === 'additional' && (
                        <>
                            <h2 className="text-xl font-semibold">Additional Information</h2>
                            <div className="overflow-x-auto mt-3">
                                <table className="text-left text-sm">
                                    <tbody>
                                        <tr>
                                            <td className="pr-3 sm:pr-20 py-2 font-semibold">Gender</td>
                                            <td className="pr-3 sm:pr-20 py-2">{profile.gender}</td>
                                        </tr>
                                        <tr>
                                            <td className="pr-3 sm:pr-20 py-2 font-semibold">Preferred Gender</td>
                                            <td className="pr-3 sm:pr-20 py-2">{profile.preferred_gender}</td>
                                        </tr>
                                        <tr>
                                            <td className="pr-3 sm:pr-20 py-2 font-semibold">Budget</td>
                                            <td className="pr-3 sm:pr-20 py-2">₹{profile.budget}</td>
                                        </tr>
                                        <tr>
                                            <td className="pr-3 sm:pr-20 py-2 font-semibold">Habits</td>
                                            <td className="pr-3 sm:pr-20 py-2">{profile.habits.join(', ')}</td>
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

export default ProfileDetails;