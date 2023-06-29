import { useMutation } from "@tanstack/react-query";
import { updatePublishDates } from "../../../api/admin/admin.request";
import { processReactQueryOutput } from "../../../utils/react-query";
import { DEV_ENV } from "../../../utils/constants";
import { useCustomToast } from "../../use-custom-toast";

export const useUpdatePublishDates = () => {
  const { success } = useCustomToast();
  return useMutation({
    mutationFn: async (publishDate: Date | string) => {
      const res = await updatePublishDates({ publishDate });
      return processReactQueryOutput<null>(res);
    },
    onSuccess: (data) => {
      DEV_ENV && console.log(data);
      success(data.message);
    },
  });
};
