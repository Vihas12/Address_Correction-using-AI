import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  return (
    <div className='bg-white text-black py-8 shadow-lg'>
      <div className='container mx-auto flex flex-col items-start space-y-6 px-4 md:px-8 lg:px-16'>
        <div className='w-full flex flex-col md:flex-row justify-start md:justify-between space-y-4 md:space-y-0'>
          <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8'>
            <a href='#' className='text-lg hover:text-gray-500 transition duration-300 transform'>Home</a>
            <a href='#' className='text-lg hover:text-gray-500 transition duration-300 transform'>About</a>
            <a href='#' className='text-lg hover:text-gray-500 transition duration-300 transform'>Services</a>
            <a href='#' className='text-lg hover:text-gray-500 transition duration-300 transform'>Contact</a>
          </div>
        </div>
        <div className='flex space-x-6'>
          <a href='#' className='hover:text-gray-500 transition duration-300 transform hover:scale-125'>
            <FaFacebookF size={24} />
          </a>
          <a href='#' className='hover:text-gray-500 transition duration-300 transform hover:scale-125'>
            <FaTwitter size={24} />
          </a>
          <a href='#' className='hover:text-gray-500 transition duration-300 transform hover:scale-125'>
            <FaInstagram size={24} />
          </a>
          <a href='#' className='hover:text-gray-500 transition duration-300 transform hover:scale-125'>
            <FaLinkedinIn size={24} />
          </a>
        </div>
        <p className='text-sm opacity-75'>&copy; 2025 Your Company. All rights reserved.</p>
      </div>
    </div>
  );
}
