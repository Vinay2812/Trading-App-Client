import { ArrowBack, LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface AdminLoginProps {}

const AdminLogin: FC<AdminLoginProps> = (props) => {
  const navigate = useNavigate();
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "0px 2px 5px 5px rgba(0,0,0,0.35)",
          p: 4,
          borderRadius: 4,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
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
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="red"
            sx={{ mt: 1, mb: 2 }}
            startIcon={<ArrowBack />}
            onClick={() => navigate("/auth")}
          >
            Back
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AdminLogin;
