import { Cancel } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { FC } from "react";
import { useColors } from "../../../hooks/use-colors";

interface TodoHeaderProps {
  isCreate: boolean;
  handleClose: () => void;
}

const TodoHeader: FC<TodoHeaderProps> = (props) => {
  const { isCreate, handleClose } = props;
  const colors = useColors();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
      }}
    >
      <Typography
        variant="h5"
        component="h2"
        textTransform="uppercase"
        color={colors.textColor[400]}
        fontWeight={500}
      >
        {isCreate ? "Create" : "Update"} {"a new task"}
      </Typography>
      <IconButton onClick={handleClose}>
        <Cancel />
      </IconButton>
    </Box>
  );
};

export default TodoHeader;
