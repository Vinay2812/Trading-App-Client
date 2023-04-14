import { Box, Button, Container, CssBaseline, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface authProps {}

const Auth: FC<authProps> = (props) => {
  const navigate = useNavigate();
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        // height: `95%`,
        width: "100%",
        boxShadow: "0px 2px 5px 5px rgba(0,0,0,0.35)",
        p: 5,
        borderRadius: 4,
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          position: "relative",
        }}
        gap={8}
      >
        <Typography
          component="h4"
          variant="h4"
          textAlign="center"
          sx={{
            width: "100%",
            fontStyle: "italic"
          }}
        >
          Welcome to Online Trading App
        </Typography>
        <Box
          gap={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            fullWidth
            color="green"
            onClick={() => navigate("/auth/login")}
          >
            Sign in
          </Button>
          <Button
            variant="contained"
            fullWidth
            color="error"
            onClick={() => navigate("/auth/register")}
          >
            Sign up
          </Button>
          <Button
            variant="contained"
            fullWidth
            color="darkblue"
            onClick={() => navigate("/auth/admin/login")}
          >
            Admin Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Auth;
