import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mapClient } from "../../../api/admin/admin.request";
import { processReactQueryOutput } from "../../../utils/handle-async";
import { DEV_ENV } from "../../../utils/constants";

export type MapClientRequest = {
  userId: string;
  accoid: number;
};

export const useMapClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: MapClientRequest) => {
      const response = await mapClient(data);
      return processReactQueryOutput<null>(response);
    },
    onSuccess: (data) => {
      DEV_ENV && console.log(data);
      alert(data.message)
      queryClient.invalidateQueries(["registration-list"]);
      queryClient.invalidateQueries(["users-list"]);
    },
    onError: (error) => {
      DEV_ENV && console.log("error", error);
      return processReactQueryOutput<any>(error as any, true);
    },
  });
};
