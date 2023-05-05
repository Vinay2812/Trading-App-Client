import { AddBoxOutlined, AddLinkRounded } from "@mui/icons-material";
import { Box } from "@mui/material";
import CustomIconButton from "../../../../components/Buttons/CustomIconButton";

export function renderActions({ colors, onAddClick, onMapClick, row }: any) {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" gap={1}>
      <CustomIconButton
        onClick={() => onAddClick(row.userId)}
        color={colors.blue[500]}
        hoverBackgroundColor={colors.blue[600]}
        description="Add user"
      >
        <AddBoxOutlined />
      </CustomIconButton>
      <CustomIconButton
        onClick={onMapClick}
        color={colors.green[500]}
        hoverBackgroundColor={colors.green[600]}
        description="Map user"
      >
        <AddLinkRounded />
      </CustomIconButton>
    </Box>
  );
}
