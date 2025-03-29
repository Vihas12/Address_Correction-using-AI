"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="p-4 shadow-lg fixed top-0 w-full z-10 text-black bg-blue-500">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="font-bold text-3xl md:text-small">AI Adder</h1>

        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-xl hover:text-white transition duration-300">Home</Link>
          <Link href="/info" className="text-xl hover:text-white transition duration-300">About</Link>
          <Link href="/hello" className="text-xl hover:text-white transition duration-300">Services</Link>
          <Link href="#" className="text-xl hover:text-white transition duration-300">Contact</Link>
          <button className="text-xl bg-blue-500 text-black px-4 py-2 rounded-2xl hover:bg-white transition duration-300 hover:text-blue-500">Login</button>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 mt-4">
          <a href="/" className="hover:text-white transition duration-300">Home</a>
          <a href="/info" className="hover:text-white transition duration-300">About</a>
          <a href="/hello" className="hover:text-white transition duration-300">Services</a>
          <a href="#" className="hover:text-white transition duration-300">Contact</a>
          <button className="bg-blue-500 text-black px-4 py-2 rounded-2xl hover:bg-gray-200 transition duration-300">Login</button>
        </div>
      )}
    </div>
  );
}
