import { ReactNode, lazy } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import "./App.css";
import { Container, CssBaseline } from "@mui/material";

import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import Providers from "./hoc/Providers";
import { useAppSelector } from "./hooks/redux";

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
const UsersList = lazy(() => import("./pages/Admin/components/UsersList"));
const TodoList = lazy(() => import("./components/TodoList"));

function App() {
  return (
    <Providers>
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
          <Route
            path=""
            element={
              <AuthenticateAuthRoute>
                <Auth />
              </AuthenticateAuthRoute>
            }
          />
          <Route path="/auth">
            <Route
              path=""
              element={
                <AuthenticateAuthRoute>
                  <Auth />
                </AuthenticateAuthRoute>
              }
            />
            <Route
              path="login"
              element={
                <AuthenticateAuthRoute>
                  <Login />
                </AuthenticateAuthRoute>
              }
            />
            <Route
              path="register"
              element={
                <AuthenticateAuthRoute>
                  <Register />
                </AuthenticateAuthRoute>
              }
            />
            <Route
              path="admin/login"
              element={
                <AuthenticateAuthRoute>
                  <AdminLogin />
                </AuthenticateAuthRoute>
              }
            />
          </Route>
          <Route path="/admin">
            <Route
              path=""
              element={
                <AuthenticateAdminRoute>
                  <Admin />
                </AuthenticateAdminRoute>
              }
            />
            <Route
              path="users-list"
              element={
                <AuthenticateAdminRoute>
                  <UsersList />
                </AuthenticateAdminRoute>
              }
            />
            <Route
              path="registration-list"
              element={
                <AuthenticateAdminRoute>
                  <RegistrationList />
                </AuthenticateAdminRoute>
              }
            />
            <Route
              path="publish-list"
              element={
                <AuthenticateAdminRoute>
                  <PublishList />
                </AuthenticateAdminRoute>
              }
            />
            <Route
              path="published-list"
              element={
                <AuthenticateAdminRoute>
                  <PublishedList />
                </AuthenticateAdminRoute>
              }
            />
            <Route
              path="client-list"
              element={
                <AuthenticateAdminRoute>
                  <PublishedList isClientList={true} />
                </AuthenticateAdminRoute>
              }
            />
          </Route>
          <Route path="/todos">
            <Route
              path=":userId"
              element={
                <AuthenticateTodoRoute>
                  <TodoList />
                </AuthenticateTodoRoute>
              }
            />
          </Route>
        </Routes>
      </Container>
    </Providers>
  );
}

const AuthenticateAdminRoute = ({ children }: { children: JSX.Element }) => {
  const isAdmin = useAppSelector((state) => state.admin.isAdmin);
  const isUser = useAppSelector((state) => state.user.email);

  if (isAdmin) {
    return children;
  }
  if (isUser) {
    return <div>Home</div>;
  }
  return <Auth />;
};

const AuthenticateUserRoute = ({ children }: { children: JSX.Element }) => {
  const isAdmin = useAppSelector((state) => state.admin.isAdmin);
  const isUser = useAppSelector((state) => state.user.email);
  if (isAdmin) {
    return <Admin />;
  }
  if (isUser) {
    return children;
  }
  return <Auth />;
};

const AuthenticateTodoRoute = ({ children }: { children: JSX.Element }) => {
  const params = useParams();
  const userId = params.userId;

  if (userId === "admin") {
    return children;
  }
  return <Auth />;
};

const AuthenticateAuthRoute = ({ children }: { children: JSX.Element }) => {
  const isAdmin = useAppSelector((state) => state.admin.isAdmin);
  const isUser = useAppSelector((state) => state.user.email);
  if (isAdmin) {
    return <Admin />;
  }
  if (isUser) {
    return <div>Home</div>;
  }
  return <Auth />;
};

export default App;
