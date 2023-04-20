import * as yup from "yup";
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
    gst: yup.string(),
    pan: yup.string().min(10).max(10).required(),
    fssai: yup.string().required(),
    tan: yup.string().required(),
    constitution_of_firm: yup.string().required(),
  })
  .required();

export const userBankDetailsSchema = yup
  .array()
  .of(
    yup.object<UserBankDetailsInterface>().shape({
      account_name: yup.string().required(),
      account_number: yup.string().required().matches(/\d/),
      account_type: yup.string().required(),
      bank_name: yup.string().required(),
      branch: yup.string().required(),
      ifsc: yup.string().required(),
    })
  )
  .required();

export const userContactDetailsSchema = yup
  .array()
  .of(
    yup.object<UserContactDetailsInterface>().shape({
      full_name: yup.string().required(),
      designation: yup.string().required(),
      mobile: yup.string().required().min(10).max(10).matches(/\d/),
      // whatsapp: yup.string().matches(/\d/).min(10).max(10),
      email: yup.string().required().email(),
    })
  )
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

const validatePan = (pan: string, gst?: string | undefined) => {
  if (pan.length !== 10) return false;
  if (!gst || !gst.length) return true;
  if (gst.length !== 15) return false;
  if (pan !== gst.substring(2, 12)) return false;
  // return pan.match(/[A-Z]{5}[0-9]{4}[A-Z]{1}/);
  return true;
};

const validateGst = (gst: string, stateCode: number) => {
  if (gst.length !== 15) return false;
  if (gst.length >= 2 && gst.substring(0, 2) !== String(stateCode))
    return false;
  // return gst.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9]{1}/);
  return true;
};

export const validateUserDetails = (data: UserDetailsInterface) => {
  try {
    const yupRes = userDetailsSchema.validateSync(data, { abortEarly: false });
    const isValidGst = yupRes.gst
      ? validateGst(yupRes.gst, parseInt(yupRes.state.substring(0, 2)))
      : true;
    if (!isValidGst) return { error: "Not a valid gst number", value: null };
    const isValidPan = validatePan(
      yupRes.pan,
      yupRes.gst ? yupRes.gst : undefined
    );
    if (!isValidPan) {
      return { error: "Not a valid pancard", value: null };
    }
    return { error: null, value: yupRes };
  } catch (err: any) {
    if (yup.ValidationError.isError(err)) {
      console.log(err.errors)
      return { error: err.errors, value: null };
    }
    return { error: err, value: null };
  }
};

export const validateUserBankDetails = (
  data: Array<UserBankDetailsInterface>
) => {
  try {
    return { value: userBankDetailsSchema.validateSync(data), error: null };
  } catch (err: any) {
    if (yup.ValidationError.isError(err)) {
      return { error: err.errors, value: null };
    }
    return { error: err, value: null };
  }
};

export const validateUserContactDetails = (
  data: Array<UserContactDetailsInterface>
) => {
  try {
    return { value: userContactDetailsSchema.validateSync(data), error: null };
  } catch (err: any) {
    if (yup.ValidationError.isError(err)) {
      return { error: err.errors, value: null };
    }
    return { error: err, value: null };
  }
};

export const validateUserPasswordDetails = (
  data: UserPasswordDetailsInterface
) => {
  try {
    return { value: userPasswordDetailsSchema.validateSync(data), error: null };
  } catch (err: any) {
    if (yup.ValidationError.isError(err)) {
      return { error: err.errors, value: null };
    }
    return { error: err, value: null };
  }
};
