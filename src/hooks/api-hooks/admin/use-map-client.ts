import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mapClient } from "../../../api/admin/admin.request";
import { processReactQueryOutput } from "../../../utils/react-query";
import { DEV_ENV } from "../../../utils/constants";
import { useCustomToast } from "../../use-custom-toast";

export type MapClientRequest = {
  userId: string;
  accoid: number;
};

export const useMapClient = () => {
  const queryClient = useQueryClient();
  const { success } = useCustomToast();
  return useMutation({
    mutationFn: async (data: MapClientRequest) => {
      const response = await mapClient(data);
      return processReactQueryOutput<null>(response);
    },
    onSuccess: (data) => {
      DEV_ENV && console.log(data);
      success(data.message);
      queryClient.invalidateQueries(["registration-list"]).catch((err) => {
        console.log(err);
      });
      queryClient.invalidateQueries(["users-list"]).catch((err) => {
        console.log(err);
      });
    },
    onError: (error) => {
      DEV_ENV && console.log("error", error);
      return processReactQueryOutput<any>(error as any, true);
    },
  });
};
