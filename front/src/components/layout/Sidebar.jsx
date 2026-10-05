import {
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
} from "@mui/material";

import {
  Dashboard,
  Category,
  Receipt,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";

import { NavLink } from "react-router-dom";

import { useLayout } from "../../context/LayoutContext";

const expandedWidth = 260;
const collapsedWidth = 80;

const menus = [
  {
    label: "Dashboard",
    path: "/",
    icon: <Dashboard />,
  },

  {
    label: "Catégories",
    path: "/categories",
    icon: <Category />,
  },

  {
    label: "Transactions",
    path: "/transactions",
    icon: <Receipt />,
  },
];

function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useLayout();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarOpen ? expandedWidth : collapsedWidth,

        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: sidebarOpen ? expandedWidth : collapsedWidth,

          boxSizing: "border-box",

          background: "#202123",

          color: "#fff",

          overflowX: "hidden",

          transition: "width .25s",
        },
      }}
    >
      <Box
        sx={{
          height: 64,

          display: "flex",

          alignItems: "center",

          justifyContent: sidebarOpen ? "space-between" : "center",

          px: 2,
        }}
      >
        {sidebarOpen && (
          <Typography fontWeight={700}>Treasury Admin</Typography>
        )}

        <IconButton
          onClick={toggleSidebar}
          sx={{
            color: "white",
          }}
        >
          {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Box>

      <List
        sx={{
          overflowY: "auto",

          height: "calc(100% - 64px)",
        }}
      >
        {menus.map((menu) => (
          <ListItemButton
            key={menu.label}
            component={NavLink}
            to={menu.path}
            sx={{
              borderRadius: 2,

              mx: 1,

              mb: 0.5,

              "&.active": {
                background: "rgba(255,255,255,0.12)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: "white",

                minWidth: sidebarOpen ? 40 : "auto",
              }}
            >
              {menu.icon}
            </ListItemIcon>

            {sidebarOpen && <ListItemText primary={menu.label} />}
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;
