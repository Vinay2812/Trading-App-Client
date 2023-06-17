import { FC, useMemo, useState } from "react";
import { Sidebar } from "../../pages/Admin/components";
import { Box, Button } from "@mui/material";
import HeaderCard from "../Cards/HeaderCard";
import { usePublishedListColumns } from "./use-published-list-columns";
import { usePublishedList } from "../../hooks/api-hooks/admin";
import Table from "../Table/Table";
import { PublishedListType } from "../../hooks/api-hooks/admin/use-published-list";
import TextLoader from "../TextLoader/TextLoader";
import { BorderColorOutlined } from "@mui/icons-material";
import ModifyItem from "./Modals/ModifyItem";
import { useUpdatePublishedListItem } from "../../hooks/api-hooks/admin/use-update-published-list-item";
import PlaceOrder from "./Modals/PlaceOrder";

interface PublishedListProps {
  isClientList?: boolean;
}
export interface PublishedListRowType extends PublishedListType {
  sr_no: number;
}

const PublishedList: FC<PublishedListProps> = (props) => {
  const { isClientList = false } = props;
  const { data, isLoading: publishedListLoading } = usePublishedList(isClientList);
  const [openModifyModal, setOpenModifyModal] = useState(false);
  const [openModifyListModal, setOpenModifyListModal] = useState(false);
  const [openPlaceOrderModal, setOpenPlaceOrderModal] = useState(false);
  const [updateStatusText, setUpdateStatusText] = useState("loading");

  const [selectedPublishedListItem, setSelectedPublishedListItem] =
    useState<PublishedListRowType>({} as PublishedListRowType);

  const handleEditPublishedListItem = (item: PublishedListRowType) => {
    setOpenModifyModal(true);
    setSelectedPublishedListItem(item);
  };

  const handlePlaceOrder = (item: PublishedListRowType) => {
    setOpenPlaceOrderModal(true);
    setSelectedPublishedListItem(item);
  };

  // React queries
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
    handleEditPublishedListItem,
    handlePublishedItemStatus,
    handlePlaceOrder,
    isClientList
  );
  const rows = useMemo<PublishedListType[] | []>(() => {
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
      <TextLoader loading={loading} loadingText={loadingText} />
      <Box width="100%" height="100%" position="relative">
        <HeaderCard
          title={isClientList ? "Client List" : "Published List"}
          subtitle={`Welcome to ${
            isClientList ? "client list" : "published list"
          }`}
          // buttonBox={
          //   !isClientList ? (
          //     <Button
          //       variant="contained"
          //       color="red"
          //       endIcon={<BorderColorOutlined />}
          //     >
          //       Update List
          //     </Button>
          //   ) : (
          //     <></>
          //   )
          // }
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
        <PlaceOrder
          open={openPlaceOrderModal}
          setOpen={setOpenPlaceOrderModal}
          publishedListItem={selectedPublishedListItem}
        />
      </Box>
    </Sidebar>
  );
};

export default PublishedList;
