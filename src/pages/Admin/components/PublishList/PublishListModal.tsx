import { FC, useEffect, useMemo, useState } from "react";
import TextLoader from "../../../../components/TextLoader/TextLoader";
import {
  Divider,
  FormControl,
  Grid,
  Modal,
  Select,
  SxProps,
  Theme,
  Typography,
  MenuItem,
  SelectChangeEvent,
  TextField,
  Button,
} from "@mui/material";
import Card from "../../../../components/Cards/Card";
import { Nullable } from "../../../../types/helper";
import {
  PostPublishRequest,
  usePostPublishList,
} from "../../../../hooks/api-hooks/admin/use-post-publish-list";
import HeaderCard from "../../../../components/Cards/HeaderCard";
import { useColors } from "../../../../hooks/use-colors";
import CustomIconButton from "../../../../components/Buttons/CustomIconButton";
import { CancelOutlined, PublishOutlined } from "@mui/icons-material";
import dayjs from "dayjs";

interface PublishListModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  publishItemData: Nullable<PostPublishRequest>;
}

const PublishListModal: FC<PublishListModalProps> = ({
  open,
  setOpen,
  publishItemData,
}) => {
  const colors = useColors();
  const [unit, setUnit] = useState(publishItemData.unit || "Q");
  const [sellingType, setSellingType] = useState(publishItemData.type || "F");
  const [autoConfirm, setAutoConfirm] = useState(
    publishItemData.auto_confirm || "Y"
  );
  const [sellingRate, setSellingRate] = useState(publishItemData.sale_rate);
  const [publishQuantity, setPublishQuantity] = useState(
    publishItemData.publish_quantal
  );

  const [multipleOf, setMultipleOf] = useState(
    publishItemData.multiple_of || 160
  );

  const postPublishListItemMutation = usePostPublishList();

  const { loading, loadingText } = useMemo(() => {
    let loadingText = "loading";
    if (postPublishListItemMutation.isLoading) loadingText = "Publishing";
    return { loading: postPublishListItemMutation.isLoading, loadingText };
  }, [postPublishListItemMutation.isLoading]);

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

  const handleUnitChange = (event: SelectChangeEvent) => {
    setUnit(event.target.value as any);
  };
  const handleSellingTypeChange = (event: SelectChangeEvent) => {
    setSellingType(event.target.value as any);
  };
  const handleAutoConfirmChange = (event: SelectChangeEvent) => {
    setAutoConfirm(event.target.value as any);
  };
  const handleSellingRateChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const digitRegex = /^[\d\b]+$/;
    const text = e.target.value;
    if (text.length && !digitRegex.test(text)) return;
    setSellingRate(text.length ? parseInt(text) : 0);
  };
  const handlePublishQuantityChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const digitRegex = /^[\d\b]+$/;
    const text = e.target.value;
    if (text.length && !digitRegex.test(text)) return;
    setPublishQuantity(text.length ? parseInt(text) : 0);
  };
  const handleMultipleOfChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const digitRegex = /^[\d\b]+$/;
    const text = e.target.value;
    if (text.length && !digitRegex.test(text)) return;
    setMultipleOf(text.length ? parseInt(text) : 0);
  };

  const handlePublishItem = () => {
    if (!sellingRate) {
      alert("Please enter selling rate");
      return;
    }

    if (!publishQuantity) {
      alert("Please enter publish quantity");
      return;
    }
    const reqObj: Nullable<PostPublishRequest> = {
      ...publishItemData,
      tender_no: publishItemData.tender_no || undefined,
      unit,
      type: sellingType,
      auto_confirm: autoConfirm,
      sale_rate: sellingRate,
      publish_quantal: publishQuantity,
      multiple_of: multipleOf,
    };
    confirm("Are you sure you want to publish this item?") &&
      postPublishListItemMutation.mutate(reqObj as PostPublishRequest);
  };

  const reset = () => {
    setUnit(publishItemData.unit || "Q");
    setSellingType(publishItemData.type || "F");
    setAutoConfirm(publishItemData.auto_confirm || "Y");
    setSellingRate(publishItemData.sale_rate);
    setPublishQuantity(publishItemData.publish_quantal);
    setMultipleOf(publishItemData.multiple_of || 160);
  };

  useEffect(() => {
    if (
      postPublishListItemMutation.data &&
      postPublishListItemMutation.isSuccess
    ) {
      reset();
      setOpen(false);
    }
  }, [postPublishListItemMutation.isSuccess, postPublishListItemMutation.data]);

  useEffect(() => {
    if (postPublishListItemMutation.isError) {
      reset();
      setOpen(false);
    }
  }, [postPublishListItemMutation.isError]);
  return (
    <Modal open={open}>
      <div>
        {loading && <TextLoader text={loadingText} />}
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
            title="Publish Dialog"
            subtitle="Please confirm the publish item values"
            buttonBox={
              <CustomIconButton
                color={colors.red[500]}
                hoverBackgroundColor={colors.red[400]}
                description="Close"
                onClick={() => {
                  reset();
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
              <Typography sx={labelStyle}>Mill Name</Typography>
              <Typography sx={valueStyle}>
                {publishItemData.mill_short_name}
              </Typography>
            </Grid>
            <Grid item display="flex" xs={12} md={6} gap={2}>
              <Typography sx={labelStyle}>Product</Typography>
              <Typography sx={valueStyle}>
                {publishItemData.item_name}
              </Typography>
            </Grid>
            <Grid item display="flex" xs={12} md={6} gap={2}>
              <Typography sx={labelStyle}>Grade</Typography>
              <Typography sx={valueStyle}>{publishItemData.grade}</Typography>
            </Grid>
            <Grid item display="flex" xs={12} md={6} gap={2}>
              <Typography sx={labelStyle}>Season</Typography>
              <Typography sx={valueStyle}>{publishItemData.season}</Typography>
            </Grid>
            <Grid item display="flex" xs={12} md={6} gap={2}>
              <Typography sx={labelStyle}>Selling Rate</Typography>
              <TextField
                sx={{ width: 180 }}
                size="small"
                placeholder="Enter selling rate"
                value={sellingRate ? sellingRate : ""}
                onChange={handleSellingRateChange}
              />
            </Grid>
            <Grid item display="flex" xs={12} md={6} gap={2}>
              <Typography sx={labelStyle}>Publish Quantity</Typography>
              <TextField
                sx={{ width: 150 }}
                size="small"
                placeholder="Enter quantity"
                value={publishQuantity ? publishQuantity : ""}
                onChange={handlePublishQuantityChange}
              />
            </Grid>
            <Grid item display="flex" xs={12} md={6} gap={2}>
              <Typography sx={labelStyle}>Selling Unit</Typography>
              <FormControl sx={{ width: 180 }} size="small">
                <Select
                  value={unit}
                  onChange={handleUnitChange}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="L">Litres</MenuItem>
                  <MenuItem value="Q">Quintal</MenuItem>
                  <MenuItem value="M">Metric Ton</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item display="flex" xs={12} md={6} gap={2}>
              <Typography sx={labelStyle}>Lifting Date</Typography>
              <Typography sx={valueStyle}>
                {dayjs(publishItemData.lifting_date)
                  .format("DD/MM/YYYY")
                  .toString()}
              </Typography>
            </Grid>
            <Grid item display="flex" xs={12} md={6} gap={2}>
              <Typography sx={labelStyle}>Selling Type</Typography>
              <FormControl sx={{ width: 180 }} size="small">
                <Select
                  value={sellingType}
                  onChange={handleSellingTypeChange}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="P">Partial</MenuItem>
                  <MenuItem value="F">Full</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item display="flex" xs={12} md={6} gap={2}>
              <Typography sx={labelStyle}>Multiple of</Typography>
              <TextField
                sx={{ width: 180 }}
                size="small"
                placeholder="Enter multiple of"
                value={multipleOf ? multipleOf : ""}
                onChange={handleMultipleOfChange}
              />
            </Grid>
            <Grid item display="flex" xs={12} md={6} gap={2}>
              <Typography sx={labelStyle}>Auto Confirm</Typography>
              <FormControl sx={{ width: 170 }} size="small">
                <Select
                  value={autoConfirm}
                  onChange={handleAutoConfirmChange}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="Y">Yes</MenuItem>
                  <MenuItem value="N">No</MenuItem>
                </Select>
              </FormControl>
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
            endIcon={<PublishOutlined />}
            onClick={handlePublishItem}
          >
            Publish Item
          </Button>
        </Card>
      </div>
    </Modal>
  );
};

export default PublishListModal;
