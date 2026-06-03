import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../config/axio";
import useCartCount from "../../Hooks/useCartCount";
import useDeleteCart from "../../Hooks/useDeleteCart";
import useCart from "../../Hooks/useCart";
import { motion, AnimatePresence } from "framer-motion";
import { PropagateLoader } from "react-spinners";
import LazyImage from "../common/LazyImage";

function Cart() {
  const rowVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.9 },
    visible: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: 50, scale: 0.8, transition: { duration: 0.4 } },
  };
  const { data: count } = useCartCount();
  const deleteCart = useDeleteCart();
  const { data: cartData, isLoading, isError } = useCart();

  const Checkout = useMutation({
    mutationKey: ["Checkout"],
    mutationFn: async (cartItems) => {
      const res = await axiosInstance.post(
        "cart/create-checkout-session",
        cartItems
      );
      return res?.data;
    },
    onSuccess: (data) => {
      window.location.href = data.url;
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
        className="theme-muted flex h-screen items-center justify-center text-lg"
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
        className="flex h-screen items-center justify-center text-4xl font-bold text-red-500"
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
        className="theme-muted flex h-screen items-center justify-center text-4xl font-bold"
      >
        Sorry, Your cart is empty.
      </motion.div>
    );
  }

  return (
    <div className="theme-card mx-auto mt-25 max-w-10xl overflow-hidden">
      <div className="flex items-center justify-between border-b border-border p-6">
        <h1 className="theme-heading text-3xl">Shopping</h1>
        <span className="font-mono text-2xl font-extrabold text-accent">
          {count} items
        </span>
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left text-sm text-foreground">
          <thead className="theme-table-head">
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
                  className="theme-table-row"
                >
                  <td className="flex items-center gap-4 px-6 py-4">
                    <LazyImage
                      src={one?.bookId?.bookImage}
                      alt={one?.bookId?.title}
                      className="h-40 w-40 rounded-xl border border-border object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {one?.bookId?.title}
                      </h3>
                      <p className="theme-muted text-xs">
                        {one?.bookId?.description}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">{one?.count}</td>
                  <td className="px-6 py-4 text-center font-semibold">
                    ${one?.bookId?.price}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => deleteCart.mutate(one._id)}
                      className="mt-2 w-full cursor-pointer rounded-lg bg-red-500 px-5 py-3 text-white transition hover:bg-red-600"
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

      <div className="flex flex-col gap-4 p-4 md:hidden">
        {cartData?.map((one) => (
          <div
            key={one._id}
            className="theme-card flex flex-col gap-3 p-4"
          >
            <div className="flex items-center gap-4">
              <LazyImage
                src={one?.bookId?.bookImage}
                alt={one?.bookId?.title}
                className="h-20 w-20 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-semibold text-foreground">
                  {one?.bookId?.title}
                </h3>
                <p className="theme-muted text-xs">{one?.bookId?.description}</p>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span>Quantity:</span>
              <span>{one.count}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Price:</span>
              <span>${one?.bookId?.price}</span>
            </div>
            <button
              onClick={() => deleteCart.mutate(one._id)}
              className="mt-2 w-full rounded-lg bg-red-500 py-2 text-white transition hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-border bg-highlight p-6">
        <span className="text-lg font-semibold text-foreground">
          Total: ${totalPrice}
        </span>
        <button
          type="submit"
          onClick={() => Checkout.mutate(cartData)}
          className="cursor-pointer rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white transition hover:bg-blue-700"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
