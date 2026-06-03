import { useState } from 'react';
import useGetMovies from '../../Hooks/useGetMovies';
import MovieCard from '../MovieCard/MovieCard';
import { PropagateLoader } from 'react-spinners';
import { motion } from 'framer-motion';

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
        className="theme-muted flex h-screen items-center justify-center text-lg"
      >
        <PropagateLoader color="#4b7de0" />
      </motion.div>
    );

  if (isError)
    return (
      <div className="flex h-screen items-center justify-center text-lg text-red-500">
        Error loading movies.
      </div>
    );

  return (
    <div className="theme-card rounded-3xl p-8">
      <div className="mb-8 flex flex-col items-center justify-between sm:flex-row">
        <h2 className="theme-heading font-mono text-2xl tracking-wide">
          Update Movies Details
        </h2>
        <p className="theme-muted mt-2 text-sm sm:mt-0">
          Total Movies:{" "}
          <span className="font-semibold text-accent">{data?.length || 0}</span>
        </p>
      </div>

      <div className="modify grid grid-cols-1 gap-3 overflow-y-scroll overflow-clip p-3 sm:grid-cols-2 md:h-150 lg:grid-cols-3 xl:grid-cols-4">
        {currentMovies?.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>

      <div className="mt-10 flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`cursor-pointer rounded-lg px-4 py-2 transition-all duration-300 ${
              currentPage === index + 1
                ? "scale-105 bg-accent font-semibold text-white shadow-lg"
                : "bg-surface-muted text-foreground hover:bg-accent hover:text-white"
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
