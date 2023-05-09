import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthenticateAuthRoute } from "./AuthenticateRoutes";
import Auth from "../pages/Auth";

// Auth
const AdminLogin = lazy(() => import("../pages/Auth/components/AdminLogin"));
const Login = lazy(() => import("../pages/Auth/components/Login"));
const Register = lazy(() => import("../pages/Auth/components/Register"));

export const AuthRoutes = () => {
  return (
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
    </Routes>
  );
};
