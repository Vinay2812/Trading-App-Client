import { useQuery } from "@tanstack/react-query";
import { processReactQueryOutput } from "../../../utils/react-query";
import { DEV_ENV } from "../../../utils/constants";
import { getAccountMasterByAccoid } from "../../../api/user/user.request";
import { Nullable } from "../../../types/helper";
import { z } from "zod";
import { parseApiData } from "../../../utils/parse-data";

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

export const accountMasterSchema = z.object({
  ac_code: z.number().optional(),
  ac_name_e: z.string().optional(),
  ac_name_r: z.string().optional(),
  ac_type: z.string().optional(),
  ac_rate: z.number().optional(),
  address_e: z.string().optional(),
  address_r: z.string().optional(),
  city_code: z.number().optional(),
  pincode: z.string().optional(),
  local_lic_no: z.string().optional(),
  tin_no: z.string().optional(),
  cst_no: z.string().optional(),
  gst_no: z.string().optional(),
  email_id: z.string().optional(),
  email_id_cc: z.string().optional(),
  other_narration: z.string().optional(),
  ecc_no: z.string().optional(),
  bank_name: z.string().optional(),
  bank_ac_no: z.string().optional(),
  bank_opening: z.number().optional(),
  bank_op_drcr: z.string().optional(),
  opening_balance: z.number().optional(),
  drcr: z.string().optional(),
  group_code: z.number().optional(),
  created_by: z.string().optional(),
  modified_by: z.string().optional(),
  short_name: z.string().optional(),
  commission: z.number().optional(),
  corporate_party: z.string().optional(),
  refer_by: z.string().optional(),
  offphone: z.string().optional(),
  fax: z.string().optional(),
  company_pan: z.string().optional(),
  ac_pan: z.string().optional(),
  mobile_no: z.string().optional(),
  is_login: z.string().optional(),
  ifsc: z.string().optional(),
  fssai: z.string().optional(),
  branch1ob: z.number().optional(),
  branch2ob: z.number().optional(),
  branch1drcr: z.string().optional(),
  branch2drcr: z.string().optional(),
  locked: z.boolean().optional(),
  gststatecode: z.number().optional(),
  unregistergst: z.boolean().optional(),
  distance: z.number().optional(),
  bal_limit: z.number().optional(),
  accoid: z.number(),
  bsid: z.number().optional(),
  cityid: z.number().optional(),
  whatsapp_no: z.string().optional(),
  company_code: z.number().optional(),
  adhar_no: z.string().optional(),
  limit_by: z.string().optional(),
  tan_no: z.string().optional(),
  tdsapplicable: z.string().optional(),
  panlink: z.string().optional(),
  insurance: z.number().optional(),
  msoms: z.string().optional(),
  userId: z.string().optional(),
});

export const accountMasterResponseSchema = z.object({
  userData: accountMasterSchema,
});

export type AccountMasterType = z.infer<typeof accountMasterSchema>;

export type AccountMasterResponseType = z.infer<
  typeof accountMasterResponseSchema
>;

export const useGetAccountMasterByAccoid = (accoid: number | null) => {
  return useQuery({
    // enabled: accoid !== null,
    queryKey: ["account-master", accoid],
    queryFn: async () => {
      if (!accoid)
        return {
          value: {} as Nullable<AccountMasterResponseType>,
          message: null,
        };
      const response = await getAccountMasterByAccoid(accoid);
      return parseApiData<AccountMasterResponseType>(
        accountMasterResponseSchema,
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
