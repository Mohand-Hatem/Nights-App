import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="relative z-50 mt-15 border-t border-border bg-footer px-6 pt-12 pb-6 text-muted md:px-16">
      <div className="grid grid-cols-1 gap-10 border-b border-border pb-10 md:grid-cols-4">
        <div>
          <h2 className="mb-4 text-2xl font-bold text-foreground">🎬 Nights</h2>
          <p className="text-sm leading-relaxed">
            Discover, watch, and enjoy your favorite movies — all in one place.
            Your home for entertainment and stories that move you.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-xl font-semibold text-foreground">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="transition hover:text-accent">
              <Link to="/home">Home</Link>
            </li>
            <li className="transition hover:text-accent">
              <Link to="/news">News</Link>
            </li>
            <li className="transition hover:text-accent">
              <Link to="/">Landing</Link>
            </li>
            <li className="transition hover:text-accent">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xl font-semibold text-foreground">Support</h3>
          <ul className="space-y-2 text-sm">
            <li className="transition hover:text-accent">Help Center</li>
            <li className="transition hover:text-accent">Terms of Service</li>
            <li className="transition hover:text-accent">Privacy Policy</li>
            <li className="transition hover:text-accent">Report a Problem</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xl font-semibold text-foreground">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/mohaned.hatem.39/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-surface-muted p-3 transition hover:bg-pink-600 hover:text-white"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.linkedin.com/in/mohand-hatem-73995a262/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-surface-muted p-3 transition hover:bg-pink-600 hover:text-white"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.instagram.com/mohandhatem1?igsh=dzVxMHZjOThsd3dx"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-surface-muted p-3 transition hover:bg-pink-600 hover:text-white"
            >
              <FaInstagram />
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=201063505368"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-surface-muted p-3 transition hover:bg-pink-600 hover:text-white"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center justify-between text-sm md:flex-row">
        <p>© {new Date().getFullYear()} The Home Movies. All rights reserved.</p>
        <p className="mt-3 md:mt-0">
          Designed by <span className="font-bold text-accent">Mohand Hatem</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
