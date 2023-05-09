import { FC } from "react";
import { TodosResponseType } from "../../../api/todos/response";
import { Badge, Box, Grid, Stack, Typography } from "@mui/material";
import TodoCard from "./TodoCard";
import { useColors } from "../../../hooks/use-colors";
import { AssignmentIndOutlined } from "@mui/icons-material";

interface TodoPanelItemProps {
  todos: TodosResponseType[];
  title?: string;
}

const TodoPanelItem: FC<TodoPanelItemProps> = ({ todos, title }) => {
  const colors = useColors();
  return (
    <Stack gap={2} pb={4}>
      <Box display="flex" pt={2} pl={1} gap={1}>
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            color: colors.textColor[500],
            textTransform: "uppercase",
            fontSize: "16px",
            alignItems: "center",
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            width: "24px",
            aspectRatio: "1/1",
            color: "white",
            bgcolor: colors.red[500],
            fontSize: "12px",
          }}
        >
          {todos.length}
        </Box>
      </Box>
      <Grid container spacing={4}>
        {todos.map((todo) => (
          <Grid
            item
            key={todo.todo.todoId}
            sm={12}
            lg={6}
            xl={4}
            height="auto"
            width="100%"
          >
            <TodoCard todo={todo.todo} subTodos={todo.subTodos} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default TodoPanelItem;
