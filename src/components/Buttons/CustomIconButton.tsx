import { IconButton, Tooltip } from "@mui/material";
import { FC, ReactNode } from "react";

interface CustomIconButtonProps {
  children?: ReactNode;
  color: string;
  hoverBackgroundColor: string;
  description?: string;
  onClick?: () => void;
}

const CustomIconButton: FC<CustomIconButtonProps> = ({
  children,
  color,
  hoverBackgroundColor,
  description,
  onClick = () => {},
}) => {
  return (
    <Tooltip title={description}>
      <IconButton
        onClick={onClick}
        sx={{
          color: color,
          "&:hover": {
            bgcolor: hoverBackgroundColor,
            color: "white",
          },
        }}
      >
        {children}
      </IconButton>
    </Tooltip>
  );
};

export default CustomIconButton;
