import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
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
import Card from "../../components/Cards/Card";

interface authProps {}

const OrDivider = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        gap: 1,
        p: 0,
        m: 1,
      }}
    >
      <Divider sx={{ display: "flex", flex: 1, m: 0, p: 0 }} />
      <Typography p={0}>OR</Typography>
      <Divider sx={{ display: "flex", flex: 1, m: 0, p: 0 }} />
    </Box>
  );
};

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
      navigate("/admin");
    } catch (err) {
      console.log("Failed to authenticate");
    }
  }

  const adminLogin = useGoogleLogin({
    onSuccess: (codeResponse) => handleGoogleLoginSuccess(codeResponse),
  });

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        width: `min(500px, 100vw)`,
        height: "100vh",
        px: 4,
        borderRadius: 0,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 500,
          letterSpacing: 2,
          p: 1,
          fontSize: 40,
          color: colors.textColor[100],
          mt: 2,
          // fontStyle: "oblique"
        }}
      >
        CommodityXChange
      </Typography>
      <Typography
        variant="h4"
        sx={{
          fontStyle: "oblique",
          textAlign: "center",
          fontWeight: 300,
          color: colors.textColor[400],
        }}
      >
        Your's <br /> Commodity Trading Platflorm
      </Typography>
      <Stack sx={{ width: "100%", gap: 3, mb: 2 }}>
        <Button
          variant="contained"
          fullWidth
          sx={{ borderRadius: "24px", m: 0 }}
          startIcon={<AppRegistrationRounded />}
          onClick={() => navigate("/auth/register")}
          endIcon={<ArrowRightAlt />}
          color="red"
        >
          Sign up as User
        </Button>
        <Button
          variant="contained"
          fullWidth
          sx={{ borderRadius: "24px", m: 0 }}
          onClick={() => navigate("/auth/login")}
          startIcon={<VerifiedUser />}
          endIcon={<ArrowRightAlt />}
          color="blue"
        >
          Sign in as User
        </Button>
        <Button
          variant="contained"
          fullWidth
          sx={{ borderRadius: "24px", m: 0 }}
          onClick={() => adminLogin()}
          startIcon={<AdminPanelSettingsOutlined />}
          endIcon={<ArrowRightAlt />}
          color="green"
        >
          Sign in as Admin
        </Button>
      </Stack>
    </Card>
  );
};

export default Auth;
