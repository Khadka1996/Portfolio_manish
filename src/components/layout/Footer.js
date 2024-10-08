import React from 'react';
import { FiPhone, FiMail } from 'react-icons/fi'; // Importing Phone and Mail icons
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaGithub } from 'react-icons/fa'; // Importing social media icons
import logo from '../../assets/mn.png'; // Importing your logo

const Footer = () => {
  return (
    <footer className="bg-[#25609a] text-gray-100 p-6">
      <div className="mx-3 md:mx-10 lg:mx-18 p-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          
          {/* Logo or Branding */}
          <div className="flex items-center mb-4 md:mb-0">
            <img src={logo} alt="Logo" className="h-20 w-20 mr-2" /> {/* Updated to use the imported logo */}
          </div>

          {/* Vertical Line */}
          <div className="hidden md:block border-l-2 border-gray-300 h-16 mx-4"></div>

          {/* Social Media Links */}
          <div className="flex space-x-4 items-center mb-4 md:mb-0">
            {socialMediaLinks.map(({ icon, link }, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#7BB660]"
              >
                <div className="bg-gray-100 rounded-full p-2 flex items-center justify-center">
                  {icon}
                </div>
              </a>
            ))}
          </div>

          {/* Vertical Line */}
          <div className="hidden md:block border-l-2 border-gray-300 h-16 mx-4"></div>

          {/* Contact Information */}
          <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
            <div className="flex items-center mb-2">
              <FiPhone className="mr-2" />
              <a href="tel:+1234567890" className="hover:text-[#7BB660]">+977-9823153502</a>
            </div>
            <div className="flex items-center">
              <FiMail className="mr-2" />
              <a href="mailto:mnzkhadka1996@gmail.com" className="hover:text-[#7BB660]">mnzkhadka1996@gmail.com</a>
            </div>
          </div>
        </div>

        {/* Copyright Information */}
        <div className="text-center mt-4">
          <p className="text-sm">© {new Date().getFullYear()} Your Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Social Media Links Data
const socialMediaLinks = [
  { icon: <FaTwitter className="w-5 h-5 text-[#25609a] " />, link: "https://twitter.com/yourprofile" },
  { icon: <FaFacebookF className="w-5 h-5 text-[#25609a]" />, link: "https://facebook.com/yourprofile" },
  { icon: <FaLinkedinIn className="w-5 h-5 text-[#25609a]" />, link: "https://linkedin.com/in/yourprofile" },
  { icon: <FaGithub className="w-5 h-5 text-[#25609a]" />, link: "https://github.com/yourprofile" },
];

export default Footer;
