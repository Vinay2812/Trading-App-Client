import { useQuery } from "@tanstack/react-query";
import { getAccountMasterCompanies } from "../../../api/user/user.request";
import { processReactQueryOutput } from "../../../utils/handle-async";
import { DEV_ENV } from "../../../utils/constants";

export type AccountMasterCompanies = {
  ac_name_e: string;
  accoid: number;
};

export type GetAccountMasterCompaniesResponse = {
  companies: AccountMasterCompanies[];
};

export const useGetAccountMasterCompanies = () => {
  return useQuery({
    queryKey: ["account-master-companies"],
    queryFn: async () => {
      const response = await getAccountMasterCompanies();
      return processReactQueryOutput<GetAccountMasterCompaniesResponse>(
        response
      );
    },
    onSuccess: (data) => {
      DEV_ENV && console.log(data);
    },
    onError: (error) => {
      DEV_ENV && console.log(error);
      return processReactQueryOutput<any>(error as any, true);
    },
  });
};
