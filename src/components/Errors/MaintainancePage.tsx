import { Box, Typography } from "@mui/material";
import serverDownImg from "../../assets/server-down.png";
import Sidebar from "../Sidebar";

function MaintainencePage() {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <img
        src={`${serverDownImg}`}
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          opacity: "0.5",
          zIndex: "-5",
        }}
        alt=""
        width="100%"
        height="100%"
      />
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          zIndex: "2",
          color: "black",
          background: "transparent",
        }}
      >
        <Typography variant="h3" fontWeight={700}>
          We are under maintenance
        </Typography>
        <Typography variant="h5" fontWeight={700}>
          Sorry for the inconvenience!!
        </Typography>
        <Typography variant="h5" fontWeight={700}>
          Be back soon
        </Typography>
      </Box>
    </Box>
  );
}

export default MaintainencePage;
