import React, { useState } from "react";
import useGetMovies from "../../Hooks/useGetMovies";
import useDeleteMovie from "../../Hooks/useDeleteMovie";
import { PropagateLoader } from "react-spinners";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

function DeleteMovie() {
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const moviesPerPage = 8;

  const { data = [], isLoading, isError } = useGetMovies();
  const deleteMovie = useDeleteMovie();

  const indexOfLast = currentPage * moviesPerPage;
  const indexOfFirst = indexOfLast - moviesPerPage;
  const currentMovies = data.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(data.length / moviesPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
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
          Delete Movies From Database
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-sm mt-2 sm:mt-0">
          Total Movies:{" "}
          <span className="font-semibold text-amber-600 dark:text-amber-400">
            {data.length}
          </span>
        </p>
      </div>

      <div className="grid modify grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 overflow-y-scroll overflow-clip h-120 bg-gray-950 ">
        {currentMovies.map((one) => (
          <div
            key={one._id}
            className="flex flex-col items-center bg-white/90 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-5 backdrop-blur-sm"
          >
            <div className="w-full flex justify-center mb-4">
              <img
                src={one.bookImage}
                alt={one.title}
                className="w-28 h-40 md:w-32 md:h-44 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="w-full text-center space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                {one.title}
              </h3>

              <div className="flex justify-center items-center gap-3 text-sm">
                <span className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 px-3 py-1 rounded-xl font-medium shadow-sm">
                  Stock: {one.stock}
                </span>

                <span className="text-mono font-bold text-gray-900 dark:text-amber-400 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 px-3 py-1 rounded-xl shadow-sm">
                  Price: {one.price}$
                </span>
              </div>

              <button
                onClick={() => deleteMovie.mutate(one._id)}
                className="mt-3 cursor-pointer w-full bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition-all duration-300 text-white font-medium py-2 px-6 rounded-xl shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {data.length === 0 && (
        <div className="text-center py-10 text-gray-600 dark:text-gray-400">
          No movies available to delete.
        </div>
      )}

      {data.length > moviesPerPage && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg border cursor-pointer text-amber-50 border-amber-500 font-semibold transition-all ${
              currentPage === 1
                ? "text-gray-400 border-gray-500 cursor-not-allowed"
                : "hover:bg-amber-500 hover:text-black"
            }`}
          >
            Prev
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-9 h-9 rounded-lg cursor-pointer  font-semibold transition-all ${
                  currentPage === i + 1
                    ? "bg-amber-500 text-black"
                    : "bg-transparent border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg border cursor-pointer text-amber-50 border-amber-500 font-semibold transition-all ${
              currentPage === totalPages
                ? "text-gray-400 border-gray-500 cursor-not-allowed"
                : "hover:bg-amber-500 hover:text-black"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default DeleteMovie;
