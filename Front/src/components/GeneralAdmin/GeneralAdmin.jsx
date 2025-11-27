import React, { useState } from "react";
import { MdEngineering } from "react-icons/md";

function GeneralAdmin() {
  const [count, setCount] = useState(null);
  return (
    <>
      <div className="content flex flex-col justify-center items-center w-full min-h-screen bg-gray-900 rounded-2xl shadow-2xl p-6 md:p-12 transition-all duration-500">
        <MdEngineering className="text-8xl md:text-12xl text-amber-400 animate-bounce mb-6" />
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold font-mono bg-linear-to-r from-[#db9f6d] to-[#b4753e] bg-clip-text text-transparent tracking-wider drop-shadow-lg text-center animate-fadeIn">
          Welcome to the Dashboard
        </h1>
        <p className="mt-4 text-gray-300 text-center md:text-lg max-w-xl animate-fadeIn delay-200">
          Manage your projects, tasks, and workflow effortlessly in one place.
        </p>
      </div>
    </>
  );
}

export default GeneralAdmin;
