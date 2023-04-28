import { Typography } from "@mui/material";
import { FC } from "react";
import { useColors } from "../../hooks/use-colors";

interface ProSidebarMenuHeaderProps {
  title: string;
}

const ProSidebarMenuHeader: FC<ProSidebarMenuHeaderProps> = (props) => {
  const colors = useColors();
  return (
    <Typography
      sx={{
        textTransform: "capitalize !important",
        mt: "8px",
        width: "100%",
        pl: "10%",
        pt: "12px",
        pb: "10px",
        fontSize: "15px",
        fontWeight: "500",
        letterSpacing: "1px",
        color: colors.textColor[600],
      }}
    >
      {props.title.toUpperCase()}
    </Typography>
  );
};

export default ProSidebarMenuHeader;
