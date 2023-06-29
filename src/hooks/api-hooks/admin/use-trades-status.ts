import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllTradeStatus,
  updateAllTradeStatus,
} from "../../../api/admin/admin.request";
import { processReactQueryOutput } from "../../../utils/react-query";
import { DEV_ENV } from "../../../utils/constants";
import { useCustomToast } from "../../use-custom-toast";
import { z } from "zod";
import { parseApiData } from "../../../utils/parse-data";

const tradesStatusSchema = z.object({
  stopButtonEnabled: z.boolean(),
});
export type TradesStatus = z.infer<typeof tradesStatusSchema>;

export const useGetAllTradeStatus = () => {
  const { success } = useCustomToast();
  return useQuery({
    queryKey: ["trade-status", "all"],
    queryFn: async () => {
      const res = await getAllTradeStatus();
      return parseApiData<TradesStatus>(tradesStatusSchema, res);
    },
    onSuccess: (data) => {
      DEV_ENV && console.log(data);
    //   success(data.message);
    },
  });
};

export const useUpdateAllTradeStatus = () => {
  const { success } = useCustomToast();
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (status: "Y" | "N") => {
      const res = await updateAllTradeStatus({ status });
      return processReactQueryOutput<null>(res);
    },
    onSuccess: (data) => {
      DEV_ENV && console.log(data);
        queryClient.invalidateQueries(["trade-status"])
      success(data.message);
    },
  });
};
