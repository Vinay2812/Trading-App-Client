import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostTodoRequestType } from "../../../api/todos/request";
import { postTodo } from "../../../api/todos/todos.request";
import { processReactQueryOutput } from "../../../utils/handle-async";
import { DEV_ENV } from "../../../utils/constants";

export function useCreateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: PostTodoRequestType) => {
      const response = await postTodo(data);
      return processReactQueryOutput<any>(response);
    },
    onSuccess(data, variables, context) {
      DEV_ENV && console.log(data, variables, context);
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
    onError(error, variables, context) {
      DEV_ENV && console.log(error, variables, context);
      return processReactQueryOutput<any>(error as any, true);
    },
  });
}
