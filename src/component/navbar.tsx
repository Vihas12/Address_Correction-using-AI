"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import {
  useKindeAuth,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, isLoading } = useKindeAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure this runs only on the client
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLinkClick = () => {
    setMenuOpen(false); // Close the menu when a link is clicked
  };

  // Prevent rendering on the server
  if (!isClient) {
    return null;
  }

  return (
    <div className="p-4 shadow-lg fixed top-0 w-full z-10 text-black bg-blue-500">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="font-bold text-3xl md:text-small">AI Adder</h1>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="text-xl hover:text-white transition duration-300 ease-in-out"
            onClick={handleLinkClick}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-xl hover:text-white transition duration-300 ease-in-out"
            onClick={handleLinkClick}
          >
            About
          </Link>
          <Link
            href="/cam"
            className="text-xl hover:text-white transition duration-300 ease-in-out"
            onClick={handleLinkClick}
          >
            Services
          </Link>
          <Link
            href="/contact"
            className="text-xl hover:text-white transition duration-300 ease-in-out"
            onClick={handleLinkClick}
          >
            Contact
          </Link>

          {!isLoading ? (
            isAuthenticated ? (
              <LogoutLink>
                <button className="text-xl bg-white text-blue-500 px-4 py-2 rounded-2xl hover:bg-gray-200 transition duration-300 ease-in-out">
                  Logout
                </button>
              </LogoutLink>
            ) : (
              <LoginLink>
                <button className="text-xl bg-white text-blue-500 px-4 py-2 rounded-2xl hover:bg-gray-200 transition duration-300 ease-in-out">
                  Login
                </button>
              </LoginLink>
            )
          ) : (
            <span className="text-white text-sm">Loading...</span>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="transition duration-300 ease-in-out"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 mt-4 transition-all duration-500 ease-in-out transform">
          <Link
            href="/"
            className="hover:text-white transition duration-300 ease-in-out"
            onClick={handleLinkClick}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="hover:text-white transition duration-300 ease-in-out"
            onClick={handleLinkClick}
          >
            About
          </Link>
          <Link
            href="/cam"
            className="hover:text-white transition duration-300 ease-in-out"
            onClick={handleLinkClick}
          >
            Services
          </Link>
          <Link
            href="/contact"
            className="hover:text-white transition duration-300 ease-in-out"
            onClick={handleLinkClick}
          >
            Contact
          </Link>

          {!isLoading ? (
            isAuthenticated ? (
              <LogoutLink>
                <button className="bg-white text-blue-500 px-4 py-2 rounded-2xl hover:bg-gray-200 transition duration-300 ease-in-out">
                  Logout
                </button>
              </LogoutLink>
            ) : (
              <LoginLink>
                <button className="bg-white text-blue-500 px-4 py-2 rounded-2xl hover:bg-gray-200 transition duration-300 ease-in-out">
                  Login
                </button>
              </LoginLink>
            )
          ) : (
            <span className="text-white text-sm">Loading...</span>
          )}
        </div>
      )}
    </div>
  );
}
