import { useMutation } from "@tanstack/react-query";
import { sendOtp } from "../../../api/auth/auth.request";
import { processReactQueryOutput } from "../../../utils/react-query";
import { DEV_ENV } from "../../../utils/constants";
import { useCustomToast } from "../../use-custom-toast";

export type SendOtpRequest = {
  email: string;
};

export type SendOtpResponse = {
  otp_sent: boolean;
};

export const useSendOtp = () => {
  const { success, fail } = useCustomToast();
  return useMutation({
    mutationFn: async (data: SendOtpRequest) => {
      const response = await sendOtp(data);
      return processReactQueryOutput<SendOtpResponse>(response);
    },
    onSuccess: (data) => {
      DEV_ENV && console.log(data);
      success(data.message);
    },
    onError: (error) => {
      DEV_ENV && console.log(error);
      fail("Failed to send otp");
    },
  });
};
