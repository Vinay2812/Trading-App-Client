import { useQuery } from "@tanstack/react-query";
import { getUserByQuery } from "../../../api/user/user.request";
import { parseApiData } from "../../../utils/parse-data";
import { UserLoginResponseType, userLoginResponseSchema } from "./user";
import { DEV_ENV } from "../../../utils/constants";

export const useGetUserByQuery = (company_name: string, mobile: string) => {
  return useQuery({
    enabled: company_name.length > 0 && mobile.length === 10,
    queryKey: ["user", company_name, mobile],
    queryFn: async () => {
      const response = await getUserByQuery({
        company_name,
        mobile,
      });
      return parseApiData<UserLoginResponseType>(
        userLoginResponseSchema,
        response
      );
    },
    onSuccess: (data) => {
      DEV_ENV && console.log(data);
    },
    onError: (err) => {
      DEV_ENV && console.log(err);
    },
  });
};
