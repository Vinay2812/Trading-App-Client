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
import { useColors } from "../../../../../hooks/use-colors";

interface UserPasswordProps {
  userPasswordDetails: UserPasswordDetailsInterface;
  setUserPasswordDetails: Function;
}

const UserPassword: FC<UserPasswordProps> = (props) => {
  function handlePasswordChange(e: any) {
    props.setUserPasswordDetails((prev: UserPasswordDetailsInterface) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }
  const colors = useColors();
  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        overflow: "hidden",
        height: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: 4,
          py: 2,
          bgcolor: colors.card,
          borderRadius: 4,
        }}
      >
        <Avatar sx={{ bgcolor: "green.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Enter your new password
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={() => {}}
          sx={{ mt: 3, pb: 2 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handlePasswordChange}
                value={props.userPasswordDetails.password}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                value={props.userPasswordDetails.confirmPassword}
                onChange={handlePasswordChange}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default UserPassword;
