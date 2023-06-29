import { FC, useEffect, useMemo, useState } from "react";
import { Sidebar } from "../../pages/Admin/components";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import HeaderCard from "../Cards/HeaderCard";
import { usePublishedListColumns } from "./use-published-list-columns";
import { usePublishedList } from "../../hooks/api-hooks/admin";
import Table from "../Table/Table";
import { PublishedListType } from "../../hooks/api-hooks/admin/use-published-list";
import TextLoader from "../TextLoader/TextLoader";
import {
  BorderColorOutlined,
  DoneOutline,
  DoneOutlined,
  Edit,
  EditOutlined,
  PauseCircleOutline,
  PlayCircleOutlined,
  StartOutlined,
} from "@mui/icons-material";
import ModifyItem from "./Modals/ModifyItem";
import { useUpdatePublishedListItem } from "../../hooks/api-hooks/admin/use-update-published-list-item";
import PlaceOrder from "./Modals/PlaceOrder";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {
  useGetAllTradeStatus,
  useUpdateAllTradeStatus,
} from "../../hooks/api-hooks/admin/use-trades-status";
import { useUpdatePublishDates } from "../../hooks/api-hooks/admin/use-update-publish-dates";

interface PublishedListProps {
  isClientList?: boolean;
}
export interface PublishedListRowType extends PublishedListType {
  sr_no: number;
}

const PublishedList: FC<PublishedListProps> = (props) => {
  const { isClientList = false } = props;
  const { data, isLoading: publishedListLoading } =
    usePublishedList(isClientList);
  const [openModifyModal, setOpenModifyModal] = useState(false);
  const [openModifyListModal, setOpenModifyListModal] = useState(false);
  const [openPlaceOrderModal, setOpenPlaceOrderModal] = useState(false);
  const [updateStatusText, setUpdateStatusText] = useState("loading");
  const [publishDate, setPublishDate] = useState(new Date());

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
  const tradeStatusQuery = useGetAllTradeStatus();
  const updateStatusMutation = useUpdateAllTradeStatus();
  const updatePublishDatesMutation = useUpdatePublishDates();

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
    if (rowArr.length)
      setPublishDate(new Date(rowArr[0].publish_date ?? new Date()));
    return rowArr.map((item, index) => ({ ...item, sr_no: index + 1 }));
  }, [data, isClientList]);

  const [isStopButton, setIsStopButton] = useState(true);
  const [isDateEditable, setIsDateEditable] = useState(false);

  useEffect(() => {
    if (!tradeStatusQuery.data?.value) return;
    setIsStopButton(tradeStatusQuery.data.value.stopButtonEnabled);
  }, [tradeStatusQuery.data]);

  const { loading, loadingText } = useMemo(() => {
    let loadingText = "loading";
    if (updatePublishedListItemMutation.isLoading) {
      loadingText = updateStatusText;
    }
    if(updatePublishDatesMutation.isLoading) {
      loadingText = "updating"
    }
    return {
      loading:
        publishedListLoading ||
        updatePublishedListItemMutation.isLoading ||
        updateStatusMutation.isLoading ||
        updatePublishDatesMutation.isLoading,
      loadingText,
    };
  }, [
    publishedListLoading,
    updatePublishedListItemMutation.isLoading,
    updateStatusText,
    updateStatusMutation,
  ]);

  return (
    <Sidebar active={isClientList ? "Product List" : "Published List"}>
      <TextLoader loading={loading} loadingText={loadingText} />
      <Box width="100%" height="100%" position="relative">
        <HeaderCard
          title={isClientList ? "Product List" : "Published List"}
          subtitle={`Welcome to ${
            isClientList ? "Product List" : "published list"
          }`}
          buttonBox={
            !isClientList ? (
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <DatePicker
                  sx={{ width: 200 }}
                  format="DD/MM/YYYY"
                  value={dayjs(publishDate)}
                  onChange={(value) =>
                    value && setPublishDate(new Date(value.toDate()))
                  }
                  disabled={!isDateEditable}
                />
                <Tooltip
                  title={`${isDateEditable ? "Edit" : "Update"} publish date`}
                >
                  <IconButton
                    color={isDateEditable ? "green" : "blue"}
                    onClick={() => {
                      if (isDateEditable) {
                        updatePublishDatesMutation.mutate(publishDate);
                      }
                      setIsDateEditable((prev) => !prev);
                    }}
                  >
                    {!isDateEditable ? <EditOutlined /> : <DoneOutlined />}
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title={`${isStopButton ? "Pause" : "Start"} all the trades`}
                >
                  <IconButton
                    color={isStopButton ? "red" : "green"}
                    onClick={() => {
                      updateStatusMutation.mutate(isStopButton ? "N" : "Y");
                      setUpdateStatusText(
                        isStopButton ? "Stopping" : "Starting"
                      );
                    }}
                  >
                    {!isStopButton ? (
                      <PlayCircleOutlined />
                    ) : (
                      <PauseCircleOutline />
                    )}
                  </IconButton>
                </Tooltip>
              </Box>
            ) : (
              <></>
            )
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
