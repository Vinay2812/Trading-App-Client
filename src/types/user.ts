import { z } from "zod";

export const userProfileSchema = z
  .object({
    userId: z.string().optional().nullish().default(null),
    company_name: z.string(),
    email: z.string().email(),
    address: z.string().optional().nullish(),
    state: z.string(),
    district: z.string(),
    pincode: z.number(),
    mobile: z.string(),
    whatsapp: z.string().optional().nullish(),
    gst: z.string().optional().nullish(),
    pan: z.string(),
    fssai: z.string(),
    tan: z.string(),
    constitution_of_firm: z.string(),
    password: z.string(),
  })
  .required();

export const userBankDetailSchema = z
  .object({
    id: z.string(),
    account_name: z.string(),
    account_number: z.number(),
    account_type: z.string(),
    bank_name: z.string(),
    branch: z.string(),
    ifsc: z.string(),
  })
  .required();

export const userContactDetailsSchema = z
  .object({
    id: z.string(),
    full_name: z.string(),
    designation: z.string(),
    mobile: z.string(),
    whatsapp: z.string(),
    email: z.string().email(),
  })
  .required();

export const userPasswordDetailsSchema = z
  .object({
    password: z.string().min(4),
    confirmPassword: z.string().min(4),
  })
  .required()
  .refine(
    ({ password, confirmPassword }) => {
      return password === confirmPassword;
    },
    {
      message: "pasword and confirm password don't match",
    }
  );

export type UserDataType = z.infer<typeof userProfileSchema>;
export type UserBankDetailsType = z.infer<typeof userBankDetailSchema>;
export type UserContactDetailsType = z.infer<typeof userContactDetailsSchema>;
export type UserPasswordDetailsType = z.infer<typeof userPasswordDetailsSchema>;
