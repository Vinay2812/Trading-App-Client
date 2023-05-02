import styled from "@emotion/styled";
import {
  Box,
  Button,
  Chip,
  Menu,
  MenuProps,
  Typography,
  MenuItem,
  IconButton,
} from "@mui/material";
import { FC, useMemo, useState } from "react";
import { useColors } from "../../../hooks/use-colors";
import { TodoPriorityType } from "../../../api/todos/response";
import { ArrowDropDownCircleOutlined } from "@mui/icons-material";

interface TodoPriorityProps {
  priority: TodoPriorityType;
  setPriority: (p: TodoPriorityType) => void;
}

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: 1,
    minWidth: 180,
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        marginRight: 1.5,
      },
    },
  },
}));

const TodoPriority: FC<TodoPriorityProps> = ({ priority, setPriority }) => {
  const colors = useColors();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSetPriority = (p: TodoPriorityType) => {
    setPriority(p);
    handleMenuClose();
  };

  const priorityColorMap = useMemo(() => {
    return {
      low: colors.green[600],
      medium: colors.blue[500],
      high: colors.red[500],
    };
  }, []);

  return (
    <Box display="flex" alignItems="center">
      <Chip
        label={`${priority} priority`}
        sx={{
          width: 150,
          textTransform: "uppercase",
          bgcolor: priorityColorMap[priority],
          color: colors.textColor[100],
          fontSize: "14px",
        }}
      />
      <IconButton onClick={handleMenuClick}>
        <ArrowDropDownCircleOutlined />
      </IconButton>
      <Menu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleSetPriority("low")}>Low Priority</MenuItem>
        <MenuItem onClick={() => handleSetPriority("medium")}>Medium Priority</MenuItem>
        <MenuItem onClick={() => handleSetPriority("high")}>High Priority</MenuItem>
      </Menu>
    </Box>
  );
};

export default TodoPriority;
