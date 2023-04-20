export interface UserDetailsInterface {
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
  password: string,
}

export interface UserBankDetailsInterface {
  id: number;
  account_name: string;
  account_number: string;
  account_type: string;
  bank_name: string;
  branch: string;
  ifsc: string;
}

export interface UserContactDetailsInterface {
  id: number;
  full_name: string;
  designation: string;
  mobile: string;
  whatsapp: string;
  email: string;
}

export interface UserPasswordDetailsInterface {
  password: string,
  confirmPassword: string
}

export type dropdownType = {
  label: string;
  id: number;
};
