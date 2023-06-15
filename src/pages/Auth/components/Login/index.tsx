import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowBack, LockOutlined } from "@mui/icons-material";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useColors } from "../../../../hooks/use-colors";
import Card from "../../../../components/Cards/Card";
import { useGetCompaniesByMobile } from "../../../../hooks/api-hooks/user";
import { useUserLogin } from "../../../../hooks/api-hooks/auth";
import TextLoader from "../../../../components/TextLoader/TextLoader";
import { useSendOtp } from "../../../../hooks/api-hooks/auth/use-send-otp";
import UserOtpVerification from "../Register/components/UserOtpVerification";
import UserPassword from "../Register/components/UserPassword";
import { UserLoginResponseType } from "../../../../hooks/api-hooks/user/user";
import { useGetUserByQuery } from "../../../../hooks/api-hooks/user/use-get-user";

interface LoginProps {}

interface LoginForm {
  mobile: string;
  company_name: string;
  password: string;
}

interface Companies {
  label: string;
  id: number;
}

const Login: FC<LoginProps> = (props) => {
  const navigate = useNavigate();
  const colors = useColors();

  const [activePage, setActivePage] = useState<"login" | "password" | "otp">(
    "login"
  );

  const [loginForm, setLoginForm] = useState<LoginForm>({
    mobile: "",
    company_name: "",
    password: "",
  });
  const [companies, setCompanies] = useState<Companies[]>([]);
  const [emailVerified, setEmailVerified] = useState(false);
  const [{ userData }, setUserData] = useState<UserLoginResponseType>(
    {} as UserLoginResponseType
  );

  // React query hooks
  const getCompaniesByMobileQuery = useGetCompaniesByMobile(loginForm.mobile);
  const loginUserMutation = useUserLogin();
  const sendOtpMutation = useSendOtp();
  const userByQuery = useGetUserByQuery(
    loginForm.company_name,
    loginForm.mobile
  );

  const [userPasswordDetails, setUserPasswordDetails] = useState({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!userByQuery.data?.value) return;
    setUserData(userByQuery.data.value);
  }, [userByQuery.data]);

  useEffect(() => {
    if (!getCompaniesByMobileQuery.data?.value) {
      setCompanies([]);
      return;
    }
    const companies = getCompaniesByMobileQuery.data?.value.companies.map(
      (company) => ({ label: company, id: 1 })
    );
    setCompanies(companies);
  }, [getCompaniesByMobileQuery.data]);

  useEffect(() => {
    emailVerified && setActivePage("password");
  }, [emailVerified]);

  async function handleSubmit() {
    loginUserMutation.mutate(loginForm);
  }
  
  function handleMobileNumberChange(e: any) {
    if (e.target.value === "" || /\d/.test(e.target.value)) {
      setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    }
  }

  const handleResetPassword = () => {
    sendOtpMutation.mutate({
      email: userData.email,
    });
    setActivePage("otp");
  };

  if (activePage === "otp") {
    return (
      <UserOtpVerification
        email={userData.email}
        isSendingOtp={sendOtpMutation.isLoading}
        setUserOtpVerified={setEmailVerified}
        userOtpSent={sendOtpMutation.isSuccess}
        userOtpVerified={emailVerified}
      />
    );
  }

  if (activePage === "password") {
    return (
      <UserPassword
        userPasswordDetails={userPasswordDetails}
        setUserPasswordDetails={setUserPasswordDetails}
        showUpdateButton
        userId={userData.userId!}
      />
    );
  }

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        bgcolor: colors.card,
        pb: 1,
        borderRadius: 4,
      }}
    >
      <TextLoader
        loading={loginUserMutation.isLoading}
        loadingText="Logging in"
      />
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2.5}>
            <Grid item xs={2.2}>
              <TextField fullWidth value="+91" disabled />
            </Grid>
            <Grid item xs={9.8}>
              <TextField
                required
                fullWidth
                label="Mobile Number"
                name="mobile"
                autoFocus
                onChange={handleMobileNumberChange}
                value={loginForm.mobile}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                options={companies}
                disabled={companies.length === 0}
                value={
                  companies.find(
                    (company) => company.label === loginForm.company_name
                  ) ?? null
                }
                onChange={(e, value) =>
                  setLoginForm({
                    ...loginForm,
                    company_name: value?.label || "",
                  })
                }
                renderInput={(params) => (
                  <TextField {...params} label="Company" required />
                )}
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
                autoComplete="new-password"
                onChange={(e) =>
                  setLoginForm({
                    ...loginForm,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="green"
            sx={{ mt: 3, mb: 2, p: 1 }}
            onClick={handleSubmit}
            disabled={loginUserMutation.isLoading}
          >
            Sign in
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="red"
            sx={{ mt: 1, mb: 2, p: 1 }}
            startIcon={<ArrowBack />}
            onClick={() => navigate("/auth")}
            disabled={loginUserMutation.isLoading}
          >
            Go to Home
          </Button>
          <Typography color={colors.textColor[400]}>
            Don't remember you password ?
            <Button size="small" onClick={handleResetPassword}>
              Reset Password
            </Button>
          </Typography>
        </Box>
      </Card>
    </Container>
  );
};

export default Login;
