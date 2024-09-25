import React, { useState } from 'react';
import { SignedIn, SignedOut, SignUpButton, UserButton } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = async () => {
        if (searchQuery.trim()) {
            try {
                const matesResponse = await fetch(`http://localhost:2000/mates/allmates?place=${searchQuery}`);
                const matesData = await matesResponse.json();
    
                const propertiesResponse = await fetch(`http://localhost:2000/property/allproperties?place=${searchQuery}`);
                const propertiesData = await propertiesResponse.json();
    
                // Combine results
                const combinedResults = { mates: matesData, properties: propertiesData };
                navigate('/search-results', { state: { results: combinedResults } });
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
                <div className='text-2xl font-bold'>
                    <a href="/" className='hover:text-teal-400 transition duration-300'>Mate</a>
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown} // Add this line
                        className='rounded-full border border-gray-300 md:w-[600px] sm:w-[400px] w-[200px] h-[40px] px-4 bg-black text-white placeholder-gray-400 focus:outline-none transition duration-300'
                    />
                    <button onClick={handleSearch} className='ml-2 px-4 py-2 bg-teal-500 rounded-lg hover:bg-teal-600 transition duration-300'>
                        Search
                    </button>
                </div>
                <div>
                    <SignedOut>
                        <SignUpButton mode="modal" afterSignInUrl="/" afterSignUpUrl="/">
                            <button className='underline font-semibold text-teal-400 hover:text-white transition duration-300'>
                                Sign In
                            </button>
                        </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
