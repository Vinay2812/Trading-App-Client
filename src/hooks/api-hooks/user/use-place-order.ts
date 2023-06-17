import { useMutation } from "@tanstack/react-query";
import { placeOrder } from "../../../api/user/user.request";
import { DEV_ENV } from "../../../utils/constants";
import { z } from "zod";
import { processReactQueryOutput } from "../../../utils/react-query";
import { useCustomToast } from "../../use-custom-toast";

const placeOrderRequestSchema = z.object({
  tender_id: z.number(),
  tender_no: z.number(),
  userId: z.string(),
  accoid: z.number(),
  order_remark: z.string().nullish(),
  qty: z.number(),
  selling_type: z.enum(["F", "P"]),
  sale_rate: z.number(),
  mill_rate: z.number(),
  purc_rate: z.number(),
  order_confirmed: z.enum(["Y", "N"]),
  confirm_remark: z.string().nullish(),
});

export type PlaceOrderRequestType = z.infer<typeof placeOrderRequestSchema>;

export const usePlaceOrder = () => {
  const { success } = useCustomToast();
  return useMutation({
    mutationFn: async (data: PlaceOrderRequestType) => {
      const response = await placeOrder(data);
      return processReactQueryOutput<null>(response);
    },
    onSuccess: (response) => {
      DEV_ENV && console.log(response);
      
      success(response.message);
    },
    onError: (err) => {
      DEV_ENV && console.log(err);
    },
  });
};
