import { useContext, useEffect, useState } from "react";
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
      className="theme-card flex flex-col items-center border-b border-border p-5"
    >
      <img
        src={userImage}
        alt="Admin"
        className="h-24 w-24 rounded-full border border-accent object-cover shadow-lg"
      />
      <div className="mt-4 flex flex-col items-center">
        <p className="theme-muted text-sm">Admin</p>
        <h2 className="text-lg font-bold text-accent">{username}</h2>
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
            `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${
              isActive
                ? "bg-amber-600 text-white shadow-md"
                : "bg-card text-muted hover:bg-amber-600 hover:text-white"
            }`
          }
        >
          {link.icon}
          <h2 className="text-sm font-medium">{link.label}</h2>
        </NavLink>
      ))}
    </ul>
  );

  return (
    <div className="mt-20 px-2">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-20 left-4 z-100 rounded-xl bg-card p-3 text-accent shadow-md md:hidden"
      >
        {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-[260px_1fr]">
        <aside className="hidden h-full flex-col rounded-xl bg-surface p-2 shadow-lg md:flex">
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
                className="fixed top-15 left-0 z-50 h-full w-64 bg-card p-3 shadow-2xl md:hidden"
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
                className="bg-overlay fixed inset-0 z-30 md:hidden"
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
          className="min-h-screen rounded-xl bg-surface p-6 shadow-lg"
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;
