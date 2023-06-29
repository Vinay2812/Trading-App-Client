import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePublishedListItem } from "../../../api/admin/admin.request";
import { processReactQueryOutput } from "../../../utils/react-query";
import { DEV_ENV } from "../../../utils/constants";
import { useCustomToast } from "../../use-custom-toast";

export type UpdatePublishedListItemRequest = {
  tender_id: number;
  sale_rate: number;
  published_qty: number;
  status: "Y" | "N";
  publish_date?: string | Date;
};

export const useUpdatePublishedListItem = () => {
  const queryClient = useQueryClient();
  const { success, fail } = useCustomToast();
  return useMutation({
    mutationFn: async (reqBody: UpdatePublishedListItemRequest) => {
      const response = await updatePublishedListItem(reqBody);
      return processReactQueryOutput<null>(response);
    },
    onSuccess: (data) => {
      DEV_ENV && console.log(data);
      queryClient.invalidateQueries(["published-list"]);
      success(data.message);
    },
    onError: async (error) => {
      DEV_ENV && console.log(error);
      const err = processReactQueryOutput<any>(error as any, true);
      fail(err.message);
    },
  });
};
