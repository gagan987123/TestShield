import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { LogOut, Menu, Search } from "lucide-react";

import { useAuthStore } from "../store/AuthUser";
const NavBar = ({ extended }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handlelogout = () => {
    logout(navigate);
  };

  return (
    <nav className="bg-blue-500 p-4 shadow-md sticky top-0  z-9">
      <div
        className={`max-w-7xl mx-auto flex justify-between items-center ${
          extended ? "ml-64" : "ml-20"
        }`}
      >
        {/* Logo Section */}
        <div className="text-white text-xl font-semibold">
          <Link to="/">TestShield</Link>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Desktop Nav Links */}
        {!user && (
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-white hover:text-gray-300">
              Login
            </Link>
            <Link to="/signup" className="text-white hover:text-gray-300">
              Signup
            </Link>
          </div>
        )}
        {user && (
          <div className="hidden md:flex space-x-6">
            <Link to="/about" className="text-white hover:text-gray-300">
              About
            </Link>

            <Link to="/contact" className="text-white hover:text-gray-300">
              Contact
            </Link>
            <LogOut
              className="size-6 text-white cursor-pointer"
              onClick={handlelogout}
            />
          </div>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && !user && (
        <div
          className={`md:hidden mt-2 space-y-2 px-4 pb-4 ${
            extended ? "ml-64" : "ml-20"
          }`}
        >
          <Link
            to="/"
            className="text-white hover:bg-sky-500 px-4 py-1 rounded-full transition-colors duration-200"
          >
            Login
          </Link>
          <Link
            to="/about"
            className="text-white hover:bg-sky-500 px-4 py-1 rounded-full transition-colors duration-200"
          >
            Signup
          </Link>
        </div>
      )}

      {isMenuOpen && user && (
        <div
          className={`md:hidden mt-2 space-y-2 px-4 pb-4 ${
            extended ? "ml-64" : "ml-20"
          }`}
        >
          {/* <Link to="/" className="block text-white hover:text-gray-300">
            Home
          </Link>
          <Link to="/about" className="block text-white hover:text-gray-300">
            About
          </Link>
          <Link to="/services" className="block text-white hover:text-gray-300">
            Services
          </Link>
          <Link to="/contact" className="block text-white hover:text-gray-300">
            Contact
          </Link> */}
          <button
            className="text-white hover:bg-sky-500 px-4 py-1 rounded-full transition-colors duration-200"
            onClick={handlelogout}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
