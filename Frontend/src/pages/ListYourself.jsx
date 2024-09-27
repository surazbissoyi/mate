import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';

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

const ListYourself = () => {
  const { isLoaded, user: currentUser } = useUser();
  const [user, setUser] = useState({
    name: '',
    budget: '',
    image: '',
    about: '',
    habits: '',
    age: '',
    occupation: '',
    place: '',
    contact_no: '',
    email: '',
    instagram: '',
    linkedin: '',
    gender: 'Male',
    preferred_gender: 'Female',
  });

  const [emailExists, setEmailExists] = useState(false);

  useEffect(() => {
    if (isLoaded && currentUser) {
      const email = currentUser.primaryEmailAddress?.emailAddress;

      setUser((prevUser) => ({
        ...prevUser,
        email: email, // Set email in the form
      }));

      // Check if email exists in either properties or mates collections
      const checkEmailExists = async () => {
        try {
          // Replace userEmail with email
          const matesResponse = await axios.get(`https://matebackend.vercel.app/mates/allmates`, {
            params: { email }
          });
          const propertiesResponse = await axios.get(`https://matebackend.vercel.app/property/allproperties`, {
            params: { email }
          });

          if (matesResponse.data.length > 0 || propertiesResponse.data.length > 0) {
            setEmailExists(true); // Email found in either collection
          }
        } catch (error) {
          console.error('Error checking email existence:', error);
        }
      };
      checkEmailExists();
    }
  }, [currentUser]);

  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // New state for upload status

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser((prevUser) => ({
        ...prevUser,
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emailExists) {
      alert("Please delete your previous data from the account section.");
      return;
    }

    setIsUploading(true); // Set uploading to true

    if (user.image) {
      try {
        const storageRef = ref(storage, `profile_images/${user.image.name}`);
        await uploadBytes(storageRef, user.image);
        const imageUrl = await getDownloadURL(storageRef);

        const userWithImage = {
          ...user,
          image: imageUrl,
        };

        const response = await axios.post('https://matebackend.vercel.app/mates/add', userWithImage);

        // Check if the response indicates user already exists
        if (response.status === 409) {
          alert(response.data.message); // Alert the user
        } else {
          console.log('User data uploaded:', response.data);
          // Reset form or take other actions after successful upload
        }
      } catch (error) {
        console.error("Error uploading image: ", error);
      } finally {
        setIsUploading(false); // Reset uploading status
      }
    } else {
      console.error("No image selected");
      setIsUploading(false); // Reset uploading status if no image
    }
  };

  if (!currentUser) return <div className="text-white text-center mt-5">Please Sign In to continue.</div>;

  return (
    <div className='max-w-md mx-auto mt-10'>
      <h1 className='text-3xl font-bold text-white'>Add Details</h1>
      {emailExists ? (
        <p className="text-white">Please delete your previous data from account section.</p>
      ) : (
        <form onSubmit={handleSubmit}>
        <div className="relative z-0 w-full mb-5 mt-10 group">
          <input
            type="file"
            name="image"
            id="floating_image"
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleImageChange}
            required
          />
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Image Preview"
              className="w-full h-[100px] object-cover border border-gray-300 rounded"
            />
          ) : (
            <div className="flex items-center justify-center h-24 border border-gray-300 rounded">
              <span className="text-white">Choose an image</span>
            </div>
          )}
        </div>


        <div className='flex'>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="name"
              id="floating_name"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
              placeholder=" "
              required
              value={user.name}
              onChange={handleChange}
            />
            <label
              htmlFor="floating_name"
              className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
            >
              Name
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="age"
              id="floating_age"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
              placeholder=" "
              required
              value={user.age}
              onChange={handleChange}
            />
            <label
              htmlFor="floating_age"
              className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
            >
              Age
            </label>
          </div>
        </div>

        <div className='flex'>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="place"
              id="floating_place"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
              placeholder=" "
              value={user.place}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="floating_place"
              className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
            >
              Place
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="budget"
              id="floating_budget"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
              placeholder=" "
              required
              value={user.budget}
              onChange={handleChange}
            />
            <label
              htmlFor="floating_budget"
              className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
            >
              Budget
            </label>
          </div>
        </div>

        <div className='flex'>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="habits"
              id="floating_habits"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
              placeholder=" "
              value={user.habits}
              required
              onChange={(e) => handleChange({ target: { name: 'habits', value: e.target.value.split(',') } })}
            />
            <label
              htmlFor="floating_habits"
              className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
            >
              Habits (comma separated)
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="occupation"
              id="floating_occupation"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
              placeholder=" "
              value={user.occupation}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="floating_occupation"
              className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
            >
              Occupation
            </label>
          </div>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <textarea
            name="about"
            id="floating_about"
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
            placeholder=" "
            value={user.about}
            onChange={handleChange}
            required
          />
          <label
            htmlFor="floating_about"
            className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
          >
            About
          </label>
        </div>




        <div className='flex'>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="contact_no"
              id="floating_contact_no"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
              placeholder=" "
              required
              value={user.contact_no}
              onChange={handleChange}
            />
            <label
              htmlFor="floating_contact_no"
              className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
            >
              Contact No
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
              placeholder=" "
              required
              value={user.email}
              onChange={handleChange}
              readOnly
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
            >
              Email
            </label>
          </div>
        </div>


        <div className='flex'>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="instagram"
              id="floating_instagram"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
              placeholder=" "
              value={user.instagram}
              onChange={handleChange}
            />
            <label
              htmlFor="floating_instagram"
              className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
            >
              Instagram Handle
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="linkedin"
              id="floating_linkedin"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
              placeholder=" "
              value={user.linkedin}
              onChange={handleChange}
            />
            <label
              htmlFor="floating_linkedin"
              className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
            >
              LinkedIn Profile
            </label>
          </div>
        </div>



        <div className='flex mt-2'>
          <div className="relative z-0 w-full mb-5 group">
            <select
              name="gender"
              id="floating_gender"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
              value={user.gender}
              onChange={handleChange}
            >
              <option className='bg-black' value="Male">Male</option>
              <option className='bg-black' value="Female">Female</option>
              <option className='bg-black' value="Other">Other</option>
            </select>
            <label
              htmlFor="floating_gender"
              className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
            >
              Gender
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <select
              name="preferred_gender"
              id="floating_preferred_gender"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
              value={user.preferred_gender}
              onChange={handleChange}
            >
              <option className='bg-black' value="female">Female</option>
              <option className='bg-black' value="male">Male</option>
              <option className='bg-black' value="any">Any</option>
            </select>
            <label
              htmlFor="floating_preferred_gender"
              className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
            >
              Preferred Gender
            </label>
          </div>
        </div>


        <button
          type="submit"
          className={`w-full bg-gradient-to-r from-teal-400 to-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`} // Disable button visually
          disabled={isUploading} // Disable the button if uploading
        >
          {isUploading ? 'Uploading...' : 'Submit'} {/* Change button text based on upload status */}
        </button>
      </form>
      )}
      
    </div>
  );
};

export default ListYourself;
