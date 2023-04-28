import {
  AdminPanelSettingsOutlined,
  ArrowBack,
  LockOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useColors } from "../../../../hooks/use-colors";
import Card from "../../../../components/Cards/Card";

interface AdminLoginProps {}

const AdminLogin: FC<AdminLoginProps> = (props) => {
  const navigate = useNavigate();
  const colors = useColors();
  return (
    <Container component="main" maxWidth="sm">
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 4,
        }}
      >
        <Avatar sx={{ bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Admin Login
        </Typography>
        <Box component="form" noValidate onSubmit={() => {}} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Admin username"
                name="username"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="green"
            sx={{ mt: 3, mb: 2, py: 1 }}
            endIcon={<AdminPanelSettingsOutlined />}
          >
            Login
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="red"
            sx={{
              mt: 1,
              py: 1,
            }}
            startIcon={<ArrowBack />}
            onClick={() => navigate("/auth")}
          >
            Go to home
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default AdminLogin;
