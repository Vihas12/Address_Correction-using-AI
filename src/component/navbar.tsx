"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useKindeAuth, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated } = useKindeAuth();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="p-4 shadow-lg fixed top-0 w-full z-10 text-black bg-blue-500">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="font-bold text-3xl md:text-small">AI Adder</h1>

        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-xl hover:text-white transition duration-300">Home</Link>
          <Link href="/dashboard" className="text-xl hover:text-white transition duration-300">About</Link>
          <Link href="/cam" className="text-xl hover:text-white transition duration-300">Services</Link>
          <Link href="/" className="text-xl hover:text-white transition duration-300">Contact</Link>
          {isAuthenticated ? (
            <button className="text-xl bg-red-500 text-white px-4 py-2 rounded-2xl hover:bg-red-600 transition duration-300">
              <LogoutLink>Logout</LogoutLink>
            </button>
          ) : (
            <button className="text-xl bg-white text-blue-500 px-4 py-2 rounded-2xl hover:bg-gray-200 transition duration-300">
              <LoginLink>Login</LoginLink>
            </button>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu}>{menuOpen ? <X size={24} /> : <Menu size={24} />}</button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 mt-4">
          <Link href="/" className="hover:text-white transition duration-300">Home</Link>
          <Link href="/dashboard" className="hover:text-white transition duration-300">About</Link>
          <Link href="/cam" className="hover:text-white transition duration-300">Services</Link>
          <Link href="/" className="hover:text-white transition duration-300">Contact</Link>
          {isAuthenticated ? (
            <button className="bg-red-500 text-white px-4 py-2 rounded-2xl hover:bg-red-600 transition duration-300">
              <LogoutLink>Logout</LogoutLink>
            </button>
          ) : (
            <button className="bg-white text-blue-500 px-4 py-2 rounded-2xl hover:bg-gray-200 transition duration-300">
              <LoginLink>Login</LoginLink>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
