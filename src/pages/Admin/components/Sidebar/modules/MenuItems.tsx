import { HomeOutlined } from "@mui/icons-material";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
export type SidebarSelectedType =
  | "Home"
  | "Users List"
  | "Registration List"
  | "Published List"
  | "Publish List"
  | "Client List"
  | "Todo List"
  | "Logout"
  | "Dark"
  | "Light";

type MenuItemType = {
  title: SidebarSelectedType;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  to: string;
};
export const MENU_ITEMS = {
  HOME: {
    title: "Home",
    icon: HomeOutlined,
    to: "/admin",
  } as MenuItemType,
};
