import { useQuery } from "@tanstack/react-query";
import { getUsersList } from "../../../api/user/user.request";
import { processReactQueryOutput } from "../../../utils/handle-async";
import { UsersListResponseType } from "../../../api/user/response";
import { DEV_ENV } from "../../../utils/constants";

export const useUsersList = () => {
  return useQuery({
    queryKey: ["users-list"],
    queryFn: async () => {
      const response = await getUsersList();
      return processReactQueryOutput<UsersListResponseType>(response);
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
