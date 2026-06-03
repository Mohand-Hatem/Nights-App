import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axiosInstance from "../../config/axio";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { GoogleLogin } from "@react-oauth/google";
import { AuthContext } from "../../Context/Conex";
import useGoogleAuth from "../../Hooks/useGoogleAuth";
import { useTheme } from "../../Context/ThemeContext";

function Register() {
  const { setIsAuth } = useContext(AuthContext);
  const { loginWithGoogle } = useGoogleAuth(setIsAuth);
  const { isDark } = useTheme();
  const logNav = useNavigate();

  async function handleSubmit(registerUser) {
    try {
      const res = await axiosInstance.post("/user/register", registerUser);
      toast.loading("Redirecting...", { duration: 2000 });
      toast.success("Register Successfully!");
      setTimeout(() => {
        logNav("/login");
      }, 2000);
    } catch (error) {
      console.error(error?.message);
    }
  }

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must be at most 20 characters")
        .matches(/^[A-Z].*$/, "First character must be uppercase"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .matches(
          /^[A-Z](?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
          "Password must start with an Uppercase letter, Contain numbers, and Symbols"
        )
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password must be at most 20 characters"),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <>
      <div className="theme-form register">
        <div className="anime flex items-baseline justify-between">
          <h2 className="theme-heading pb-5 text-2xl">Create Your Account</h2>
          <div className="loader"></div>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="theme-label">
              Your name
            </label>
            <input
              type="text"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="username"
              id="name"
              className="theme-input"
              placeholder="Andrew Jackson"
              required
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="text-red-500 font-semibold text-sm mt-1">
                {formik.errors.username}
              </div>
            ) : null}
            {!formik.errors.username && formik.touched.username ? (
              <div className="text-green-500 font-semibold text-sm mt-1">
                Looks good!
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="theme-label">
              Your email
            </label>
            <input
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="email"
              id="email"
              className="theme-input"
              placeholder="andrew@mail.com"
              required
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500  font-semibold text-sm mt-1">
                {formik.errors.email}
              </div>
            ) : null}
            {!formik.errors.email && formik.touched.email ? (
              <div className="text-green-500 font-semibold text-sm mt-1">
                Looks good!
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="theme-label"
            >
              Your password
            </label>
            <input
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="password"
              type="password"
              id="password"
              className="theme-input"
              placeholder="*********"
              required
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 font-semibold text-sm mt-1">
                {formik.errors.password}
              </div>
            ) : null}
            {!formik.errors.password && formik.touched.password ? (
              <div className="text-green-500 font-semibold text-sm mt-1">
                Looks good!
              </div>
            ) : null}
          </div>
          <div>
            <p className="text-red-500 pb-5" />
          </div>
          <div className="flex  space-y-2 flex-col justify-center items-center md:flex md:flex-row md:items-center md:justify-between ">
            <button
              type="submit"
              className="text-white cursor-pointer bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 px-5 w-full sm:w-auto"
            >
              Register
            </button>
            <div className="flex items-baseline text-sm">
              <p>Already have an account?</p>
              <p
                onClick={() => logNav("/login")}
                className="ml-1 cursor-pointer text-accent underline"
              >
                Sign in
              </p>
            </div>
          </div>
          <div className="google mx-auto mt-3 w-fit">
            <GoogleLogin
              theme={isDark ? "filled_black" : "outline"}
              size="large"
              logo_alignment="left"
              shape="pill"
              width="300"
              text="signup"
              onSuccess={(res) => loginWithGoogle(res?.credential)}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
