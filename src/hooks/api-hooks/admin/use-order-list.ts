import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { getOrderList } from "../../../api/admin/admin.request";
import { parseApiData } from "../../../utils/parse-data";
import { DEV_ENV } from "../../../utils/constants";

export const orderListSchema = z.object({
  order_id: z.number(),
  tender_id: z.number(),
  tender_no: z.number(),
  userId: z.string(),
  accoid: z.number(),
  order_date: z.string().datetime(),
  order_remark: z.string(),
  qty: z.string(),
  selling_type: z.string(),
  sale_rate: z.string(),
  mill_rate: z.string(),
  purc_rate: z.string(),
  order_confirmed: z.string(),
  confirm_remark: z.string(),
  company_name: z.string().optional(),
});

export type OrderListType = z.infer<typeof orderListSchema>;

export const useOrderList = ({
  userId,
  orderConfirmed,
}: {
  userId?: string;
  orderConfirmed?: "Y" | "N";
}) => {
  return useQuery({
    queryKey: ["order-list", userId ?? "", orderConfirmed ?? ""],
    queryFn: async () => {
      let query = "";
      if (userId) {
        query = `?userId=${userId}`;
      }
      if (userId && orderConfirmed) {
        query += `&order_confirmed=${orderConfirmed}`;
      } else if (orderConfirmed) {
        query = `?order_confirmed=${orderConfirmed}`;
      }
      const res = await getOrderList(query);
      return parseApiData<OrderListType[]>(orderListSchema, res);
    },
    onSuccess: (data) => {
      DEV_ENV && console.log(data);
    },
    onError: (data) => {
      DEV_ENV && console.log(data);
    },
  });
};
