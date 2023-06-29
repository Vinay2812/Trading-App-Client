import { FC, useMemo, useState } from "react";
import Sidebar from "../../../../components/Sidebar";
import {
  OrderListType,
  useOrderList,
} from "../../../../hooks/api-hooks/admin/use-order-list";
import HeaderCard from "../../../../components/Cards/HeaderCard";
import { usePendingListColumns } from "./use-pending-list-columns";
import Table from "../../../../components/Table/Table";
import TextLoader from "../../../../components/TextLoader/TextLoader";
import OrderUpdateModal from "./OrderUpdateModal";
import { UpdatePendingOrder } from "../../../../hooks/api-hooks/admin/use-update-pending-order";

interface PendingListProps {}

interface PendingListRowType extends OrderListType {
  sr_no: number;
}

const PendingList: FC<PendingListProps> = (props) => {
  // React query
  const pendingListQuery = useOrderList({
    orderConfirmed: "N",
  });

  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<OrderListType | null>(null);

  const [orderUpdateData, setOrderUpdateData] = useState<UpdatePendingOrder>({
    order_id: -1,
    order_remark: "",
    confirm_remark: "",
    order_confirmed: "N",
  });

  const rows = useMemo<PendingListRowType[] | []>(() => {
    const data = pendingListQuery.data;
    if (!data?.value) return [];

    return data.value.map((item, index) => {
      return {
        sr_no: index + 1,
        ...item,
      };
    });
  }, [pendingListQuery.data]);

  const handleUpdatePendingOrder = (
    data: OrderListType,
    order_confirmed: "Y" | "R"
  ) => {
    setSelectedRow(data);
    setOrderUpdateData((prev) => ({
      ...prev,
      order_confirmed,
      order_id: data.order_id,
    }));
    setOpen(true);
  };

  const columns = usePendingListColumns(handleUpdatePendingOrder);
  // loading
  const loadingProps = useMemo(() => {
    let loadingText = "loading";
    return {
      loading: pendingListQuery.isLoading,
      loadingText,
    };
  }, [pendingListQuery.isLoading]);

  return (
    <Sidebar active="Pending List">
      <TextLoader {...loadingProps} />
      <HeaderCard
        title="Pending List"
        subtitle="Please confirm the pending orders"
      />
      <Table rows={rows} columns={columns} uniqueId={"order_id"} />
      {selectedRow && (
        <OrderUpdateModal
          open={open}
          setOpen={setOpen}
          orderData={orderUpdateData}
          setOrderData={setOrderUpdateData}
          pendingItem={selectedRow}
        />
      )}
    </Sidebar>
  );
};

export default PendingList;
