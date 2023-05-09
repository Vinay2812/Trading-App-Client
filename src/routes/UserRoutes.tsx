import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import { AuthenticateUserRoute } from "./AuthenticateRoutes";

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
    </Routes>
  );
};
