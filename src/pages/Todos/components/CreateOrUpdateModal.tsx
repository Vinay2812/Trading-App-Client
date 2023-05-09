import { Box, Button, Modal, TextField } from "@mui/material";
import { FC, useEffect, useMemo, useState } from "react";
import { useColors } from "../../../hooks/use-colors";
import Card from "../../../components/Cards/Card";
import { Save } from "@mui/icons-material";
import TodoHeader from "./TodoHeader";
import { useCreateTodo } from "../../../hooks/api-hooks/todos/use-create-todo";
import { TodoPriorityType } from "../../../api/todos/response";
import TodoPriority from "./TodoPriority";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import TextLoader from "../../../components/TextLoader/TextLoader";

interface CreateOrUpdateModalProps {
  open: boolean;
  handleClose: () => void;
  isCreate: boolean;
  userId: string;
  priority?: TodoPriorityType;
  status?: "incomplete" | "complete";
  todoId?: string;
  dueDate?: Date;
  isSubTodo?: boolean;
  title?: string;
  description?: string;
}

const CreateOrUpdateModal: FC<CreateOrUpdateModalProps> = (props) => {
  const {
    open,
    isCreate,
    handleClose,
    userId,
    priority = "high",
    status = "incomplete",
    title = "",
    description = "",
    todoId = "",
    dueDate = dayjs(Date.now()).add(1, "day").toDate(),
    isSubTodo = false,
  } = props;
  const [todoTitle, setTitle] = useState(title);
  const [todoDescription, setDescription] = useState(description);
  const [todoPriority, setPriority] = useState<TodoPriorityType>(priority);
  const [todoStatus, setStatus] = useState<"incomplete" | "complete">(status);
  const [todoDueDate, setDueDate] = useState(dueDate);
  const colors = useColors();
  const [isTitleError, setIsTitleError] = useState(false);

  const createTodo = useCreateTodo();

  useEffect(() => {
    setIsTitleError(false);
  }, [todoTitle]);

  const handleCreateTodo = async () => {
    if (todoTitle.length === 0) {
      setIsTitleError(true);
      setTimeout(() => {
        setIsTitleError(false);
      }, 5000);
      return;
    }
    createTodo.mutate({
      title: todoTitle,
      description: todoDescription,
      priority: todoPriority,
      userId,
      status: todoStatus,
      dueDate: todoDueDate,
    });
  };

  useEffect(() => {
    if (createTodo.isSuccess) {
      setTitle("");
      setDescription("");
      setPriority("high");
      setStatus("incomplete");
      setDueDate(new Date());
      handleClose();
    }
  }, [createTodo.isSuccess]);

  const { loading, loadingText } = useMemo(() => {
    let loadingText = "loading";
    if (createTodo.isLoading) {
      loadingText = "creating";
    }
    return { loading: createTodo.isLoading, loadingText };
  }, [createTodo.isLoading]);

  const handleUpdateTodo = async () => {};
  return (
    <Modal open={open}>
      <div>
        {loading && <TextLoader text={loadingText} />}
        <Card
          sx={{
            width: 600,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            px: 3,
          }}
        >
          <TodoHeader isCreate={isCreate} handleClose={handleClose} />
          <TextField
            sx={{
              width: "100%",
              color: `${colors.textColor[700]} !important`,
            }}
            id="outlined-error-helper-text"
            helperText={isTitleError ? "Title is required!!" : null}
            autoFocus
            label="Title"
            value={todoTitle}
            onChange={(e) => setTitle(e.target.value)}
            error={isTitleError}
          />
          <TextField
            sx={{
              width: "100%",
              color: `${colors.textColor[700]} !important`,
            }}
            label="Description"
            minRows={3}
            maxRows={5}
            multiline
            value={todoDescription}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <TodoPriority priority={todoPriority} setPriority={setPriority} />
            <MobileDateTimePicker
              label="Due Date"
              disablePast
              value={dayjs(todoDueDate)}
              format="DD/MM/YY hh:mm A"
              onChange={(value) => value && setDueDate(dayjs(value).toDate())}
            />
            <Button
              variant="contained"
              disabled={createTodo.isLoading}
              endIcon={<Save />}
              color="green"
              sx={{ height: 40 }}
              onClick={isCreate ? handleCreateTodo : handleUpdateTodo}
            >
              {createTodo.isLoading ? "Saving..." : "Save"}
            </Button>
          </Box>
        </Card>
      </div>
    </Modal>
  );
};

export default CreateOrUpdateModal;
