import { FC, useMemo } from "react";
import { UserDetailsType } from "../../../../api/user/response";
import { useUsersList } from "../../../../hooks/api-hooks/user/use-users-list";
import { useUserListColumns } from "./use-users-list-columns";
import { Sidebar } from "..";
import { Box } from "@mui/material";
import HeaderCard from "../../../../components/Cards/HeaderCard";
import Table from "../../../../components/Table/Table";
import TextLoader from "../../../../components/TextLoader/TextLoader";

interface UsersProps {}

interface RowsType extends UserDetailsType {
  sr_no: number;
}

const Users: FC<UsersProps> = (props) => {
  const { data, isLoading: userListLoading } = useUsersList();

  const columns = useUserListColumns();
  const rows = useMemo<RowsType[] | []>(() => {
    if (!data?.value) return [];
    return data.value.userData.map((item, index) => {
      return {
        ...item.userDetails,
        sr_no: index + 1,
      };
    });
  }, [data]);

  const { loading, loadingText } = useMemo(() => {
    return { loading: userListLoading, loadingText: "loading" };
  }, [userListLoading]);

  return (
    <Sidebar active="Users List">
      {loading && <TextLoader text={loadingText} />}
      <Box width="100%" height="100%" position="relative">
        <HeaderCard title="Users List" subtitle="Welcome to users list" />
        <Table
          rows={rows}
          columns={columns}
          isLoading={userListLoading}
          uniqueId="userId"
        />
      </Box>
    </Sidebar>
  );
};

export default Users;
