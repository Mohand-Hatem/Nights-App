import React from "react";
import { FaUserPlus } from "react-icons/fa";
import landVid from "../../assets/images/vid.mp4";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="relative w-full mt-10 -mb-10 h-screen overflow-hidden text-white rounded-2xl">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src={landVid}
      />

      <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/60 to-black/80 backdrop-blur-[2px]" />

      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight drop-shadow-lg">
          Welcome to <span className="text-amber-500">Nights</span>
        </h1>

        <p className="text-gray-300 mt-6 max-w-xl text-lg">
          Dive into a world of stories — stream the latest movies and timeless
          classics anytime, anywhere.
        </p>

        <div className="flex flex-wrap gap-4 mt-10 justify-center">
          <Link to={"/register"}>
            <button className="cursor-pointer flex items-center gap-2 px-8 py-3 border border-amber-500 text-amber-500 rounded-full font-semibold hover:bg-amber-500 hover:text-black transition-all duration-300 backdrop-blur-sm">
              <FaUserPlus /> Join Now
            </button>
          </Link>
        </div>
      </div>

      <footer className="absolute bottom-4 w-full text-center text-gray-400 text-sm z-10">
        © {new Date().getFullYear()} HomeMovie. All Rights Reserved.
      </footer>
    </div>
  );
}

export default Landing;
