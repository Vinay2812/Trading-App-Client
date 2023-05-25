import { FC } from "react";
import { useColors } from "../../../hooks/use-colors";
import { Menu, useProSidebar } from "react-pro-sidebar";

interface ProSidebarHoverMenuProps {
  children: any;
}

const ProSidebarHoverMenu: FC<ProSidebarHoverMenuProps> = ({ children }) => {
  const colors = useColors();
  const { collapsed } = useProSidebar();
  return (
    <Menu
      style={{
        padding: 0,
      }}
      menuItemStyles={{
        icon: {
          position: "relative",
          ...(!collapsed ? { left: "6px" } : { right: "4px" }),
        },
        button: ({ active }) => {
          return {
            // ...(!collapsed && { height: "auto !important" }),
            height: "auto !important",
            color: `${colors.textColor[500]} !important`,
            display: "flex !important",
            alignItems: "center !important",
            margin: "8px 0",
            "&:hover": {
              backgroundColor: `${colors.sidebarHover} !important`,
              borderRadius: "0 50px 50px 0",
              width: collapsed ? "100%" : "95%",
            },
            ...(active && {
              backgroundColor: `${colors.sidebarHover} !important`,
              borderRadius: "0 50px 50px 0",
              width: collapsed ? "100%" : "95%",
              color: `${colors.textColor[300]} !important`,
              borderLeft: `3px solid ${colors.blue[500]} !important`,
            }),
          };
        },
      }}
    >
      {children}
    </Menu>
  );
};

const ProSidebarSimpleMenu = ({ children }: any) => {
  return (
    <Menu
      menuItemStyles={{
        button: {
          "&:hover": {
            backgroundColor: "transparent !important",
            cursor: "default",
          },
        },
      }}
    >
      {children}
    </Menu>
  );
};

export { ProSidebarHoverMenu, ProSidebarSimpleMenu };
