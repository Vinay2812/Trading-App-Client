import moment from "moment";
import { useMemo } from "react";
import { renderActions } from "./renderers";
import { GridColDef } from "@mui/x-data-grid";
import { useColors } from "../../../../hooks/use-colors";
import { PostPublishRequest } from "../../../../hooks/api-hooks/admin/use-post-publish-list";
import { type OrderListType } from "../../../../hooks/api-hooks/admin/use-order-list";

export const usePendingListColumns = (
  handleUpdatePendingOrder: (
    data: OrderListType,
    order_confirmed: "Y" | "R"
  ) => void
) => {
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
        flex: 1,
      },
      {
        field: "order_id",
        headerName: "Order Id",
        minWidth: 100,
        flex: 1,
      },
      {
        field: "company_name",
        headerName: "Buyer name",
        minWidth: 150,
        flex: 2,
      },
      {
        field: "qty",
        headerName: "Purchase Quantity",
        minWidth: 150,
        flex: 1,
      },
      {
        field: "tender_id",
        headerName: "Tender Id",
        minWidth: 100,
        flex: 1,
      },
      {
        field: "tender_no",
        headerName: "Tender No.",
        minWidth: 110,
        flex: 1,
      },
      {
        field: "order_date",
        headerName: "Order Date",
        renderCell: ({ row }) => moment(row.order_date).format("DD/MM/yyyy"),
        minWidth: 130,
        flex: 1,
      },
      {
        field: "mill_rate",
        headerName: "Mill Rate",
        minWidth: 100,
        flex: 1,
      },
      {
        field: "actions",
        headerName: "Actions",
        renderCell: ({ row }) => renderActions({ row, colors, handleUpdatePendingOrder }),
        minWidth: 100,
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
