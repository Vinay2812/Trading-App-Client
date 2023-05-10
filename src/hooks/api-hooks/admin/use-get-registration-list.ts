import { useQuery } from "@tanstack/react-query";
import { getRegistrationListUsers } from "../../../api/admin/admin.request";
import { processReactQueryOutput } from "../../../utils/handle-async";
import { DEV_ENV } from "../../../utils/constants";

export type RegistrationListResponseType = {
  userId: string;
  company_name: string;
  email: string;
  mobile: string;
  authorized: string;
  accoid: number;
  gst?: string;
  state: string;
  district: string;
  address: string;
};


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
