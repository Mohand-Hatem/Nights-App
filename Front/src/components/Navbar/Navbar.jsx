import { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { IoMdAddCircle } from 'react-icons/io';
import logo from '../../assets/logo.png';
import { AuthContext } from '../../Context/Conex';
import useLogout from '../../Hooks/useLogout';
import useCartCount from '../../Hooks/useCartCount';
import LazyImage from '../common/LazyImage';
import ThemeToggle from './ThemeToggle';

const navLinkClass = ({ isActive }) =>
  `transition-colors duration-150 hover:text-accent ${
    isActive ? "font-semibold text-accent" : "text-foreground"
  }`;

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const { isAuth, isAdmin, userImage, userInfo } = useContext(AuthContext);
  const { data: count, isLoading: loadingCart } = useCartCount();
  const logout = useLogout();
  const navigate = useNavigate();

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
          <NavLink to="/home" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/news" className={navLinkClass}>
            News
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>

          {isAdmin && (
            <NavLink to="/admin" className={navLinkClass}>
              Dashboard
            </NavLink>
          )}
          <button
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer text-foreground hover:text-accent"
          >
            <FaShoppingCart size={22} />
            {!loadingCart && count > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white shadow-md">
                {count}
              </span>
            )}
          </button>
        </>
      ) : null}
    </>
  );

  const UserBox = () => (
    <div className="flex items-center gap-2 rounded-3xl border border-border bg-surface p-1 pr-3 shadow-sm transition">
      {isAdmin ? (
        <LazyImage
          src={userImage}
          alt="admin"
          className="h-10 w-10 rounded-full border-2 border-border object-cover"
        />
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-lg font-bold text-white">
          {userInfo?.slice(0, 1).toUpperCase()}
        </div>
      )}
      <div>
        <p className="text-sm font-semibold text-foreground">
          {isAdmin ? (
            <span className="font-bold text-accent">Admin:</span>
          ) : (
            "Welcome"
          )}
          <span className="ml-1">{userInfo}</span>
        </p>
      </div>
    </div>
  );

  const guestLinks = (
    <>
      <NavLink to="/register" className={navLinkClass}>
        Register
      </NavLink>
      <NavLink to="/login" className={navLinkClass}>
        Login
      </NavLink>
      <NavLink to="/news" className={navLinkClass}>
        News
      </NavLink>
      <NavLink to="/contact" className={navLinkClass}>
        Contact
      </NavLink>
    </>
  );

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full border-b border-border bg-navbar px-5 shadow-md backdrop-blur-md transition-all duration-300 ${
        isScrolled ? "py-2" : "py-3"
      }`}
    >
      <nav className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <LazyImage src={logo} alt="Nights logo" className="w-12" />
          <h1 className="font-mono text-2xl font-extrabold text-accent">Nights</h1>
        </Link>

        <div className="hidden items-center gap-5 md:flex">
          <ThemeToggle />
          {isAuth && <UserBox />}
          <NavLinks />
          {isAuth ? (
            <button
              onClick={handleLogout}
              className="cursor-pointer rounded bg-sky-600 px-5 py-2 text-xs font-bold text-white hover:bg-sky-700"
            >
              Logout
            </button>
          ) : (
            guestLinks
          )}
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-muted shadow-md"
            aria-label="Toggle menu"
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
        className={`flex flex-col items-center gap-5 overflow-hidden transition-all duration-500 md:hidden ${
          openMenu ? "mt-4 max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {isAuth && <UserBox />}
        <ul className="flex flex-col items-center gap-4 text-lg">
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
          <div className="flex flex-col items-center gap-4">{guestLinks}</div>
        )}
      </div>
    </header>
  );
}
