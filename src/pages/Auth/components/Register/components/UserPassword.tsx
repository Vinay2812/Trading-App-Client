import { FC } from "react";
import { UserPasswordDetailsInterface } from "../../../types/register";
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
import { LockOutlined } from "@mui/icons-material";

interface UserPasswordProps {
  userPasswordDetails: UserPasswordDetailsInterface;
  setUserPasswordDetails: Function;
}

const UserPassword: FC<UserPasswordProps> = (props) => {
  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{ overflow: "hidden", height: "100%", display: "flex", alignItems: "center" }}
    >
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
        <Avatar sx={{ m: 1, bgcolor: "green.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Enter your new password
        </Typography>
        <Box component="form" noValidate onSubmit={() => {}} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Confirm Password"
                name="confirm_password"
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default UserPassword;
