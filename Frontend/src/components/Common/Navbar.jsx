import React, { useState } from 'react';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { MdCurrencyRupee } from "react-icons/md";

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = async () => {
        if (searchQuery.trim()) {
            try {
                const matesResponse = await fetch(`https://matebackend.vercel.app/mates/allmates?place=${searchQuery}`);
                const matesData = await matesResponse.json();

                const propertiesResponse = await fetch(`https://matebackend.vercel.app/property/allproperties?place=${searchQuery}`);
                const propertiesData = await propertiesResponse.json();

                // Combine results
                const combinedResults = { mates: matesData, properties: propertiesData };
                navigate('/search-results', { state: { results: combinedResults } });
                window.scrollTo(0, 0);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className='bg-black bg-opacity-90 backdrop-blur-md text-white h-[70px] shadow-lg sticky top-0 z-10'>
            <div className='flex items-center container px-4 sm:mx-auto py-4 justify-between'>
                {/* Logo Section */}
                <div className='text-2xl font-bold hidden sm:block'>
                    <a href="/" className='hover:text-teal-400 transition duration-300'>Mate</a>
                </div>

                {/* Search Section */}
                <div className='relative flex items-center'>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className='rounded-full border border-gray-300 md:w-[600px] sm:w-[400px] w-[200px] h-[40px] pl-4 pr-10 bg-black text-white placeholder-gray-400 focus:outline-none transition duration-300'
                    />
                    {/* Search Icon */}
                    <FiSearch
                        className='absolute right-4 text-teal-500 cursor-pointer hover:text-teal-600 transition duration-300'
                        onClick={handleSearch}
                        size={20}
                    />
                </div>

                {/* Account Section */}
                <div className='flex items-center space-x-2 sm:space-x-4'>
                    <div className='text-[22px] hover:border-b cursor-pointer border-gray-400  text-teal-400 mb-1'><Link to='pricing'><MdCurrencyRupee /></Link></div>
                    <div className='text-[22px] hover:border-b cursor-pointer text-teal-400 mb-1'><Link to='account'><FiUser /></Link></div>
                    <div>
                        <SignedOut>
                            <SignInButton mode="modal" >
                                <button className='underline font-semibold text-teal-400 hover:text-white transition duration-300'>
                                    Sign In
                                </button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
