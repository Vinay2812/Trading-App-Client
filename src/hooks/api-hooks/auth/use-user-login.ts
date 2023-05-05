import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../../api/auth/auth.request";
import { UserDataType } from "../../../types/user";
import { processReactQueryOutput } from "../../../utils/handle-async";
import { DEV_ENV } from "../../../utils/constants";
import { useNavigate } from "react-router-dom";

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
  return useMutation({
    mutationFn: async (data: UserLoginRequest) => {
      const response = await loginUser(data);
      return processReactQueryOutput<UserLoginResponse>(response);
    },
    onSuccess: (data) => {
      DEV_ENV && console.log(data);
      alert("Login Successful")
      navigate("/admin")
    },
    onError: (error) => {
      DEV_ENV && console.log(error);
      alert("Login failed")
      return processReactQueryOutput<any>(error as any, true);
    },
  });
};
