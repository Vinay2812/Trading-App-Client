import { HomeOutlined } from "@mui/icons-material";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
export type SidebarSelectedType =
  | "Home"
  | "Users List"
  | "Registration List"
  | "Published List"
  | "Publish List"
  | "Product List"
  | "Todo List"
  | "Logout"
  | "Dark"
  | "Light"
  | "Profile"
  | "Orders"
  | "Pending List";

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
