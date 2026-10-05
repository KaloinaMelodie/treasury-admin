import { Outlet } from "react-router-dom";

import { Box } from "@mui/material";

import Sidebar from "../components/Sidebar";

const drawerWidth = 240;

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

          width: {
            xs: "100%",
            md: `calc(100% - ${drawerWidth}px)`,
          },

          p: {
            xs: 2,
            md: 4,
          },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default AdminLayout;
