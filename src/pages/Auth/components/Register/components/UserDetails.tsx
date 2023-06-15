import {
  Autocomplete,
  Avatar,
  Box,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { UserDetailsInterface, dropdownType } from "../../../types/register";
import { states, getDistrictsOfState, constitutionOfFirm } from "../data";
import { LockOutlined } from "@mui/icons-material";
import { useColors } from "../../../../../hooks/use-colors";
import { UserDataType } from "../../../../../hooks/api-hooks/user/user";

interface UserDetailsProps {
  userDetails: UserDataType;
  setUserDetails: Function;
  isEditable?: boolean;
}

const UserDetails: FC<UserDetailsProps> = (props) => {
  const { userDetails, setUserDetails, isEditable = true } = props;
  const [stateValue, setStateValue] = useState<dropdownType>(
    states.find((state: dropdownType) => state.label === userDetails.state) ?? {
      label: "",
      id: -1,
    }
  );
  const [stateInputValue, setStateInputValue] = useState(stateValue.label);

  const [districts, setDistricts] = useState<dropdownType[] | []>(
    stateValue.id !== -1 ? getDistrictsOfState(stateValue.id) : []
  );
  const [districtValue, setDistrictValue] = useState<dropdownType>(
    districts.find((district) => district.label === userDetails.district) ?? {
      label: "",
      id: -1,
    }
  );
  const [districtInputValue, setDistrictInputValue] = useState(
    districtValue.label
  );

  const [constitutionOfFirmValue, setConstitutionOfFirmValue] =
    useState<dropdownType>(
      constitutionOfFirm.find(
        (cof) => cof.label === userDetails.constitution_of_firm
      ) ?? {
        label: "",
        id: -1,
      }
    );
  const [constitutionOfFirmInputValue, setConstitutionOfFirmInputValue] =
    useState(constitutionOfFirmValue.label);

  useEffect(() => {
    setUserDetails((prev: UserDetailsInterface) => ({
      ...prev,
      state: stateValue.label,
    }));
    const updatedDistricts = getDistrictsOfState(stateValue.id);
    setDistricts(updatedDistricts);
    if (!updatedDistricts.find((d) => d.label === userDetails.district)) {
      setDistrictInputValue("");
      setDistrictValue({
        label: "",
        id: -1,
      });
    }
  }, [stateValue]);

  useEffect(() => {
    if (districtValue.id !== -1) {
      setUserDetails((prev: UserDetailsInterface) => ({
        ...prev,
        district: districtValue.label,
      }));
    }
  }, [districtValue]);

  useEffect(() => {
    if (constitutionOfFirmValue.id !== -1) {
      setUserDetails((prev: UserDetailsInterface) => ({
        ...prev,
        constitution_of_firm: constitutionOfFirmValue.label,
      }));
    }
  }, [constitutionOfFirmValue]);

  function handleInputChange(e: any) {
    setUserDetails((prev: UserDetailsInterface) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }
  const colors = useColors();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        pt: 2,
        alignItems: "center",
        position: "relative",
        bgcolor: colors.card,
      }}
    >
      {isEditable && (
        <Avatar sx={{ bgcolor: "green.main" }}>
          <LockOutlined />
        </Avatar>
      )}
      <Typography component="h1" variant="h5" pb={2}>
        User Details
      </Typography>
      <Box
        sx={{
          px: 4,
          py: 2,
          bgcolor: colors.card,
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} lg={4}>
            <TextField
              disabled={!isEditable}
              onChange={handleInputChange}
              label="Company name"
              required
              fullWidth
              name="company_name"
              autoFocus
              value={userDetails.company_name}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <TextField
              disabled={!isEditable}
              onChange={handleInputChange}
              label="Email"
              required
              fullWidth
              name="email"
              value={userDetails.email}
            />
          </Grid>
          {/* <Grid item md={0} lg={0}></Grid> */}
          <Grid item xs={12} md={6} lg={4}>
            <TextField
              disabled={!isEditable}
              onChange={handleInputChange}
              label="Address"
              required
              fullWidth
              name="address"
              multiline
              value={userDetails.address ?? ""}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Autocomplete
              disableClearable
              options={states}
              value={stateValue}
              disabled={!isEditable}
              onChange={(event, newValue) => setStateValue(newValue)}
              inputValue={stateInputValue}
              onInputChange={(event, newValue) => setStateInputValue(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="State" required />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Autocomplete
              disableClearable
              disabled={stateValue.id === -1 || !isEditable}
              options={districts}
              value={districtValue}
              onChange={(event, newValue) => setDistrictValue(newValue)}
              inputValue={districtInputValue}
              onInputChange={(event, newValue) =>
                setDistrictInputValue(newValue)
              }
              renderInput={(params) => (
                <TextField {...params} label="District" required />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <TextField
              disabled={!isEditable}
              onChange={handleInputChange}
              label="Pincode"
              required
              fullWidth
              name="pincode"
              value={userDetails.pincode}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Grid container gap={1.5}>
              <Grid item xs={2}>
                <TextField
                  onChange={handleInputChange}
                  fullWidth
                  value="+91"
                  disabled
                />
              </Grid>
              <Grid item xs={9} lg={9.5}>
                <TextField
                  disabled={!isEditable}
                  onChange={handleInputChange}
                  label="Mobile Number"
                  required
                  fullWidth
                  name="mobile"
                  value={userDetails.mobile}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <TextField
              disabled={!isEditable}
              onChange={handleInputChange}
              label="Whatsapp number"
              fullWidth
              name="whatsapp"
              value={userDetails.whatsapp ?? ""}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <TextField
              disabled={!isEditable}
              onChange={handleInputChange}
              label="GST number"
              fullWidth
              name="gst"
              value={userDetails.gst ?? ""}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <TextField
              disabled={!isEditable}
              onChange={handleInputChange}
              label="Pan number"
              required
              fullWidth
              name="pan"
              value={userDetails.pan}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <TextField
              disabled={!isEditable}
              onChange={handleInputChange}
              label="FSSAI number"
              required
              fullWidth
              name="fssai"
              value={userDetails.fssai}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <TextField
              disabled={!isEditable}
              onChange={handleInputChange}
              label="Tan number"
              required
              fullWidth
              name="tan"
              value={userDetails.tan}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Autocomplete
              disableClearable
              options={constitutionOfFirm}
              value={constitutionOfFirmValue}
              onChange={(event, newValue) =>
                setConstitutionOfFirmValue(newValue)
              }
              inputValue={constitutionOfFirmInputValue}
              onInputChange={(event, newValue) =>
                setConstitutionOfFirmInputValue(newValue)
              }
              disabled={!isEditable}
              renderInput={(params) => (
                <TextField {...params} label="Constitution of firm" required />
              )}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UserDetails;
