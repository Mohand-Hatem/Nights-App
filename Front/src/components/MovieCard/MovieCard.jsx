import { useFormik } from "formik";
import React, { useState } from "react";
import useUpdateMovie from "../../Hooks/useUpdateMovie";
import { PropagateLoader } from "react-spinners";
import { FaShoppingCart } from "react-icons/fa";

function MovieCard({ movie }) {
  const updateMovie = useUpdateMovie();
  const formik = useFormik({
    initialValues: {
      price: movie.price,
      onSale: movie.onSale,
      stock: movie.stock,
    },
    onSubmit: (values) => {
      updateMovie.mutate({ id: movie._id, newData: values });
    },
  });

  if (updateMovie.isLoading) {
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
  return (
    <>
      <div className="flex flex-col items-center bg-white/90 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-5 backdrop-blur-sm">
        <div className="w-full flex justify-center mb-4">
          <img
            src={movie.bookImage}
            alt={movie.title}
            className="w-28 h-40 md:w-32 md:h-44 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>

        <h3 className="text-mdl font-semibold text-amber-300  line-clamp-1    truncate mb-3 text-center">
          {movie.title}
        </h3>

        <form className="w-full space-y-3" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 dark:text-gray-300 mb-1">
              Price ($)
            </label>
            <input
              type="number"
              name="price"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              step="0.01"
              placeholder={movie.price}
              value={formik.values.price}
              className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl px-3 py-2 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 dark:text-gray-300 mb-1">
              Stock ($)
            </label>
            <input
              type="number"
              name="stock"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              step="0.01"
              placeholder={movie.stock}
              value={formik.values.stock}
              className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl px-3 py-2 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-700 dark:text-gray-300 mb-1">
              On Sale
            </label>
            <select
              name="onSale"
              value={formik.values.onSale ? "true" : "false"}
              onChange={(e) =>
                formik.setFieldValue("onSale", e.target.value === "true")
              }
              onBlur={formik.handleBlur}
              className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl px-3 py-2 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 transition-all duration-300 text-white font-medium py-2 rounded-xl shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
          >
            Update Movie
          </button>
        </form>
      </div>
    </>
  );
}

export default MovieCard;
