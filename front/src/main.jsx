import React from "react";

import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";

import { LayoutProvider } from "./context/LayoutContext";
import router from "./router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <LayoutProvider>
    <RouterProvider router={router} />
  </LayoutProvider>,
);
