import { motion } from "framer-motion";

function Notfound() {
  return (
    <div className="min-h-screen flex w-[110%] relative -left-[5%] -mb-18 items-center justify-center bg-linear-to-br from-gray-900 to-black px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-center"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1 }}
          className="text-[200px] md:text-[260px] font-extrabold text-white tracking-tighter select-none"
        >
          404
        </motion.h1>

        <div className="-mt-28 relative">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold text-white drop-shadow-xl"
          >
            Page Not Found
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-gray-300 mt-4 max-w-md mx-auto text-lg"
          >
            The page you are looking for doesn’t exist or has been moved.
          </motion.p>

          <motion.a
            href="/home"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.96 }}
            className="inline-block mt-8 px-8 py-3 text-lg font-semibold rounded-xl 
            bg-linear-to-r from-[#c5814b] to-[#ffb77a] text-black shadow-lg 
            hover:shadow-2xl transition-all duration-300"
          >
            Go Home
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}

export default Notfound;
