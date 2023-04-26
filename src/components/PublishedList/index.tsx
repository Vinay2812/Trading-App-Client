import { FC, useMemo } from "react";
import { AdminSidebar } from "../../pages/Admin/components";
import { Box } from "@mui/material";
import HeaderCard from "../Cards/HeaderCard";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useColors } from "../../hooks/useColors";
import Card from "../Cards/Card";
import { usePublishedListColumns } from "./use-published-list-columns";
import { usePublishedList } from "../../hooks/api-hooks/admin";

interface PublishedListProps {
  isClientList?: boolean;
}
interface RowsType extends PublishedListResponseType {
  sr_no: number;
}

const PublishedList: FC<PublishedListProps> = (props) => {
  const { isClientList = false } = props;
  const colors = useColors();
  const { data, isLoading } = usePublishedList();

  const columns = usePublishedListColumns(isClientList);
  const rows = useMemo<RowsType[] | []>(() => {
    if (!data?.value) return [];
    return data.value.map((item, index) => ({ ...item, sr_no: index + 1 }));
  }, [data]);

  return (
    <AdminSidebar active={isClientList ? "Client List" : "Published List"}>
      <Box width="100%" height="100%" position="relative">
        <HeaderCard
          title={isClientList ? "Client List" : "Published List"}
          subtitle={`Welcome to ${
            isClientList ? "client list" : "published list"
          }`}
        />
        <Card
          sx={{
            mt: "16px",
            width: "100%",
            height: "calc(100% - 90px)",
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
              borderBottom: "none !important",
            },
            "& .MuiDataGrid-cell:focus": {
              outline: "none !important",
              border: "none !important",
            },
            "& .MuiDataGrid-footerContainer": {
              bgcolor: colors.tableHeader,
              border: "none",
            },
          }}
        >
          <DataGrid
            getRowId={(rows) => rows.tender_id}
            columns={columns}
            rows={rows}
            density="comfortable"
            slots={{
              toolbar: GridToolbar,
            }}
            loading={isLoading}
            disableDensitySelector
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5, 15, 30, 50, 100]}
            checkboxSelection
            onRowSelectionModelChange={(arr) => console.log(arr)}
          />
        </Card>
      </Box>
    </AdminSidebar>
  );
};

export default PublishedList;
