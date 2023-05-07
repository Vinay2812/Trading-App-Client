import { useNavigate } from "react-router-dom";
import { logoutAdminAction } from "../redux/reducers/admin.reducer";
import { useAppDispatch } from "./redux";
import { logoutUserAction } from "../redux/reducers/user.reducer";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return {
    logout: (isAdmin = true) => {
      dispatch(isAdmin ? logoutAdminAction() : logoutUserAction());
      navigate("/auth");
    },
  };
};
