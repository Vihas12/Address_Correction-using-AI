"use client";

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 shadow-lg fixed top-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white font-bold text-lg md:text-small">AI Adder</h1>

        <div className="flex items-center space-x-6">
          <a href="#" className="text-white hover:text-blue-200 transition duration-300">Home</a>
          <a href="#" className="text-white hover:text-blue-200 transition duration-300">About</a>
          <a href="#" className="text-white hover:text-blue-200 transition duration-300">Services</a>
          <a href="#" className="text-white hover:text-blue-200 transition duration-300">Contact</a>
          <button className="md:block bg-white text-blue-700 px-4 py-2 rounded-2xl hover:bg-blue-100 transition duration-300">Login</button>
        </div>        
    </div>
    </div>
  );
}
