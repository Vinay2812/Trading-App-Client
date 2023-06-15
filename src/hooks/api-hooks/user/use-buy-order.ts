import { useMutation } from "@tanstack/react-query";
import { buyOrder } from "../../../api/user/user.request";
import { DEV_ENV } from "../../../utils/constants";
import { z } from "zod";
import { processReactQueryOutput } from "../../../utils/react-query";

const buyOrderRequestSchema = z.object({
  tender_id: z.number(),
  tender_no: z.number(),
  userId: z.string(),
  accoid: z.number(),
  order_remark: z.string(),
  qty: z.number(),
  selling_type: z.string(),
  sale_rate: z.number(),
  mill_rate: z.number(),
  purc_rate: z.number(),
  order_confirmed: z.enum(["Y", "N"]),
  confirm_remark: z.string(),
});

export type BuyOrderRequestType = z.infer<typeof buyOrderRequestSchema>;

export const useBuyOrder = () => {
  return useMutation({
    mutationFn: async (data: BuyOrderRequestType) => {
      const response = await buyOrder(data);
      return processReactQueryOutput<null>(response);
    },
    onSuccess: (response) => {
      DEV_ENV && console.log(response);
    },
    onError: (err) => {
      DEV_ENV && console.log(err);
    },
  });
};
