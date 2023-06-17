import { useQuery } from "@tanstack/react-query";
import { getAccountMasterCompanies } from "../../../api/user/user.request";
import { processReactQueryOutput } from "../../../utils/react-query";
import { DEV_ENV } from "../../../utils/constants";
import { z } from "zod";
import { parseApiData } from "../../../utils/parse-data";

export const accountMasterCompaniesSchema = z.object({
  companies: z.array(
    z.object({
      ac_name_e: z.string(),
      accoid: z.number(),
    })
  ),
});

export type AccountMasterCompaniesType = z.infer<
  typeof accountMasterCompaniesSchema
>;

export const useGetAccountMasterCompanies = () => {
  return useQuery({
    queryKey: ["account-master-companies"],
    queryFn: async () => {
      const response = await getAccountMasterCompanies();
      return parseApiData<AccountMasterCompaniesType>(
        accountMasterCompaniesSchema,
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
