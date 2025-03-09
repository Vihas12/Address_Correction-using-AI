import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  return (
    <div className='bg-gradient-to-r from-blue-500 to-purple-600 text-white py-8'>
      <div className='container mx-auto flex flex-col items-start space-y-6'>
        <div className='mx-5 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8'>
          <a href='#' className='text-white text-lg hover:text-blue-200 transition duration-300 transform hover:scale-110'>Home</a>
          <a href='#' className='text-white text-lg hover:text-blue-200 transition duration-300 transform hover:scale-110'>About</a>
          <a href='#' className='text-white text-lg hover:text-blue-200 transition duration-300 transform hover:scale-110'>Services</a>
          <a href='#' className='text-white text-lg hover:text-blue-200 transition duration-300 transform hover:scale-110'>Contact</a>
        </div>
        <div className='flex space-x-6 mx-5'>
          <a href='#' className='hover:text-blue-200 transition duration-300 transform hover:scale-125'>
            <FaFacebookF size={24} />
          </a>
          <a href='#' className='hover:text-blue-200 transition duration-300 transform hover:scale-125'>
            <FaTwitter size={24} />
          </a>
          <a href='#' className='hover:text-blue-200 transition duration-300 transform hover:scale-125'>
            <FaInstagram size={24} />
          </a>
          <a href='#' className='hover:text-blue-200 transition duration-300 transform hover:scale-125'>
            <FaLinkedinIn size={24} />
          </a>
        </div>
        <p className='mx-5 text-sm opacity-75'>&copy; 2025 Your Company. All rights reserved.</p>

      </div>
    </div>
  );
}
