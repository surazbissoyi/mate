import React, { useEffect, useState } from 'react'
import { CheckIcon, XIcon } from 'lucide-react'
import { SignInButton, SignUpButton, useUser } from '@clerk/clerk-react'

const Pricing = () => {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const { user } = useUser() // Fetch user from Clerk
  const features = [
    { name: 'View listings', free: true, paid: true },
    { name: 'Create a profile', free: true, paid: true },
    { name: 'Basic search', free: true, paid: true },
    { name: 'View contact details', free: false, paid: true },
    { name: 'Advanced filters', free: false, paid: true },
    { name: 'Instant messaging', free: false, paid: true },
    { name: 'Background checks', free: false, paid: true },
  ]

  useEffect(() => {
    const checkSubscription = async () => {
      if (user) {
        const email = user.emailAddresses[0]?.emailAddress
        if (email) {
          try {
            const response = await fetch(`https://matebackend.vercel.app/paiduser/${email}`)
            const data = await response.json()
            if (response.ok && data) {
              setIsSubscribed(true)
            }
          } catch (error) {
            console.error('Error checking subscription:', error)
          }
        }
      }
    }
    checkSubscription()
  }, [user])



  const handleStartPremiumPlan = async () => {
    const amount = 1900; // Amount in paise (₹19.00)
    const currency = 'INR';

    try {
      // Call your backend to create an order
      const response = await fetch('https://matebackend.vercel.app/payment/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, currency }),
      });
      const orderData = await response.json();

      // Initialize Razorpay payment
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Your Razorpay key id
        amount: orderData.amount, // Amount in paise
        currency: orderData.currency,
        name: 'Your App Name',
        description: 'Premium Plan Payment',
        order_id: orderData.id,
        handler: async function (response) {
          // Handle payment success
          console.log('Payment successful:', response);
          alert('Payment Successful!');

          // Add the user's email to the paid users collection
          if (user) {
            const email = user.emailAddresses[0]?.emailAddress;

            if (email) {
              try {
                const addUserResponse = await fetch('https://matebackend.vercel.app/paiduser/add', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ email }),
                });
                const addUserData = await addUserResponse.json();

                if (addUserResponse.ok) {
                  console.log('User added successfully:', addUserData);
                  window.location.reload();
                } else {
                  console.error('Failed to add user:', addUserData);
                }
              } catch (error) {
                console.error('Error adding user:', error);
              }
            }
          }
        },
        modal: {
          ondismiss: function () {
            console.log('Payment modal closed');
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error starting premium plan:', error);
    }
  };



  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            Find Your Perfect <span className="text-gray-900">Roommate</span>
          </h1>
          <p className="mt-4 text-xl text-gray-300">
            Choose the plan that fits your needs and start connecting with potential roommates today.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* Free Plan */}
          <div className="bg-black hidden sm:block rounded-2xl shadow-xl overflow-hidden transform transition duration-200 hover:scale-105">
            <div className="px-6 py-8 sm:p-10 sm:pb-6">
              <div className="flex justify-between items-baseline">
                <h3 className="text-2xl font-extrabold text-white sm:text-3xl">Basic</h3>
                <span className="text-xl font-medium text-teal-400">Free</span>
              </div>
              <p className="mt-4 text-gray-300">Get started with basic roommate searching.</p>
            </div>
            <div className="px-6 pt-6 pb-8 sm:p-10 sm:pt-6">
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0">
                      {feature.free ? (
                        <CheckIcon className="h-6 w-6 text-teal-400" />
                      ) : (
                        <XIcon className="h-6 w-6 text-red-500" />
                      )}
                    </div>
                    <p className="ml-3 text-base text-gray-200">{feature.name}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700"
                >
                  {!user ? <SignUpButton mode="modal">
                    <button className='font-semibold text-white transition duration-300'>
                      Sign Up for Free
                    </button>
                  </SignUpButton> : 'You have already Signed Up'}
                </a>
              </div>
            </div>
          </div>

          {/* Paid Plan */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-200 hover:scale-105 border-4 border-teal-500">
            <div className="px-6 py-8 sm:p-10 sm:pb-6 bg-teal-600">
              <div className="flex justify-between items-baseline">
                <h3 className="text-2xl font-extrabold text-white sm:text-3xl">Premium</h3>
                <span className="text-xl font-medium text-gray-200">₹19.00/Lifetime</span>
              </div>
              <p className="mt-4 text-indigo-100">Full access to find your perfect roommate.</p>
            </div>
            <div className="px-6 pt-6 pb-8 sm:p-10 sm:pt-6">
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckIcon className="h-6 w-6 text-teal-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-700">{feature.name}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                {!user ? (
                  <div className="text-center text-lg">
                    Sign In To Make Payment - 
                    <SignInButton mode="modal">
                      <button className='font-semibold ml-2 text-teal-600 transition duration-300'>
                        Sign In
                      </button>
                    </SignInButton>
                  </div>
                ) : (
                  <>
                    {isSubscribed ? (
                      <div className="text-center text-lg text-red-600">
                        You've already subscribed!
                      </div>
                    ) : (
                      <a
                        className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700"
                        onClick={handleStartPremiumPlan}
                      >
                        Start Premium Plan
                      </a>
                    )}
                  </>
                )}
              </div>

            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-xl text-gray-200">
            Join thousands of happy roommates who found their perfect match!
          </p>
          <a href="#" className="mt-4 inline-block text-gray-200 hover:underline font-medium">
            Learn more about our matching process
          </a>
        </div>
      </div>
    </div>
  )
}

export default Pricing
