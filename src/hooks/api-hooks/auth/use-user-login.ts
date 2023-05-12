import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../../api/auth/auth.request";
import { UserDataType } from "../../../types/user";
import { processReactQueryOutput } from "../../../utils/react-query";
import { DEV_ENV } from "../../../utils/constants";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux";
import { loginUserAction } from "../../../redux/reducers/user.reducer";

export type UserLoginRequest = {
  mobile: string;
  company_name: string;
  password: string;
};

export type UserLoginResponse = {
  userData: UserDataType;
};

export const useUserLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async (data: UserLoginRequest) => {
      const response = await loginUser(data);
      return processReactQueryOutput<UserLoginResponse>(response);
    },
    onSuccess: (data) => {
      DEV_ENV && console.log(data);
      alert("Login Successful");
      dispatch(
        loginUserAction({
          userId: data.value?.userData.userId || null,
          company_name: data.value?.userData.company_name || null,
          email: data.value?.userData.email || null,
          mobile: data.value?.userData.mobile || null,
        })
      );
      navigate("/home");
    },
    onError: (error) => {
      DEV_ENV && console.log(error);
      alert("Login failed");
      return processReactQueryOutput<any>(error as any, true);
    },
  });
};
