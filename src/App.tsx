import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import RedirectProvider from "./hoc/RedirectProvider";
import UserTheme from "./hoc/UserThemeProvider";
import LoaderProvider, { Loader } from "./hoc/LoaderProvider";
import { Container, CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProSidebarProvider } from "react-pro-sidebar";

import Auth from "./pages/Auth";
import Admin from "./pages/Admin";

// Auth
const AdminLogin = lazy(() => import("./pages/Auth/components/AdminLogin"));
const Login = lazy(() => import("./pages/Auth/components/Login"));
const Register = lazy(() => import("./pages/Auth/components/Register"));

//  Admin
const RegistrationList = lazy(
  () => import("./pages/Admin/components/RegistrationList")
);
const PublishList = lazy(() => import("./pages/Admin/components/PublishList"));
const PublishedList = lazy(() => import("./components/PublishedList"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 3,
      suspense: true
    },
  },
});

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
                      <Route
                        path="registration-list"
                        element={<RegistrationList />}
                      />
                      <Route path="publish-list" element={<PublishList />} />
                      <Route path="published-list" element={<PublishedList />} />
                      <Route path="client-list" element={<PublishedList isClientList={true} />} />
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
