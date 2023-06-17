import { Box } from "@mui/material";
import CustomIconButton from "../../../../components/Buttons/CustomIconButton";
import { OrderListType } from "../../../../hooks/api-hooks/admin/use-order-list";
import { ColorsType } from "../../../../hooks/use-colors";
import { CancelOutlined, CheckCircleOutline } from "@mui/icons-material";

export const renderActions = ({
  row,
  colors,
}: {
  row: OrderListType;
  colors: ColorsType;
}) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      gap={1}
    >
      <CustomIconButton
        //   onClick={() => onAddClick(row.userId)}
        color={colors.green[500]}
        hoverBackgroundColor={colors.green[500]}
        description="Approve"
      >
        <CheckCircleOutline />
      </CustomIconButton>
      <CustomIconButton
        // onClick={() => onMapClick(row)}
        color={colors.red[500]}
        hoverBackgroundColor={colors.red[600]}
        description="Reject"
      >
        <CancelOutlined />
      </CustomIconButton>
    </Box>
  );
};
