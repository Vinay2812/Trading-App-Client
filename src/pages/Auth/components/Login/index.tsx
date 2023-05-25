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

  const [loginForm, setLoginForm] = useState<LoginForm>({
    mobile: "",
    company_name: "",
    password: "",
  });
  const [companies, setCompanies] = useState<Companies[]>([]);

  // React query hooks
  const getCompaniesByMobileQuery = useGetCompaniesByMobile(loginForm.mobile);
  const loginUserMutation = useUserLogin();

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

  async function handleSubmit() {
    loginUserMutation.mutate(loginForm);
  }

  function handleMobileNumberChange(e: any) {
    if (e.target.value === "" || /\d/.test(e.target.value)) {
      setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    }
  }
  return (
    <>
      {<TextLoader loading={loginUserMutation.isLoading } loadingText="Logging in" />}
      <Container
        component="main"
        maxWidth="sm"
        sx={{
          bgcolor: colors.card,
          py: 2,
          borderRadius: 4,
        }}
      >
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
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
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
                    ) || null
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
              variant="contained"
              color="red"
              sx={{ mt: 1, mb: 2, p: 1 }}
              startIcon={<ArrowBack />}
              onClick={() => navigate("/auth")}
              disabled={loginUserMutation.isLoading}
            >
              Go to Home
            </Button>
          </Box>
        </Card>
      </Container>
    </>
  );
};

export default Login;
