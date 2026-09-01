import {
  createBrowserRouter,
} from "react-router-dom";

import App from "../App";

import Home from "../home/Home";
import Shop from "../shop/Shop";
import SingleBook from "../shop/SingleBook";
import Cart from "../shop/Cart";
import Checkout from "../shop/Checkout";

import About from "../components/About";
import ContactUs from "../components/ContactUs";
import Blog from "../components/Blog";
import Privacypolicy from "../components/Privacypolicy";
import Login from "../components/Login";
import SignUp from "../components/SignUp";

import DashboardLayout from "../dashboard/DashboardLayout";
import Dashboard from "../dashboard/Dashboard";
import UploadBook from "../dashboard/UploadBook";
import ManageBook from "../dashboard/ManageBook";
import EditBook from "../dashboard/EditBook";

import PrivateRoute from "../privateRoute/PrivateRoute";

import API_URL from "../config/api";

const getBook = async ({ params }) => {
  const { id } = params;

  if (!id) {
    throw new Response(
      "Book ID is required.",
      {
        status: 400,
      }
    );
  }

  if (!API_URL) {
    throw new Response(
      "Backend API is not configured.",
      {
        status: 500,
      }
    );
  }

  try {
    const response =
      await fetch(
        `${API_URL}/books/${id}`
      );

    let data = null;

    try {
      data =
        await response.json();
    } catch {
      data = null;
    }

    if (!response.ok) {
      throw new Response(
        data?.message ||
          "Book not found.",
        {
          status: response.status,
        }
      );
    }

    return data;
  } catch (error) {
    if (
      error instanceof Response
    ) {
      throw error;
    }

    console.error(
      "Get book error:",
      error
    );

    throw new Response(
      "Unable to connect to the backend.",
      {
        status: 503,
      }
    );
  }
};

const router =
  createBrowserRouter([
    {
      path: "/",
      element: <App />,

      children: [
        // PUBLIC

        {
          index: true,
          element: <Home />,
        },

        {
          path: "shop",
          element: <Shop />,
        },

        {
          path: "about",
          element: <About />,
        },

        {
          path: "contact-us",
          element: <ContactUs />,
        },
        {
          path: "blog",
          element: <Blog />,
        },
        {
          path: "/privacy-policy",
          element: <Privacypolicy/>,
        },

        // AUTH

        {
          path: "login",
          element: <Login />,
        },

        {
          path: "sign-up",
          element: <SignUp />,
        },

        // BOOK

        {
          path: "books/:id",
          loader: getBook,
          element: <SingleBook />,
        },

        // CART

        {
          path: "cart",
          element: <Cart />,
        },

        // CHECKOUT

        {
          path: "checkout",
          element: <Checkout />,
        },

        // PROTECTED DASHBOARD

        {
          path: "/admin/dashboard/",
          element: (
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          ),

          children: [
            {
              index: true,
              element: <Dashboard />,
            },

            {
              path: "upload",
              element: <UploadBook />,
            },

            {
              path: "manage",
              element: <ManageBook />,
            },

            {
              path: "edit-books/:id",
              loader: getBook,
              element: <EditBook />,
            },
          ],
        },
      ],
    },
  ]);

export default router;