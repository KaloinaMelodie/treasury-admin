import { useEffect, useState } from "react";

import { Typography, Box, Button, CircularProgress } from "@mui/material";

import ResponsiveTable from "../../components/ResponsiveTable";
import { getCategories } from "../../services/categoryService";
import TableToolbar from "../../components/TableToolbar";
import TablePagination from "../../components/TablePagination";
import { createCategory, updateCategory } from "../../services/categoryService";
import CategoryForm from "./CategoryForm";
import { deleteCategory } from "../../services/categoryService";

function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const rows = categories.map((category) => ({
    id: category.id,
    name: category.name,
    type: category.type,
    status: category.is_active ? "Actif" : "Inactif",
  }));

  const columns = [
    {
      field: "id",
      label: "ID",
    },
    {
      field: "name",
      label: "Nom",
    },
    {
      field: "type",
      label: "Type",
    },
    {
      field: "status",
      label: "Statut",
    },
    {
      field: "actions",
      label: "Actions",
      sortable: false,
      render: (row) => (
        <>
          <Button
            onClick={() => {
              setSelectedCategory(row);
              setOpenForm(true);
            }}
          >
            Modifier
          </Button>
          <Button
            color="error"
            onClick={() => {
              handleDelete(row.id);
            }}
          >
            Supprimer
          </Button>
        </>
      ),
    },
  ];

  async function loadCategories() {
    try {
      setLoading(true);

      const result = await getCategories({
        page,
        limit: 10,
        search,
        type,
        is_active: status === "" ? undefined : status === status,
        sortBy,
        sortOrder,
      });

      setCategories(result.data);

      setPagination(result.pagination);
    } catch (err) {
      setError("Impossible de charger les catégories");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    loadCategories();
  }, [page, search, type, status, sortOrder]);

  if (loading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  function handleSort(field) {
    if (sortBy !== field) {
      setSortBy(field);

      setSortOrder("asc");

      return;
    }

    if (sortOrder === "asc") {
      setSortOrder("desc");
    } else if (sortOrder === "desc") {
      setSortBy(null);

      setSortOrder(null);
    } else {
      setSortOrder("asc");
    }
  }

  async function handleSave(data) {
    try {
      if (selectedCategory) {
        await updateCategory(
          selectedCategory.id,

          data,
        );
      } else {
        await createCategory(data);
      }

      setOpenForm(false);

      setSelectedCategory(null);

      loadCategories();
    } catch (error) {
      console.error(error);
    }
  }
  
  async function handleDelete(id) {
    const confirmDelete = window.confirm("Supprimer cette catégorie ?");

    if (!confirmDelete) {
      return;
    }

    await deleteCategory(id);

    loadCategories();
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexDirection: {
            xs: "column",
            md: "row",
          },
        }}
      >
        <Typography variant="h4">Catégories</Typography>

        <Button
          variant="contained"
          sx={{
            mt: {
              xs: 2,
              md: 0,
            },
          }}
          onClick={() => {
            setSelectedCategory(null);
            setOpenForm(true);
          }}
        >
          Nouvelle catégorie
        </Button>
      </Box>

      <TableToolbar
        setSearch={setSearch}
        type={type}
        setType={setType}
        status={status}
        setStatus={setStatus}
      />
      <ResponsiveTable
        columns={columns}
        rows={rows}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={handleSort}
      />

      <TablePagination pagination={pagination} page={page} setPage={setPage} />

      <CategoryForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleSave}
        category={selectedCategory}
      />
    </Box>
  );
}

export default CategoriesList;
