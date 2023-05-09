import { FC, ReactElement, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthenticateAdminRoute } from "./AuthenticateRoutes";
import Admin from "../pages/Admin";

const RegistrationList = lazy(
  () => import("../pages/Admin/components/RegistrationList")
);
const PublishList = lazy(() => import("../pages/Admin/components/PublishList"));
const PublishedList = lazy(() => import("../components/PublishedList"));
const UsersList = lazy(() => import("../pages/Admin/components/UsersList"));

interface AdminRoutesProps {}

export const AdminRoutes: FC<AdminRoutesProps> = (props): ReactElement => {
  return (
    <Routes>
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
    </Routes>
  );
};
