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
} from "@mui/material";
import { ArrowBack, LockOutlined } from "@mui/icons-material";
import { FC, useEffect, useState } from "react";
import { GenericAbortSignal } from "axios";
import { getCompaniesByMobile } from "../../../../api/user.request";
import { useNavigate } from "react-router-dom";

interface LoginProps {}

interface LoginForm {
  mobile: string;
  company: string;
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
    company: "",
    password: "",
  });

  const [companies, setCompanies] = useState<Companies[]>([]);
  function handleSubmit() {}

  function handleMobileNumberChange(e: any) {
    if (e.target.value === "" || /\d/.test(e.target.value)) {
      setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (loginForm.mobile.length === 10) {
      fetchCompanies(loginForm.mobile, signal);
    } else {
      setCompanies([]);
    }
  }, [loginForm.mobile]);

  async function fetchCompanies(
    mobile: string,
    signal: GenericAbortSignal | undefined = undefined
  ) {
    const { success, data, error, message } = await getCompaniesByMobile(
      mobile
    );
    if (success) {
      setCompanies(
        data.companies.map((comp: string, idx: number) => {
          return { label: comp, id: idx };
        })
      );
    }
  }
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
          Sign In
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={2.2}>
              <TextField
                fullWidth
                value="+91"
                disabled
              />
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
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Company"
                    required
                  />
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
            Sign in
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

export default Login;
