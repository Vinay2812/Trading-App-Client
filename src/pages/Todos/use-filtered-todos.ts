import { useMemo } from "react";
import {
  TodoPriorityType,
  TodoStatusType,
  TodosResponseType,
} from "../../api/todos/response";

export const useFilteredTodos = (
  todos: TodosResponseType[],
  priority: TodoPriorityType,
  status: TodoStatusType
) => {
  return useMemo(() => {
    if(!todos.length)return []
    return todos.filter(
      (todo) => todo.todo.priority === priority && todo.todo.status === status
    );
  }, [todos, priority, status]);
};
