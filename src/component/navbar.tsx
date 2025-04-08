"use client";

import React, { useState } from "react";
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

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="p-4 shadow-lg fixed top-0 w-full z-10 text-black bg-blue-500">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="font-bold text-3xl md:text-small">AI Adder</h1>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-xl hover:text-white">
            Home
          </Link>
          <Link href="/about" className="text-xl hover:text-white">
            About
          </Link>
          <Link href="/cam" className="text-xl hover:text-white">
            Services
          </Link>
          <Link href="/contact" className="text-xl hover:text-white">
            Contact
          </Link>

          {!isLoading ? (
            isAuthenticated ? (
              <LogoutLink>
                <button className="text-xl bg-red-500 text-white px-4 py-2 rounded-2xl hover:bg-red-600 transition duration-300">
                  Logout
                </button>
              </LogoutLink>
            ) : (
              <LoginLink>
                <button className="text-xl bg-white text-blue-500 px-4 py-2 rounded-2xl hover:bg-gray-200 transition duration-300">
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
          <button onClick={toggleMenu}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 mt-4">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <Link href="/about" className="hover:text-white">
            About
          </Link>
          <Link href="/cam" className="hover:text-white">
            Services
          </Link>
          <Link href="/contact" className="hover:text-white">
            Contact
          </Link>

          {!isLoading ? (
            isAuthenticated ? (
              <LogoutLink>
                <button className="bg-white text-blue-500  px-4 py-2 rounded-2xl hover:bg-gray-200 transition duration-300">
                  Logout
                </button>
              </LogoutLink>
            ) : (
              <LoginLink>
                <button className="bg-white text-blue-500 px-4 py-2 rounded-2xl hover:bg-gray-200 transition duration-300">
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
