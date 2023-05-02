import { FC, useMemo } from "react";
import { Sidebar } from "..";
import { Box } from "@mui/material";
import HeaderCard from "../../../../components/Cards/HeaderCard";
import { usePublishList } from "../../../../hooks/api-hooks/admin";
import { usePublishListColumns } from "./use-publish-list-columns";
import { PublishListResponseType } from "../../../../api/admin/response";
import Table from "../../../../components/Table/Table";

interface PublishListProps {}
interface RowsType extends PublishListResponseType {
  sr_no: number;
}

const PublishList: FC<PublishListProps> = (props) => {
  const { data, isLoading } = usePublishList();

  const columns = usePublishListColumns();
  const rows = useMemo<RowsType[] | []>(() => {
    if (!data?.value) return [];

    return data.value.map((item, index) => {
      return {
        ...item,
        sr_no: index + 1,
      };
    });
  }, [data]);

  return (
    <Sidebar active="Publish List">
      <Box width="100%" height="100%" position="relative">
        <HeaderCard title="Publish List" subtitle="Welcome to publish list" />
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

export default PublishList;
