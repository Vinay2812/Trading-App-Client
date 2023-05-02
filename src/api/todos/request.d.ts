import { TodoPriorityType } from "./response";

export type TodoStatustype = "complete" | "incomplete";
export type PostTodoRequestType = {
  userId: string;
  title: string;
  description: string;
  status: TodoStatusType;
  priority: TodoPriorityType;
};
