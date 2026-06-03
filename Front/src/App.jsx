import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import './App.css';
import { queryClient } from './lib/queryClient';
import Layout from './components/Layout/Layout';
import Conex from './Context/Conex';
import { ThemeProvider } from './Context/ThemeContext';
import PageLoader from './components/common/PageLoader';
import ProtectedBox from './components/ProtectedBox/ProtectedBox';

const Landing = lazy(() => import('./components/Landing/Landing'));
const Login = lazy(() => import('./components/Login/Login'));
const Register = lazy(() => import('./components/Register/Register'));
const Home = lazy(() => import('./components/Home/Home'));
const Cart = lazy(() => import('./components/Cart/Cart'));
const MovieInfo = lazy(() => import('./components/MovieInfo/MovieInfo'));
const ChecoutSuccess = lazy(() => import('./components/ChecoutSuccess/ChecoutSuccess'));
const ContactUs = lazy(() => import('./components/ContactUs/ContactUs'));
const News = lazy(() => import('./components/News/News'));
const Notfound = lazy(() => import('./components/Notfound/Notfound'));
const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));
const GeneralAdmin = lazy(() => import('./components/GeneralAdmin/GeneralAdmin'));
const AdminProfile = lazy(() => import('./components/AdminProfile/AdminProfile'));
const CreateMovie = lazy(() => import('./components/CreateMovie/CreateMovie'));
const UpdateMovie = lazy(() => import('./components/UpdateMovie/UpdateMovie'));
const DeleteMovie = lazy(() => import('./components/DeleteMovie/DeleteMovie'));

function withSuspense(element) {
  return <Suspense fallback={<PageLoader />}>{element}</Suspense>;
}

const routes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: withSuspense(<Landing />),
      },
      {
        path: "*",
        element: withSuspense(<Notfound />),
      },
      {
        path: "contact",
        element: withSuspense(<ContactUs />),
      },
      {
        path: "news",
        element: withSuspense(<News />),
      },
      {
        path: "home",
        element: (
          <ProtectedBox>
            {withSuspense(<Home />)}
          </ProtectedBox>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedBox>
            {withSuspense(<Cart />)}
          </ProtectedBox>
        ),
      },
      {
        path: "checout-success",
        element: (
          <ProtectedBox>
            {withSuspense(<ChecoutSuccess />)}
          </ProtectedBox>
        ),
      },
      { path: "register", element: withSuspense(<Register />) },
      { path: "login", element: withSuspense(<Login />) },
      {
        path: "book/:id",
        element: (
          <ProtectedBox>
            {withSuspense(<MovieInfo />)}
          </ProtectedBox>
        ),
      },
      {
        path: "admin",
        element: (
          <ProtectedBox adminOnly>
            {withSuspense(<Dashboard />)}
          </ProtectedBox>
        ),
        children: [
          { index: true, element: withSuspense(<GeneralAdmin />) },
          { path: "profile", element: withSuspense(<AdminProfile />) },
          { path: "create", element: withSuspense(<CreateMovie />) },
          { path: "update", element: withSuspense(<UpdateMovie />) },
          { path: "delete", element: withSuspense(<DeleteMovie />) },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Conex>
            <RouterProvider router={routes} />
          </Conex>
        </ThemeProvider>
      </QueryClientProvider>

      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toasterId="default"
        toastOptions={{
          className: "",
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: "#363636",
            color: "#fff",
          },
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
