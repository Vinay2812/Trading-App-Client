import { PublishOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export function renderActions({colors}: any) {
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
        <PublishOutlined sx={{ fontSize: "28px" }} />
        <Typography variant="caption">
          Publish
        </Typography>
      </Box>
    );
  }