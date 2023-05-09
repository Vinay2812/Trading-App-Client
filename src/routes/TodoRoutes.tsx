import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthenticateTodoRoute } from "./AuthenticateRoutes";

const TodoList = lazy(() => import("../pages/Todos"));

export const TodoRoutes = () => {
  return (
    <Routes>
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
  );
};
