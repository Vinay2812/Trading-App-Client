import {
  Box,
  Button,
  Chip,
  Divider,
  Menu,
  MenuItem,
  MenuProps,
  Modal,
  TextField,
  Typography,
  alpha,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useColors } from "../../../hooks/use-colors";
import Card from "../../Cards/Card";
import { Save } from "@mui/icons-material";
import TodoHeader from "./TodoHeader";
import { useCreateTodo } from "../../../hooks/api-hooks/todos/use-create-todo";
import { TodoPriorityType } from "../../../api/todos/response";
import styled from "@emotion/styled";
import TodoPriority from "./TodoPriority";
import {
  DatePicker,
  DateTimePicker,
  MobileDateTimePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";

interface CreateOrUpdateModalProps {
  open: boolean;
  handleClose: () => void;
  isCreate: boolean;
  userId: string;
  priority?: TodoPriorityType;
}

const CreateOrUpdateModal: FC<CreateOrUpdateModalProps> = (props) => {
  const { open, isCreate, handleClose, userId, priority = "high" } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todoPriority, setPriority] = useState<TodoPriorityType>(priority);
  const colors = useColors();
  const [isTitleError, setIsTitleError] = useState(false);

  const createTodo = useCreateTodo();

  useEffect(() => {
    setIsTitleError(false);
  }, [title]);

  const handleCreateTodo = async () => {
    if (title.length === 0) {
      setIsTitleError(true);
      setTimeout(() => {
        setIsTitleError(false);
      }, 5000);
      return;
    }
    createTodo.mutate({
      title,
      description,
      priority,
      userId,
      status: "incomplete",
    });
  };

  const handleUpdateTodo = async () => {};
  return (
    <Modal open={open}>
      <div>
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
            value={title}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <TodoPriority priority={todoPriority} setPriority={setPriority} />
            <MobileDateTimePicker
              label="Due Date"
              disablePast
              // one day later
              defaultValue={dayjs(Date.now() + 24 * 60 * 60 * 1000)}
              format="DD/MM/YY hh:mm A"
              onChange={(value: any) => console.log(new Date(value))}
            />
            <Button
              variant="contained"
              endIcon={<Save />}
              color="green"
              sx={{ height: 40 }}
              onClick={isCreate ? handleCreateTodo : handleUpdateTodo}
            >
              Save
            </Button>
          </Box>
        </Card>
      </div>
    </Modal>
  );
};

export default CreateOrUpdateModal;
