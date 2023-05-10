import { FC, lazy, useMemo, useState } from "react";
import { Sidebar } from "..";
import { Box } from "@mui/material";
import HeaderCard from "../../../../components/Cards/HeaderCard";
import { useRegistrationList } from "../../../../hooks/api-hooks/admin/use-get-registration-list";
import { useRegistrationListColumns } from "./use-registration-list-columns";
import { RegistrationListResponseType } from "../../../../hooks/api-hooks/admin/use-get-registration-list";
import Table from "../../../../components/Table/Table";
import { useAddUser } from "../../../../hooks/api-hooks/admin/use-add-user";
import TextLoader from "../../../../components/TextLoader/TextLoader";
import { useMapClient } from "../../../../hooks/api-hooks/admin/use-map-client";

const MapClientModal = lazy(() => import("./MapClientModal"));

interface RegistrationListProps {}
export interface RegistrationListRowType extends RegistrationListResponseType {
  sr_no: number;
}

const RegistrationList: FC<RegistrationListProps> = (props) => {
  // react queries
  const registrationListQuery = useRegistrationList();
  const addUserMutation = useAddUser();
  const mapClientMutation = useMapClient();

  // columns and rows
  const columns = useRegistrationListColumns({ onAddClick, onMapClick });
  const rows = useMemo<RegistrationListRowType[] | []>(() => {
    const data = registrationListQuery.data;
    if (!data?.value) return [];

    return data.value
      .filter((item) => item.accoid == null)
      .map((item, index) => {
        return {
          sr_no: index + 1,
          ...item,
        };
      });
  }, [registrationListQuery.data]);

  // hooks
  const [open, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({} as RegistrationListRowType);

  // loading
  const { loading, loadingText } = useMemo(() => {
    let loadingText = "loading";
    if (addUserMutation.isLoading) {
      loadingText = "addding";
    }
    if (mapClientMutation.isLoading) {
      loadingText = "mapping";
    }
    return {
      loading:
        registrationListQuery.isLoading ||
        addUserMutation.isLoading ||
        mapClientMutation.isLoading,
      loadingText,
    };
  }, [
    registrationListQuery.isLoading,
    addUserMutation.isLoading,
    mapClientMutation.isLoading,
  ]);

  function onAddClick(userId: string) {
    addUserMutation.mutate({
      userId,
    });
  }

  function onMapClick(data: RegistrationListRowType) {
    setModalOpen(true);
    setSelectedRow(data);
  }

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
      {open && <MapClientModal
        open={open}
        setOpen={setModalOpen}
        mapClientItem={selectedRow}
      />}
    </Sidebar>
  );
};

export default RegistrationList;
