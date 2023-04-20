import { Box, Button, Container, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useColors } from "../../hooks/useColors";

interface authProps {}

const Auth: FC<authProps> = (props) => {
  const navigate = useNavigate();
  const colors = useColors();
  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        height: `100%`,
        width: "100%",
        p: 4,
        bgcolor: `${colors.cardAccent}`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          width: "100%",
          height: "100%",
          position: "relative",
        }}
        gap={8}
      >
        <Typography
          component="h4"
          variant="h4"
          textAlign="center"
          sx={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -30%)",
            width: "70%",
            fontStyle: "italic",
          }}
        >
          Welcome to Online Commodity Trading App
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
            sx={{py: "8px", fontSize: "16px"}}
            onClick={() => navigate("/auth/login")}
          >
            Sign in
          </Button>
          <Button
            variant="contained"
            fullWidth
            color="error"
            sx={{py: "8px", fontSize: "16px"}}
            onClick={() => navigate("/auth/register")}
          >
            Sign up
          </Button>
          <Button
            variant="contained"
            fullWidth
            color="indigo"
            sx={{py: "8px", fontSize: "16px"}}
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
