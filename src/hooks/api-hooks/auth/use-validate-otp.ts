import { useMutation } from "@tanstack/react-query";
import { validateOtp } from "../../../api/auth/auth.request";
import { processReactQueryOutput } from "../../../utils/react-query";
import { DEV_ENV } from "../../../utils/constants";
import { useCustomToast } from "../../use-custom-toast";

export type ValidateOtpRequest = {
  email: string;
  otp: string;
};

export type ValidateOtpResponse = {
  validEmail: boolean;
};

export const useValidateOtp = () => {
  const { success, fail } = useCustomToast();
  return useMutation({
    mutationFn: async (data: ValidateOtpRequest) => {
      const response = await validateOtp(data);
      return processReactQueryOutput<ValidateOtpResponse>(response);
    },
    onSuccess: (data) => {
      DEV_ENV && console.log(data);
      success(data.message);
    },
    onError: (error) => {
      DEV_ENV && console.log(error);
      fail("Invalid otp");
      return processReactQueryOutput<any>(error as any, true);
    },
  });
};
