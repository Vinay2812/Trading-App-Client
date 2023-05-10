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

type Props = {
  row: PublishedListRowType;
  colors: any;
};

export function renderPublishedListActions({ row, colors }: Props) {
  const isPaused = row.status === "N";
  return (
    <Box display="flex">
      <CustomIconButton
        description={`Modify tender number ${row.tender_no}`}
        color={colors.blue[500]}
        hoverBackgroundColor={colors.blue[600]}
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
      >
        {isPaused ? <PlayCircleOutline /> : <PauseCircleOutline />}
      </CustomIconButton>
    </Box>
  );
}

export function renderClientListActions({ colors }: any) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        color: colors.green[500],
        justifyContent: "center",
        alignItems: "center",
        gap: "3px",
        cursor: "pointer",
        "&:hover": {
          color: colors.green[300],
        },
      }}
    >
      <AddShoppingCartOutlined sx={{ fontSize: "28px" }} />
      <Typography variant="caption" sx={{}}>
        Buy
      </Typography>
    </Box>
  );
}

export function renderUnit({ row, colors }: any) {
  const unitMap: any = {
    M: "M. Ton",
    Q: "Quintal",
    L: "Litre",
  };

  const colorMap: any = {
    M: colors.violet[500],
    Q: colors.blue[600],
    L: colors.green[700],
  };

  return (
    <Chip
      sx={{
        bgcolor: colorMap[row.unit],
        color: colors.textColor[100],
      }}
      label={
        <Typography
          sx={{
            fontSize: "14px !important",
            width: "60px",
            textAlign: "center",
          }}
        >
          {unitMap[row.unit]}
        </Typography>
      }
    />
  );
}
