import { FC, type ReactNode, useMemo, useState } from "react";
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
  Brightness7,
  HomeOutlined,
  LocalMallOutlined,
  Logout,
  MenuRounded,
  NightsStaySharp,
} from "@mui/icons-material";
import { ProSidebarHoverMenu, ProSidebarSimpleMenu } from "./ProSidebarMenu";
import ProSidebarMenuItem from "./ProSidebarMenuItem";
import ProSidebarMenuIcon from "./ProSidebarMenuIcon";
import ProSidebarMenuHeader from "./ProSidebarMenuHeader";
import { SidebarSelectedType } from "../modules/MenuItems";
import { useToggleTheme } from "../../../providers/UserThemeProvider";
import { useLogout } from "../../../hooks/use-logout";
import { useAppSelector } from "../../../hooks/redux";
import NoAccess from "../../Errors/NoAccess";
// import { HomeOutlined, PeopleOutlined} from "@mui/icons-material"

interface SidebarProps {
  active?: SidebarSelectedType;
  children: ReactNode;
}

const UserSidebar: FC<SidebarProps> = ({ active, children }) => {
  const colors = useColors();
  const user = useAppSelector((state) => state.user)!;

  const hasAccess = useAppSelector((state) => state.user.accoid) !== null;

  const [selected, setSelected] = useState<SidebarSelectedType>(
    active ?? "Home"
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
              {!collapsed && <Typography variant="h6">CommodityXchange</Typography>}
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
                to="/home"
              />
              <ProSidebarMenuItem
                title="Product List"
                icon={
                  <ProSidebarMenuIcon
                    icon={<LocalMallOutlined />}
                    hoverText="Product List"
                  />
                }
                selected={selected}
                setSelected={setSelected}
                to="/product-list"
              />

              <ProSidebarMenuItem
                title="Profile"
                icon={
                  <ProSidebarMenuIcon
                    icon={<AccountCircleOutlined />}
                    hoverText="Profile"
                  />
                }
                selected={selected}
                setSelected={setSelected}
                to={`/user/${user.userId}`}
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
                setSelected={() => logout({ isAdmin: false })}
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
                <Tooltip title={collapsed ? `Signed in as ${user.email}` : ""}>
                  <Avatar
                    variant="circular"
                    sx={{ height: "32px", width: "32px" }}
                  >
                    {user.company_name?.charAt(0)}
                  </Avatar>
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
                  {user.mobile}
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
        {hasAccess ? children : <NoAccess />}
      </Box>
    </Box>
  );
};

export default UserSidebar;
