import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { PropagateLoader } from "react-spinners";
import useGetBook from "../../Hooks/useGetBook";
import LazyImage from "../common/LazyImage";

function BookInfo() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetBook(id);

  if (isLoading) {
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
  }
  if (isError)
    return (
      <div className="mt-20 text-center text-red-500">
        Error: {error.message}
      </div>
    );

  const book = data?.foundedBook;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mx-auto mt-15 p-6 md:mt-10 md:p-12"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="theme-card relative flex flex-col items-center overflow-hidden md:flex-row md:items-start"
      >
        {book?.bookImage && (
          <motion.div
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
            className="relative h-80 w-full overflow-hidden md:h-full md:w-1/3 md:rounded-l-2xl"
          >
            <LazyImage
              src={book.bookImage}
              alt={book.title}
              className="h-80 w-full object-cover md:h-full md:rounded-l-2xl"
            />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="relative z-20 flex-1 p-6 text-foreground md:p-10"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="theme-heading pb-10 pt-5 font-mono text-2xl tracking-wide md:text-5xl"
          >
            {book.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            <p className="mb-6">
              <span className="font-semibold text-muted">Author:</span> {book.author}
            </p>
            <p className="mb-6">
              <span className="font-semibold text-muted">Category:</span>{" "}
              {book.category?.name}
            </p>
            <p className="mb-6">
              <span className="font-semibold text-muted">Price:</span> ${book.price}
            </p>
            <p className="mb-6">
              <span className="font-semibold text-muted">On Sale:</span>{" "}
              {book.onSale ? "Yes" : "No"}
            </p>
            <p className="mb-4">{book.description}</p>
            <div className="mt-4 flex flex-wrap gap-4">
              {book.star && (
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  className="h-fit w-fit rounded-full bg-yellow-500 px-3 py-1 font-semibold text-black"
                >
                  ⭐ {book.star}
                </motion.span>
              )}
              {book.stock && (
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  className="h-fit w-fit rounded-full bg-blue-600 px-3 py-1 font-semibold text-white"
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
