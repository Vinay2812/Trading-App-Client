import { FC } from "react";
import { PublishList, AdminSidebar, RegistrationList } from "./components";
import PublishedList from "../../components/PublishedList";
import { Box } from "@mui/material";
import { useColors } from "../../hooks/useColors";

interface AdminProps {}

const Admin: FC<AdminProps> = (props) => {
  const colors = useColors();
  return (
      <AdminSidebar active="Home">
      </AdminSidebar>
  );
};

export default Admin;
