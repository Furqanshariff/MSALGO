import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 border-b border-gray-700 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-green-400 text-xl font-bold hover:text-green-300 transition-colors">
              AlgoVisualizer
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Home
              </Link>
              <a 
                href="https://furqanshariff.github.io/Hustlers-Creed/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                About Us
              </a>
              <Link to="/practice" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Practice DSA
              </Link>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              <button className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Login
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Sign Up
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <a
            href="https://furqanshariff.github.io/Hustlers-Creed/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
            onClick={() => setIsOpen(false)}
          >
            About Us
          </a>
          <Link
            to="/practice"
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Practice DSA
          </Link>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <button className="text-gray-300 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors">
              Login
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium mt-2 transition-colors">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 