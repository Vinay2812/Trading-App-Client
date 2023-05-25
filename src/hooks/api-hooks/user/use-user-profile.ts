import { z } from "zod";
import {
  userBankDetailSchema,
  userContactDetailsSchema,
  userProfileSchema,
} from "../../../types/user";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../../../api/user/user.request";
import { processReactQueryOutput } from "../../../utils/react-query";
import { DEV_ENV } from "../../../utils/constants";

export const userProfileResSchema = z.object({
  userInfo: userProfileSchema,
  bankInfo: z.array(userBankDetailSchema),
  contactInfo: z.array(userContactDetailsSchema),
}).required();

export type UserProfile = z.infer<typeof userProfileResSchema>;

export const useUserProfile = (userId: string) => {
  return useQuery({
    queryKey: ["user-profile", userId],
    queryFn: async () => {
      const response = await getUserProfile(userId);
      return processReactQueryOutput<UserProfile>(response, false);
    },
    onSuccess: (data) => {
      DEV_ENV && console.log(userProfileResSchema.safeParse(data.value));
    },
    onError(err) {
      DEV_ENV && console.log(err);
    },
  });
};