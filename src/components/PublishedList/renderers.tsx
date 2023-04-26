import {
  AddShoppingCartOutlined,
  EditOutlined,
  PauseCircleOutline,
  PublishOutlined,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export function renderPublishedListActions({ row, colors }: any) {
  const isPaused = row.status === "N";
  return (
    <Box display="flex" gap={4}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          color: colors.blue[500],
          justifyContent: "center",
          alignItems: "center",
          gap: "3px",
          cursor: "pointer",
          "&:hover": {
            color: colors.blue[300],
          },
        }}
      >
        <EditOutlined sx={{ fontSize: "28px" }} />
        <Typography variant="caption" sx={{}}>
          Modify
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          color: isPaused ? colors.green[500] : colors.red[500],
          justifyContent: "center",
          alignItems: "center",
          gap: "3px",
          cursor: "pointer",
          "&:hover": {
            color: isPaused ? colors.green[300] : colors.red[300],
          },
        }}
      >
        {isPaused ? (
          <PublishOutlined sx={{ fontSize: "28px" }} />
        ) : (
          <PauseCircleOutline sx={{ fontSize: "28px" }} />
        )}
        <Typography variant="caption" sx={{}}>
          {isPaused ? "Publish" : "Pause"}
        </Typography>
      </Box>
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
    <Box
      sx={{
        px: 1,
        py: 0.25,
        borderRadius: 4,
        bgcolor: colorMap[row.unit],
        color: colors.textColor[100],
      }}
    >
      <Typography
        sx={{ fontSize: "14px !important", width: "60px", textAlign: "center" }}
      >
        {unitMap[row.unit]}
      </Typography>
    </Box>
  );
}
