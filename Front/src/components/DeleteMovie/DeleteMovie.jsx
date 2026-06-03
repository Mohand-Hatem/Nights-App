import { useState } from 'react';
import useGetMovies from '../../Hooks/useGetMovies';
import useDeleteMovie from '../../Hooks/useDeleteMovie';
import { PropagateLoader } from 'react-spinners';
import { motion } from 'framer-motion';

function DeleteMovie() {
  const [currentPage, setCurrentPage] = useState(1);
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
          Delete Movies From Database
        </h2>
        <p className="theme-muted mt-2 text-sm sm:mt-0">
          Total Movies:{" "}
          <span className="font-semibold text-accent">{data.length}</span>
        </p>
      </div>

      <div className="modify grid grid-cols-1 gap-8 overflow-y-scroll overflow-clip bg-section md:h-150 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentMovies.map((one) => (
          <div
            key={one._id}
            className="theme-card flex flex-col items-center p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="mb-4 flex w-full justify-center">
              <img
                src={one.bookImage}
                alt={one.title}
                className="h-40 w-28 rounded-xl object-cover shadow-lg transition-transform duration-300 hover:scale-105 md:h-44 md:w-32"
              />
            </div>

            <div className="w-full space-y-3 text-center">
              <h3 className="truncate text-lg font-semibold text-foreground">
                {one.title}
              </h3>

              <div className="flex items-center justify-center gap-3 text-sm">
                <span className="theme-badge">Stock: {one.stock}</span>
                <span className="theme-badge font-bold text-accent">
                  Price: {one.price}$
                </span>
              </div>

              <button
                onClick={() => deleteMovie.mutate(one._id)}
                className="mt-3 w-full cursor-pointer rounded-xl bg-red-600 py-2 font-medium text-white shadow-md transition-all duration-300 hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {data.length === 0 && (
        <div className="theme-muted py-10 text-center">No movies available to delete.</div>
      )}

      {data.length > moviesPerPage && (
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`rounded-lg border border-accent px-4 py-2 font-semibold transition-all ${
              currentPage === 1
                ? "cursor-not-allowed border-border text-muted"
                : "cursor-pointer text-accent hover:bg-accent hover:text-white"
            }`}
          >
            Prev
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`h-9 w-9 cursor-pointer rounded-lg font-semibold transition-all ${
                  currentPage === i + 1
                    ? "bg-accent text-white"
                    : "border border-accent text-accent hover:bg-accent hover:text-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`rounded-lg border border-accent px-4 py-2 font-semibold transition-all ${
              currentPage === totalPages
                ? "cursor-not-allowed border-border text-muted"
                : "cursor-pointer text-accent hover:bg-accent hover:text-white"
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
