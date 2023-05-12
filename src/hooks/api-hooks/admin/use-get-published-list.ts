import { useQuery } from "@tanstack/react-query";
import { getPublishedList } from "../../../api/admin/admin.request";
import { processReactQueryOutput } from "../../../utils/react-query";
import { DEV_ENV } from "../../../utils/constants";

export type PublishedListResponseType = {
  tender_no: number;
  tender_id: number;
  tender_date: Date;
  mill_short_name: string;
  item_name: string;
  payment_to_name: string;
  tender_do_name: string;
  season: string;
  grade: string;
  unit: string;
  quantity: number;
  lifting_date: Date;
  purchase_rate: number;
  mill_rate: number;
  sale_rate: number;
  published_qty: number;
  sold: number;
  balance: number;
  auto_id: number;
  status: "Y" | "N";
  publish_date?: Date;
  mill_code?: number;
  mc?: number;
  payment_to?: number;
  item_code?: number;
  it?: number;
  pt?: number;
  do_ac?: number;
  do_id?: number;
  selling_type?: string;
  multiple_of?: number;
  auto_confirm?: string;
};

export const usePublishedList = () => {
  return useQuery({
    queryKey: ["published-list"],
    queryFn: async () => {
      const response = await getPublishedList();
      return processReactQueryOutput<PublishedListResponseType[]>(response);
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
