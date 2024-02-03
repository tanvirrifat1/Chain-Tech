import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import Home from "../components/Home";
import Main from "../components/Layout/Main";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import ProFileUpdate from "../components/ProFileUpdate";
import Other from "../components/Other";

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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/other",
        element: <Other />,
      },
      {
        path: "/:id",
        element: <ProFileUpdate />,
      },

      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);
