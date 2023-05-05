import { useQuery } from "@tanstack/react-query";
import { getCompaniesByMobile } from "../../../api/user/user.request";
import { processReactQueryOutput } from "../../../utils/handle-async";

export type GetGetCompaniesByMobileRequest = string;

export type GetCompaniesByMobileResponse = {
  companies: string[];
};

export const useGetCompaniesByMobile = (mobile: string) => {
  return useQuery(
    {
      queryKey: ["user", "companies", mobile],
      queryFn: async () => {
        const response = await getCompaniesByMobile(mobile);
        return processReactQueryOutput<GetCompaniesByMobileResponse>(response)
      },
      enabled: mobile?.length === 10,
    }
  );
};
