type TodoPriorityType = "low" | "medium" | "high";
type TodoStatusType = "complete" | "incomplete"

export type SubTodoType = {
  todoId: string;
  subTodoId?: string;
  title: string;
  description: string;
  status: string;
  priority: TodoPriorityTypeTodoPriorityType;
};

export type TodosType = {
  userId: string;
  todoId: string;
  title: string;
  description: string;
  status: TodoStatusType;
  priority: TodoPriorityType;
  subTodos: SubTodoType[];
};

export type TodosResponseType = {
  todos: TodosType[];
};
