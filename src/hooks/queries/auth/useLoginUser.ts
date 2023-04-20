import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../../api/auth/auth.request";

export const useLoginUser = () => {
  // return useMutation({
  //   mutationFn: async ({ mobile, company_name, password }: any) =>
  //     await loginUser(mobile, company_name, password),

  //   onSuccess(data, variables, context) {
  //     console.log(data.data);
  //   },

  //   onError(error, variables, context) {
  //     console.log(error);
  //   },
  // });
};
