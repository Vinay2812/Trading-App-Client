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
    company_name: yup
      .string()
      .min(4, "Company name should have atleast 4 characters")
      .required("Company name is required"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    address: yup.string().nullable(),
    state: yup.string().required("Please select a state"),
    district: yup.string().required("Please select a district"),
    pincode: yup
      .string()
      .min(6, "Pincode must be of length 6")
      .max(6, "Pincode must be of length 6")
      .matches(/^\d+$/, { message: "Pincode must have only digits" })
      .required("Pincode is required"),
    mobile: yup
      .string()
      .min(10, "Mobile number must be of length 10")
      .max(10, "Mobile number must be of length 10")
      .matches(/^\d+$/, { message: "Mobile number must have only digits" })
      .required("Mobile number is required"),
    whatsapp: yup
      .string()
      .min(10, "Whatsapp number must be of length 10")
      .max(10, "Whatsapp number must be of length 10")
      .matches(/^\d+$/, { message: "Whatsapp number must have only digits" })
      .nullable()
      .transform((value) => (!!value ? value : null)),
    gst: yup
      .string()
      .min(15, "GST number should be of length 15")
      .max(15, "GST number should be of length 15")
      .nullable()
      .transform((value) => (!!value ? value : null)),
    pan: yup
      .string()
      .min(10, "Pan number must be of length 10")
      .max(10, "Pan number must be of length 10")
      .required("Pancard is required"),
    fssai: yup.string().required("FSSAI number is required"),
    tan: yup.string().required("TAN number is required"),
    constitution_of_firm: yup
      .string()
      .required("Please select constitution of your firm"),
  })
  .required();

export const userBankDetailsSchema = yup
  .array()
  .of(
    yup.object<UserBankDetailsInterface>().shape({
      account_name: yup.string().required("Name is required"),
      account_number: yup
        .string()
        .required("Account number is required")
        .matches(/^\d+$/, {
          message: "Account numbers should only have digits",
        }),
      account_type: yup.string().required("Please select your account type"),
      bank_name: yup.string().required("Bank name is required"),
      branch: yup.string().required("Branch is required"),
      ifsc: yup.string().required("IFSC code is required"),
    })
  )
  .required();

export const userContactDetailsSchema = yup
  .array()
  .of(
    yup.object<UserContactDetailsInterface>().shape({
      full_name: yup.string().required("Name is required"),
      designation: yup.string().required("Designation is required"),
      mobile: yup
        .string()
        .min(10, "Mobile number must be of length 10")
        .max(10, "Mobile number must be of length 10")
        .matches(/^\d+$/, { message: "Mobile number must have only numbers" })
        .required("Mobile number is required"),
      whatsapp: yup
        .string()
        .min(10, "Whatsapp number must be of length 10")
        .max(10, "Whatsapp number must be of length 10")
        .matches(/^\d+$/, { message: "Whatsapp number must have only numbers" })
        .nullable()
        .transform((value) => (!!value ? value : null)),
      email: yup
        .string()
        .required("Email is required")
        .email("Please enter a valid email"),
    })
  )
  .required();

export const userPasswordDetailsSchema = yup
  .object<UserPasswordDetailsInterface>()
  .shape({
    password: yup
      .string()
      .required("Password is required")
      .min(5, "Please enter a strong password"),
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password"), ""], "Password and Confirm password must match"),
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
    if (!isValidGst)
      return { error: ["Please enter a valid gst number"], value: null };
    const isValidPan = validatePan(
      yupRes.pan,
      yupRes.gst ? yupRes.gst : undefined
    );
    if (!isValidPan) {
      return { error: ["Please enter a valid pancard"], value: null };
    }
    return { error: null, value: yupRes };
  } catch (err: any) {
    if (yup.ValidationError.isError(err)) {
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
