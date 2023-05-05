import { useMutation } from "@tanstack/react-query";
import { sendOtp } from "../../../api/auth/auth.request";
import { processReactQueryOutput } from "../../../utils/handle-async";
import { DEV_ENV } from "../../../utils/constants";

export type SendOtpRequest = {
  email: string;
};

export type SendOtpResponse = {
  otp_sent: boolean;
};

export const useSendOtp = () => {
  return useMutation({
    mutationFn: async (data: SendOtpRequest) => {
      const response = await sendOtp(data);
      return processReactQueryOutput<SendOtpResponse>(response);
    },
    onSuccess: (data) => {
      DEV_ENV && console.log(data);
      alert(data.message);
    },
    onError: (error) => {
      DEV_ENV && console.log(error);
      alert("Failed to send otp");
    },
  });
};
