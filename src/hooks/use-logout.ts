import { useNavigate } from "react-router-dom";
import { logoutAdminAction } from "../redux/reducers/admin.reducer";
import { useAppDispatch } from "./redux";
import { logoutUserAction } from "../redux/reducers/user.reducer";
import { useQueryClient } from "@tanstack/react-query";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return {
    logout: ({ isAdmin }: { isAdmin: boolean }) => {
      queryClient.invalidateQueries()
      dispatch(isAdmin ? logoutAdminAction() : logoutUserAction());
      navigate(isAdmin ? "/auth" : "/auth/login");
    },
  };
};
