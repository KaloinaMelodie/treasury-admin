import { AppBar, Toolbar, Box, Typography } from "@mui/material";

import UserMenu from "./UserMenu";

import { useLayout } from "../../context/LayoutContext";

import { Menu } from "@mui/icons-material";

function Topbar() {
  const { toggleSidebar } = useLayout();

  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        background: "#ffffff",

        color: "#202123",
      }}
    >
      <Toolbar>
        <Box
          sx={{
            display: "flex",

            alignItems: "center",
          }}
        >
          {/* <Menu
            sx={{
              cursor: "pointer",

              mr: 2,
            }}
            onClick={toggleSidebar}
          /> */}

          {/* <Typography fontWeight={600}>Treasury Admin</Typography> */}
        </Box>

        <Box
          sx={{
            marginLeft: "auto",
          }}
        >
          <UserMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;
