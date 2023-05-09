import { FC, useMemo } from "react";
import { Sidebar } from "..";
import { Box } from "@mui/material";
import HeaderCard from "../../../../components/Cards/HeaderCard";
import { useRegistrationList } from "../../../../hooks/api-hooks/admin/use-get-registration-list";
import { useRegistrationListColumns } from "./use-registration-list-columns";
import { RegistrationListResponseType } from "../../../../api/admin/response";
import Table from "../../../../components/Table/Table";
import { useAddUser } from "../../../../hooks/api-hooks/admin/use-add-user";
import TextLoader from "../../../../components/TextLoader/TextLoader";

interface RegistrationListProps {}
interface RowsType extends RegistrationListResponseType {
  sr_no: number;
}

const RegistrationList: FC<RegistrationListProps> = (props) => {
  const registrationList = useRegistrationList();

  const columns = useRegistrationListColumns({ onAddClick, onMapClick });
  const rows = useMemo<RowsType[] | []>(() => {
    const data = registrationList.data;
    if (!data?.value) return [];

    return data.value
      .filter((item) => item.accoid == null)
      .map((item, index) => {
        return {
          sr_no: index + 1,
          ...item,
        };
      });
  }, [registrationList.data]);

  const addUserMutation = useAddUser();

  const { loading, loadingText } = useMemo(() => {
    let loadingText = "loading";
    if (addUserMutation.isLoading) {
      loadingText = "addding";
    }
    return {
      loading: registrationList.isLoading || addUserMutation.isLoading,
      loadingText,
    };
  }, [registrationList.isLoading, addUserMutation.isLoading]);

  function onAddClick(userId: string) {
    addUserMutation.mutate({
      userId,
    });
  }

  function onMapClick() {}

  return (
    <Sidebar active="Registration List">
      {loading && <TextLoader text={loadingText} />}
      <Box width="100%" height="100%" position="relative">
        <HeaderCard
          title="Registration List"
          subtitle="Welcome to registration list"
        />
        <Table rows={rows} columns={columns} uniqueId={"userId"} />
      </Box>
    </Sidebar>
  );
};

export default RegistrationList;
