// Refactored and improved Navbar component
// Modern design + cleaner structure + no repetition

import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import logo from "../../assets/logo.png";
import useLogout from "../../Hooks/useLogout";
import useCartCount from "../../Hooks/useCartCount";
import useProfile from "../../Hooks/useProfile";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const { data: count, isLoading: loadingCart } = useCartCount();
  const { data: user } = useProfile();
  const logout = useLogout();
  const navigate = useNavigate();

  const isAuth = !!user;
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => logout.mutate();

  const NavLinks = () => (
    <>
      {isAuth ? (
        <>
          <NavLink
            to="/home"
            className="hover:scale-[1.1] transition-all duration-150"
          >
            Home
          </NavLink>
          <NavLink
            to="/news"
            className="hover:scale-[1.1] transition-all duration-150"
          >
            News
          </NavLink>
          <NavLink
            to="/contact"
            className="hover:scale-[1.1] transition-all duration-150"
          >
            Contact
          </NavLink>

          {isAdmin && (
            <NavLink
              to="/admin"
              className="hover:scale-[1.1] transition-all duration-150"
            >
              Dashboard
            </NavLink>
          )}
          <button
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer hover:text-orange-400"
          >
            <FaShoppingCart size={22} />
            {!loadingCart && count > 0 && (
              <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                {count}
              </span>
            )}
          </button>
        </>
      ) : null}
    </>
  );

  const UserBox = () => (
    <div className="flex items-center gap-2 bg-gray-800 rounded-3xl p-1 pr-3 shadow-lg hover:bg-gray-700 transition">
      {isAdmin ? (
        <img
          src={user?.userImage}
          alt="admin"
          className="w-10 h-10 rounded-full border-2 border-gray-500 object-cover shadow-md"
        />
      ) : (
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-600 text-white font-bold text-lg shadow-md ">
          {user?.username?.slice(0, 1).toUpperCase()}
        </div>
      )}
      <div>
        <p className="text-white font-semibold text-sm">
          {isAdmin ? (
            <span className="text-md font-bold  bg-linear-to-r from-[#c5814b] to-[#ffb77a] bg-clip-text text-transparent">
              Admin:
            </span>
          ) : (
            "Welcome"
          )}
          <span className="ml-1">{user?.username}</span>
        </p>
      </div>
    </div>
  );

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 backdrop-blur-md px-5 shadow-lg 
      ${isScrolled ? "bg-black/80 py-2" : "bg-gray-900 py-3"}`}
    >
      <nav className="flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} className="w-12 drop-shadow-lg" />
          <h1 className="text-2xl font-extrabold font-mono bg-linear-to-r from-[#c5814b] to-[#ffb77a] bg-clip-text text-transparent">
            Nights
          </h1>
        </Link>

        <div className="hidden md:flex items-center gap-7 text-gray-200">
          {isAuth && <UserBox />}
          <NavLinks />
          {isAuth ? (
            <button
              onClick={handleLogout}
              className="rounded cursor-pointer bg-sky-600 px-5 py-2 text-xs font-bold text-white hover:bg-sky-700"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink to="/register" className="text-white">
                Register
              </NavLink>
              <NavLink to="/login" className="text-white">
                Login
              </NavLink>
            </>
          )}
        </div>

        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-lg shadow-md"
          >
            <IoMdAddCircle
              className={`text-3xl text-sky-600 transition-transform duration-300 ${
                openMenu ? "rotate-45" : "rotate-0"
              }`}
            />
          </button>
        </div>
      </nav>

      <div
        className={`md:hidden flex flex-col items-center gap-5 transition-all duration-500 overflow-hidden 
        ${openMenu ? "max-h-[400px] opacity-100 mt-4" : "max-h-0 opacity-0"}`}
      >
        {isAuth && <UserBox />}

        <ul className="flex flex-col items-center gap-4 text-lg text-gray-200">
          <NavLinks />
        </ul>

        {isAuth ? (
          <button
            onClick={handleLogout}
            className="rounded bg-sky-600 px-6 py-2 text-xs font-bold text-white hover:bg-sky-700"
          >
            Logout
          </button>
        ) : (
          <>
            <NavLink to="/register" className="text-white">
              Register
            </NavLink>
            <NavLink to="/login" className="text-white">
              Login
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
}
