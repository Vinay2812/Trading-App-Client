import { FC, lazy, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useTodos } from "../../hooks/api-hooks/todos/use-get-todos";
import { Sidebar } from "../../pages/Admin/components";

const TodoNotFound = lazy(() => import("./components/TodoNotFound"));
interface TodoListProps {}

const TodoList: FC<TodoListProps> = (props) => {
  const { userId = "" } = useParams();
  const { data } = useTodos(userId);

  const todos = useMemo(() => {
    if (!data?.value?.todos) {
      return [];
    }
    return data.value.todos;
  }, [data]);

  if (!todos.length) {
    return <TodoNotFound userId={userId} />;
  }
  return <Sidebar active="Todo List">{JSON.stringify(todos)}</Sidebar>;
};

export default TodoList;
