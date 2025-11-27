import React, { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaUser, FaPlus, FaExchangeAlt, FaBars, FaTimes } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../config/axio";
import { AuthContext } from "../../Context/Conex";

function AdminCard({ userImage, username }) {
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-gray-900 p-5 flex flex-col items-center rounded-xl border-b border-gray-700 shadow-sm"
    >
      <img
        src={userImage}
        alt="Admin"
        className="w-24 h-24 rounded-full object-cover shadow-lg border border-amber-400"
      />

      <div className="mt-4 flex flex-col items-center bg-gray-90">
        <p className="text-gray-300 text-sm">Admin</p>
        <h2 className="text-lg font-bold bg-linear-to-r from-amber-500 to-orange-300 bg-clip-text text-transparent">
          {username}
        </h2>
      </div>
    </motion.div>
  );
}

function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { userImage } = useContext(AuthContext);
  const location = useLocation();

  const { data } = useQuery({
    queryKey: ["admin"],
    queryFn: async () => {
      const res = await axiosInstance("user/me");
      return res.data;
    },
  });

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const links = [
    { to: "profile", label: "Admin Profile", icon: <FaUser size={20} /> },
    { to: "create", label: "Add Movie", icon: <FaPlus size={20} /> },
    { to: "update", label: "Update Movie", icon: <FaExchangeAlt size={20} /> },
    { to: "delete", label: "Delete Movie", icon: <MdDelete size={20} /> },
  ];

  const SidebarLinks = ({ close }) => (
    <ul className="flex flex-col gap-3 p-4">
      {links.map((link) => (
        <NavLink
          to={link.to}
          key={link.to}
          onClick={() => close && close()}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
             ${
               isActive
                 ? "bg-amber-600 text-white shadow-md"
                 : "bg-gray-900 text-gray-300 hover:bg-amber-600 hover:text-white"
             }`
          }
        >
          {link.icon}
          <h2 className="text-sm font-medium text-gray-300 hover:text-white">
            {link.label}
          </h2>
        </NavLink>
      ))}
    </ul>
  );

  return (
    <div className="mt-20 px-2">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden fixed top-20 left-4 z-100 bg-gray-900 p-3 rounded-xl shadow-md text-amber-400"
      >
        {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-4">
        <aside className="hidden  md:flex flex-col bg-gray-700 rounded-xl shadow-lg h-full p-2">
          <AdminCard
            userImage={userImage}
            username={data?.signdUser?.username}
          />
          <SidebarLinks />
        </aside>

        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.3 }}
                className="fixed top-15 left-0 w-64 bg-gray-900 h-full shadow-2xl p-3 z-50 md:hidden"
              >
                <AdminCard
                  userImage={userImage}
                  username={data?.signdUser?.username}
                />
                <SidebarLinks close={() => setMenuOpen(false)} />
              </motion.aside>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black z-30 md:hidden"
                onClick={() => setMenuOpen(false)}
              />
            </>
          )}
        </AnimatePresence>

        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-gray-700 rounded-xl p-6 min-h-screen shadow-lg over"
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;
