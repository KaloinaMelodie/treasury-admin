import {
  Avatar,
  Box,
  Menu,
  MenuItem,
  Divider,
  Typography,
} from "@mui/material";

import { useState } from "react";

import { Logout, Person, Settings } from "@mui/icons-material";

function UserMenu() {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  function handleOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <>
      <Box
        onClick={handleOpen}
        sx={{
          display: "flex",

          alignItems: "center",

          gap: 1,

          cursor: "pointer",

          px: 2,

          py: 1,

          borderRadius: 2,

          "&:hover": {
            background: "rgba(0,0,0,0.05)",
          },
        }}
      >
        <Avatar
          sx={{
            width: 36,

            height: 36,
          }}
        >
          M
        </Avatar>

        <Typography fontWeight={600}>Maillard</Typography>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",

          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",

          horizontal: "right",
        }}
      >
        <MenuItem>
          <Person sx={{ mr: 1 }} />
          Mon profil
        </MenuItem>

        <MenuItem>
          <Settings sx={{ mr: 1 }} />
          Paramètres
        </MenuItem>

        <Divider />

        <MenuItem
          onClick={() => {
            console.log("Future logout");
          }}
        >
          <Logout sx={{ mr: 1 }} />
          Déconnexion
        </MenuItem>
      </Menu>
    </>
  );
}

export default UserMenu;
