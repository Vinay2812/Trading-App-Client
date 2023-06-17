import { useQuery } from "@tanstack/react-query";
import { getPublishList } from "../../../api/admin/admin.request";
import { processReactQueryOutput } from "../../../utils/react-query";
import { DEV_ENV } from "../../../utils/constants";
import { z } from "zod";
import { stringOrNumberSchema } from "../../../utils/zod-helpers";
import { parseApiData } from "../../../utils/parse-data";

const publishedListSchema = z.object({
  despatch: z.number().optional(),
  tender_detail_id: z.number().optional(),
  tender_no: z.number(),
  tender_date: z.string().datetime(),
  mill_short_name: z.string(),
  item_name: z.string(),
  payment_to_name: z.string(),
  tender_do_name: z.string(),
  season: z.string(),
  grade: z.string(),
  quantal: stringOrNumberSchema,
  lifting_date: z.string().datetime(),
  lifting_date_converted: z.string().optional(),
  purchase_rate: stringOrNumberSchema,
  mill_rate: stringOrNumberSchema,
  mc: z.number().optional(),
  pt: z.number().optional(),
  item_code: z.number().optional(),
  ic: z.number().optional(),
  tender_id: z.number(),
  td: z.number().optional(),
  mill_code: z.number().optional(),
  tender_do: z.number().optional(),
  payment_to: z.number().optional(),
  balance: stringOrNumberSchema,
  buyer: z.number(),
  buyer_party: z.number(),
  buyer_quantal: stringOrNumberSchema,
  buyer_id: z.number().optional(),
  buyer_party_id: z.number().optional(),
  buyer_name: z.string().optional(),
  buyer_party_name: z.string().optional(),
  tender_date_converted: z.string().optional(),
  sale_rate: stringOrNumberSchema,
  company_code: z.number().optional(),
  year_code: z.number().optional(),
  id: z.number(),
  city_name: z.string().optional(),
  commision_rate: stringOrNumberSchema,
  delivery_type: z.string(),
  ship_to_name: z.string().optional(),
  party_bill_rate: stringOrNumberSchema,
});

export type PublishListType = z.infer<typeof publishedListSchema>;

export const usePublishList = () => {
  return useQuery({
    queryKey: ["publish-list"],
    queryFn: async () => {
      const response = await getPublishList();
      return parseApiData<PublishListType[]>(publishedListSchema, response);
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
