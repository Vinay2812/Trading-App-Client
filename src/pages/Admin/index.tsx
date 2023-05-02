import { FC } from "react";
import { PublishList, Sidebar, RegistrationList } from "./components";
import PublishedList from "../../components/PublishedList";
import { Box } from "@mui/material";
import { useColors } from "../../hooks/use-colors";

interface AdminProps {}

const Admin: FC<AdminProps> = (props) => {
  const colors = useColors();
  return <Sidebar active="Home">Home</Sidebar>;
};

export default Admin;
