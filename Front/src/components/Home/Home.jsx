import { lazy, Suspense, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import ReactPaginate from "react-paginate";
import { FaShoppingCart, FaFireAlt } from "react-icons/fa";
import { PropagateLoader } from "react-spinners";
import useGetMovies from "../../Hooks/useGetMovies";
import useAddCart from "../../Hooks/useAddCart";
import LazyImage from "../common/LazyImage";
import PageLoader from "../common/PageLoader";

const Homeslider = lazy(() => import("../Homeslider/Homeslider"));
const Tvs = lazy(() => import("../Tvs/Tvs"));
const MovieCategory = lazy(() => import("../MovieCategory/MovieCategory"));

function Home() {
  const { data: Movies, isLoading, isError } = useGetMovies();
  const addToCart = useAddCart();
  const naviCard = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  const targetRef = useRef(false);
  const isInView = useInView(targetRef, { once: true });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <PropagateLoader color="#4b7de0" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        Error loading movies.
      </div>
    );
  }

  const safeMovies = Movies || [];
  const start = currentPage * itemsPerPage;
  const currentItems = safeMovies.slice(start, start + itemsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
    window.scrollTo({ top: 1400, left: 0, behavior: "smooth" });
  };

  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <Homeslider />
        <Tvs />
        <MovieCategory />
      </Suspense>

      <div className="theme-badge relative -mb-3 ml-5 mt-10 flex w-fit items-end px-8 py-3 text-lg font-extrabold text-accent animate-fade-in">
        <FaFireAlt className="mr-2 inline animate-pulse" />
        <h1>Trending Now</h1>
      </div>

      <motion.div
        ref={targetRef}
        initial={{ x: -100, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 gap-8 p-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {currentItems.map((movie) => (
          <div
            key={movie._id}
            className="group theme-card cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-amber-500/20"
          >
            <div
              onClick={() => naviCard(`/book/${movie._id}`)}
              className="relative h-80 w-full overflow-hidden"
            >
              <LazyImage
                src={movie.bookImage}
                alt={movie.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {movie.onSale && (
                <span className="absolute left-3 top-3 rounded-full bg-purple-600 px-3 py-1 text-xs font-semibold text-white">
                  On Sale
                </span>
              )}
            </div>

            <div className="flex h-56 flex-col justify-between p-5">
              <div>
                <h1 className="mb-1 line-clamp-1 text-xl font-semibold text-accent">
                  {movie.title}
                </h1>
                <p className="theme-muted mb-2 text-sm">by {movie.author}</p>
                <p className="line-clamp-2 text-sm text-foreground">
                  {movie.description}
                </p>
                <p className="theme-muted mt-3 line-clamp-2 text-sm">
                  Available {movie.stock}
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <p className="text-sm font-bold text-green-600 md:text-lg">
                  {movie.price} EGP
                </p>
                <button
                  onClick={() => addToCart.mutate({ bookId: movie._id })}
                  className="z-20 flex cursor-pointer items-center gap-2 rounded-lg bg-purple-600 px-3 py-2 text-sm text-white transition-all duration-200 hover:bg-purple-700"
                >
                  <FaShoppingCart /> Add Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={Math.ceil(safeMovies.length / itemsPerPage)}
        onPageChange={handlePageClick}
        containerClassName={"pagi"}
        activeClassName={"actives"}
        pageClassName={"page-item"}
        previousClassName={"page-item"}
        nextClassName={"page-item"}
        breakClassName={"page-item"}
      />
    </>
  );
}

export default Home;
