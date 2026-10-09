import { useEffect, useState } from "react";

import { Box, Button, Typography } from "@mui/material";

import ResponsiveTable from "../../components/ResponsiveTable";

import TableToolbar from "../../components/TableToolbar";

import TablePagination from "../../components/TablePagination";

import { getMembers } from "../../services/memberService";
import MemberFilterBar from "../../components/MemberFilterBar";

function MembersList() {
  const [members, setMembers] = useState([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [group, setGroup] = useState("");

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({});

  async function loadMembers() {
    setLoading(true);

    const result = await getMembers({
      page,

      limit: 10,

      search,

      status,

      group_id: group,
    });

    setMembers(result.data.data);

    setPagination(result.data.pagination);

    setLoading(false);
  }
  useEffect(() => {
    loadMembers();
  }, [page, search, status, group]);

  const columns = [
    {
      field: "last_name",
      label: "Nom",
      sortable: true,
    },

    {
      field: "phone",
      label: "Téléphone",
    },

    {
      field: "group_name",
      label: "Groupe",
    },

    {
      field: "status_label",
      label: "Statut",
    },

    {
      field: "subscription",
      label: "Cotisation",

      render: (row) =>
        row.subscription ? `${row.subscription.amount} Ar` : "-",
    },
  ];

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
        <Typography variant="h4">Membres</Typography>

        <Button variant="contained">Nouveau membre</Button>
      </Box>

      <MemberFilterBar 
        search={search} 
        setSearch={setSearch} 
        status={status} 
        setStatus={setStatus} 
        group={group} 
        setGroup={setGroup} 
      />

      <ResponsiveTable columns={columns} rows={members} />

      <TablePagination pagination={pagination} page={page} setPage={setPage} />
    </Box>
  );
}

export default MembersList;
