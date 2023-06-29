import { Box } from "@mui/material";
import CustomIconButton from "../../../../components/Buttons/CustomIconButton";
import { OrderListType } from "../../../../hooks/api-hooks/admin/use-order-list";
import { ColorsType } from "../../../../hooks/use-colors";
import { CancelOutlined, CheckCircleOutline } from "@mui/icons-material";

export const renderActions = ({
  row,
  colors,
  handleUpdatePendingOrder,
}: {
  row: OrderListType;
  colors: ColorsType;
  handleUpdatePendingOrder: (data: OrderListType, order_confirmed: "Y" | "R") => void;
}) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      gap={1}
    >
      <CustomIconButton
        onClick={() => handleUpdatePendingOrder(row, "Y")}
        color={colors.green[500]}
        hoverBackgroundColor={colors.green[500]}
        description="Approve"
      >
        <CheckCircleOutline />
      </CustomIconButton>
      <CustomIconButton
        onClick={() => handleUpdatePendingOrder(row, "R")}
        color={colors.red[500]}
        hoverBackgroundColor={colors.red[600]}
        description="Reject"
      >
        <CancelOutlined />
      </CustomIconButton>
    </Box>
  );
};
