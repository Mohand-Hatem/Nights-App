import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Scrollbase from "../Scrollbase/Scrollbase";

function Layout() {
  const [count, setCount] = useState(null);
  return (
    <>
      <Navbar />
      <div className="parent">
        <Scrollbase />
        <Outlet></Outlet>
      </div>
      <Footer />
    </>
  );
}

export default Layout;
