import { FC, useMemo, useState } from "react";
import { Sidebar } from "..";
import { Box } from "@mui/material";
import HeaderCard from "../../../../components/Cards/HeaderCard";
import { usePublishList } from "../../../../hooks/api-hooks/admin";
import { usePublishListColumns } from "./use-publish-list-columns";
import { PublishListResponseType } from "../../../../hooks/api-hooks/admin/use-get-publish-list";
import Table from "../../../../components/Table/Table";
import TextLoader from "../../../../components/TextLoader/TextLoader";
import PublishListModal from "./PublishListModal";
import { PostPublishRequest } from "../../../../hooks/api-hooks/admin/use-post-publish-list";
import { Nullable } from "../../../../types/helper";

interface PublishListProps {}
export interface PublishListRowType extends PublishListResponseType {
  sr_no: number;
}

const PublishList: FC<PublishListProps> = (props) => {
  const { data, isLoading: publishListLoading } = usePublishList();
  const [modalOpen, setModalOpen] = useState(false);

  const [publishItemData, setPublishItemData] = useState<
    Nullable<PostPublishRequest>
  >({
    tender_no: null,
    tender_date: null,
    season: null,
    grade: null,
    quantal: null,
    lifting_date: null,
    purchase_rate: null,
    mill_rate: null,
    mc: null,
    pt: null,
    item_code: null,
    ic: null,
    tender_id: null,
    td: null,
    unit: "Q",
    sale_rate: null,
    publish_quantal: null,
    multiple_of: null,
    auto_confirm: "Y",
    tender_do: null,
    type: "F",
    mill_code: null,
    payment_to: null,
    mill_short_name: null,
    item_name: null
  });

  function handlePublishActionClick (data: PostPublishRequest) {
    setModalOpen(true)
    setPublishItemData(data)
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
      {loading && <TextLoader text={loadingText} />}
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
        publishItemData={publishItemData}
      />
    </Sidebar>
  );
};

export default PublishList;
