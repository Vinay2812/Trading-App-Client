import { FC, lazy, useState } from "react";
import { SubTodoType, TodoType } from "../../../api/todos/response";
import Card from "../../../components/Cards/Card";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useColors } from "../../../hooks/use-colors";
import {
  BorderColorOutlined,
  DeleteOutline,
  LaunchOutlined,
  PendingActionsOutlined,
  TaskAltOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const CreateOrUpdateModal = lazy(() => import("./CreateOrUpdateModal"));

interface TodoCardProps {
  todo: TodoType;
  subTodos: SubTodoType[];
  isPendingTodo?: boolean;
}

const TodoCard: FC<TodoCardProps> = ({
  todo,
  subTodos,
  isPendingTodo = true,
}) => {
  const colors = useColors();
  const [modalOpen, setModalOpen] = useState(false);

  const borderColor =
    todo.priority === "high"
      ? colors.red[500]
      : todo.priority === "medium"
      ? colors.blue[500]
      : colors.green[500];

  return (
    <Card
      sx={{
        border: `1px solid ${borderColor}`,
        color: colors.textColor[200],
        overflowY: "auto",
        p: 1.5,
        width: "100%"
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        borderBottom={`1px solid ${borderColor}`}
        pb={1}
      >
        <Typography
          variant="h6"
          sx={{
            textTransform: "capitalize",
            px: 1,
            pt: 1,
            fontSize: "20px",
            flex: 0.8,
            overflowX: "auto",
            color: colors.textColor[500],
          }}
        >
          {todo.title}
        </Typography>
        <Box
          flex={0.2}
          gap={1}
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Tooltip title="Edit">
            <IconButton
              sx={{
                color: colors.textColor[500],
                "&:hover": {
                  color: "white",
                  backgroundColor: colors.blue[600],
                },
              }}
              onClick={() => setModalOpen(true)}
            >
              <BorderColorOutlined />
            </IconButton>
          </Tooltip>
          <Tooltip title="View task">
            <Link to="#">
              <IconButton
                sx={{
                  color: colors.textColor[500],
                  "&:hover": {
                    color: "white",
                    backgroundColor: colors.violet[500],
                  },
                }}
              >
                <LaunchOutlined />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Delete task">
            <IconButton
              sx={{
                color: colors.textColor[500],
                "&:hover": {
                  color: "white",
                  backgroundColor: colors.red[400],
                },
              }}
            >
              <DeleteOutline />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Typography
        variant="subtitle1"
        sx={{
          fontSize: "16px",
          m: 1,
          height: 150,
          overflowY: "auto",
          color: colors.textColor[500],
        }}
      >
        {todo.description}
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        borderTop={`1px solid ${borderColor}`}
        fontSize="16px"
        pt={1}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            color: colors.textColor[500],
          }}
        >
          <PendingActionsOutlined />
          <Typography sx={{ fontWeight: 500, fontSize: "14px" }}>
            {dayjs(todo.dueDate).format("DD MMMM YYYY hh:mm A")}
          </Typography>
        </Box>
        <Tooltip title={isPendingTodo ? "Mark as done" : "Mark as pending"}>
          <Avatar
            sx={{
              backgroundColor: borderColor,
            }}
          >
            <IconButton>
              <TaskAltOutlined />
            </IconButton>
          </Avatar>
        </Tooltip>
      </Box>
      <CreateOrUpdateModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        isCreate={false}
        userId={todo.userId}
        dueDate={todo.dueDate}
        priority={todo.priority}
        status={todo.status}
        todoId={todo.todoId}
        title={todo.title}
        description={todo.description}
      />
    </Card>
  );
};

export default TodoCard;
