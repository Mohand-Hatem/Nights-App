import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import ReactPaginate from "react-paginate";
import { FaShoppingCart, FaFireAlt } from "react-icons/fa";
import { PropagateLoader } from "react-spinners";
import useGetMovies from "../../Hooks/useGetMovies";
import useAddCart from "../../Hooks/useAddCart";
import Homeslider from "../Homeslider/Homeslider";
import Tvs from "../Tvs/Tvs";
import MovieCategory from "../MovieCategory/MovieCategory";

function Home() {
  const { data: Movies, isLoading, isError } = useGetMovies();
  const addToCart = useAddCart();
  const naviCard = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  const targetRef = useRef(null);
  const isInView = useInView(targetRef, { once: true, margin: "-100px" });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PropagateLoader color="#4b7de0" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
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
      <Homeslider />
      <Tvs />
      <MovieCategory />

      <div
        className="relative flex items-end w-fit text-lg mt-10 -mb-3 ml-5 font-extrabold text-amber-400 leading-tight 
          px-8 py-3 rounded-3xl bg-linear-to-r from-black/50 via-black/30 to-black/50
          backdrop-blur-md drop-shadow-2xl text-center
          border border-amber-400/30
          hover:scale-105 hover:shadow-amber-500/50 transition-all duration-500 ease-in-out
          animate-fade-in"
      >
        <FaFireAlt className="inline mr-2 animate-pulse" />
        <h1>Trending Now</h1>
      </div>

      <motion.div
        ref={targetRef}
        initial={{ x: -100, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-7"
      >
        {currentItems.map((movie) => (
          <div
            key={movie._id}
            className="group cursor-pointer bg-gray-900/70 border border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-amber-500/30 transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.03] backdrop-blur-sm"
          >
            <div
              onClick={() => naviCard(`/book/${movie._id}`)}
              className="relative w-full h-80 overflow-hidden"
            >
              <img
                src={movie.bookImage}
                alt={movie.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {movie.onSale && (
                <span className="absolute top-3 left-3 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  On Sale
                </span>
              )}
            </div>

            <div className="p-5 flex flex-col justify-between h-56">
              <div>
                <h1 className="text-xl font-semibold text-amber-300 mb-1 line-clamp-1">
                  {movie.title}
                </h1>
                <p className="text-sm text-gray-400 mb-2">by {movie.author}</p>
                <p className="text-gray-300 text-sm line-clamp-2">
                  {movie.description}
                </p>
                <p className="text-gray-500 text-sm line-clamp-2 mt-3">
                  Available {movie.stock}
                </p>
              </div>

              <div className="flex items-center justify-between mt-3">
                <p className="text-sm md:text-lg font-bold text-green-400">
                  {movie.price} EGP
                </p>
                <button
                  onClick={() => addToCart.mutate({ bookId: movie._id })}
                  className="flex z-20 cursor-pointer items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm transition-all duration-200"
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

// import useAddCart from "../../Hooks/useAddCart";
// import Homeslider from "../Homeslider/Homeslider";
// import useGetMovies from "../../Hooks/useGetMovies";
// import Tvs from "../Tvs/Tvs";
// import { FaShoppingCart, FaFireAlt } from "react-icons/fa";
// import { PropagateLoader } from "react-spinners";
// import { motion, useInView, AnimatePresence } from "framer-motion";
// import ReactPaginate from "react-paginate";
// import { useNavigate } from "react-router-dom";
// import { useRef, useState } from "react";
// import MovieCategory from "../MovieCategory/MovieCategory";

// function Home() {
//   const { data: Movies, isLoading, isError } = useGetMovies();
//   const naviCard = useNavigate();
//   const addToCart = useAddCart();

//   const targetref = useRef(null);
//   const isInView = useInView(targetref, { once: true, margin: "-100px" });

//   const [currentPage, setCurrentPage] = useState(0);
//   const itemsPerPage = 8;
//   const start = currentPage * itemsPerPage;
//   const currentItems = Movies ? Movies.slice(start, start + itemsPerPage) : [];
//   const handlePageClick = (data) => {
//     setCurrentPage(data.selected);
//   };

//   if (isLoading && !Movies)
//     return (
//       <motion.div
//         initial={{ opacity: 0, x: -50 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.5 }}
//         className="flex justify-center items-center h-screen text-gray-400 text-lg"
//       >
//         <PropagateLoader color="#4b7de0" />
//       </motion.div>
//     );

//   if (isError)
//     return (
//       <div className="flex justify-center items-center h-screen text-red-400 text-lg">
//         Error loading movies.
//       </div>
//     );

//   return (
//     <>
//       <Homeslider />
//       <Tvs />
//       <MovieCategory />
//       <div
//         className="relative flex items-end-safe w-fit text-lg mt-10 -mb-3 ml-5 font-extrabold text-amber-400 leading-tight
//           px-8 py-3 rounded-3xl bg-linear-to-r from-black/50 via-black/30 to-black/50
//           backdrop-blur-md drop-shadow-2xl text-center
//           border border-amber-400/30
//           hover:scale-105 hover:shadow-amber-500/50 transition-all duration-500 ease-in-out
//           animate-fade-in"
//       >
//         <FaFireAlt className="inline mr-2 animate-pulse" />
//         <h1>Trending Now</h1>
//       </div>

//       <motion.div
//         ref={targetref}
//         initial={{ x: -100, opacity: 0 }}
//         animate={isInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
//         transition={{ duration: 0.5, repeatCount: 5 }}
//         className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-7"
//       >
//         {currentItems.map((book) => (
//           <div
//             key={book._id}
//             className="group cursor-pointer bg-gray-900/70 border border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-amber-500/30 transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.03] backdrop-blur-sm"
//           >
//             <div
//               onClick={() => naviCard(`/book/${book._id}`)}
//               className="relative w-full h-80 overflow-hidden"
//             >
//               <img
//                 src={book.bookImage}
//                 alt={book.title}
//                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//               />
//               {book.onSale && (
//                 <span className="absolute top-3 left-3 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
//                   On Sale
//                 </span>
//               )}
//             </div>

//             <div className="p-5 flex flex-col justify-between h-56">
//               <div>
//                 <h1 className="text-xl font-semibold text-amber-300 mb-1 line-clamp-1">
//                   {book.title}
//                 </h1>
//                 <p className="text-sm text-gray-400 mb-2">by {book.author}</p>
//                 <p className="text-gray-300 text-sm line-clamp-2">
//                   {book.description}
//                 </p>
//                 <p className="text-gray-500 text-sm line-clamp-2 mt-3">
//                   Available {book.stock}
//                 </p>
//               </div>

//               <div className="flex items-center justify-between mt-3">
//                 <p className="text-sm md:text-lg font-bold text-green-400">
//                   {book.price} EGP
//                 </p>
//                 <button
//                   onClick={() =>
//                     addToCart.mutate({
//                       bookId: book._id,
//                     })
//                   }
//                   className="flex z-20 cursor-pointer items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm transition-all duration-200"
//                 >
//                   <FaShoppingCart /> Add Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </motion.div>
//       <ReactPaginate
//         previousLabel={"Previous"}
//         nextLabel={"Next"}
//         pageCount={Math.ceil(Movies.length / itemsPerPage)}
//         onPageChange={handlePageClick}
//         containerClassName={"pagi"}
//         activeClassName={"actives"}
//         pageClassName={"page-item"}
//         previousClassName={"page-item"}
//         nextClassName={"page-item"}
//         breakClassName={"page-item"}
//         onClick={() => {
//           window.scrollTo({ top: 1400, left: 0, behavior: "smooth" });
//         }}
//       />
//     </>
//   );
// }

// export default Home;
