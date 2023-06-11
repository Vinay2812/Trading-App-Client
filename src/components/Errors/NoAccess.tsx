import { FC } from "react";
import { Box, Typography } from "@mui/material";

interface NoAccessProps {}

const NoAccess: FC<NoAccessProps> = (props) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="100%" width="100%">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography variant="h4">You don't have access to this page</Typography>
        <Typography variant="h5" fontWeight="300">
          Please contact admin for the access
        </Typography>
        <Typography variant="h6" fontWeight="300" >
          Sorry for the inconvenience
        </Typography>
      </Box>
    </Box>
  );
};

export default NoAccess;
