import { FC, useMemo, useState } from "react";
import { Sidebar } from "..";
import { Box } from "@mui/material";
import HeaderCard from "../../../../components/Cards/HeaderCard";
import { usePublishList } from "../../../../hooks/api-hooks/admin";
import { usePublishListColumns } from "./use-publish-list-columns";
import {
  PublishListResponseType,
  PublishListType,
} from "../../../../hooks/api-hooks/admin/use-publish-list";
import Table from "../../../../components/Table/Table";
import TextLoader from "../../../../components/TextLoader/TextLoader";
import PublishListModal from "./PublishListModal";
import { PostPublishRequest } from "../../../../hooks/api-hooks/admin/use-post-publish-list";
import { Nullable } from "../../../../types/helper";

interface PublishListProps {}
export interface PublishListRowType extends PublishListType {
  sr_no: number;
}

const PublishList: FC<PublishListProps> = (props) => {
  const { data, isLoading: publishListLoading } = usePublishList();
  const [modalOpen, setModalOpen] = useState(false);

  const [publishItemData, setPublishItemData] = useState<
    Nullable<PostPublishRequest>
  >({
    tender_no: undefined,
    tender_date: undefined,
    season: undefined,
    grade: undefined,
    quantal: undefined,
    lifting_date: undefined,
    purchase_rate: undefined,
    mill_rate: undefined,
    mc: undefined,
    pt: undefined,
    item_code: undefined,
    ic: undefined,
    tender_id: undefined,
    td: undefined,
    unit: "Q",
    sale_rate: undefined,
    publish_quantal: undefined,
    multiple_of: undefined,
    auto_confirm: "Y",
    tender_do: undefined,
    type: "F",
    mill_code: undefined,
    payment_to: undefined,
    mill_short_name: undefined,
    item_name: undefined,
  });

  function handlePublishActionClick(data: PostPublishRequest) {
    setModalOpen(true);
    setPublishItemData(data);
  }

  const columns = usePublishListColumns(handlePublishActionClick);
  const rows = useMemo<PublishListRowType[] | []>(() => {
    if (!data?.value) return [];

    return data.value.map((item, index) => {
      return {
        ...item,
        sr_no: index + 1,
      };
    });
  }, [data]);

  const { loading, loadingText } = useMemo(() => {
    return { loading: publishListLoading, loadingText: "loading" };
  }, [publishListLoading]);

  return (
    <Sidebar active="Publish List">
      {<TextLoader loading={loading} loadingText={loadingText} />}
      <Box width="100%" height="100%" position="relative">
        <HeaderCard title="Publish List" subtitle="Welcome to publish list" />
        <Table
          rows={rows}
          columns={columns}
          isLoading={publishListLoading}
          uniqueId="tender_id"
        />
      </Box>
      <PublishListModal
        open={modalOpen}
        setOpen={setModalOpen}
        publishItemData={publishItemData as PostPublishRequest}
      />
    </Sidebar>
  );
};

export default PublishList;
