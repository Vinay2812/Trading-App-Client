import { FC, useEffect, useMemo, useState } from "react";
import { Sidebar } from "../../pages/Admin/components";
import { Box, Button } from "@mui/material";
import HeaderCard from "../Cards/HeaderCard";
import { usePublishedListColumns } from "./use-published-list-columns";
import { usePublishedList } from "../../hooks/api-hooks/admin";
import Table from "../Table/Table";
import { PublishedListResponseType } from "../../hooks/api-hooks/admin/use-get-published-list";
import TextLoader from "../TextLoader/TextLoader";
import { useColors } from "../../hooks/use-colors";
import { BorderColorOutlined } from "@mui/icons-material";
import ModifyItem from "./Modals/ModifyItem";
import { useUpdatePublishedListItem } from "../../hooks/api-hooks/admin/use-update-published-list-item";
import { useSocket } from "../../providers/SocketProvider";
import { UPDATE_PUBLISHED_LIST } from "../../utils/socket-constants";

interface PublishedListProps {
  isClientList?: boolean;
}
export interface PublishedListRowType extends PublishedListResponseType {
  sr_no: number;
}

const PublishedList: FC<PublishedListProps> = (props) => {
  const { isClientList = false } = props;
  const { data, isLoading: publishedListLoading } = usePublishedList();
  const [openModifyModal, setOpenModifyModal] = useState(false);
  const [openModifyListModal, setOpenModifyListModal] = useState(false);
  const [updateStatusText, setUpdateStatusText] = useState("loading");

  const [selectedPublishedListItem, setSelectedPublishedListItem] =
    useState<PublishedListRowType>({} as PublishedListRowType);

  const handleEditPublishedListItem = (item: PublishedListRowType) => {
    setOpenModifyModal(true);
    setSelectedPublishedListItem(item);
  };

  const updatePublishedListItemMutation = useUpdatePublishedListItem();

  const handlePublishedItemStatus = (item: PublishedListRowType) => {
    setUpdateStatusText(item.status === "Y" ? "stopping" : "starting");
    updatePublishedListItemMutation.mutate({
      tender_id: item.tender_id,
      status: item.status === "Y" ? "N" : "Y",
      sale_rate: item.sale_rate,
      published_qty: item.published_qty,
    });
  };

  const columns = usePublishedListColumns(
    isClientList,
    handleEditPublishedListItem,
    handlePublishedItemStatus
  );
  const rows = useMemo<PublishedListRowType[] | []>(() => {
    if (!data?.value) return [];
    let rowArr = data.value;
    if (isClientList) {
      rowArr = data.value.filter((item) => item.status === "Y");
    }
    return rowArr.map((item, index) => ({ ...item, sr_no: index + 1 }));
  }, [data, isClientList]);

  const { loading, loadingText } = useMemo(() => {
    let loadingText = "loading";
    if (updatePublishedListItemMutation.isLoading) {
      loadingText = updateStatusText;
    }
    return {
      loading:
        publishedListLoading || updatePublishedListItemMutation.isLoading,
      loadingText,
    };
  }, [
    publishedListLoading,
    updatePublishedListItemMutation.isLoading,
    updateStatusText,
  ]);

  return (
    <Sidebar active={isClientList ? "Client List" : "Published List"}>
      {loading && <TextLoader text={loadingText} />}
      <Box width="100%" height="100%" position="relative">
        <HeaderCard
          title={isClientList ? "Client List" : "Published List"}
          subtitle={`Welcome to ${
            isClientList ? "client list" : "published list"
          }`}
          buttonBox={
            <Button
              variant="contained"
              color="red"
              endIcon={<BorderColorOutlined />}
            >
              Update List
            </Button>
          }
        />
        <Table
          rows={rows}
          columns={columns}
          isLoading={publishedListLoading}
          uniqueId="tender_id"
        />
        <ModifyItem
          open={openModifyModal}
          setOpen={setOpenModifyModal}
          publishedListItem={selectedPublishedListItem}
        />
      </Box>
    </Sidebar>
  );
};

export default PublishedList;
