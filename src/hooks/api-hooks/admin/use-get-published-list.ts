import { useQuery } from "@tanstack/react-query";
import { getPublishedList } from "../../../api/admin/admin.request";
import { processReactQueryOutput } from "../../../utils/handle-async";
import { DEV_ENV } from "../../../utils/constants";
import { PublishedListResponseType } from "../../../api/admin/response";

export const usePublishedList = () => {
  return useQuery({
    queryKey: ["published-list"],
    queryFn: async () => {
      const response = await getPublishedList();
      return processReactQueryOutput<PublishedListResponseType[]>(response);
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
