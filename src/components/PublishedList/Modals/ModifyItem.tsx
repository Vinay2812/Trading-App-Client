import { FC, useEffect, useMemo, useState } from "react";
import { PublishedListRowType } from "..";
import {
  UpdatePublishedListItemRequest,
  useUpdatePublishedListItem,
} from "../../../hooks/api-hooks/admin/use-update-published-list-item";
import { useColors } from "../../../hooks/use-colors";
import {
  Button,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  SxProps,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import TextLoader from "../../TextLoader/TextLoader";
import Card from "../../Cards/Card";
import HeaderCard from "../../Cards/HeaderCard";
import CustomIconButton from "../../Buttons/CustomIconButton";
import { CancelOutlined } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

interface ModifyItemProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  publishedListItem: PublishedListRowType;
}

const ModifyItem: FC<ModifyItemProps> = ({
  open,
  setOpen,
  publishedListItem,
}) => {
  const colors = useColors();
  const [modifyData, setModifyData] = useState<UpdatePublishedListItemRequest>(
    {} as UpdatePublishedListItemRequest
  );

  useEffect(() => {
    setModifyData({
      tender_id: publishedListItem.tender_id,
      sale_rate: publishedListItem.sale_rate,
      published_qty: publishedListItem.published_qty,
      status: publishedListItem.status || "N",
      publish_date: publishedListItem.publish_date!,
    });
  }, [publishedListItem]);

  const updatePublishedListItemMutation = useUpdatePublishedListItem();

  const { loading, loadingText } = useMemo(() => {
    let loadingText = "loading";
    if (updatePublishedListItemMutation.isLoading) {
      loadingText = "updating";
    }
    return {
      loading: updatePublishedListItemMutation.isLoading,
      loadingText,
    };
  }, [updatePublishedListItemMutation.isLoading]);

  useEffect(() => {
    if (
      updatePublishedListItemMutation.data &&
      updatePublishedListItemMutation.isSuccess
    ) {
      setOpen(false);
    }
  }, [updatePublishedListItemMutation.data]);

  const handleModifyItem = () => {
    updatePublishedListItemMutation.mutate(modifyData);
  };

  const handleModifyDataChange = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | SelectChangeEvent
  ) => {
    setModifyData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value as any,
    }));
  };

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

  return (
    <Modal open={open}>
      <div>
        {<TextLoader loading={loading} loadingText={loadingText} />}
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
            title="Published List Item"
            subtitle="Update published list item"
            buttonBox={
              <CustomIconButton
                color={colors.red[500]}
                hoverBackgroundColor={colors.red[400]}
                description="Close"
                onClick={() => setOpen(false)}
              >
                <CancelOutlined />
              </CustomIconButton>
            }
          />
          <Divider />
          <Grid container px={2} spacing={2} rowGap={2} sx={{ mt: 1 }}>
            <Grid item display="flex" xs={12} md={6} gap={2}>
              <Typography sx={labelStyle}>Tender Id </Typography>
              <Typography sx={valueStyle}>
                {publishedListItem.tender_id}
              </Typography>
            </Grid>
            <Grid item display="flex" xs={12} md={6} gap={2}>
              <Typography sx={labelStyle}>Tender Number</Typography>
              <Typography sx={valueStyle}>
                {publishedListItem.tender_no}
              </Typography>
            </Grid>
            <Grid item display="flex" xs={12} md={6} gap={2}>
              <Typography sx={labelStyle}>Mill Name</Typography>
              <Typography sx={valueStyle}>
                {publishedListItem.mill_short_name}
              </Typography>
            </Grid>
            <Grid item display="flex" xs={12} md={6} gap={2}>
              <Typography sx={labelStyle}>Item Name</Typography>
              <Typography sx={valueStyle}>
                {publishedListItem.item_name}
              </Typography>
            </Grid>
            <Grid item display="flex" xs={12} md={6} gap={2}>
              <Typography sx={labelStyle}>Quantity </Typography>
              <Typography sx={valueStyle}>{publishedListItem.qty}</Typography>
            </Grid>
            <Grid item display="flex" xs={12} md={6} gap={2}>
              <Typography sx={labelStyle}>Mill Rate </Typography>
              <Typography sx={valueStyle}>
                {publishedListItem.mill_rate}
              </Typography>
            </Grid>
            <Grid item display="flex" xs={12} md={6} gap={2}>
              <Typography sx={labelStyle}>Selling Rate</Typography>
              <TextField
                sx={{ width: 180 }}
                size="small"
                placeholder="Enter selling rate"
                value={modifyData.sale_rate ? modifyData.sale_rate : ""}
                name="sale_rate"
                onChange={handleModifyDataChange}
              />
            </Grid>
            <Grid item display="flex" xs={12} md={6} gap={2}>
              <Typography sx={labelStyle}>Published Quantity</Typography>
              <TextField
                sx={{ width: 165 }}
                size="small"
                placeholder="Enter quantity"
                value={modifyData.published_qty ? modifyData.published_qty : ""}
                name="published_qty"
                onChange={handleModifyDataChange}
              />
            </Grid>
            <Grid item display="flex" xs={12} md={6} gap={2}>
              <Typography sx={labelStyle}>Status</Typography>
              <FormControl sx={{ width: 170 }} size="small">
                <Select
                  value={modifyData.status}
                  name="status"
                  onChange={handleModifyDataChange}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="Y">Start</MenuItem>
                  <MenuItem value="N">Stop</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item display="flex" xs={12} md={6} gap={2}>
              <Typography sx={labelStyle}>Publish Date</Typography>
              {/* <DatePicker
                value={dayjs(modifyData.publish_date)}
                sx={{width: 200}}
                slotProps={{ textField: { size: 'small' } }}
                format="DD/MM/YYYY"
                onChange={(value) => {
                  setModifyData((prev) => ({
                    ...prev,
                    publish_date: value?.toDate() ?? modifyData.publish_date,
                  }));
                }}
              /> */}
              <Typography sx={valueStyle}>
                {dayjs(publishedListItem.publish_date).format("DD/MM/YYYY").toString()}
              </Typography>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="green"
            sx={{
              m: 2,
              mb: 1,
              display: "flex",
              alignItems: "center",
            }}
            onClick={handleModifyItem}
          >
            Update Item
          </Button>
        </Card>
      </div>
    </Modal>
  );
};

export default ModifyItem;
