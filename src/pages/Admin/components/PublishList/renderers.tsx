import { PublishOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

export function renderActions({ colors }: any) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        color: colors.blue[500],
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        "&:hover": {
          color: colors.blue[300],
        },
      }}
    >
      <IconButton
        sx={{
          color: colors.blue[500],
          "&:hover": {
            color: colors.blue[300],
          },
        }}
      >
        <PublishOutlined  />
      </IconButton>
      <Typography variant="caption">Publish</Typography>
    </Box>
  );
}
