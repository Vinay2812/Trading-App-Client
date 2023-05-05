import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../../../api/todos/todos.request";
import { processReactQueryOutput } from "../../../utils/handle-async";
import { GetTodosResponseType } from "../../../api/todos/response";
import { DEV_ENV } from "../../../utils/constants";

export function useTodos(userId: string) {
  return useQuery({
    enabled: userId.length > 0,
    queryKey: ["todos", userId],
    queryFn: async () => {
      const response = await getTodos(userId);
      return processReactQueryOutput<GetTodosResponseType>(response);
    },
    onSuccess: (data) => {
      DEV_ENV && console.log(data);
    },
    onError: (error) => {
      DEV_ENV && console.log("error", error);
      return processReactQueryOutput<any>(error as any, true);
    },
  });
}
