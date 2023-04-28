import { GridColDef } from "@mui/x-data-grid";
import { useMemo } from "react";
import { renderMoreDetails, renderStatus } from "./renderers";
import { useColors } from "../../../../hooks/use-colors";

export const useUserListColumns = () => {
  const colors = useColors();
  return useMemo(() => {
    return [
      {
        field: "sr_no",
        headerName: "Sr. No.",
        minWidth: 100,
        flex: 0.5,
        disableColumnMenu: true,
        disableReorder: true,
        sortable: false,
      },
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
        minWidth: 100,
        flex: 0.75,
      },
      {
        field: "status",
        headerName: "Status",
        renderCell: ({ row }) => renderStatus({ row, colors }),
        minWidth: 100,
        headerAlign: "center",
        align: "center",
        disableColumnMenu: true,
        disableReorder: true,
        sortable: false,
        flex: 0.5,
      },
      {
        field: "actions",
        headerName: "More Details",
        renderCell: ({ row }) => renderMoreDetails({ row }),
        minWidth: 100,
        headerAlign: "center",
        align: "center",
        disableColumnMenu: true,
        disableReorder: true,
        sortable: false,
        flex: 0.5,
      },
    ] as GridColDef[];
  }, []);
};
