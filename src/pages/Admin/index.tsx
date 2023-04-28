import { FC } from "react";
import { PublishList, AdminSidebar, RegistrationList } from "./components";
import PublishedList from "../../components/PublishedList";
import { Box } from "@mui/material";
import { useColors } from "../../hooks/use-colors";

interface AdminProps {}

const Admin: FC<AdminProps> = (props) => {
  const colors = useColors();
  return <AdminSidebar active="Home">Home</AdminSidebar>;
};

export default Admin;
