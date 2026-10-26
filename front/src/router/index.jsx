import { createBrowserRouter } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
import Categories from "../pages/Categories/CategoriesList";
import Members from "../pages/Members/MembersList";
import MemberCreate from "../pages/Members/MemberCreate";

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
      {
        path: "members/new",
        element: <MemberCreate />,
      },

      // {
      // path:"members/:id",
      // element:<MemberDetail/>
      // }
    ],
  },
]);

export default router;
