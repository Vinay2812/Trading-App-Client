import yup from "yup";
import {
  UserBankDetailsInterface,
  UserContactDetailsInterface,
  UserDetailsInterface,
  UserPasswordDetailsInterface,
} from "../../../types/register";

export const userDetailsSchema = yup
  .object<UserDetailsInterface>()
  .shape({
    company_name: yup.string().min(4).required(),
    email: yup.string().email().required(),
    address: yup.string().nullable(),
    state: yup.string().required(),
    district: yup.string().required(),
    pincode: yup.string().min(6).max(6).matches(/\d/).required(),
    mobile: yup.string().min(10).max(10).matches(/\d/).required(),
    whatsapp: yup.string().min(10).max(10).matches(/\d/).nullable(),
    gst: yup.string().min(15).max(15).nullable(),
    pan: yup.string().min(10).max(10).required(),
    fssai: yup.string().required(),
    tan: yup.string().required(),
    constitution_of_firm: yup.string().required(),
  })
  .required();

export const userBankDetailsSchema = yup
  .object<UserBankDetailsInterface>()
  .shape({
    account_name: yup.string().required(),
    account_number: yup.string().required().matches(/\d/),
    account_type: yup.string().required(),
    bank_name: yup.string().required(),
    branch: yup.string().required(),
    ifsc: yup.string().required(),
  })
  .required();

export const userContactDetailsSchema = yup
  .object<UserContactDetailsInterface>()
  .shape({
    full_name: yup.string().required(),
    designation: yup.string().required(),
    mobile: yup.string().required().matches(/\d/),
    whatsapp: yup.string().required().matches(/\d/),
    email: yup.string().required().email(),
  })
  .required();

export const userPasswordDetailsSchema = yup
  .object<UserPasswordDetailsInterface>()
  .shape({
    password: yup.string().required().min(5),
    confirmPassword: yup
      .string()
      .required()
      .min(5)
      .oneOf([yup.ref("password"), ""], "Passwords must match"),
  })
  .required();

export const validatePan = (pan: string, gst?: string) => {
  if (pan.length !== 10) return false;
  if (!gst) return true;
  if (gst.length !== 15) return false;
  if (pan !== gst.substring(2, 12)) return false;
  // return pan.match(/[A-Z]{5}[0-9]{4}[A-Z]{1}/);
  return true;
};

export const validateGst = (gst: string, stateCode: number) => {
  if (gst.length !== 15) return false;
  if (gst.length >= 2 && gst.substring(0, 2) !== String(stateCode))
    return false;
  // return gst.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9]{1}/);
  return true;
};
