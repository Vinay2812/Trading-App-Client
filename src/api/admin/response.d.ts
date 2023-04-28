import {
  UserBankDetailsInterface,
  UserContactDetailsInterface,
  UserDetailsInterface,
} from "../../pages/Auth/types/register";

type RegistrationListResponseType = {
  userId: string;
  company_name: string;
  email: string;
  mobile: string;
  authorized: string;
  accoid: number;
};

type PublishListResponseType = {
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
