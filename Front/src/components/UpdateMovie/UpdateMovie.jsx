import React, { useRef, useState } from "react";
import useGetMovies from "../../Hooks/useGetMovies";
import MovieCard from "../MovieCard/MovieCard";
import { PropagateLoader } from "react-spinners";
import { motion } from "framer-motion";

function UpdateMovie() {
  const { data, isLoading, isError } = useGetMovies();
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 8;

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = data?.slice(indexOfFirstMovie, indexOfLastMovie);

  const totalPages = Math.ceil((data?.length || 0) / moviesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading)
    return (
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center items-center h-screen text-gray-400 text-lg"
      >
        <PropagateLoader color="#4b7de0" />
      </motion.div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-screen text-red-400 text-lg">
        Error loading movies.
      </div>
    );

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-950 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h2 className="text-2xl font-extrabold font-mono bg-linear-to-r from-[#c5814b] to-[#ffb77a] bg-clip-text text-transparent tracking-wide drop-shadow-sm">
          Update Movies Details
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-sm mt-2 sm:mt-0">
          Total Movies:{" "}
          <span className="font-semibold text-amber-600 dark:text-amber-400">
            {data?.length || 0}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-3 xl:grid-cols-4 gap-3 overflow-y-scroll overflow-clip h-120 modify">
        {currentMovies?.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>

      <div className="flex justify-center mt-10 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 ${
              currentPage === index + 1
                ? "bg-amber-500 text-black font-semibold shadow-lg scale-105"
                : "bg-gray-800 text-white hover:bg-amber-600 hover:text-black"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default UpdateMovie;
