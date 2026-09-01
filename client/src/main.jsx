import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import router from "./router/router";
import AuthProvider from "./context/AuthProvider";
import CartProvider from "./context/CartProvider";

import "./index.css";

const rootElement =
  document.getElementById("root");

if (!rootElement) {
  throw new Error(
    "Root element not found."
  );
}

ReactDOM.createRoot(
  rootElement
).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider
          router={router}
        />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);