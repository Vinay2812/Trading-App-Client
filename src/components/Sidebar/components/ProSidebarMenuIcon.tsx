import { Tooltip} from "@mui/material";
import { useProSidebar } from "react-pro-sidebar";
import { useColors } from "../../../hooks/use-colors";
import { SidebarSelectedType } from "../../Sidebar/modules/MenuItems";
import { useState } from "react";

type ProSidebarMenuIconProps = {
  icon: any;
  hoverText?: SidebarSelectedType;
};

export default function ProSidebarMenuIcon({
  icon,
  hoverText,
}: ProSidebarMenuIconProps) {
  const collapsed = useProSidebar().collapsed;
  const colors = useColors();
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        color: colors.textColor[500],
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        position: "relative",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Tooltip title={collapsed ? hoverText : ""}>{icon}</Tooltip>
      {/* <Typography
        variant="caption"
        sx={{
          color: colors.textColor[500],
        }}
        // display={hovered ? "visible" : "none"}
      >
        {collapsed && hoverText}
      </Typography> */}
    </div>
  );
}
