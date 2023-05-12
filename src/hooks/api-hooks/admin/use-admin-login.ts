import { useMutation } from "@tanstack/react-query";
import { processReactQueryOutput } from "../../../utils/react-query";
import { DEV_ENV } from "../../../utils/constants";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../../api/admin/admin.request";
import { AdminDataType } from "../../../types/admin";

export type AdminLoginRequest = {
  username: string;
  password: string;
};

export type AdminLoginResponse = {
  adminData: AdminDataType;
};

export const useAdminLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data: AdminLoginRequest) => {
      const response = await adminLogin(data);
      return processReactQueryOutput<AdminLoginResponse>(response);
    },
    onSuccess: (data) => {
      DEV_ENV && console.log(data);
      alert("Login Successful");
      navigate("/admin");
    },
    onError: (error) => {
      DEV_ENV && console.log(error);
      alert("Login failed");
      return processReactQueryOutput<any>(error as any, true);
    },
  });
};
