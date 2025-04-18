import React from 'react';
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  return (
    <div className='bg-blue-500 text-black py-8 shadow-lg w-full'>
      <div className='container mx-auto flex flex-col items-start space-y-6 px-4 md:px-8 lg:px-16'>
        <div className='w-full flex flex-col md:flex-row justify-start md:justify-between space-y-4 md:space-y-0'>
          <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8'>
            <Link href='/' className='text-lg hover:text-white transition duration-300 transform'>Home</Link>
            <Link href='/about' className='text-lg hover:text-white transition duration-300 transform'>About</Link>
            <Link href='/cam' className='text-lg hover:text-white transition duration-300 transform'>Services</Link>
            <Link href='/contact' className='text-lg hover:text-white transition duration-300 transform'>Contact</Link>
          </div>
        </div>
        <div className='flex space-x-6'>
          <Link href='/' className='hover:text-white transition duration-300 transform hover:scale-125'>
            <FaFacebookF size={24} />
          </Link>
          <Link href='/' className='hover:text-white transition duration-300 transform hover:scale-125'>
            <FaTwitter size={24} />
          </Link>
          <Link href='/' className='hover:text-white transition duration-300 transform hover:scale-125'>
            <FaInstagram size={24} />
          </Link>
          <Link href='https://www.linkedin.com/in/vihas-poojari' className='hover:text-white transition duration-300 transform hover:scale-125'>
            <FaLinkedinIn size={24} />
          </Link>
        </div>
        <p className='text-sm opacity-75'>&copy; 2025 AI Adder. All rights reserved.</p>
      </div>
    </div>
  );
}