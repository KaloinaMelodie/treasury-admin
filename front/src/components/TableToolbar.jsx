import { TextField, MenuItem, Box } from "@mui/material";
import { useState } from "react";
function TableToolbar({
  setSearch,

  type,
  setType,

  status,
  setStatus,
}) {
  const [searchInput, setSearchInput] = useState("");
  return (
    <Box
      sx={{
        display: "flex",

        gap: 2,

        mb: 3,

        flexDirection: {
          xs: "column",

          md: "row",
        },
      }}
    >
      <TextField
        label="Recherche"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setSearch(searchInput);
          }
        }}
        fullWidth
      />

      <TextField
        select
        label="Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        sx={{
          minWidth: 150,
        }}
      >
        <MenuItem value="">Tous</MenuItem>

        <MenuItem value="INCOME">Entrée</MenuItem>

        <MenuItem value="EXPENSE">Sortie</MenuItem>

        <MenuItem value="BOTH">Mixte</MenuItem>
      </TextField>

      <TextField
        select
        label="Statut"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        sx={{
          minWidth: 150,
        }}
      >
        <MenuItem value="">Tous</MenuItem>

        <MenuItem value="true">Actif</MenuItem>

        <MenuItem value="false">Inactif</MenuItem>
      </TextField>
    </Box>
  );
}

export default TableToolbar;
