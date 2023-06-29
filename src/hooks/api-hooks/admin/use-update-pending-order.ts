import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { updatePendingOrder } from "../../../api/admin/admin.request";
import { processReactQueryOutput } from "../../../utils/react-query";
import { DEV_ENV } from "../../../utils/constants";
import { useCustomToast } from "../../use-custom-toast";

const updatePendingOrderSchema = z.object({
  order_id: z.number({
    required_error: "Order id is required",
  }),
  confirm_remark: z
    .string()
    .nullish()
    .transform((val) => val ?? ""),
  order_remark: z
    .string()
    .nullish()
    .transform((val) => val ?? ""),
  order_confirmed: z.enum(["Y", "N", "R"], {
    required_error: "Order approved status is required",
    invalid_type_error: "Please provide a valid input",
  }),
});

export type UpdatePendingOrder = z.infer<typeof updatePendingOrderSchema>;

export const useUpdatePendingOrder = () => {
  const { success, fail } = useCustomToast();
  return useMutation({
    mutationFn: async (data: UpdatePendingOrder) => {
      const res = await updatePendingOrder(data);
      return processReactQueryOutput<null>(res);
    },
    onSuccess: (data) => {
      DEV_ENV && console.log(data);
      success(data.message);
    },
  });
};
