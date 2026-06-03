import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Notfound() {
  return (
    <div className="theme-section relative -left-[5%] -mb-18 flex min-h-screen w-[110%] items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-center"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.12 }}
          transition={{ duration: 1 }}
          className="select-none text-[200px] font-extrabold tracking-tighter text-foreground md:text-[260px]"
        >
          404
        </motion.h1>

        <div className="relative -mt-28">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-4xl font-bold text-foreground md:text-5xl"
          >
            Page Not Found
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="theme-muted mx-auto mt-4 max-w-md text-lg"
          >
            The page you are looking for doesn’t exist or has been moved.
          </motion.p>

          <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.96 }}>
            <Link
              to="/home"
              className="mt-8 inline-block rounded-xl bg-accent px-8 py-3 text-lg font-semibold text-white shadow-lg transition hover:opacity-90"
            >
              Go Home
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Notfound;
