import {
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { BiSolidPhoneCall } from "react-icons/bi";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./../../config/axio";
import toast from "react-hot-toast";

function ContactUs() {
  const sendEmail = useMutation({
    mutationKey: ["sendemail"],
    mutationFn: async (userData) => {
      console.log(`Before: ${userData}`);
      const res = await axiosInstance.post("/user/send-email", userData);
      console.log(res?.data);
      return res?.data;
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
    },
    onSubmit: (data, { resetForm }) => {
      toast.loading("Redirecting...", { duration: 1000 });
      sendEmail.mutate(data, {
        onSuccess: () => {
          toast.success("Send Successful! , Thanks");
          resetForm();
        },
      });
    },
  });

  return (
    <div className="relative min-h-screen rounded-4xl xl:right-[5%]  mx-auto xl:w-[110%] mt-20 bg-linear-to-r from-gray-900 via-gray-900 to-black flex items-center justify-center md:p-6 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute bg-amber-700/20 w-96 h-96 rounded-full -top-40 -left-40 animate-pulse-slow"></div>
        <div className="absolute bg-yellow-500/20 w-72 h-72 rounded-full -bottom-32 -right-32 animate-pulse-slow"></div>
        <div className="absolute bg-cyan-500/10 w-64 h-64 rounded-full top-1/2 left-1/3 animate-pulse-slow"></div>
      </div>

      <div className="relative z-10  bg-gray-900/50 backdrop-blur-xl rounded-3xl shadow-2xl max-w-7xl w-full p-12 flex flex-col md:flex-row gap-10 -mt-10">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-8 md:w-1/2"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-[#c5814b] to-[#ffb77a]">
            Get in Touch
          </h2>
          <p className="text-gray-300">
            Reach out via the form or through social media below. We love to
            collaborate!
          </p>

          <div className="flex flex-col gap-5 text-gray-200">
            <div className="flex items-center gap-4 hover:text-cyan-400 transition-colors">
              <FaLocationDot className="text-cyan-400 text-2xl" /> Cairo, Egypt
            </div>
            <div className="flex items-center gap-4 hover:text-cyan-400 transition-colors">
              <IoMdMail className="text-cyan-400 text-2xl" />{" "}
              mohanedhatem44@gmail.com
            </div>
            <div className="flex items-center gap-4 hover:text-cyan-400 transition-colors">
              <BiSolidPhoneCall className="text-cyan-400 text-2xl" />{" "}
              +20-1063505368
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="https://www.linkedin.com/in/mohand-hatem-73995a262/"
              target="_blank"
              className="px-4 py-4 cursor-pointer bg-blue-600 hover:bg-blue-700 rounded-full text-white shadow-lg"
            >
              <FaLinkedin size={28} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="https://api.whatsapp.com/send?phone=201063505368"
              target="_blank"
              className="px-4 py-4 cursor-pointer bg-green-600 hover:bg-green-700 rounded-full text-white shadow-lg"
            >
              <FaWhatsapp size={28} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="https://www.instagram.com/mohandhatem1?igsh=dzVxMHZjOThsd3dx"
              target="_blank"
              className="px-4 py-4 cursor-pointer bg-purple-600 hover:bg-purple-700 rounded-full text-white shadow-lg"
            >
              <FaInstagram size={28} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="https://www.facebook.com/mohaned.hatem.39/"
              target="_blank"
              className="px-4 py-4 cursor-pointer bg-blue-700 hover:bg-blue-800 rounded-full text-white shadow-lg"
            >
              <FaFacebook size={28} />
            </motion.a>
          </div>
        </motion.div>

        <motion.form
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-4 md:w-1/2"
          onSubmit={formik.handleSubmit}
        >
          <input
            type="text"
            name="name"
            required
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            placeholder="Your Name"
            className="bg-gray-800/50 text-gray-200 placeholder-gray-400 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all hover:shadow-lg"
          />
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            required
            placeholder="Your Email"
            className="bg-gray-800/50 text-gray-200 placeholder-gray-400 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all hover:shadow-lg"
          />
          <textarea
            name="subject"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.subject}
            required
            placeholder="Your Message"
            rows="5"
            className="bg-gray-800/50 text-gray-200 placeholder-gray-400 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all hover:shadow-lg resize-none"
          ></textarea>
          <motion.button
            type="submit"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgb(0 255 255 / 0.6)",
            }}
            className="relative cursor-pointer overflow-hidden  mt-4 px-8 py-3 bg-linear-to-r from-gray-600 via-gray-700 to-gray-800 text-gray-300 font-bold rounded-xl shadow-lg transition-all duration-300"
          >
            Send Message
            <div className="absolute bg-amber-400/20 w-25 h-25 rounded-full -top-14 -left-7 animate-pulse-slow"></div>
            <div className="absolute bg-sky-500/20 w-15 h-15 rounded-full -bottom-1 -right-1 animate-pulse-slow"></div>
            <div className="absolute bg-cyan-400/10 w-10 h-10 rounded-full top-1/2 left-1/3 animate-pulse-slow"></div>
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}

export default ContactUs;
