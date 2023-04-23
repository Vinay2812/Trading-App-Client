import { HomeOutlined } from "@mui/icons-material";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
export type AdminSidebarSelectedType =
  | "Home"
  | "Users"
  | "Registration List"
  | "Published List"
  | "Publish List"
  | "Client Publish List"
  | "Logout"
  | "Dark"
  | "Light";

type MenuItemType = {
  title: AdminSidebarSelectedType;
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
