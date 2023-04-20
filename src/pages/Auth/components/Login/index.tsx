import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { ArrowBack, LockOutlined } from "@mui/icons-material";
import { FC, useEffect, useState } from "react";
import { getCompaniesByMobile } from "../../../../api/user/user.request";
import { useNavigate } from "react-router-dom";
import { boxShadow } from "../../../../styles/auth";
import { loginUser } from "../../../../api/auth/auth.request";
import { handleApiAsync } from "../../../../utils/handleAsync";
import { LoginUserResponse } from "../../../../api/auth/response";
import { GetCompaniesBymobileResponse } from "../../../../api/user/response";
import { tokens } from "../../../../utils/theme";
import { useColors } from "../../../../hooks/useColors";

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
  const [loginForm, setLoginForm] = useState<LoginForm>({
    mobile: "",
    company_name: "",
    password: "",
  });
  const [companies, setCompanies] = useState<Companies[]>([]);
  // const [companyInpu]

  useEffect(() => {
    if (loginForm.mobile.length === 10) {
      fetchCompaniesByMobile(loginForm.mobile);
    } else {
      setCompanies([]);
    }
  }, [loginForm.mobile]);

  async function handleSubmit() {
    const { value, error, status, message } =
      await handleApiAsync<LoginUserResponse>(loginUser(loginForm));
    if (status === "error") {
      alert(error);
    } else {
      console.log(value.userData);
    }
  }

  async function fetchCompaniesByMobile(mobile: string) {
    const { value, status } =
      await handleApiAsync<GetCompaniesBymobileResponse>(
        getCompaniesByMobile(mobile)
      );
    if (status === "success") {
      let idx = 1;
      setCompanies(
        value.companies.map((company) => ({ label: company, id: idx++ }))
      );
    }
  }

  function handleMobileNumberChange(e: any) {
    if (e.target.value === "" || /\d/.test(e.target.value)) {
      setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    }
  }
  const colors = useColors();
  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        bgcolor: `${colors.cardAccent}`,
        py: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%"
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
                value={companies.find(
                  (company) => company.label === loginForm.company_name
                )}
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
            type="submit"
            fullWidth
            variant="contained"
            color="indigo"
            sx={{ mt: 3, mb: 2, p: 1 }}
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
          >
            Back
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
