import { Outlet } from "react-router-dom";

import { Box } from "@mui/material";

import Sidebar from "../components/layout/Sidebar";

import Topbar from "../components/layout/Topbar";

function AdminLayout() {
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,

          minHeight: "100vh",

          background: "#f7f7f8",
        }}
      >
        <Topbar />

        <Box
          sx={{
            p: 3,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default AdminLayout;
