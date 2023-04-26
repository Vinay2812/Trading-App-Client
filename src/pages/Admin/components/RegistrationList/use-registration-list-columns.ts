import { useMemo } from "react";
import { useColors } from "../../../../hooks/useColors";
import { renderActions } from "./renderers";
import { GridColDef } from "@mui/x-data-grid";

export const useRegistrationListColumns = () => {
    const colors = useColors()
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
        minWidth: 150,
        flex: 1,
      },
      {
        field: "actions",
        headerName: "Actions",
        renderCell: () => renderActions({ colors }),
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
};
