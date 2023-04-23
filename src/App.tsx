import { Route, Routes } from "react-router-dom";
import "./App.css";
import RedirectProvider from "./hoc/RedirectProvider";
import UserTheme from "./hoc/UserThemeProvider";
import LoaderProvider, { Loader } from "./hoc/LoaderProvider";
import { Container, CssBaseline } from "@mui/material";
import Auth from "./pages/Auth";
import { lazyLoad } from "./utils/lazyLoad";
import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProSidebarProvider } from "react-pro-sidebar";
import Admin from "./pages/Admin";
import { AdminSidebar, RegistrationList } from "./pages/Admin/components";

const AdminLogin = lazyLoad("/src/pages/Auth/components", "AdminLogin");
const Login = lazyLoad("/src/pages/Auth/components", "Login");
const Register = lazyLoad("/src/pages/Auth/components", "Register");

const queryClient = new QueryClient();

function App() {
  return (
    <RedirectProvider>
      <QueryClientProvider client={queryClient}>
        <ProSidebarProvider>
          <UserTheme>
            <LoaderProvider>
              <Suspense fallback={<Loader />}>
                <CssBaseline />
                <Container
                  disableGutters={true}
                  sx={{
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "background.default",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                  maxWidth={false}
                >
                  <Routes>
                    <Route path="/auth">
                      <Route path="" element={<Auth />} />
                      <Route path="login" element={<Login />} />
                      <Route path="register" element={<Register />} />
                      <Route path="admin/login" element={<AdminLogin />} />
                    </Route>
                    <Route path="/admin">
                      <Route path="" element={<Admin />} />
                      <Route path="users" element={<Admin />} />
                      <Route path="registration-list" element={<RegistrationList />} />
                      <Route path="published-list" element={<Admin />} />
                      <Route path="publish-list" element={<Admin />} />
                      <Route path="client-publish-list" element={<Admin />} />
                    </Route>
                  </Routes>
                </Container>
              </Suspense>
            </LoaderProvider>
          </UserTheme>
        </ProSidebarProvider>
      </QueryClientProvider>
    </RedirectProvider>
  );
}

export default App;
