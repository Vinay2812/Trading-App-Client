import moment from "moment";
import { useMemo } from "react";
import { renderActions } from "./renderers";
import { GridColDef } from "@mui/x-data-grid";
import { useColors } from "../../../../hooks/use-colors";
import { PostPublishRequest } from "../../../../hooks/api-hooks/admin/use-post-publish-list";

export const usePublishListColumns = (handlePublishActionClick: (data: PostPublishRequest) => void) => {
  const colors = useColors();
  return useMemo(() => {
    return [
      {
        field: "sr_no",
        headerName: "Sr. No.",
        minWidth: 100,
        disableColumnMenu: true,
        disableReorder: true,
        sortable: false,
      },
      {
        field: "tender_id",
        headerName: "ID",
        minWidth: 100,
      },
      {
        field: "tender_no",
        headerName: "Tender No.",
        minWidth: 110,
      },
      {
        field: "tender_date",
        headerName: "Tender Date",
        renderCell: ({ row }) => moment(row.tender_date).format("DD/MM/yyyy"),
        minWidth: 120,
      },
      {
        field: "mill_short_name",
        headerName: "Mill Name",
        minWidth: 150,
      },
      {
        field: "item_name",
        headerName: "Item Name",
        minWidth: 150,
      },
      {
        field: "payment_to_name",
        headerName: "Payment to",
        minWidth: 120,
      },
      {
        field: "tender_do_name",
        headerName: "Payment Done by",
        minWidth: 150,
      },
      {
        field: "season",
        headerName: "Season",
        minWidth: 100,
      },
      {
        field: "grade",
        headerName: "Grade",
        minWidth: 130,
      },
      {
        field: "quantal",
        headerName: "Quantity",
        minWidth: 100,
      },
      {
        field: "lifting_date",
        headerName: "Lifting Date",
        renderCell: ({ row }) => moment(row.lifting_date).format("DD/MM/yyyy"),
        minWidth: 130,
      },
      {
        field: "purchase_rate",
        headerName: "Purchase Rate",
        minWidth: 130,
      },
      {
        field: "mill_rate",
        headerName: "Mill Rate",
        minWidth: 100,
      },
      {
        field: "actions",
        headerName: "Actions",
        renderCell: ({ row }) =>
          renderActions({ row, colors, handlePublishActionClick }),
        minWidth: 100,
        headerAlign: "center",
        align: "center",
        disableColumnMenu: true,
        disableReorder: true,
        sortable: false,
      },
    ] as GridColDef[];
  }, []);
};
