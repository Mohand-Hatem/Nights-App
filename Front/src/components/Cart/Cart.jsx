import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../../config/axio";
import useCartCount from "../../Hooks/useCartCount";
import useDeleteCart from "../../Hooks/useDeleteCart";
import { motion, AnimatePresence } from "framer-motion";
import { PropagateLoader } from "react-spinners";

function Cart() {
  const rowVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.9 },
    visible: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: 50, scale: 0.8, transition: { duration: 0.4 } },
  };
  const { data: count } = useCartCount();
  const deleteCart = useDeleteCart();

  const {
    data: cartData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["Cart"],
    queryFn: async () => {
      const res = await axiosInstance.get("/cart");

      return res?.data?.cart?.items || [];
    },
    refetchInterval: 1000,
  });

  const Checkout = useMutation({
    mutationKey: ["Checkout"],
    mutationFn: async (cartData) => {
      const res = await axiosInstance.post(
        "cart/create-checkout-session",
        cartData
      );

      return res?.data;
    },
    onSuccess: (data) => {
      window.location.href = data.url;
      console.log("Checkout successful:", cartData);
    },
    onError: (error) => {
      console.error("Checkout failed:", error);
    },
  });

  const totalPrice = cartData?.reduce((acc, item) => {
    return acc + item?.bookId?.price * item.count;
  }, 0);

  if (isLoading)
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

  if (isError)
    return (
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center items-center h-screen text-red-400 text-4xl font-bold"
      >
        Error loading movies.
      </motion.div>
    );

  if (cartData.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center items-center h-screen text-gray-400 text-4xl font-bold"
      >
        Sorry, Your cart is empty.
      </motion.div>
    );
  }

  return (
    <>
      <div className="max-w-10xl mx-auto mt-25 bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h1 className="text-3xl  font-extrabold bg-linear-to-r from-[#c5814b] to-[#ffb77a] bg-clip-text text-transparent">
            Shopping
          </h1>

          <span className="text-2xl float-end font-extrabold font-mono bg-linear-to-r from-[#c5814b] to-[#ffb77a] bg-clip-text text-transparent tracking-wide drop-shadow-sm">
            {count} items
          </span>
        </div>
        <div className="overflow-x-auto hidden md:block">
          <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
            <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-800 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3 text-center">Quantity</th>
                <th className="px-6 py-3 text-center">Price</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {cartData?.map((one) => (
                  <motion.tr
                    key={one._id}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 border-b dark:border-gray-700"
                  >
                    <td className="px-6 py-4 flex items-center gap-4">
                      <img
                        src={one?.bookId?.bookImage}
                        alt={one?.bookId?.title}
                        className="w-40 h-40 rounded-xl border border-gray-200 dark:border-gray-700 object-cover "
                      />
                      <div>
                        <h3 className="text-gray-900 dark:text-white font-semibold">
                          {one?.bookId?.title}
                        </h3>
                        <p className="text-gray-400 text-xs">
                          {one?.bookId?.description}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">{one?.count}</td>
                    <td className="px-6 py-4 text-center font-semibold text-gray-900 dark:text-white">
                      ${one?.bookId?.price}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => deleteCart.mutate(one._id)}
                        className="mt-2 w-full py-3 px-5 cursor-pointer bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      >
                        Remove
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        <div className="md:hidden flex flex-col gap-4 p-4">
          {cartData?.map((one) => (
            <div
              key={one._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex flex-col gap-3 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-4">
                <img
                  src={one?.bookId?.bookImage}
                  alt={one?.bookId?.title}
                  className="w-20 h-20 rounded-lg object-cover "
                />
                <div>
                  <h3 className="text-gray-900 dark:text-white font-semibold">
                    {one?.bookId?.title}
                  </h3>
                  <p className="text-gray-400 text-xs">
                    {one?.bookId?.description}
                  </p>
                </div>
              </div>

              <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                <span>Quantity:</span>
                <span>{one.count}</span>
              </div>

              <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                <span>Price:</span>
                <span>${one?.bookId?.price}</span>
              </div>

              <button className="mt-2 w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <span className="text-lg font-semibold text-gray-800 dark:text-white">
            Total: ${totalPrice}
          </span>
          <button
            type="submit"
            onClick={() => {
              Checkout.mutate(cartData);
            }}
            className="cursor-pointer px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}

export default Cart;
