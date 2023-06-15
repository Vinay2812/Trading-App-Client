import { GridColDef } from "@mui/x-data-grid";
import { useMemo } from "react";
import { useColors } from "../../hooks/use-colors";
import moment from "moment";
import {
  renderClientListActions,
  renderPublishedListActions,
  renderUnit,
} from "./renderers";
import { PublishedListRowType } from ".";
import { useAppSelector } from "../../hooks/redux";

export const usePublishedListColumns = (
  handleEditPublishedListItem: (data: PublishedListRowType) => void,
  handlePublishedItemStatus: (data: PublishedListRowType) => void,
  isClientList: boolean = false
) => {
  const colors = useColors();
  const { userId, accoid } = useAppSelector((state) => state.user);
  const handleBuyOrder = (data: PublishedListRowType) => {
    if (!userId || !accoid) {
      return;
    }
    const {
      tender_id,
      tender_no,
      selling_type,
      sale_rate,
      mill_rate,
      purc_rate,
      auto_confirm,
    } = data;
    const order_confirmed = auto_confirm;
    const order_remark = "";
    const confirm_remark = "";
    const qty = 0;
  };
  return useMemo(() => {
    return !isClientList
      ? ([
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
            headerName: "Tender Id",
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
            renderCell: ({ row }: any) =>
              moment(row.tender_date).format("DD/MM/yyyy"),
            minWidth: 120,
          },
          {
            field: "mill_short_name",
            headerName: "Mill Name",
            minWidth: 250,
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
            field: "unit",
            headerName: "Unit",
            renderCell: ({ row }) => renderUnit({ row, colors }),
            minWidth: 130,
          },
          {
            field: "qty",
            headerName: "Quantity",
            minWidth: 100,
          },
          {
            field: "lifting_date",
            headerName: "Lifting Date",
            renderCell: ({ row }: any) =>
              moment(row.lifting_date).format("DD/MM/yyyy"),
            minWidth: 130,
          },
          {
            field: "purc_rate",
            headerName: "Purchase Rate",
            minWidth: 130,
          },
          {
            field: "mill_rate",
            headerName: "Mill Rate",
            minWidth: 100,
          },
          {
            field: "sale_rate",
            headerName: "Sale Rate",
            minWidth: 100,
          },
          {
            field: "published_qty",
            headerName: "Published Quantity",
            minWidth: 150,
          },
          {
            field: "sold",
            headerName: "Sold Quantity",
            minWidth: 130,
          },
          {
            field: "balance",
            headerName: "Balance",
            minWidth: 100,
          },
          {
            field: "actions",
            headerName: "Actions",
            renderCell: ({ row }) =>
              renderPublishedListActions({
                row,
                colors,
                handleEditPublishedListItem,
                handlePublishedItemStatus,
              }),
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            disableColumnMenu: true,
            disableReorder: true,
            sortable: false,
            // flex: 1,
          },
        ] as GridColDef[])
      : ([
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
            field: "tender_id",
            headerName: "Tender No",
            minWidth: 100,
            flex: 0.75,
          },
          {
            field: "mill_short_name",
            headerName: "Mill Name",
            minWidth: 250,
            flex: 1,
          },
          {
            field: "item_name",
            headerName: "Item Name",
            minWidth: 150,
            flex: 1,
          },
          {
            field: "grade",
            headerName: "Grade",
            minWidth: 130,
            flex: 1,
          },
          {
            field: "unit",
            headerName: "Unit",
            renderCell: ({ row }) => renderUnit({ row, colors }),
            minWidth: 130,
            flex: 0.75,
          },
          {
            field: "qty",
            headerName: "Quantity",
            minWidth: 100,
          },
          {
            field: "lifting_date",
            headerName: "Lifting Date",
            renderCell: ({ row }: any) =>
              moment(row.lifting_date).format("DD/MM/yyyy"),
            minWidth: 130,
          },
          {
            field: "sale_rate",
            headerName: "Sale Rate",
            minWidth: 100,
          },
          {
            field: "balance",
            headerName: "Balance",
            minWidth: 100,
          },
          {
            field: "actions",
            headerName: "Actions",
            renderCell: ({ row }) => renderClientListActions({ colors, row }),
            minWidth: 100,
            headerAlign: "center",
            align: "center",
            disableColumnMenu: true,
            disableReorder: true,
            sortable: false,
            // flex: 1,
          },
        ] as GridColDef[]);
  }, [isClientList]);
};
