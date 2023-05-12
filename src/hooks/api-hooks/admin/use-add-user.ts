import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUser } from "../../../api/admin/admin.request";
import { DEV_ENV } from "../../../utils/constants";
import { processReactQueryOutput } from "../../../utils/react-query";

export type AddUserRequestType = {
  userId: string;
};

export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: AddUserRequestType) => {
      const response = await addUser(data);
      return processReactQueryOutput<null>(response);
    },
    onSuccess: (response) => {
      DEV_ENV && console.log(response);
      queryClient.invalidateQueries(["users-list"]);
      queryClient.invalidateQueries(["registration-list"]);
    },
    onError: (error) => {
      DEV_ENV && console.log("error", error);
      return processReactQueryOutput<any>(error as any, true);
    },
  });
};
