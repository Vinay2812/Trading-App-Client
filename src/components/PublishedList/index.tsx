import { FC, useMemo } from "react";
import { Sidebar } from "../../pages/Admin/components";
import { Box } from "@mui/material";
import HeaderCard from "../Cards/HeaderCard";
import { usePublishedListColumns } from "./use-published-list-columns";
import { usePublishedList } from "../../hooks/api-hooks/admin";
import Table from "../Table/Table";
import { PublishedListResponseType } from "../../api/admin/response";

interface PublishedListProps {
  isClientList?: boolean;
}
interface RowsType extends PublishedListResponseType {
  sr_no: number;
}

const PublishedList: FC<PublishedListProps> = (props) => {
  const { isClientList = false } = props;
  const { data, isLoading } = usePublishedList();

  const columns = usePublishedListColumns(isClientList);
  const rows = useMemo<RowsType[] | []>(() => {
    if (!data?.value) return [];
    return data.value.map((item, index) => ({ ...item, sr_no: index + 1 }));
  }, [data]);

  return (
    <Sidebar active={isClientList ? "Client List" : "Published List"}>
      <Box width="100%" height="100%" position="relative">
        <HeaderCard
          title={isClientList ? "Client List" : "Published List"}
          subtitle={`Welcome to ${
            isClientList ? "client list" : "published list"
          }`}
        />
        <Table
          rows={rows}
          columns={columns}
          isLoading={isLoading}
          uniqueId="tender_id"
        />
      </Box>
    </Sidebar>
  );
};

export default PublishedList;
