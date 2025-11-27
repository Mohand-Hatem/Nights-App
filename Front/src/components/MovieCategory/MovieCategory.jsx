import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import useGetMovies from "../../Hooks/useGetMovies";
import back from "../../assets/images/backit.jpg";
import { useNavigate } from "react-router-dom";

function MovieCategory() {
  const [activeIndex, setActiveIndex] = useState(0);
  const targetref = useRef(null);
  const isInView = useInView(targetref, { once: true, margin: "-500px" });

  const NaviCard = useNavigate();
  const MovieCat = ["Crime", "Drama", "Fiction", "Horror", "Historical"];
  const { data: movies } = useGetMovies();

  const filteredMovies = movies
    ?.filter((movie) => movie?.category?.name === MovieCat[activeIndex])
    .slice(0, 4);

  return (
    <div className="relative mx-auto text-center my-10 w-full p-2 rounded-xl shadow-lg ">
      <div
        className="absolute -z-10 inset-0 bg-cover bg-center blur-sm "
        style={{ backgroundImage: `url(${back})` }}
      ></div>

      <h2
        className="text-3xl md:text-4xl font-extrabold tracking-wide text-center
          bg-linear-to-r from-[#f4f7de] via-sky-300 to-[#f1f6fa]
          bg-clip-text text-transparent drop-shadow-[0_3px_10px_rgba(0,0,0,0.5)]
          animate-gradient-move glow-text"
      >
        Top Movies Now By Categories
      </h2>

      <motion.ul
        ref={targetref}
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="rounded-bl-3xl relative z-40 flex-wrap justify-center rounded-tr-3xl p-2 my-10 bg-gray-950/40 w-fit mx-auto flex gap-1 "
      >
        {MovieCat.map((category, index) => (
          <li
            onClick={() => setActiveIndex(index)}
            className={` text-white px-2 basis-2/6 md:basis-1/6 rounded-bl-3xl rounded-tr-3xl md:px-5 py-2 cursor-pointer transition-all duration-300
              ${
                activeIndex === index
                  ? "bg-sky-500 "
                  : "bg-gray-950 hover:bg-sky-500"
              }`}
          >
            {category}
          </li>
        ))}
      </motion.ul>

      <div className="flex overflow-hidden md:justify-center w-fit gap-2 lg:gap-3.5 flex-wrap p-2 mx-auto bg-gray-300/10 border-gray-400/10 border-2 rounded-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 12,
            }}
            className="flex flex-wrap gap-2 md:justify-center"
          >
            {filteredMovies?.length > 0 ? (
              filteredMovies.map((movie) => (
                <div
                  key={movie._id}
                  onClick={() => NaviCard(`/book/${movie._id}`)}
                  className="relative card z-20 basis-[48%] sm:basis-[24%]  lg:basis-auto bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:scale-102 hover:shadow-2xl transition-transform duration-500 w-65"
                >
                  <img
                    src={movie.bookImage}
                    alt={movie.title}
                    className="relative phon z-20 w-full h-45 sm:h-60 md:h-95 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded-full z-50">
                    {movie.star} ★
                  </div>
                  <h3 className="cardhover text-sm line-clamp-1 absolute left-0 bottom-0 z-10 w-full px-2 text-gray-300 py-2 md:text-xl font-semibold">
                    {movie.title}
                  </h3>
                </div>
              ))
            ) : (
              <h3 className="text-xl text-white font-semibold">
                No movies available.
              </h3>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default MovieCategory;
