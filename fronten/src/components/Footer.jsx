import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'; // Import icons from react-icons

const Footer = () => {
  return (
    <footer className="bg-gray-500 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col md:flex-row md:space-x-6 mb-4 md:mb-0">
          <a href="/about" className="hover:underline">About Us</a>
          <a href="/contact" className="hover:underline">Contact</a>
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
          <a href="/terms" className="hover:underline">Terms of Service</a>
        </div>
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="hover:text-blue-500" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="hover:text-blue-400" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="hover:text-pink-500" />
          </a>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-4 pt-4 text-center">
        <p>© {new Date().getFullYear()} Your Website Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
