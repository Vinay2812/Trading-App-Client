import { AddBoxOutlined, AddTask } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export function renderActions({colors}: any) {
    return (
      <Box display="flex" gap={5}>
        <Box
          sx={{
            position: "relative",
            height: "100%",
            bottom: "5px",
            color: colors.blue[500],
            cursor: "pointer",
            "&:hover": {
              color: colors.blue[300],
            },
          }}
        >
          <AddBoxOutlined />
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              top: "90%",
              left: 0,
            }}
          >
            Add
          </Typography>
        </Box>
        <Box
          sx={{
            position: "relative",
            height: "100%",
            bottom: "5px",
            color: colors.green[500],
            cursor: "pointer",
            "&:hover": {
              color: colors.green[300],
            },
          }}
        >
          <AddTask />
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              top: "90%",
              left: 0,
            }}
          >
            Map
          </Typography>
        </Box>
      </Box>
    );
  }