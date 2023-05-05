export type UserDataType = {
  userId?: string
  company_name: string;
  email: string;
  address?: string;
  state: string;
  district: string;
  pincode: string;
  mobile: string;
  whatsapp?: string;
  gst?: string;
  pan: string;
  fssai: string;
  tan: string;
  constitution_of_firm: string;
  password: string;
};

export type UserBankDetailsType = {
  id: number;
  account_name: string;
  account_number: string;
  account_type: string;
  bank_name: string;
  branch: string;
  ifsc: string;
}

export type UserContactDetailsType = {
  id: number;
  full_name: string;
  designation: string;
  mobile: string;
  whatsapp: string;
  email: string;
}

export interface UserPasswordDetailsType {
  password: string,
  confirmPassword: string
}

