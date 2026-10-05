import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

import { useEffect, useState } from "react";

function CategoryForm({
  open,

  onClose,

  onSubmit,

  category,
}) {
  const [form, setForm] = useState({
    name: "",
    type: "",
    description: "",
  });

  useEffect(() => {
    if (category) {
      setForm({
        name: category.name,

        type: category.type,

        description: category.description || "",
      });
    } else {
      setForm({
        name: "",
        type: "",
        description: "",
      });
    }
  }, [category]);

  function handleChange(e) {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit() {
    onSubmit(form);
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {category ? "Modifier catégorie" : "Nouvelle catégorie"}
      </DialogTitle>

      <DialogContent>
        <TextField
          margin="normal"
          fullWidth
          label="Nom"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <TextField
          margin="normal"
          fullWidth
          select
          label="Type"
          name="type"
          value={form.type}
          onChange={handleChange}
        >
          <MenuItem value="INCOME">Entrée</MenuItem>

          <MenuItem value="EXPENSE">Sortie</MenuItem>

          <MenuItem value="BOTH">Entrée / Sortie</MenuItem>
        </TextField>

        <TextField
          margin="normal"
          fullWidth
          multiline
          rows={3}
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>

        <Button variant="contained" onClick={handleSubmit}>
          Sauvegarder
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CategoryForm;
