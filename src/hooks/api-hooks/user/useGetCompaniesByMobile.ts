import { useQuery } from "@tanstack/react-query";
import { getCompaniesByMobile } from "../../../api/user/user.request";

export const useGetCompaniesByMobile = (mobile: string) => {
  return useQuery(
    ["user", "companies", mobile],
    async () => (await getCompaniesByMobile(mobile)).data,
    {
      enabled: mobile?.length === 10,
    }
  );
};
