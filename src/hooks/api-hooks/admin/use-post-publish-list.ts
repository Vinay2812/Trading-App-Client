import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postPublishList } from "../../../api/admin/admin.request";
import { processReactQueryOutput } from "../../../utils/react-query";
import { DEV_ENV } from "../../../utils/constants";
import { useCustomToast } from "../../use-custom-toast";

export type PostPublishRequest = {
  tender_no?: number;
  tender_date: Date;
  season: string;
  grade: string;
  quantal: number;
  lifting_date: Date;
  purchase_rate: number;
  mill_rate: number;
  mc: number;
  pt: number;
  item_code: number;
  ic: number;
  tender_id: number;
  td: number;
  unit: "Q" | "M" | "L";
  sale_rate: number;
  publish_quantal: number;
  multiple_of: number;
  auto_confirm: "Y" | "N";
  tender_do: number;
  type: "F" | "P";
  mill_code: number;
  payment_to: number;
  /** not required */
  mill_short_name: string;
  item_name: string;
};

export const usePostPublishList = () => {
  const queryClient = useQueryClient();
  const { success, fail } = useCustomToast();
  return useMutation({
    mutationFn: async (data: PostPublishRequest) => {
      const response = await postPublishList(data);
      return processReactQueryOutput<null>(response);
    },
    onSuccess: (data) => {
      DEV_ENV && console.log(data);
      queryClient.invalidateQueries(["published-list"]);
      queryClient.invalidateQueries(["publish-list"]);

      success(data.message);
    },
    onError: async (error) => {
      DEV_ENV && console.log("error", error);
      const err = processReactQueryOutput<any>(error as any, true);
      fail(err.message);
    },
  });
};
