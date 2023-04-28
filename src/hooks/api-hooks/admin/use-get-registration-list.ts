import { useQuery } from "@tanstack/react-query";
import { getRegistrationListUsers } from "../../../api/admin/admin.request";
import { processReactQueryOutput } from "../../../utils/handle-async";
import { DEV_ENV } from "../../../utils/constants";
import { RegistrationListResponseType } from "../../../api/admin/response";

export const useRegistrationList = () => {
  return useQuery({
    queryKey: ["registration-list"],
    queryFn: async () => {
      const response = await getRegistrationListUsers();
      return processReactQueryOutput<RegistrationListResponseType[]>(response);
    },
    onSuccess: (response) => {
      DEV_ENV && console.log(response);
    },
    onError: (error) => {
      DEV_ENV && console.log("error", error);
      return processReactQueryOutput<any>(error as any, true);
    },
  });
};
