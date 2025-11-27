import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Register from "./components/Register/Register";
import Cart from "./components/Cart/Cart";
import ProtectedBox from "./components/ProtectedBox/ProtectedBox";
import Conex from "./Context/Conex";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import AdminProfile from "./components/AdminProfile/AdminProfile";
import CreateMovie from "./components/CreateMovie/CreateMovie";
import UpdateMovie from "./components/UpdateMovie/UpdateMovie";
import GeneralAdmin from "./components/GeneralAdmin/GeneralAdmin";
import DeleteMovie from "./components/DeleteMovie/DeleteMovie";
import Landing from "./components/Landing/Landing";
import MovieInfo from "./components/MovieInfo/MovieInfo";
import ChecoutSuccess from "./components/ChecoutSuccess/ChecoutSuccess";
import ContactUs from "./components/ContactUs/ContactUs";
import News from "./components/News/News";
import Notfound from "./components/Notfound/Notfound";

const queryClient = new QueryClient();

let routes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "*",
        element: <Notfound />,
      },
      {
        path: "contact",
        element: <ContactUs />,
      },
      {
        path: "news",
        element: <News />,
      },
      {
        path: "home",
        element: (
          <ProtectedBox>
            <Home />
          </ProtectedBox>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedBox>
            <Cart />
          </ProtectedBox>
        ),
      },
      {
        path: "checout-success",
        element: (
          <ProtectedBox>
            <ChecoutSuccess />
          </ProtectedBox>
        ),
      },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      {
        path: "book/:id",
        element: (
          <ProtectedBox>
            <MovieInfo />
          </ProtectedBox>
        ),
      },

      {
        path: "admin",
        element: (
          <ProtectedBox adminOnly>
            <Dashboard />
          </ProtectedBox>
        ),
        children: [
          { index: true, element: <GeneralAdmin /> },
          { path: "profile", element: <AdminProfile /> },
          { path: "create", element: <CreateMovie /> },
          { path: "update", element: <UpdateMovie /> },
          { path: "delete", element: <DeleteMovie /> },
        ],
      },
    ],
  },
]);

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Conex>
          <RouterProvider router={routes}></RouterProvider>
        </Conex>
      </QueryClientProvider>

      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toasterId="default"
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            iconTheme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </>
  );
}

export default App;
