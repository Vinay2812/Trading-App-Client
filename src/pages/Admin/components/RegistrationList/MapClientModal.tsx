import { FC, useEffect, useMemo, useState } from "react";
import TextLoader from "../../../../components/TextLoader/TextLoader";
import {
  Divider,
  Grid,
  Modal,
  SxProps,
  Theme,
  Typography,
  Button,
  Autocomplete,
  TextField,
} from "@mui/material";
import Card from "../../../../components/Cards/Card";
import { Nullable } from "../../../../types/helper";
import { useColors } from "../../../../hooks/use-colors";
import CustomIconButton from "../../../../components/Buttons/CustomIconButton";
import { CancelOutlined } from "@mui/icons-material";
import { RegistrationListRowType } from ".";
import { useGetAccountMasterCompanies } from "../../../../hooks/api-hooks/user/use-get-account-master-companies";
import {
  AccountMasterData,
  useGetAccountMasterByAccoid,
} from "../../../../hooks/api-hooks/user/use-get-account-master-by-accoid";
import { dropdownType } from "../../../Auth/types/register";
import HeaderCard from "../../../../components/Cards/HeaderCard";
import { useMapClient } from "../../../../hooks/api-hooks/admin/use-map-client";
import { useCustomToast } from "../../../../hooks/use-custom-toast";

interface MapClientModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  mapClientItem: RegistrationListRowType;
}

const MapClientModal: FC<MapClientModalProps> = ({
  open,
  setOpen,
  mapClientItem,
}) => {
  const colors = useColors();
  const { success, fail } = useCustomToast();
  const [selectedAccoid, setSelectedAccoid] = useState<number | null>(null);
  const [mapWithOptions, setMapWithOptions] = useState<dropdownType[]>([
    { label: "", id: -1 },
  ]);
  const [mapWithUserData, setMapWithUserData] = useState<
    Nullable<AccountMasterData>
  >({} as AccountMasterData);
  const [inputValue, setInputValue] = useState("");

  // react-query hooks
  const getAccountMasterCompaniesQuery = useGetAccountMasterCompanies();
  const getAccountasterByAccoidQuery =
    useGetAccountMasterByAccoid(selectedAccoid);
  const mapClientMutation = useMapClient();

  useEffect(() => {
    const data = getAccountMasterCompaniesQuery.data?.value;
    if (!data) {
      setMapWithOptions([{ label: "", id: -1 }]);
      return;
    }

    const tempMapWithOptions = data.companies.map((item) => ({
      label: item.ac_name_e,
      id: item.accoid,
    }));

    setMapWithOptions(tempMapWithOptions);
  }, [getAccountMasterCompaniesQuery.data]);

  useEffect(() => {
    const data = getAccountasterByAccoidQuery.data?.value?.userData;
    if (!data) {
      setMapWithUserData({} as AccountMasterData);
      return;
    }

    setMapWithUserData(data);
  }, [getAccountasterByAccoidQuery.data]);

  useEffect(() => {
    if (mapClientMutation.data && mapClientMutation.isSuccess) setOpen(false);
  }, [mapClientMutation.isSuccess]);

  const handleMapClient = () => {
    if (!selectedAccoid) {
      fail("Please select a user to map with");
      return;
    }

    confirm(
      `Are you sure you want to map ${mapClientItem.company_name} with ${inputValue}`
    ) &&
      mapClientMutation.mutate({
        accoid: selectedAccoid,
        userId: mapClientItem.userId,
      });
  };

  const { loading, loadingText } = useMemo(() => {
    let loadingText = "loading";
    if (mapClientMutation.isLoading) {
      loadingText = "Mapping";
    }
    return {
      loading:
        getAccountMasterCompaniesQuery.isLoading ||
        getAccountasterByAccoidQuery.isLoading ||
        mapClientMutation.isLoading,
      loadingText,
    };
  }, [
    getAccountMasterCompaniesQuery.isLoading,
    getAccountasterByAccoidQuery.isLoading,
    mapClientMutation.isLoading,
  ]);

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
            title="Map Client Dialog"
            subtitle="Please map the user"
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
              <Typography sx={labelStyle}>Client Id</Typography>
              <Typography sx={valueStyle}>{mapClientItem.userId}</Typography>
            </Grid>
            <Grid item display="flex" xs={12} md={6} gap={2}>
              <Typography sx={labelStyle}>Company Name</Typography>
              <Typography sx={valueStyle}>
                {mapClientItem.company_name}
              </Typography>
            </Grid>
            <Grid item display="flex" xs={12} md={6} gap={2}>
              <Typography sx={labelStyle}>Gst Number</Typography>
              <Typography sx={valueStyle}>
                {mapClientItem.gst || "NA"}
              </Typography>
            </Grid>
            <Grid item display="flex" xs={12} md={6} gap={2}>
              <Typography sx={labelStyle}>Address</Typography>
              <Typography sx={valueStyle}>{mapClientItem.address}</Typography>
            </Grid>
            <Grid item display="flex" xs={12} md={6} gap={2}>
              <Typography sx={labelStyle}>State</Typography>
              <Typography sx={valueStyle}>{mapClientItem.state}</Typography>
            </Grid>
            <Grid item display="flex" xs={12} md={6} gap={2}>
              <Typography sx={labelStyle}>District</Typography>
              <Typography sx={valueStyle}>{mapClientItem.district}</Typography>
            </Grid>
          </Grid>

          <Divider sx={{ mt: 2 }} />

          <Grid container px={2} spacing={2} rowGap={2} sx={{ mt: 1 }}>
            <Grid item display="flex" xs={12} md={6} gap={2}>
              <Typography sx={labelStyle}>Map With</Typography>
              <Autocomplete
                disableClearable
                options={mapWithOptions}
                size="small"
                sx={{ width: 250 }}
                onChange={(e, value) =>
                  setSelectedAccoid(
                    value?.id && value.id !== -1 ? value.id : null
                  )
                }
                value={
                  mapWithOptions.find((item) => item.id === selectedAccoid) ||
                  mapWithOptions[0]
                }
                inputValue={inputValue}
                onInputChange={(e, value) => setInputValue(value)}
                loading={getAccountMasterCompaniesQuery.isLoading}
                renderOption={(props, option) => {
                  if (!option.label.length) {
                    return null;
                  }
                  return (
                    <li {...props} key={option.id}>
                      {option.label}
                    </li>
                  );
                }}
                renderInput={(params) => <TextField {...params} label="Select user" autoFocus />}
                // autoFocus
              />
            </Grid>
            <Grid item display="flex" xs={12} md={6} gap={2}>
              <Typography sx={labelStyle}>Account Code</Typography>
              <Typography sx={valueStyle}>
                {mapWithUserData.ac_code || "NA"}
              </Typography>
            </Grid>
            <Grid item display="flex" xs={12} md={6} gap={2}>
              <Typography sx={labelStyle}>User Address</Typography>
              <Typography sx={valueStyle}>
                {mapWithUserData.address_e || "NA"}
              </Typography>
            </Grid>
            <Grid item display="flex" xs={12} md={6} gap={2}>
              <Typography sx={labelStyle}>Gst Number</Typography>
              <Typography sx={valueStyle}>
                {mapWithUserData.gst_no || "NA"}
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
            onClick={handleMapClient}
          >
            Map Client
          </Button>
        </Card>
      </div>
    </Modal>
  );
};

export default MapClientModal;
