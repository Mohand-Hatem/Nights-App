import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Scrollbase from "../Scrollbase/Scrollbase";

function Layout() {
  return (
    <>
      <Navbar />
      <div className="parent min-h-screen bg-background text-foreground transition-colors duration-200">
        <Scrollbase />
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
