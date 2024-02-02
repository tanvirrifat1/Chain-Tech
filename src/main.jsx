import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Router.jsx";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./components/Auth/AuthProvider.jsx";
import { QueryClientProvider } from "@tanstack/react-query";

import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
