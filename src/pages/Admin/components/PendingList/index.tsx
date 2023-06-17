import { FC, useMemo } from "react";
import Sidebar from "../../../../components/Sidebar";
import {
  OrderListType,
  useOrderList,
} from "../../../../hooks/api-hooks/admin/use-order-list";
import HeaderCard from "../../../../components/Cards/HeaderCard";
import { usePendingListColumns } from "./use-pending-list-columns";
import Table from "../../../../components/Table/Table";
import TextLoader from "../../../../components/TextLoader/TextLoader";

interface PendingListProps {}

interface PendingListRowType extends OrderListType {
  sr_no: number;
}

const PendingList: FC<PendingListProps> = (props) => {
  // React query
  const pendingListQuery = useOrderList({
    orderConfirmed: "N"
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

  const columns = usePendingListColumns();

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
    </Sidebar>
  );
};

export default PendingList;
