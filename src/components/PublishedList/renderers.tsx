import {
  AddShoppingCartOutlined,
  EditOutlined,
  PauseCircleOutline,
  PlayCircleOutline,
  PublishOutlined,
} from "@mui/icons-material";
import { Box, Chip, Typography } from "@mui/material";
import CustomIconButton from "../Buttons/CustomIconButton";
import { PublishedListRowType } from ".";
import { ColorsType } from "../../hooks/use-colors";

type Props = {
  row: PublishedListRowType;
  colors: ColorsType;
  handleEditPublishedListItem: (data: PublishedListRowType) => void;
  handlePublishedItemStatus: (data: PublishedListRowType) => void;
};

export function renderPublishedListActions({
  row,
  colors,
  handleEditPublishedListItem,
  handlePublishedItemStatus,
}: Props) {
  const isPaused = row.status === "N";
  return (
    <Box display="flex">
      <CustomIconButton
        description={`Modify tender number ${row.tender_no}`}
        color={colors.blue[500]}
        hoverBackgroundColor={colors.blue[600]}
        onClick={() => handleEditPublishedListItem(row)}
      >
        <EditOutlined />
      </CustomIconButton>
      <CustomIconButton
        color={isPaused ? colors.green[500] : colors.red[500]}
        hoverBackgroundColor={isPaused ? colors.green[600] : colors.red[600]}
        description={
          isPaused
            ? `Start tender number ${row.tender_no}`
            : `Stop tender number ${row.tender_no}`
        }
        onClick={() => handlePublishedItemStatus(row)}
      >
        {isPaused ? <PlayCircleOutline /> : <PauseCircleOutline />}
      </CustomIconButton>
    </Box>
  );
}

export function renderClientListActions({ row, colors, handlePlaceOrder }: any) {
  return (
    <CustomIconButton
      color={colors.blue[500]}
      hoverBackgroundColor={colors.blue[600]}
      description={`Buy tender id ${row.tender_id}`}
      onClick={() => handlePlaceOrder(row)}
    >
      <AddShoppingCartOutlined />
    </CustomIconButton>
  );
}

export function renderUnit({ row, colors }: any) {
  const unitMap: any = {
    M: "M. Ton",
    Q: "Quintal",
    L: "Litres",
  };

  const colorMap: any = {
    M: colors.red[500],
    Q: colors.blue[600],
    L: colors.green[700],
  };

  return (
    <Chip
      sx={{
        color: colorMap[row.unit],
        fontWeight: 700,
        fontSize: "12px",
        textTransform: "uppercase",
        backgroundColor: "transparent",
        border: `2px solid ${colorMap[row.unit]}`,
        borderRadius: "4px",
        width: "80px",
      }}
      label={unitMap[row.unit]}
    />
  );
}
