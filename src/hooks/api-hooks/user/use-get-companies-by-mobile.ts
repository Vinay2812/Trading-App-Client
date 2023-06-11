import { useQuery } from "@tanstack/react-query";
import { getCompaniesByMobile } from "../../../api/user/user.request";
import { processReactQueryOutput } from "../../../utils/react-query";
import { z } from "zod";
import { parseApiData } from "../../../utils/parse-data";
import { DEV_ENV } from "../../../utils/constants";

export type GetCompaniesByMobileResponse = {
  companies: string[];
};

export const companiesByMobileSchema = z.object({
  companies: z.array(z.string()),
});

export type CompaniesByMobileType = z.infer<typeof companiesByMobileSchema>;

export const useGetCompaniesByMobile = (mobile: string) => {
  return useQuery({
    queryKey: ["user", "companies", mobile],
    queryFn: async () => {
      const response = await getCompaniesByMobile(mobile);
      return parseApiData<CompaniesByMobileType>(
        companiesByMobileSchema,
        response
      );
    },
    enabled: mobile?.length === 10,
    onSuccess: (data) => {
      DEV_ENV && console.log(data);
    },
    onError: (err) => {
      DEV_ENV && console.log(err);
    },
  });
};
