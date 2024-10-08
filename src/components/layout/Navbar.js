import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/mn.png';
import { FiPhone } from 'react-icons/fi'; // Importing Phone icon from react-icons

const NavBar = () => {
  // State to manage mobile menu visibility
  const [isOpen, setIsOpen] = useState(false);

  // Get current route path
  const location = useLocation();
  
  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
   
<nav className="bg-[#25609a] shadow-[0_4px_10px_0_rgba(123,182,96,1)] fixed top-0 left-0 w-full z-50">
<div className="mx-3 md:mx-10 lg:mx-18 ">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-16 w-16 mr-5" />
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6">
        <Link
        to="/"
        className={`text-lg font-semibold ${
            location.pathname === '/' ? 'text-[#7BB660]' : 'text-gray-100'
        } hover:text-[#7BB660]`}
        >
        Home
        </Link>

          <Link
            to="/services"
            className={`text-lg font-semibold ${
              location.pathname === '/services' ? 'text-[#7BB660]' : 'text-gray-100'
            } hover:text-[#7BB660]`}
          >
            Services
          </Link>
          <Link
            to="/about"
            className={`text-lg font-semibold ${
              location.pathname === '/about' ? 'text-[#7BB660]' : 'text-gray-100'
            } hover:text-[#7BB660]`}
          >
            About Me
          </Link>
          <Link
            to="/my-work"
            className={`text-lg font-semibold ${
              location.pathname === '/my-work' ? 'text-[#7BB660]' : 'text-gray-100'
            } hover:text-[#7BB660]`}
          >
            My Work
          </Link>
          <Link
            to="/contact"
            className={`text-lg font-semibold ${
              location.pathname === '/contact' ? 'text-[#7BB660]' : 'text-gray-100'
            } hover:text-[#7BB660]`}
          >
            Contact Me
          </Link>
        </div>

        {/* Hire Me Button with Phone Icon - Email Link */}
        <div className="hidden md:flex">
          <a
            href="mailto:mnzkhadka1996@gmail.com"
            className="bg-[#2d74c4] text-white px-4 py-2 rounded-lg shadow-lg hover:bg-[#7BB660] transition duration-300 flex items-center"
          >
            <FiPhone className="w-5 h-5 mr-2" /> {/* React-icons Phone icon */}
            Hire Me
          </a>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="focus:outline-none">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 25 25"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10 text-gray-100 hover:text-[#7BB660]"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Links */}
      {isOpen && (
        <div className="md:hidden bg-[#25609a] shadow-lg mt-2 rounded-lg">
          <div className="flex flex-col space-y-2 p-4">
            <Link
              to="/"
              className={`text-lg font-semibold ${
                location.pathname === '/' ? 'text-[#7BB660]' : 'text-gray-100'
              } hover:text-[#7BB660]`}
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/services"
              className={`text-lg font-semibold ${
                location.pathname === '/services' ? 'text-[#7BB660]' : 'text-gray-100'
              } hover:text-[#7BB660]`}
              onClick={toggleMenu}
            >
              Services
            </Link>
            <Link
              to="/about"
              className={`text-lg font-semibold ${
                location.pathname === '/about' ? 'text-[#7BB660]' : 'text-gray-100'
              } hover:text-[#7BB660]`}
              onClick={toggleMenu}
            >
              About Me
            </Link>
            <Link
              to="/my-work"
              className={`text-lg font-semibold ${
                location.pathname === '/my-work' ? 'text-[#7BB660]' : 'text-gray-100'
              } hover:text-[#7BB660]`}
              onClick={toggleMenu}
            >
              My Work
            </Link>
            <Link
              to="/contact"
              className={`text-lg font-semibold ${
                location.pathname === '/contact' ? 'text-[#7BB660]' : 'text-gray-100'
              } hover:text-[#7BB660]`}
              onClick={toggleMenu}
            >
              Contact Me
            </Link>
            <a
              href="mailto:mnzkhadka1996@gmail.com"
              className="bg-[#2d74c4] text-white px-4 py-2 rounded-lg shadow-lg hover:bg-[#7BB660] transition duration-300 text-center flex items-center justify-center"
              onClick={toggleMenu}
            >
              <FiPhone className="w-5 h-5 mr-2" />
              Hire Me
            </a>
          </div>
        </div>
       
      )}
      </div>
    </nav>
  );
};

export default NavBar;
