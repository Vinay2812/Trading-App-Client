import { FC, useMemo } from "react";
import { useColors } from "../../../../hooks/use-colors";
import {
  Button,
  Divider,
  Grid,
  Modal,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import { Theme } from "@emotion/react";
import TextLoader from "../../../../components/TextLoader/TextLoader";
import HeaderCard from "../../../../components/Cards/HeaderCard";
import CustomIconButton from "../../../../components/Buttons/CustomIconButton";
import { CancelOutlined } from "@mui/icons-material";
import Card from "../../../../components/Cards/Card";
import type { OrderListType } from "../../../../hooks/api-hooks/admin/use-order-list";
import dayjs from "dayjs";
import {
  type UpdatePendingOrder,
  useUpdatePendingOrder,
} from "../../../../hooks/api-hooks/admin/use-update-pending-order";

interface OrderUpdateModalProps {
  pendingItem: OrderListType;
  open: boolean;
  setOpen: (open: boolean) => void;
  orderData: UpdatePendingOrder;
  setOrderData: (data: any) => void;
}

const OrderUpdateModal: FC<OrderUpdateModalProps> = ({
  open,
  setOpen,
  pendingItem,
  orderData,
  setOrderData,
}) => {
  const colors = useColors();
  const labelStyle = {
    textTransform: "uppercase",
    fontWeight: 500,
    color: colors.textColor[600],
    width: "auto",
    display: "flex",
    alignItems: "center",
  } as SxProps<Theme>;

  const valueStyle = {
    color: colors.textColor[300],
    fontWeight: 400,
    overflowX: "auto",
    display: "flex",
    alignItems: "center",
  } as SxProps<Theme>;

  // React query
  const updatePendingOrderMutation = useUpdatePendingOrder();

  const loadingProps = useMemo(() => {
    let loadingText = "loading";
    if (updatePendingOrderMutation.isLoading) {
      loadingText =
        orderData.order_confirmed === "Y" ? "approving" : "rejecting";
    }
    return {
      loading: updatePendingOrderMutation.isLoading,
      loadingText,
    };
  }, [updatePendingOrderMutation.isLoading]);

  const handleUpdateOrderData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setOrderData((prev: UpdatePendingOrder) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Modal open={open}>
      <div>
        <TextLoader {...loadingProps} />
        <Card
          sx={{
            width: 800,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            px: 2,
            pt: 0,
            maxHeight: "100vh",
            overflowY: "auto",
          }}
        >
          <HeaderCard
            title="Order"
            subtitle="Please place your order"
            buttonBox={
              <CustomIconButton
                color={colors.red[500]}
                hoverBackgroundColor={colors.red[400]}
                description="Close"
                onClick={() => {
                  setOrderData((prev: UpdatePendingOrder) => ({
                    ...prev,
                    order_remark: "",
                    confirm_remark: "",
                  }));
                  setOpen(false);
                }}
              >
                <CancelOutlined />
              </CustomIconButton>
            }
          />
          <Divider />
          <Grid container px={2} spacing={2} rowGap={2} sx={{ mt: 1 }}>
            <Grid item display="flex" xs={12} md={6} gap={2}>
              <Typography sx={labelStyle}>Order id </Typography>
              <Typography sx={valueStyle}>{pendingItem.order_id}</Typography>
            </Grid>
            <Grid item display="flex" xs={12} md={6} gap={2}>
              <Typography sx={labelStyle}>Tender id</Typography>
              <Typography sx={valueStyle}>{pendingItem.tender_id}</Typography>
            </Grid>
            <Grid item display="flex" xs={12} md={6} gap={2}>
              <Typography sx={labelStyle}>Mill Rate</Typography>
              <Typography sx={valueStyle}>{pendingItem.mill_rate}</Typography>
            </Grid>
            <Grid item display="flex" xs={12} md={6} gap={2}>
              <Typography sx={labelStyle}>Selling Rate</Typography>
              <Typography sx={valueStyle}>{pendingItem.sale_rate}</Typography>
            </Grid>
            <Grid item display="flex" xs={12} md={6} gap={2}>
              <Typography sx={labelStyle}>Order Quantity</Typography>
              <Typography sx={valueStyle}>{pendingItem.qty}</Typography>
            </Grid>
            <Grid item display="flex" xs={12} md={6} gap={2}>
              <Typography sx={labelStyle}>Order Date</Typography>
              <Typography sx={valueStyle}>
                {dayjs(pendingItem.order_date).format("DD/MM/YYYY").toString()}
              </Typography>
            </Grid>
            <Grid item display="flex" xs={12} md={12} gap={2}>
              <Typography sx={labelStyle}>Order Remark</Typography>
              <TextField
                sx={{ width: 550, ml: 3 }}
                name="order_remark"
                value={orderData.order_remark}
                multiline
                onChange={handleUpdateOrderData}
              />
            </Grid>
            <Grid item display="flex" xs={12} md={12} gap={2}>
              <Typography sx={labelStyle}>Confirm Remark</Typography>
              <TextField
                sx={{ width: 550 }}
                name="confirm_remark"
                value={orderData.confirm_remark}
                multiline
                onChange={handleUpdateOrderData}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color={orderData.order_confirmed === "Y" ? "green" : "red"}
            sx={{
              m: 2,
              mb: 1,
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => {
              updatePendingOrderMutation.mutate(orderData);
              setOpen(false);
            }}
          >
            {orderData.order_confirmed === "Y" ? "Approve" : "Reject"}
          </Button>
        </Card>
      </div>
    </Modal>
  );
};

export default OrderUpdateModal;
