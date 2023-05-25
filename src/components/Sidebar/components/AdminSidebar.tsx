import { FC, useMemo, useState } from "react";
import {
  Sidebar as ProSidebar,
  MenuItem,
  useProSidebar,
} from "react-pro-sidebar";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useColors } from "../../../hooks/use-colors";
import {
  AccountCircleOutlined,
  AppRegistrationRounded,
  AssignmentRounded,
  Brightness7,
  HomeOutlined,
  Logout,
  MenuRounded,
  NightsStaySharp,
  PublishOutlined,
  PublishedWithChangesOutlined,
  RecentActorsOutlined,
} from "@mui/icons-material";
import {
  ProSidebarHoverMenu,
  ProSidebarSimpleMenu,
} from "./ProSidebarMenu";
import ProSidebarMenuItem from "./ProSidebarMenuItem";
import ProSidebarMenuIcon from "./ProSidebarMenuIcon";
import ProSidebarMenuHeader from "./ProSidebarMenuHeader";
import { SidebarSelectedType } from "../modules/MenuItems";
import { useToggleTheme } from "../../../providers/UserThemeProvider";
import { useLogout } from "../../../hooks/use-logout";
import { useAppSelector } from "../../../hooks/redux";
// import { HomeOutlined, PeopleOutlined} from "@mui/icons-material"

interface SidebarProps {
  active?: SidebarSelectedType;
  children: any;
}

const AdminSidebar: FC<SidebarProps> = ({ active, children }) => {
  const colors = useColors();
  const adminEmail = useAppSelector((state) => state.admin.email);
  const profilePicture = useAppSelector((state) => state.admin.picture);
  const adminName = useAppSelector((state) => state.admin.name);

  const [selected, setSelected] = useState<SidebarSelectedType>(
    active || "Home"
  );
  const { collapseSidebar, collapsed } = useProSidebar();
  const matches = useMediaQuery("(min-width: 900px)");
  const { sidebarWidth, contentWidth } = useMemo(() => {
    return {
      sidebarWidth: collapsed ? "75px !important" : "210px !important",
      contentWidth:
        matches && !collapsed ? "calc(100vw - 210px)" : `calc(100vw - 75px)`,
    };
  }, [collapsed, matches]);
  const theme = useTheme().palette.mode;
  const { toggleTheme } = useToggleTheme();

  const { logout } = useLogout();
  return (
    <Box width="100vw" display="flex" overflow="hidden" height="100%">
      <Box
        sx={{
          height: "100vh",
          minHeight: "100vh",
          ...(!matches &&
            collapsed === false && { position: "sticky", top: "0", zIndex: 1 }),
        }}
      >
        <ProSidebar
          backgroundColor={colors.card}
          rootStyles={{
            height: "100vh",
            borderRight: "none",
            "& .ps-menu-button": {
              margin: "8px 0",
            },
          }}
          defaultCollapsed={matches === false ? true : undefined}
          width={sidebarWidth}
        >
          <ProSidebarSimpleMenu>
            {/* Header */}
            <MenuItem
              style={{
                color: colors.textColor[400],
              }}
              icon={
                <IconButton onClick={() => collapseSidebar()}>
                  <MenuRounded
                    sx={{
                      color: colors.textColor[400],
                    }}
                  />
                </IconButton>
              }
            >
              {!collapsed && <Typography variant="h6">Trading App</Typography>}
            </MenuItem>
            {/* Menu items */}
            <Divider />
            {/* Navigations */}
            {!collapsed && <ProSidebarMenuHeader title="Navigation" />}
            <ProSidebarHoverMenu>
              <ProSidebarMenuItem
                title="Home"
                icon={
                  <ProSidebarMenuIcon
                    icon={<HomeOutlined />}
                    hoverText="Home"
                  />
                }
                selected={selected}
                setSelected={setSelected}
                to="/admin"
              />
              <ProSidebarMenuItem
                title="Users List"
                icon={
                  <ProSidebarMenuIcon
                    icon={<AccountCircleOutlined />}
                    hoverText="Users List"
                  />
                }
                selected={selected}
                setSelected={setSelected}
                to="/admin/users-list"
              />
              <ProSidebarMenuItem
                title="Registration List"
                icon={
                  <ProSidebarMenuIcon
                    icon={<AppRegistrationRounded />}
                    hoverText="Registration List"
                  />
                }
                selected={selected}
                setSelected={setSelected}
                to="/admin/registration-list"
              />
              <ProSidebarMenuItem
                title="Publish List"
                icon={
                  <ProSidebarMenuIcon
                    icon={<PublishOutlined />}
                    hoverText="Publish List"
                  />
                }
                selected={selected}
                setSelected={setSelected}
                to="/admin/publish-list"
              />
              <ProSidebarMenuItem
                title="Published List"
                icon={
                  <ProSidebarMenuIcon
                    icon={<PublishedWithChangesOutlined />}
                    hoverText="Published List"
                  />
                }
                selected={selected}
                setSelected={setSelected}
                to="/admin/published-list"
              />
              <ProSidebarMenuItem
                title="Client List"
                icon={
                  <ProSidebarMenuIcon
                    icon={<RecentActorsOutlined />}
                    hoverText="Client List"
                  />
                }
                selected={selected}
                setSelected={setSelected}
                to="/admin/client-list"
              />
              <ProSidebarMenuItem
                title="Todo List"
                icon={
                  <ProSidebarMenuIcon
                    icon={<AssignmentRounded />}
                    hoverText="Todo List"
                  />
                }
                selected={selected}
                setSelected={setSelected}
                to="/todos/admin"
              />
            </ProSidebarHoverMenu>
            <Divider />
            {/* Others */}
            {!collapsed && <ProSidebarMenuHeader title="Others" />}
            <ProSidebarHoverMenu>
              <ProSidebarMenuItem
                title={(theme === "light" ? "Dark Mode" : "Light Mode") as any}
                icon={
                  <ProSidebarMenuIcon
                    icon={
                      theme === "light" ? <NightsStaySharp /> : <Brightness7 />
                    }
                    hoverText={"Toggle Theme" as any}
                  />
                }
                selected={selected}
                setSelected={() => toggleTheme()}
                to="#"
              />
              <ProSidebarMenuItem
                title="Logout"
                icon={
                  <ProSidebarMenuIcon icon={<Logout />} hoverText="Logout" />
                }
                selected={selected}
                setSelected={() => logout({
                  isAdmin: true
                })}
                to="/auth"
              />
            </ProSidebarHoverMenu>
            <Divider />
            {/* Footer */}
            <MenuItem
              style={{
                marginTop: "5px",
              }}
              icon={
                <Tooltip title={collapsed ? `Signed in as ${adminEmail}` : ""}>
                  <Avatar
                    alt={adminName || "Admin"}
                    src={profilePicture || ""}
                    variant="circular"
                    sx={{ height: "32px", width: "32px" }}
                  />
                </Tooltip>
              }
            >
              {!collapsed && (
                <Typography
                  sx={{
                    color: colors.blue[200],
                    fontSize: "16px",
                    overflowX: "auto",
                  }}
                >
                  {adminName}
                </Typography>
              )}
            </MenuItem>
          </ProSidebarSimpleMenu>
        </ProSidebar>
      </Box>
      <Box
        width={contentWidth}
        height="100%"
        p={2}
        sx={{
          ...(!matches &&
            collapsed === false && {
              position: "absolute",
              left: "75px",
              zIndex: 0,
            }),
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AdminSidebar;
