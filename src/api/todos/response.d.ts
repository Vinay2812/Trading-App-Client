type TodoPriorityType = "low" | "medium" | "high";
type TodoStatusType = "complete" | "incomplete";

export type SubTodoType = {
  todoId: string;
  subTodoId?: string;
  title: string;
  description: string;
  status: string;
  priority: TodoPriorityTypeTodoPriorityType;
  dueDate: Date;
};

export type TodoType = {
  userId: string;
  todoId: string;
  title: string;
  description: string;
  status: TodoStatusType;
  priority: TodoPriorityType;
  dueDate: Date;
};

export type TodosResponseType = {
  todo: TodoType;
  subTodos: SubTodoType[];
};

export type GetTodosResponseType = {
  todos: Array<TodosResponseType>;
};
