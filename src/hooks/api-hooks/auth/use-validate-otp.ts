import { useMutation } from "@tanstack/react-query";
import { validateOtp } from "../../../api/auth/auth.request";
import { processReactQueryOutput } from "../../../utils/handle-async";
import { DEV_ENV } from "../../../utils/constants";

export type ValidateOtpRequest = {
  email: string;
  otp: string;
};

export type ValidateOtpResponse = {
  validEmail: boolean;
};

export const useValidateOtp = () => {
  return useMutation({
    mutationFn: async (data: ValidateOtpRequest) => {
        const response = await validateOtp(data)
        return processReactQueryOutput<ValidateOtpResponse>(response)
    },
    onSuccess: (data) => {
        DEV_ENV && console.log(data)
        alert(data.message)
    },
    onError: (error) => {
        DEV_ENV && console.log(error)
        alert("Invalid otp")
        return processReactQueryOutput<any>(error as any, true)
    },
  });
};
