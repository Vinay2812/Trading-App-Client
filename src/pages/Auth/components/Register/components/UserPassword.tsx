import { FC, useEffect } from "react";
import { UserPasswordDetailsInterface } from "../../../types/register";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowBack, LockOutlined } from "@mui/icons-material";
import { useColors } from "../../../../../hooks/use-colors";
import { useCustomToast } from "../../../../../hooks/use-custom-toast";
import { useUpdatePassword } from "../../../../../hooks/api-hooks/auth/use-update-password";
import TextLoader from "../../../../../components/TextLoader/TextLoader";
import { useNavigate } from "react-router-dom";

interface UserPasswordProps {
  userPasswordDetails: UserPasswordDetailsInterface;
  setUserPasswordDetails: Function;
  showUpdateButton?: boolean;
  userId?: string;
}

const UserPassword: FC<UserPasswordProps> = (props) => {
  function handlePasswordChange(e: any) {
    props.setUserPasswordDetails((prev: UserPasswordDetailsInterface) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }
  const { fail } = useCustomToast();
  const colors = useColors();
  const navigate = useNavigate()

  // React query
  const updatePasswordMutation = useUpdatePassword();

  const handleUpdatePassword = () => {
    if (!props.userId) return;
    if (
      props.userPasswordDetails.password !==
      props.userPasswordDetails.confirmPassword
    ) {
      return fail("Password and confirm password must match");
    }
    updatePasswordMutation.mutate({
      userId: props.userId,
      password: props.userPasswordDetails.password,
    });
  };

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
      <TextLoader
        loading={updatePasswordMutation.isLoading}
        loadingText="updating"
      />
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
        {props.showUpdateButton && (
          <>
            <Button
              color="green"
              fullWidth
              variant="contained"
              onClick={handleUpdatePassword}
              disabled={updatePasswordMutation.isLoading}
            >
              Update
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="red"
              sx={{ mt: 2, mb: 1, p: 1 }}
              startIcon={<ArrowBack />}
              onClick={() => navigate("/auth")}
              disabled={updatePasswordMutation.isLoading}
            >
              Back
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
};

export default UserPassword;
