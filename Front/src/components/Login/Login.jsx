import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axiosInstance from '../../config/axio';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Context/Conex';
import { useQueryClient } from '@tanstack/react-query';
import { GoogleLogin } from '@react-oauth/google';
import useGoogleAuth from '../../Hooks/useGoogleAuth';
import { queryKeys } from '../../lib/queryKeys';
import { useTheme } from '../../Context/ThemeContext';

function Login() {
  const queryClient = useQueryClient();
  const { setIsAuth } = useContext(AuthContext);
  const { loading, loginWithGoogle } = useGoogleAuth(setIsAuth);
  const { isDark } = useTheme();
  const regNav = useNavigate();

  async function handleSubmit(loginUser) {
    try {
      const res = await axiosInstance.post("/user/login", loginUser);
      toast.success("Login Successful!");
      queryClient.invalidateQueries({ queryKey: queryKeys.cart });
      queryClient.invalidateQueries({ queryKey: queryKeys.cartCount });
      queryClient.invalidateQueries({ queryKey: queryKeys.profile });
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
    <div className="theme-form">
      <div className="anime flex items-baseline justify-between">
        <h2 className="theme-heading pb-5 text-2xl">Sign In</h2>
        <div className="loader"></div>
      </div>
      <form onSubmit={formik.handleSubmit}>
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
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="theme-label">
            Your password
          </label>
          <input
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="password"
            id="password"
            className="theme-input"
            placeholder="*********"
            required
          />
        </div>
        <div className="flex flex-col items-center justify-center space-y-2 md:flex-row md:items-center md:justify-between">
          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-purple-700 sm:w-auto"
          >
            Log In
          </button>
          <div className="flex items-center text-sm">
            <p>Don't have an account?</p>
            <p
              onClick={() => regNav("/register")}
              className="ml-1 cursor-pointer text-accent underline"
            >
              Register
            </p>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <GoogleLogin
            theme={isDark ? "filled_black" : "outline"}
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
  );
}

export default Login;
