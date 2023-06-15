import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../../api/auth/auth.request";
import {
  UserDataType,
  UserLoginResponseType,
  userLoginResponseSchema,
} from "../user/user";
import { processReactQueryOutput } from "../../../utils/react-query";
import { DEV_ENV } from "../../../utils/constants";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux";
import { loginUserAction } from "../../../redux/reducers/user.reducer";
import { useCustomToast } from "../../use-custom-toast";
import { parseApiData } from "../../../utils/parse-data";

export type UserLoginRequest = {
  mobile: string;
  company_name: string;
  password: string;
};

export const useUserLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { success, fail } = useCustomToast();

  return useMutation({
    mutationFn: async (data: UserLoginRequest) => {
      const response = await loginUser(data);
      // return processReactQueryOutput<UserLoginResponse>(response);
      return parseApiData<UserLoginResponseType>(
        userLoginResponseSchema,
        response
      );
    },
    onSuccess: (data) => {
      DEV_ENV && console.log(data);
      success("Login Successful");
      dispatch(
        loginUserAction({
          userId: data.value?.userData.userId ?? null,
          company_name: data.value?.userData.company_name ?? null,
          email: data.value?.userData.email ?? null,
          mobile: data.value?.userData.mobile ?? null,
          accoid: data.value?.userData.accoid ?? null,
        })
      );
      navigate("/home");
    },
    onError: (error) => {
      DEV_ENV && console.log(error);
      fail("Login failed");
      return processReactQueryOutput<any>(error as any, true);
    },
  });
};
