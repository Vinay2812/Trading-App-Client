import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { getTradeTime } from "../../../api/admin/admin.request";
import { parseApiData } from "../../../utils/parse-data";
import { UpdateTradeTimeReq } from "./use-update-trade-time";
import { DEV_ENV } from "../../../utils/constants";

const tradeTimeSchema = z.object({
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
    z.enum([
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ])
  ),
});

export const useTradeTime = () => {
  return useQuery({
    queryKey: ["trade-time"],
    queryFn: async () => {
        const res = await getTradeTime();
        return parseApiData<UpdateTradeTimeReq>(tradeTimeSchema, res);
    },
    onSuccess: (data) => {
        DEV_ENV && console.log(data)
    }
  });
};
