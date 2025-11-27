import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axiosInstance from "../../config/axio";
import toast from "react-hot-toast";
import { AuthContext } from "../../Context/Conex";
import { useQueryClient } from "@tanstack/react-query";
import { GoogleLogin } from "@react-oauth/google";
import useGoogleAuth from "../../Hooks/useGoogleAuth";

function Login() {
  const queryClient = useQueryClient();
  const { setIsAuth } = useContext(AuthContext);
  const { loading, error, loginWithGoogle } = useGoogleAuth(setIsAuth);
  const regNav = useNavigate();

  async function handleSubmit(loginUser) {
    try {
      const res = await axiosInstance.post("/user/login", loginUser);
      toast.success("Login Successful!");
      queryClient.invalidateQueries(["Cart"]);
      queryClient.invalidateQueries(["Count"]);
      queryClient.invalidateQueries(["profile"]);
      toast.loading("Redirecting...", { duration: 1000 });
      setTimeout(() => {
        setIsAuth(true);
        regNav("/home");
      }, 1000);
    } catch (error) {
      console.error(error?.message);
      toast.error(`${error.response?.data?.error || "Login Failed"}`);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleSubmit,
  });
  return (
    <>
      <div className="register max-w-lg mx-auto mt-30 backdrop-blur-lg bg-opacity-80 rounded-lg shadow-lg p-5 bg-gray-900 text-white">
        <div className="anime flex justify-between items-baseline ">
          <h2 className="text-2xl font-bold pb-5">Sign Up</h2>
          <div className="loader"></div>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Your email
            </label>
            <input
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="email"
              id="email"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
              placeholder="andrew@mail.com"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium"
            >
              Your password
            </label>
            <input
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="password"
              id="password"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
              placeholder="*********"
              required
            />
          </div>
          <div>
            <p className="text-red-500 pb-5" />
          </div>
          <div className="flex space-y-2 flex-col justify-center items-center md:flex md:flex-row md:items-center md:justify-between ">
            <button
              type="submit"
              className="text-white cursor-pointer bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 px-5 w-full sm:w-auto"
            >
              Log In
            </button>
            <div className="flex items-center text-sm">
              <p>Don't have an account?</p>
              <p
                onClick={() => regNav("/register")}
                className="underline cursor-pointer ml-1"
              >
                Register
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <GoogleLogin
              theme="filled_blue"
              size="large"
              logo_alignment="left"
              shape="pill"
              width="300"
              text="signin"
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

export default Login;
