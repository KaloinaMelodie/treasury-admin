import { Pagination, Box } from "@mui/material";

function TablePagination({
  pagination,

  page,

  setPage,
}) {
  return (
    <Box
      sx={{
        display: "flex",

        justifyContent: "center",

        mt: 3,
      }}
    >
      <Pagination
        count={pagination.totalPages || 1}
        page={page}
        onChange={(e, value) => setPage(value)}
        disabled={!pagination.totalPages || pagination.totalPages <= 1}
      />
    </Box>
  );
}

export default TablePagination;
