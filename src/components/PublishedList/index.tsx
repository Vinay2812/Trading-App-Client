import { FC, useMemo } from "react";
import { Sidebar } from "../../pages/Admin/components";
import { Box } from "@mui/material";
import HeaderCard from "../Cards/HeaderCard";
import { usePublishedListColumns } from "./use-published-list-columns";
import { usePublishedList } from "../../hooks/api-hooks/admin";
import Table from "../Table/Table";
import { PublishedListResponseType } from "../../api/admin/response";
import TextLoader from "../TextLoader/TextLoader";

interface PublishedListProps {
  isClientList?: boolean;
}
export interface PublishedListRowType extends PublishedListResponseType {
  sr_no: number;
}

const PublishedList: FC<PublishedListProps> = (props) => {
  const { isClientList = false } = props;
  const { data, isLoading: publishedListLoading } = usePublishedList();

  const columns = usePublishedListColumns(isClientList);
  const rows = useMemo<PublishedListRowType[] | []>(() => {
    if (!data?.value) return [];
    return data.value.map((item, index) => ({ ...item, sr_no: index + 1 }));
  }, [data]);

  const { loading, loadingText } = useMemo(() => {
    return { loading: publishedListLoading, loadingText: "loading" };
  }, [publishedListLoading]);

  return (
    <Sidebar active={isClientList ? "Client List" : "Published List"}>
      {loading && <TextLoader text={loadingText} />}
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
          isLoading={publishedListLoading}
          uniqueId="tender_id"
        />
      </Box>
    </Sidebar>
  );
};

export default PublishedList;
