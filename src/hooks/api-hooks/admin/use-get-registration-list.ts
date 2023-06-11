import { useQuery } from "@tanstack/react-query";
import { getRegistrationListUsers } from "../../../api/admin/admin.request";
import { processReactQueryOutput } from "../../../utils/react-query";
import { DEV_ENV } from "../../../utils/constants";
import { z } from "zod";
import { parseApiData } from "../../../utils/parse-data";

const registartionListSchema = z.object({
  userId: z.string(),
  company_name: z.string(),
  email: z.string(),
  mobile: z.string(),
  authorized: z.string(),
  accoid: z.number().nullish(),
  gst: z.string().nullish().optional().default("NA"),
  state: z.string(),
  district: z.string(),
  address: z.string(),
});

export type RegistrationListType = z.infer<typeof registartionListSchema>;

export const useRegistrationList = () => {
  return useQuery({
    queryKey: ["registration-list"],
    queryFn: async () => {
      const response = await getRegistrationListUsers();
      return parseApiData<RegistrationListType[]>(
        registartionListSchema,
        response
      );
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
