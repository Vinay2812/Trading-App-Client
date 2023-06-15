import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "../../../api/auth/auth.request";
import { processReactQueryOutput } from "../../../utils/react-query";
import { DEV_ENV } from "../../../utils/constants";
import { useCustomToast } from "../../use-custom-toast";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

const updatePasswordSchema = z.object({
  userId: z.string(),
  password: z.string(),
});

export type UpdatePasswordType = z.infer<typeof updatePasswordSchema>;

export const useUpdatePassword = () => {
  const { success, fail } = useCustomToast();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data: UpdatePasswordType) => {
      const response = await updatePassword(data);
      return processReactQueryOutput<null>(response);
    },
    onSuccess: (data) => {
      DEV_ENV && console.log(data);
      success(data.message);
      navigate("/auth");
    },
    onError: (err) => {
      DEV_ENV && console.log(err);
      const { message } = processReactQueryOutput<any>(err as any, true);
      fail(message);
    },
  });
};
