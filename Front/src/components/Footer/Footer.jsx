import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 relative z-50 text-gray-300 pt-12 pb-6 px-6 md:px-16 mt-15">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-700 pb-10">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            🎬 The Home Movies
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Discover, watch, and enjoy your favorite movies — all in one place.
            Your home for entertainment and stories that move you.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-white transition">
              <Link to={"/home"}>Home</Link>
            </li>
            <li className="hover:text-white transition">
              <Link to={"/news"}>News</Link>
            </li>
            <li className="hover:text-white transition">
              <Link to={""}>Categories</Link>
            </li>
            <li className="hover:text-white transition">
              <Link to={""}>About</Link>
            </li>
            <li className="hover:text-white transition">
              <Link to={"/contact"}>Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-white transition">Help Center</li>
            <li className="hover:text-white transition">Terms of Service</li>
            <li className="hover:text-white transition">Privacy Policy</li>
            <li className="hover:text-white transition">Report a Problem</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/mohaned.hatem.39/"
              target="_blank"
              className="p-3 bg-gray-800 rounded-full hover:bg-pink-600 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.linkedin.com/in/mohand-hatem-73995a262/"
              target="_blank"
              className="p-3 bg-gray-800 rounded-full hover:bg-pink-600 transition"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.instagram.com/mohandhatem1?igsh=dzVxMHZjOThsd3dx"
              target="_blank"
              className="p-3 bg-gray-800 rounded-full hover:bg-pink-600 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=201063505368"
              target="_blank"
              className="p-3 bg-gray-800 rounded-full hover:bg-pink-600 transition"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()} The Home Movies. All rights reserved.
        </p>
        <p className="mt-3 md:mt-0">
          Designed by{" "}
          <span
            className="bg-linear-to-r from-[#c5814b] to-[#ffb77a]
               bg-clip-text text-transparent drop-shadow-lg animate-fadeIn font-bold"
          >
            Mohand Hatem
          </span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
