import { ArrowBack, LockOutlined } from "@mui/icons-material";
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
import { useColors } from "../../../../hooks/useColors";

interface AdminLoginProps {}

const AdminLogin: FC<AdminLoginProps> = (props) => {
  const navigate = useNavigate();
  const colors = useColors();
  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 4,
          px: 2,
          pt: 2,
          borderRadius: 4,
          bgcolor: colors.card,
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
            color="indigo"
            sx={{ mt: 3, mb: 2, py: 1 }}
          >
            Login
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="red"
            sx={{
              mt: 1,
              py: 1,
              color: colors.red[500],
              borderColor: colors.red[500],
            }}
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
