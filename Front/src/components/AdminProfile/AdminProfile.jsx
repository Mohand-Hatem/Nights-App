import React, { useContext, useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../config/axio";
import { AuthContext } from "../../Context/Conex";
import { motion } from "framer-motion";

function AdminProfile() {
  let { userImage } = useContext(AuthContext);
  const { data, isLoading } = useQuery({
    queryKey: ["admin"],
    queryFn: async () => {
      const res = await axiosInstance("user/me");
      return res.data;
    },
  });

  return (
    <div className="flex justify-center items-center h-130  bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 p-4  sm:p-8 rounded-xl shadow-lg ">
      <div className="bg-gray-800 text-white shadow-2xl rounded-2xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl p-6 sm:p-8 border border-gray-700 hover:border-amber-500 transition-all duration-300">
        <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-6 text-center sm:text-left">
          <div className="relative mb-6 sm:mb-0">
            <img
              src={userImage}
              alt="Admin Avatar"
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-amber-500 shadow-lg"
            />
          </div>

          <div className="flex flex-col justify-center items-center sm:items-start">
            <h2 className="text-2xl font-bold">{data?.signdUser.username}</h2>
            <p className="text-gray-400 break-all">{data?.signdUser.email}</p>
            <div className="w-16 h-1 bg-amber-500 rounded-full mt-2 sm:mt-3"></div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-700"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex justify-between sm:justify-start sm:space-x-2">
            <span className="text-gray-400">Role:</span>
            <span className="font-semibold text-amber-400">
              {data?.signdUser?.role}
            </span>
          </div>
          <div className="flex justify-between sm:justify-start sm:space-x-2">
            <span className="text-gray-400">Member Since:</span>
            <span className="font-semibold">Jan 2024</span>
          </div>
          <div className="flex justify-between sm:justify-start sm:space-x-2">
            <span className="text-gray-400">Status:</span>
            <span className="font-semibold text-green-400">Active</span>
          </div>
          <div className="flex justify-between sm:justify-start sm:space-x-2">
            <span className="text-gray-400">Last Login:</span>
            <span className="font-semibold">Nov 2025</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
