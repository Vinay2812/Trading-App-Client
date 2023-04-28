import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useColors } from "../../hooks/use-colors";
import Card from "../../components/Cards/Card";
import {
  AdminPanelSettingsOutlined,
  AppRegistrationRounded,
  ArrowRightAlt,
  Forward,
  ForwardOutlined,
  Verified,
  VerifiedUser,
} from "@mui/icons-material";

interface authProps {}

const Auth: FC<authProps> = (props) => {
  const navigate = useNavigate();
  const colors = useColors();
  return (
    // <Container
    //   component="main"
    //   maxWidth="sm"
    //   sx={{
    //     width: "100%",
    //     p: 4,
    //     borderRadius: 4,
    //     bgcolor: colors.card,
    //   }}
    // >
    //   <Box
    //     sx={{
    //       display: "flex",
    //       flexDirection: "column",
    //       justifyContent: "flex-end",
    //       width: "100%",
    //       height: "100%",
    //       position: "relative",
    //     }}
    //     gap={8}
    //   >
    //     <Typography
    //       component="h4"
    //       variant="h4"
    //       textAlign="center"
    //       sx={{
    //         width: "100%",
    //         fontStyle: "italic",
    //       }}
    //     >
    //       Welcome to Online Commodity Trading App
    //     </Typography>
    //
    //   </Box>
    // </Container>
    <Container
      maxWidth="lg"
      sx={{
        minHeight: "80vh !important",
        backgroundColor: colors.card,
        p: "0 !important",
        borderRadius: 4,
      }}
    >
      <Grid
        container
        sx={{
          minHeight: "80vh !important",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          item
          sm={12}
          lg={6}
          sx={{ height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", p: 4 }}
        >
          <Typography
            component="h4"
            variant="h4"
            textAlign="center"
            sx={{
              minHeight: "80vh !important",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontStyle: "italic",
            }}
          >
            Welcome to Online Commodity Trading App
          </Typography>
        </Grid>
        <Grid item sm={12} lg={6} sx={{ height: "100%", p: 4 }}>
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
              sx={{ fontSize: "16px", display: "flex", alignItems: "center" }}
              onClick={() => navigate("/auth/login")}
              startIcon={<VerifiedUser />}
              endIcon={<ArrowRightAlt />}
            >
              Sign in
            </Button>
            <Button
              variant="contained"
              fullWidth
              color="red"
              sx={{ fontSize: "16px" }}
              startIcon={<AppRegistrationRounded />}
              onClick={() => navigate("/auth/register")}
              endIcon={<ArrowRightAlt />}
            >
              Sign up
            </Button>
            <Button
              variant="contained"
              fullWidth
              color="violet"
              sx={{ fontSize: "16px", bgcolor: colors.violet[600] }}
              onClick={() => navigate("/auth/admin/login")}
              startIcon={<AdminPanelSettingsOutlined />}
              endIcon={<ArrowRightAlt />}
            >
              Admin Login
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Auth;
