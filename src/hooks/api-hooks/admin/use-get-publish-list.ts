import { useQuery } from "@tanstack/react-query";
import { getPublishList } from "../../../api/admin/admin.request";
import { processReactQueryOutput } from "../../../utils/handle-async";
import { DEV_ENV } from "../../../utils/constants";

export type PublishListResponseType = {
  despatch?: number;
  tender_detail_id?: number;
  tender_no: number;
  tender_date: Date;
  mill_short_name: string;
  item_name: string;
  payment_to_name: string;
  tender_do_name: string;
  season: string;
  grade: string;
  quantal: number;
  lifting_date: Date;
  lifting_date_converted?: string;
  purchase_rate: number;
  mill_rate: number;
  mc?: number;
  pt?: number;
  item_code?: number;
  ic?: number;
  tender_id: number;
  td?: number;
  mill_code?: number;
  tender_do?: number;
  payment_to?: number;
  balance?: number;
  buyer?: number;
  buyer_party?: number;
  buyer_quantal?: number;
  buyer_id?: number;
  buyer_party_id?: number;
  buyer_name?: string;
  buyer_party_name?: string;
  tender_date_converted?: string;
  sale_rate?: number;
  company_code?: number;
  year_code?: number;
  id?: number;
  city_name?: string;
  commision_rate?: number;
  delivery_type?: string;
  ship_to_name?: string;
  party_bill_rate?: number;
};

export const usePublishList = () => {
  return useQuery({
    queryKey: ["publish-list"],
    queryFn: async () => {
      const response = await getPublishList();
      return processReactQueryOutput<PublishListResponseType[]>(response);
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
