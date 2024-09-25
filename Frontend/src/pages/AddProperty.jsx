import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { useState } from 'react';
import axios from 'axios';

// Firebase Configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const AddProperty = () => {
    const [property, setProperty] = useState({
        name: '',
        occupancy: 1,
        rent: '',
        security_deposit: '',
        property_type: 'Apartment',
        furnishing: 'Fully Furnished',
        about_room: '',
        about_mates: '',
        address: '',
        place: '',
        contact_no: '',
        email: '',
        instagram: '',
        linkedin: '',
        gender: 'Male',
        preferred_gender: 'female',
        images: [],
    });

    const [imagePreviews, setImagePreviews] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setProperty((prevProperty) => ({
            ...prevProperty,
            images: files,
        }));

        // Generate previews for the images
        const previews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProperty((prevProperty) => ({
            ...prevProperty,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const uploadPromises = property.images.map(async (file) => {
            const storageRef = ref(storage, `images/${file.name}`);
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            return url;
        });

        try {
            const imageUrls = await Promise.all(uploadPromises);
            const propertyWithUrls = {
                ...property,
                images: imageUrls, // Replace images with the URLs
            };

            // Send data to your backend
            const response = await axios.post('http://localhost:2000/property/add', propertyWithUrls);
            console.log('Property uploaded:', response.data);
        } catch (error) {
            console.error("Error uploading images: ", error);
        }
    };

    return (
        <div className='max-w-md mx-auto mt-10'>
            <h1 className='text-3xl font-bold text-white'>Add Property Details</h1>
            <form onSubmit={handleSubmit}>
                {/* Image Input */}
                <div className="relative z-0 w-full mb-5 mt-10 group">
                    <input
                        type="file"
                        name="images"
                        id="floating_images"
                        accept="image/*"
                        multiple
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleImageChange}
                        required
                    />
                    {imagePreviews.length > 0 ? (
                        <div className="grid grid-cols-3 gap-2">
                            {imagePreviews.map((preview, index) => (
                                <img
                                    key={index}
                                    src={preview}
                                    alt={`Preview ${index + 1}`}
                                    className="w-full h-[100px] object-cover border border-gray-300 rounded"
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-24 border border-gray-300 rounded">
                            <span className="text-white">Choose multiple images</span>
                        </div>
                    )}
                </div>

                {/* Name */}
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="name"
                        id="floating_name"
                        className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
                        placeholder=" "
                        required
                        value={property.name}
                        onChange={handleChange}
                    />
                    <label
                        htmlFor="floating_name"
                        className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
                    >
                        Name
                    </label>
                </div>


                <div className='flex'>
                    {/* Place */}
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="place"
                            id="floating_place"
                            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
                            placeholder=" "
                            required
                            value={property.place}
                            onChange={handleChange}
                        />
                        <label
                            htmlFor="floating_place"
                            className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
                        >
                            City
                        </label>
                    </div>
                    {/* Occupancy */}
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="number"
                            name="occupancy"
                            id="floating_occupancy"
                            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
                            placeholder=" "
                            required
                            value={property.occupancy}
                            onChange={handleChange}
                        />
                        <label
                            htmlFor="floating_occupancy"
                            className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
                        >
                            Occupancy
                        </label>
                    </div>
                </div>


                <div className='flex'>
                    {/* Rent */}
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="rent"
                            id="floating_rent"
                            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
                            placeholder=" "
                            required
                            value={property.rent}
                            onChange={handleChange}
                        />
                        <label
                            htmlFor="floating_rent"
                            className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
                        >
                            Rent
                        </label>
                    </div>

                    {/* Security Deposit */}
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="security_deposit"
                            id="floating_security_deposit"
                            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
                            placeholder=" "
                            required
                            value={property.security_deposit}
                            onChange={handleChange}
                        />
                        <label
                            htmlFor="floating_security_deposit"
                            className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
                        >
                            Security Deposit
                        </label>
                    </div>
                </div>


                <div className='flex'>
                    {/* Property Type */}
                    <div className="relative z-0 w-full mb-5 group">
                        <select
                            name="property_type"
                            value={property.property_type}
                            onChange={handleChange}
                            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
                        >
                            <option className='bg-black' value="Apartment">Apartment</option>
                            <option className='bg-black' value="House">House</option>
                            <option className='bg-black' value="Villa">Villa</option>
                        </select>
                        <label
                            htmlFor="property_type"
                            className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
                        >
                            Property Type
                        </label>
                    </div>

                    {/* Furnishing */}
                    <div className="relative z-0 w-full mb-5 group">
                        <select
                            name="furnishing"
                            value={property.furnishing}
                            onChange={handleChange}
                            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
                        >
                            <option className='bg-black' value="Fully Furnished">Fully Furnished</option>
                            <option className='bg-black' value="Semi Furnished">Semi Furnished</option>
                            <option className='bg-black' value="Not Furnished">Not Furnished</option>
                        </select>
                        <label
                            htmlFor="furnishing"
                            className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
                        >
                            Furnishing
                        </label>
                    </div>
                </div>



                {/* Address */}
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="address"
                        id="floating_address"
                        className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
                        placeholder=" "
                        required
                        value={property.address}
                        onChange={handleChange}
                    />
                    <label
                        htmlFor="floating_address"
                        className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
                    >
                        Address
                    </label>
                </div>


                {/* About Room */}
                <div className="relative z-0 w-full mb-5 group">
                    <textarea
                        name="about_room"
                        id="floating_about_room"
                        className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
                        placeholder=" "
                        value={property.about_room}
                        onChange={handleChange}
                    />
                    <label
                        htmlFor="about_room"
                        className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
                    >
                        About Room
                    </label>
                </div>

                {/* About Mates */}
                <div className="relative z-0 w-full mb-5 group">
                    <textarea
                        name="about_mates"
                        id="floating_about_mates"
                        className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
                        placeholder=" "
                        value={property.about_mates}
                        onChange={handleChange}
                    />
                    <label
                        htmlFor="about_mates"
                        className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
                    >
                        About Mates
                    </label>
                </div>





                <div className='flex'>
                    {/* Contact Number */}
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="contact_no"
                            id="floating_contact_no"
                            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
                            placeholder=" "
                            required
                            value={property.contact_no}
                            onChange={handleChange}
                        />
                        <label
                            htmlFor="contact_no"
                            className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
                        >
                            Contact Number
                        </label>
                    </div>

                    {/* Email */}
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="email"
                            name="email"
                            id="floating_email"
                            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
                            placeholder=" "
                            required
                            value={property.email}
                            onChange={handleChange}
                        />
                        <label
                            htmlFor="email"
                            className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
                        >
                            Email
                        </label>
                    </div>
                </div>


                {/* Socials */}
                <div className='flex'>
                    {/* Instagram */}
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="instagram"
                            id="floating_instagram"
                            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
                            placeholder=" "
                            required
                            value={property.instagram}
                            onChange={handleChange}
                        />
                        <label
                            htmlFor="instagram"
                            className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
                        >
                            Instagram
                        </label>
                    </div>

                    {/* LinkedIn */}
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="linkedin"
                            id="floating_linkedin"
                            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
                            placeholder=" "
                            required
                            value={property.linkedin}
                            onChange={handleChange}
                        />
                        <label
                            htmlFor="linkedin"
                            className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
                        >
                            LinkedIn
                        </label>
                    </div>
                </div>


                {/* Gender */}
                <div className='flex'>
                    <div className="relative z-0 w-full mb-5 group">
                        <select
                            name="gender"
                            value={property.gender}
                            onChange={handleChange}
                            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
                        >
                            <option className='bg-black' value="Male">Male</option>
                            <option className='bg-black' value="Female">Female</option>
                            <option className='bg-black' value="Other">Other</option>
                        </select>
                        <label
                            htmlFor="gender"
                            className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
                        >
                            Gender
                        </label>
                    </div>

                    {/* Preferred Gender */}
                    <div className="relative z-0 w-full mb-5 group">
                        <select
                            name="preferred_gender"
                            value={property.preferred_gender}
                            onChange={handleChange}
                            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
                        >
                            <option className='bg-black' value="Male">Male</option>
                            <option className='bg-black' value="Female">Female</option>
                            <option className='bg-black' value="No Preference">No Preference</option>
                        </select>
                        <label
                            htmlFor="preferred_gender"
                            className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
                        >
                            Preferred Gender
                        </label>
                    </div>
                </div>


                {/* Submit button */}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-teal-400 to-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddProperty;
