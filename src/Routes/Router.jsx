import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import Home from "../components/Home";
import Main from "../components/Layout/Main";
import SignUp from "../components/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },

      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);
