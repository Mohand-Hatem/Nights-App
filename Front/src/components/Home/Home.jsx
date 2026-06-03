import { lazy, Suspense, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import ReactPaginate from 'react-paginate';
import { PropagateLoader } from 'react-spinners';
import useGetMovies from '../../Hooks/useGetMovies';
import useAddCart from '../../Hooks/useAddCart';
import PageLoader from '../common/PageLoader';
import TrendingMovieCard from './TrendingMovieCard';

const Homeslider = lazy(() => import('../Homeslider/Homeslider'));
const Tvs = lazy(() => import('../Tvs/Tvs'));
const MovieCategory = lazy(() => import('../MovieCategory/MovieCategory'));

const ITEMS_PER_PAGE = 8;

function Home() {
  const { data: Movies, isLoading, isError } = useGetMovies();
  const addToCart = useAddCart();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const trendingRef = useRef(null);
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, { once: true, margin: '-40px' });

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
  const start = currentPage * ITEMS_PER_PAGE;
  const currentItems = safeMovies.slice(start, start + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(safeMovies.length / ITEMS_PER_PAGE);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    trendingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <Homeslider />
        <Tvs />
        <MovieCategory />
      </Suspense>

      <section
        ref={trendingRef}
        className="trending-section mx-auto max-w-7xl px-4 md:px-6"
      >
        <header className="mb-8 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Featured catalog
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Trending Now
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">
              Hand-picked titles customers are browsing most this week.
            </p>
          </div>
          <p className="text-sm font-medium text-muted">
            Showing {currentItems.length} of {safeMovies.length} movies
          </p>
        </header>

        <motion.div
          ref={gridRef}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {currentItems.map((movie, index) => (
            <motion.div
              key={movie._id}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              className="h-full"
            >
              <TrendingMovieCard
                movie={movie}
                onOpen={(id) => navigate(`/book/${id}`)}
                onAddToCart={(id) => addToCart.mutate({ bookId: id })}
              />
            </motion.div>
          ))}
        </motion.div>

        {pageCount > 1 && (
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            pageCount={pageCount}
            onPageChange={handlePageClick}
            forcePage={currentPage}
            containerClassName="trending-pagi"
            activeClassName="trending-pagi-active"
            pageClassName="trending-pagi-item"
            previousClassName="trending-pagi-item"
            nextClassName="trending-pagi-item"
            breakClassName="trending-pagi-item"
            disabledClassName="trending-pagi-disabled"
          />
        )}
      </section>
    </>
  );
}

export default Home;
