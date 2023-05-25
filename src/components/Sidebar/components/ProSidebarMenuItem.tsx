import { FC } from "react";
import { MenuItem, useProSidebar } from "react-pro-sidebar";
import { useColors } from "../../../hooks/use-colors";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Variant } from "@mui/material/styles/createTypography";
import { SidebarSelectedType } from "../../Sidebar/modules/MenuItems";

interface ProSidebarMenuItemProps {
  title: SidebarSelectedType;
  to: string;
  icon: any;
  selected: string;
  setSelected: Function;
  variant?: Variant;
}

const ProSidebarMenuItem: FC<ProSidebarMenuItemProps> = ({
  title,
  to,
  icon,
  selected,
  setSelected,
  variant = "subtitle2",
}) => {
  const colors = useColors();
  const { collapsed } = useProSidebar();
  const navigate = useNavigate();

  return (
    <>
      <MenuItem
        icon={icon}
        active={selected === title}
        style={{
          position: "relative",
          color: colors.textColor[500],
          backgroundColor:
            selected === title
              ? `${colors.sidebarHover} !important`
              : undefined,
        }}
        onClick={() => {
          setSelected(title);
          navigate(to);
        }}
      >
        {!collapsed && (
          <Typography mt="4px" variant={variant}>
            {title}
          </Typography>
        )}
      </MenuItem>
    </>
  );
};

export default ProSidebarMenuItem;
