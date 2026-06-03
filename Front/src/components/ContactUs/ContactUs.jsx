import {
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
} from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { IoMdMail } from 'react-icons/io';
import { BiSolidPhoneCall } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from './../../config/axio';
import toast from 'react-hot-toast';

function ContactUs() {
  const sendEmail = useMutation({
    mutationKey: ["sendemail"],
    mutationFn: async (userData) => {
      const res = await axiosInstance.post("/user/send-email", userData);
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
      toast.loading("Sending...", { duration: 1000 });
      sendEmail.mutate(data, {
        onSuccess: () => {
          toast.success("Send Successful! , Thanks");
          resetForm();
        },
      });
    },
  });

  return (
    <div className="theme-section relative mx-auto mt-20 flex min-h-screen items-center justify-center overflow-hidden rounded-4xl md:p-6 xl:right-[5%] xl:w-[110%]">
      <div className="theme-card relative z-10 -mt-10 flex w-full max-w-7xl flex-col gap-10 rounded-3xl p-12 md:flex-row">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-8 md:w-1/2"
        >
          <h2 className="theme-heading text-4xl md:text-5xl">Get in Touch</h2>
          <p className="theme-muted">
            Reach out via the form or through social media below. We love to
            collaborate!
          </p>

          <div className="flex flex-col gap-5 text-foreground">
            <div className="flex items-center gap-4 transition-colors hover:text-sky-600">
              <FaLocationDot className="text-2xl text-sky-600" /> Cairo, Egypt
            </div>
            <div className="flex items-center gap-4 transition-colors hover:text-sky-600">
              <IoMdMail className="text-2xl text-sky-600" /> mohanedhatem44@gmail.com
            </div>
            <div className="flex items-center gap-4 transition-colors hover:text-sky-600">
              <BiSolidPhoneCall className="text-2xl text-sky-600" /> +20-1063505368
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="https://www.linkedin.com/in/mohand-hatem-73995a262/"
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer rounded-full bg-blue-600 px-4 py-4 text-white shadow-lg hover:bg-blue-700"
            >
              <FaLinkedin size={28} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="https://api.whatsapp.com/send?phone=201063505368"
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer rounded-full bg-green-600 px-4 py-4 text-white shadow-lg hover:bg-green-700"
            >
              <FaWhatsapp size={28} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="https://www.instagram.com/mohandhatem1?igsh=dzVxMHZjOThsd3dx"
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer rounded-full bg-purple-600 px-4 py-4 text-white shadow-lg hover:bg-purple-700"
            >
              <FaInstagram size={28} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="https://www.facebook.com/mohaned.hatem.39/"
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer rounded-full bg-blue-700 px-4 py-4 text-white shadow-lg hover:bg-blue-800"
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
            className="theme-input"
          />
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            required
            placeholder="Your Email"
            className="theme-input"
          />
          <textarea
            name="subject"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.subject}
            required
            placeholder="Your Message"
            rows="5"
            className="theme-input resize-none"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            className="mt-4 cursor-pointer rounded-xl bg-sky-600 px-8 py-3 font-bold text-white shadow-lg transition hover:bg-sky-700"
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}

export default ContactUs;
