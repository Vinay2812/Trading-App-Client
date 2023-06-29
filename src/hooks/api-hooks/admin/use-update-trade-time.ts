import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { updateTradeTime } from "../../../api/admin/admin.request";
import { processReactQueryOutput } from "../../../utils/react-query";
import { DEV_ENV } from "../../../utils/constants";
import { useCustomToast } from "../../use-custom-toast";

const updateTradeTimeSchema = z.object({
  startTime: z
    .string()
    .datetime()
    .optional()
    .default(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDay(),
        10,
        0,
        0,
        0
      ).toISOString()
    ),
  endTime: z
    .string()
    .datetime()
    .optional()
    .default(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDay(),
        10,
        0,
        0,
        0
      ).toISOString()
    ),
  offDays: z.array(
    z.enum(
      [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      {
        invalid_type_error: "Not a valid day",
      }
    )
  ),
});

export type UpdateTradeTimeReq = z.infer<typeof updateTradeTimeSchema>;

export const useUpdateTradeTime = () => {
  const queryClient = useQueryClient();
  const { success, fail } = useCustomToast();
  return useMutation({
    mutationFn: async (data: UpdateTradeTimeReq) => {
      const res = await updateTradeTime(data);
      return processReactQueryOutput<null>(res);
    },
    onSuccess: (data) => {
      DEV_ENV && console.log(data);
      queryClient.invalidateQueries(["published-list"]);
      queryClient.invalidateQueries(["trade-time"])
      success(data.message);
    },
    onError: (err) => {
      DEV_ENV && console.log(err);
      fail("Failed to update trade timings! Please try again");
    },
  });
};
