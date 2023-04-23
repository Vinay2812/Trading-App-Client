import { FC, useEffect, useMemo, useState } from "react";
import { AdminSidebar } from "..";
import { Box, Button, Typography } from "@mui/material";
import Card from "../../../../components/Cards/Card";
import HeaderCard from "../../../../components/Cards/HeaderCard";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { handleApiAsync } from "../../../../utils/handleAsync";
import { getRegistrationListUsers } from "../../../../api/admin/admin.request";
import { useColors } from "../../../../hooks/useColors";
import { AddBoxOutlined, AddTask } from "@mui/icons-material";

interface RegistrationListProps {}

const RegistrationList: FC<RegistrationListProps> = (props) => {
  const colors = useColors();
  const [rows, setRows] = useState<RegistrationListUsersType[]>([]);
  const columns = useMemo(() => {
    return [
      {
        field: "userId",
        headerName: "User Id",
        minWidth: 300,
        flex: 1,
      },
      {
        field: "company_name",
        headerName: "Company Name",
        minWidth: 300,
        cellClassName: "name-column--cell",
        flex: 1.75,
      },
      {
        field: "email",
        headerName: "Email",
        minWidth: 250,
        flex: 1.25,
      },
      {
        field: "mobile",
        headerName: "Mobile Number",
        minWidth: 150,
        flex: 1,
      },
      {
        field: "actions",
        headerName: "Actions",
        renderCell: renderActions,
        minWidth: 200,
        headerAlign: "center",
        align: "center",
        disableColumnMenu: true,
        disableReorder: true,
        sortable: false,
        flex: 1,
      },
    ] as GridColDef[];
  }, []);

  useEffect(() => {
    fetchRegistrationListUsers();
  }, []);

  function renderActions() {
    return (
      <Box display="flex" gap={5}>
        <Box
          sx={{
            position: "relative",
            height: "100%",
            bottom: "5px",
            color: colors.blue[500],
            cursor: "pointer",
            "&:hover": {
              color: colors.blue[300],
            },
          }}
        >
          <AddBoxOutlined />
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              top: "90%",
              left: 0,
            }}
          >
            Add
          </Typography>
        </Box>
        <Box
          sx={{
            position: "relative",
            height: "100%",
            bottom: "5px",
            color: colors.green[500],
            cursor: "pointer",
            "&:hover": {
              color: colors.green[300],
            },
          }}
        >
          <AddTask />
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              top: "90%",
              left: 0,
            }}
          >
            Map
          </Typography>
        </Box>
      </Box>
    );
  }
  async function fetchRegistrationListUsers() {
    const { value, error, status, message } = await handleApiAsync<
      RegistrationListUsersType[]
    >(getRegistrationListUsers());
    if (status === "success") {
      setRows(value);
    } else {
      setRows([]);
    }
  }
  return (
    <AdminSidebar active="Registration List">
      <Box width="100%" height="100%">
        <HeaderCard
          title="Registration List"
          subtitle="Welcome to registration list"
        />
        <Card
          sx={{
            mt: "16px",
            width: "100%",
            height: "calc(100% - 105px)",
            bgcolor: `${colors.card}`,
            "& .MuiDataGrid-columnHeaders": {
              mt: 2,
              fontWeight: 700,
              fontSize: "16px",
              color: colors.textColor[100],
              bgcolor: colors.tableHeader,
              border: "none",
            },
            "& .MuiDataGrid-root": {
              fontSize: "14px",
              color: colors.textColor[400],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
            },
            "& .MuiDataGrid-footerContainer": {
              bgcolor: colors.tableHeader,
              border: "none",
            },
          }}
        >
          <DataGrid
            getRowId={(row) => row.userId}
            columns={columns}
            rows={rows}
            density="comfortable"
            slots={{
              toolbar: GridToolbar,
            }}
            pageSizeOptions={[5, 15, 30, 50, 100]}
            disableDensitySelector
          />
        </Card>
      </Box>
    </AdminSidebar>
  );
};

export default RegistrationList;
