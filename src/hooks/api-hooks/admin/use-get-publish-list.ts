import { useQuery } from "@tanstack/react-query";
import { getPublishList } from "../../../api/admin/admin.request";
import { processReactQueryOutput } from "../../../utils/handle-async";
import { DEV_ENV } from "../../../utils/constants";
import { PublishListResponseType } from "../../../api/admin/response";

export const usePublishList = () => {
  return useQuery({
    queryKey: ["publish-list"],
    queryFn: async () => {
      const response = await getPublishList();
      return processReactQueryOutput<PublishListResponseType[]>(response);
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