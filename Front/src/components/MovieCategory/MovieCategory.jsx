import { useRef, useState } from "react";
import LazyImage from "../common/LazyImage";
import { motion, AnimatePresence, useInView } from "framer-motion";
import useGetMovies from "../../Hooks/useGetMovies";
import back from "../../assets/images/backit.jpg";
import { useNavigate } from "react-router-dom";

function MovieCategory() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [MovieCat] = useState([
    "Crime",
    "Drama",
    "Fiction",
    "Horror",
    "Historical",
  ]);
  const targetref = useRef(false);
  const isInView = useInView(targetref);

  const NaviCard = useNavigate();
  const { data: movies } = useGetMovies();

  const filteredMovies = movies
    ?.filter((movie) => movie?.category?.name === MovieCat[activeIndex])
    .slice(0, 4);

  return (
    <section className="relative isolate mx-auto my-10 min-h-[520px] w-full overflow-hidden rounded-xl p-4 shadow-lg md:p-6">
      {/* Background image — z-0 inside isolate, not negative z */}
      <img
        src={back}
        alt=""
        aria-hidden
        className="absolute inset-0 z-0 h-full w-full object-cover object-center"
      />
      {/* Light tint so text stays readable; image still visible */}
      <div
        className="absolute inset-0 z-0 bg-black/35 dark:bg-black/50"
        aria-hidden
      />

      <div className="relative z-10">
        <h2 className="theme-heading text-center text-3xl tracking-wide drop-shadow-md md:text-4xl">
          Top Movies Now By Categories
        </h2>

        <motion.ul
          ref={targetref}
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto my-10 flex w-fit flex-wrap justify-center gap-1 rounded-bl-3xl rounded-tr-3xl bg-card/85 p-2 backdrop-blur-sm"
        >
          {MovieCat.map((category, index) => (
            <li
              key={category}
              onClick={() => setActiveIndex(index)}
              className={`cursor-pointer rounded-bl-3xl rounded-tr-3xl px-2 py-2 text-foreground transition-all duration-300 basis-2/6 md:basis-1/6 md:px-5 ${
                activeIndex === index
                  ? "theme-tab-active"
                  : "theme-tab-inactive"
              }`}
            >
              {category}
            </li>
          ))}
        </motion.ul>

        <div className="mx-auto flex w-fit flex-wrap gap-2 overflow-hidden rounded-lg border-2 border-border/60 bg-card/70 p-2 backdrop-blur-sm md:justify-center lg:gap-3.5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 100, damping: 12 }}
              className="flex flex-wrap gap-2 md:justify-center"
            >
              {filteredMovies?.length > 0 ? (
                filteredMovies.map((movie) => (
                  <div
                    key={movie._id}
                    onClick={() => NaviCard(`/book/${movie._id}`)}
                    className="card relative w-65 basis-[48%] cursor-pointer overflow-hidden rounded-lg bg-card shadow-lg transition-transform duration-500 hover:scale-102 hover:shadow-2xl sm:basis-[24%] lg:basis-auto"
                  >
                    <LazyImage
                      src={movie.bookImage}
                      alt={movie.title}
                      className="phon relative h-45 w-full object-cover sm:h-60 md:h-95"
                    />
                    <div className="absolute right-2 top-2 z-50 rounded-full bg-yellow-400 px-2 py-1 text-xs font-semibold text-black">
                      {movie.star} ★
                    </div>
                    <h3 className="cardhover absolute bottom-0 left-0 z-10 line-clamp-1 w-full bg-black/50 px-2 py-2 text-sm font-semibold text-white md:text-xl">
                      {movie.title}
                    </h3>
                  </div>
                ))
              ) : (
                <h3 className="rounded-lg bg-card/90 px-4 py-2 text-xl font-semibold text-foreground">
                  No movies available.
                </h3>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default MovieCategory;
