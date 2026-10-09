import { createBrowserRouter } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
import Categories from "../pages/Categories/CategoriesList";
import Members from "../pages/Members/MembersList";
const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "members",
        element: <Members />,
      },
    ],
  },
]);

export default router;
