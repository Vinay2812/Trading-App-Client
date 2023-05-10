import {
  UserBankDetailsInterface,
  UserContactDetailsInterface,
  UserDetailsInterface,
} from "../../pages/Auth/types/register";


type PublishedListResponseType = {
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
  status: string;
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
