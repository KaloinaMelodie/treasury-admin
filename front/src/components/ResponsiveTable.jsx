import {
  useMediaQuery,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

function ResponsiveTable({ columns, rows, sortBy, sortOrder, onSort }) {
  const mobile = useMediaQuery("(max-width:900px)");

  if (mobile) {
    return (
      <Box>
        {rows.map((row, index) => (
          <Card
            key={index}
            sx={{
              mb: 2,
            }}
          >
            <CardContent>
              {columns.map((column) => (
                <Box
                  key={column.field}
                  sx={{
                    mb: 1,
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    {column.label}
                  </Typography>

                  <Typography>
                    {column.render ? column.render(row) : row[column.field]}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                onClick={() => onSort(column.field)}
                sx={{
                  cursor: "pointer",

                  userSelect: "none",
                }}
              >
                {column.label}

                {sortBy === column.field
                  ? sortOrder === "asc"
                    ? " ↑"
                    : " ↓"
                  : ""}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column.field}>
                  {column.render ? column.render(row) : row[column.field]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ResponsiveTable;
