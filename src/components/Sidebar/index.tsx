import { FC } from "react";
import { SidebarSelectedType } from "./modules/MenuItems";
import AdminSidebar from "./components/AdminSidebar";
import { useAppSelector } from "../../hooks/redux";
import UserSidebar from "./components/UserSidebar";

interface SidebarProps {
  active?: SidebarSelectedType;
  children: any;
}

const Sidebar: FC<SidebarProps> = ({ active, children }) => {
  const isAdmin = useAppSelector((state) => state.admin.isAdmin);
  if (isAdmin) return <AdminSidebar active={active} children={children} />;

  return <UserSidebar active={active} children={children} />;
};

export default Sidebar;
