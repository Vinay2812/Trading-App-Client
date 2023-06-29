import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import { AuthenticateUserRoute } from "./AuthenticateRoutes";
import PublishedList from "../components/PublishedList";
import UserProfile from "../pages/Home/components/UserProfile";

export const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/home">
        <Route
          path=""
          element={
            <AuthenticateUserRoute>
              <Home />
            </AuthenticateUserRoute>
          }
        />
      </Route>
      <Route
        path="/product-list"
        element={
          <AuthenticateUserRoute>
            <PublishedList isClientList />
          </AuthenticateUserRoute>
        }
      />
      <Route
        path="/user/:userId"
        element={
          // <AuthenticateUserRoute>
            <UserProfile />
          // </AuthenticateUserRoute>
        }
        />
    </Routes>
  );
};
