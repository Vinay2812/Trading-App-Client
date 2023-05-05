import { useMutation, useQueryClient } from "@tanstack/react-query";
import { processReactQueryOutput } from "../../../utils/handle-async";
import { DEV_ENV } from "../../../utils/constants";
import { useNavigate } from "react-router-dom";
import {
  UserBankDetailsType,
  UserContactDetailsType,
  UserDataType,
} from "../../../types/user";
import { registerUser } from "../../../api/auth/auth.request";

export type RegisterUserRequest = {
  userData: UserDataType;
  bankData: Array<UserBankDetailsType>;
  contactData: Array<UserContactDetailsType>;
};

export type RegisterUserResponse = {
  userData: UserDataType;
};

export const useRegisterUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: RegisterUserRequest) => {
      const response = await registerUser(data);
      return processReactQueryOutput<RegisterUserResponse>(response);
    },
    onSuccess: (data) => {
      DEV_ENV && console.log(data);
      queryClient.invalidateQueries([
        "user",
        "companies",
        data.value?.userData.mobile,
      ]);
      alert("Registration Successful");
      navigate("/admin");
    },
    onError: (error) => {
      DEV_ENV && console.log(error);
      alert("Registration failed")
      return processReactQueryOutput<any>(error as any, true);
    },
  });
};
