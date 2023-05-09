import { FC, useState } from "react";
import { Sidebar } from "../../Admin/components";
import { Box, Button, Stack, Typography } from "@mui/material";
import { PlaylistAdd } from "@mui/icons-material";
import { useColors } from "../../../hooks/use-colors";
import CreateOrUpdateModal from "./CreateOrUpdateModal";

interface TodoNotFoundProps {
  userId: string;
}

const TodoNotFound: FC<TodoNotFoundProps> = ({ userId }) => {
  const [open, setOpen] = useState(false);
  const colors = useColors();

  return (
    <Sidebar active="Todo List">
      <Stack
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3" fontWeight="600" color={colors.textColor[400]}>
          Oops!! No Todos Found 😞
        </Typography>
        <Typography
          variant="h5"
          fontWeight="600"
          mt={1}
          color={colors.textColor[400]}
        >
          Start by creating a new todo
        </Typography>
        <Button
          variant="contained"
          color="green"
          sx={{
            mt: 4,
            fontWeight: 500,
          }}
          endIcon={<PlaylistAdd fontSize="large" />}
          onClick={() => setOpen(true)}
        >
          Create Todo
        </Button>
        <CreateOrUpdateModal
          open={open}
          handleClose={() => setOpen(false)}
          isCreate={true}
          userId={userId}
        />
      </Stack>
    </Sidebar>
  );
};

export default TodoNotFound;
