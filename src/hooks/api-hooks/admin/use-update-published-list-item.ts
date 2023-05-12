import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePublishedListItem } from "../../../api/admin/admin.request";
import { processReactQueryOutput } from "../../../utils/handle-async";
import { DEV_ENV } from "../../../utils/constants";

export type UpdatePublishedListItemRequest = {
    tender_id: number;
    sale_rate: number;
    published_qty: number;
    status: "Y" | "N"
}

export const useUpdatePublishedListItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (reqBody: UpdatePublishedListItemRequest) => {
            const response = await updatePublishedListItem(reqBody);
            return processReactQueryOutput<null>(response);
        },
        onSuccess: (data) => {
            DEV_ENV && console.log(data);
            queryClient.invalidateQueries(["published-list"]);
            alert(data.message);
        },
        onError: async (error) => {
            DEV_ENV && console.log(error);
            const err = await processReactQueryOutput<any>(error as any, true)
            alert(err.message);
        }
    })
}