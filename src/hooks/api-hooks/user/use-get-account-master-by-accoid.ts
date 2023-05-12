import { useQuery } from "@tanstack/react-query";
import { processReactQueryOutput } from "../../../utils/react-query";
import { DEV_ENV } from "../../../utils/constants";
import { getAccountMasterByAccoid } from "../../../api/user/user.request";
import { Nullable } from "../../../types/helper";

export type AccountMasterData = {
  ac_code?: number;
  ac_name_e?: string;
  ac_name_r?: string;
  ac_type?: string;
  ac_rate?: number;
  address_e?: string;
  address_r?: string;
  city_code?: number;
  pincode?: string;
  local_lic_no?: string;
  tin_no?: string;
  cst_no?: string;
  gst_no?: string;
  email_id?: string;
  email_id_cc?: string;
  other_narration?: string;
  ecc_no?: string;
  bank_name?: string;
  bank_ac_no?: string;
  bank_opening?: number;
  bank_op_drcr?: string;
  opening_balance?: number;
  drcr?: string;
  group_code?: number;
  created_by?: string;
  modified_by?: string;
  short_name?: string;
  commission?: number;
  corporate_party?: string;
  refer_by?: string;
  offphone?: string;
  fax?: string;
  company_pan?: string;
  ac_pan?: string;
  mobile_no?: string;

  is_login?: string;
  ifsc?: string;
  fssai?: string;
  branch1ob?: number;
  branch2ob?: number;
  branch1drcr?: string;
  branch2drcr?: string;
  locked?: boolean;
  gststatecode?: number;
  unregistergst?: boolean;
  distance?: number;
  bal_limit?: number;
  accoid: number;
  bsid?: number;
  cityid?: number;
  whatsapp_no?: string;
  company_code?: number;
  adhar_no?: string;
  limit_by?: string;
  tan_no?: string;
  tdsapplicable?: string;
  panlink?: string;
  insurance?: number;
  msoms?: string;
  userId?: string;
};

export type GetAccountMasterByAccoidResponse = {
  userData: AccountMasterData;
};

export const useGetAccountMasterByAccoid = (accoid: number | null) => {
  return useQuery({
    queryKey: ["account-master", accoid],
    queryFn: async () => {
      if (!accoid)
        return {
          value: {} as Nullable<GetAccountMasterByAccoidResponse>,
          message: null,
        };
      const response = await getAccountMasterByAccoid(accoid || -1);
      return processReactQueryOutput<GetAccountMasterByAccoidResponse>(
        response
      );
    },
    onSuccess: (data) => {
      DEV_ENV && console.log(data);
    },
    onError: (error) => {
      DEV_ENV && console.log(error);
      return processReactQueryOutput<any>(error as any, true);
    },
  });
};
