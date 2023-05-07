import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useColors } from "../../hooks/use-colors";
import {
  AdminPanelSettingsOutlined,
  AppRegistrationRounded,
  ArrowRightAlt,
  VerifiedUser,
} from "@mui/icons-material";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { loginAdminAction } from "../../redux/reducers/admin.reducer";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

interface authProps {}

const Auth: FC<authProps> = (props) => {
  const navigate = useNavigate();
  const colors = useColors();

  const dispatch = useAppDispatch();


  async function handleGoogleLoginSuccess(
    response: Omit<TokenResponse, "error" | "error_description" | "error_uri">
  ) {
    try {
      const user = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${response.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
            Accept: "application/json",
          },
        }
      );
      dispatch(
        loginAdminAction({
          email: user.data.email,
          picture: user.data.picture,
          name: user.data.name,
          isAdmin: true,
        })
      );
      navigate("/admin")
    } catch (err) {
      console.log("Failed to authenticate")
    }
  }

  const adminLogin = useGoogleLogin({
    onSuccess: (codeResponse) => handleGoogleLoginSuccess(codeResponse),
  });

  return (
    <Container
      maxWidth="md"
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
              color="violet"
              sx={{ fontSize: "16px", bgcolor: colors.violet[600] }}
              // onClick={() => navigate("/auth/admin/login")}
              onClick={() => adminLogin()}
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
