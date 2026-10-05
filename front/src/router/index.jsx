import { createBrowserRouter } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
import Categories from "../pages/Categories/CategoriesList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        path: "categories",
        element: <Categories />,
      },
    ],
  },
]);

export default router;