import { FC, useMemo } from "react";
import { AdminSidebar } from "..";
import { Box } from "@mui/material";
import HeaderCard from "../../../../components/Cards/HeaderCard";
import { useRegistrationList } from "../../../../hooks/api-hooks/admin/use-get-registration-list";
import { useRegistrationListColumns } from "./use-registration-list-columns";
import { RegistrationListResponseType } from "../../../../api/admin/response";
import Table from "../../../../components/Table/Table";

interface RegistrationListProps {}
interface RowsType extends RegistrationListResponseType {
  sr_no: number;
}

const RegistrationList: FC<RegistrationListProps> = (props) => {
  const { data, isLoading } = useRegistrationList();

  const columns = useRegistrationListColumns();
  const rows = useMemo<RowsType[] | []>(() => {
    if (!data?.value) return [];

    return data.value
      .filter((item) => item.accoid == null)
      .map((item, index) => {
        return {
          sr_no: index + 1,
          ...item,
        };
      });
  }, [data]);

  return (
    <AdminSidebar active="Registration List">
      <Box width="100%" height="100%" position="relative">
        <HeaderCard
          title="Registration List"
          subtitle="Welcome to registration list"
        />
        <Table
          rows={rows}
          columns={columns}
          isLoading={isLoading}
          uniqueId={"userId"}
        />
      </Box>
    </AdminSidebar>
  );
};

export default RegistrationList;
