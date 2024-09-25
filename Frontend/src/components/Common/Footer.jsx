import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
    return (
        <footer className="bg-black text-white py-10 pt-10 mt-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between">
                <div className="mb-8 md:mb-[200px] flex items-center space-x-1 mr-[100px]">
                    <h2 className="text-white hover:text-teal-400 text-lg font-semibold">Mate</h2>
                </div>

                <div className="flex flex-wrap justify-between flex-grow">
                    <div className="mb-8 md:mb-0 md:w-1/4">
                        <h3 className="text-lg font-semibold text-teal-400 mb-4">Products</h3>
                        <ul>
                            <li className="mb-2"><a href="#" className="hover:text-teal-400">Mates</a></li>
                            <li className="mb-2"><a href="#" className="hover:text-teal-400">Rooms</a></li>
                            <li className="mb-2"><a href="#" className="hover:text-teal-400">Learn More</a></li>
                        </ul>
                    </div>
                    <div className="mb-8 md:mb-0 md:w-1/4">
                        <h3 className="text-lg font-semibold text-teal-400 mb-4">Tech & Design</h3>
                        <ul>
                            <li className="mb-2"><a href="#" className="hover:text-teal-400">Suraz Bissoyi</a></li>
                            <li className="mb-2"><a href="#" className="hover:text-teal-400">7608047678</a></li>
                            <li className="mb-2"><a href="#" className="hover:text-teal-400">surazbissoyi@gmail.com</a></li>
                        </ul>
                    </div>
                    <div className="mb-8 md:mb-0 md:w-1/4">
                        <h3 className="text-lg font-semibold text-teal-400 mb-4">Ownership</h3>
                        <ul>
                            <li className="mb-2"><a href="#" className="hover:text-teal-400">Founder</a></li>
                            <li className="mb-2"><a href="#" className="hover:text-teal-400">Co-Founder</a></li>
                        </ul>
                    </div>
                    <div className="mb-8 md:mb-0 md:w-1/4">
                        <h3 className="text-lg font-semibold text-teal-400 mb-4">Company</h3>
                        <ul>
                            <li className="mb-2"><a href="#" className="hover:text-teal-400">About Us</a></li>
                            <li className="mb-2"><a href="#" className="hover:text-teal-400">Privacy Policy</a></li>
                            <li className="mb-2"><a href="#" className="hover:text-teal-400">Terms & Conditions</a></li>
                        </ul>
                    </div>
                </div>
                <div className="flex mt-4 mb-4  md:mt-0">
                    <a href="#" className="text-white mr-4 text-xl hover:text-teal-400"><i className="fab fa-instagram"></i></a>
                    <a href="#" className="text-white mr-4 text-xl hover:text-teal-400"><i className="fab fa-youtube"></i></a>
                    <a href="#" className="text-white mr-4 text-xl hover:text-teal-400"><i className="fab fa-twitter"></i></a>
                    <a href="#" className="text-white mr-4 text-xl hover:text-teal-400"><i className="fab fa-facebook"></i></a>
                    <a href="#" className="text-white text-xl hover:text-teal-400"><i className="fab fa-linkedin"></i></a>
                </div>
            </div>
            <div className="mt-2 border-t border-gray-700 pt-4 text-center">
                <p className="text-sm">&copy; 2024 Mate. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
