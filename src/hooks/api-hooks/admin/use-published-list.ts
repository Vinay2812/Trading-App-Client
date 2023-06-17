import { useQuery } from "@tanstack/react-query";
import { getPublishedList } from "../../../api/admin/admin.request";
import { processReactQueryOutput } from "../../../utils/react-query";
import { DEV_ENV } from "../../../utils/constants";
import { z } from "zod";
import { parseApiData } from "../../../utils/parse-data";
import { stringOrNumberSchema } from "../../../utils/zod-helpers";

export const publishedListSchema = z.object({
  tender_no: z.number(),
  tender_id: z.number(),
  tender_date: z.string().datetime(),
  mill_short_name: z.string(),
  item_name: z.string(),
  payment_to_name: z.string(),
  tender_do_name: z
    .string()
    .nullish()
    .transform((val) => val ?? "NA"),
  season: z.string(),
  grade: z.string(),
  unit: z.string(),
  qty: stringOrNumberSchema,
  lifting_date: z.string().datetime(),
  purc_rate: stringOrNumberSchema,
  mill_rate: stringOrNumberSchema,
  sale_rate: stringOrNumberSchema,
  published_qty: stringOrNumberSchema,
  sold: stringOrNumberSchema,
  balance: stringOrNumberSchema,
  autoid: z.number(),
  status: z.enum(["Y", "N"]),
  publish_date: z.string().datetime().optional(),
  mill_code: z.number().optional(),
  mc: z.number().optional(),
  payment_to: z.number().optional(),
  item_code: z.number().optional(),
  it: z.number().optional(),
  pt: z.number().optional(),
  do_ac: z.number().optional(),
  do_id: z.number().optional(),
  selling_type: z.enum(["F", "P"]),
  multiple_of: z.number(),
  auto_confirm: z.enum(["Y", "N"]),
});

export type PublishedListType = z.infer<typeof publishedListSchema>;

export const usePublishedList = (isClientList?: boolean) => {
  return useQuery({
    queryKey: ["published-list"],
    queryFn: async () => {
      const query = `?client=${!!isClientList}`
      const response = await getPublishedList(query);
      return parseApiData<PublishedListType[]>(publishedListSchema, response);
    },
    onSuccess: (response) => {
      DEV_ENV && console.log(response);
    },
    onError: (error) => {
      DEV_ENV && console.log(error);
      const err = processReactQueryOutput<any>(error as any, true);
    },
  });
};
