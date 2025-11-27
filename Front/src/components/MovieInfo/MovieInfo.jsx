import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../config/axio";
import { motion } from "framer-motion";
import { PropagateLoader } from "react-spinners";

function BookInfo() {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["singleBook", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`book/${id}`);
      return res?.data;
    },
  });

  if (isLoading) {
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
  }
  if (isError)
    return (
      <div className="text-center mt-20 text-red-500">
        Error: {error.message}
      </div>
    );

  const book = data?.foundedBook;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className=" mt-15 md:mt-10 p-6 md:p-12  mx-auto "
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row items-center md:items-start"
      >
        {book?.bookImage && (
          <motion.img
            src={book.bookImage}
            alt={book.title}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{
              scale: 1.2,
              rotate: 5,
              transition: {
                duration: 0.3,
                ease: "linear",
                type: "spring",
                stiffness: 300,
                damping: 15,
                zIndex: 10,
              },
            }}
            className="w-full relative  md:w-1/3 h-80 object-cover md:h-full md:rounded-l-2xl"
          />
        )}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="p-6 md:p-10 flex-1 text-white"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="text-2xl md:text-5xl pt-5 pb-10 font-extrabold font-mono bg-linear-to-r 
            from-[#c5814b] to-[#ffb77a] bg-clip-text text-transparent tracking-wide drop-shadow-sm"
          >
            {book.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="relative z-20"
          >
            <p className="mb-6 text-gray-300">
              <span className="font-semibold text-gray-400">Author:</span>{" "}
              {book.author}
            </p>
            <p className="mb-6 text-gray-300">
              <span className="font-semibold text-gray-400">Category:</span>{" "}
              {book.category?.name}
            </p>
            <p className="mb-6 text-gray-300">
              <span className="font-semibold text-gray-400">Price:</span> $
              {book.price}
            </p>
            <p className="mb-6 text-gray-300">
              <span className="font-semibold text-gray-400">On Sale:</span>{" "}
              {book.onSale ? "Yes" : "No"}
            </p>

            <p className="mb-4 text-gray-300">{book.description}</p>

            <div className="flex flex-wrap gap-4 mt-4">
              {book.star && (
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  className="px-3 py-1 h-fit w-fit bg-yellow-500 text-black font-semibold rounded-full"
                >
                  ⭐ {book.star}
                </motion.span>
              )}
              {book.stock && (
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  className="px-3 py-1 h-fit w-fit bg-blue-600 text-white font-semibold rounded-full"
                >
                  📦 {book.stock} in stock
                </motion.span>
              )}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default BookInfo;
