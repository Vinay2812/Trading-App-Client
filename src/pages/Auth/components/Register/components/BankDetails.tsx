import { FC, useEffect, useState } from "react";
import {
  UserBankDetailsInterface,
  dropdownType,
} from "../../../types/register";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  CssBaseline,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Add, DeleteForeverOutlined, LockOutlined } from "@mui/icons-material";
import { accountTypes } from "../data";
import { boxShadow } from "../../../../../styles/auth";
import { addSingleDetail, deleteSingleDetail } from "../helpers";
import { useColors } from "../../../../../hooks/useColors";

interface BankDetailsProps {
  userBankDetails: UserBankDetailsInterface[];
  setUserBankDetails: Function;
}
interface BankDetailsCardProps {
  userBankDetail: UserBankDetailsInterface;
  setUserBankDetails: Function;
  handleDeleteBankDetail: Function;
}
const BankDetailsCard: FC<BankDetailsCardProps> = (props) => {
  const { userBankDetail, setUserBankDetails, handleDeleteBankDetail } = props;
  const [accountTypeValue, setAccountTypeValue] = useState<dropdownType>(
    userBankDetail.account_type.length
      ? (accountTypes.find(
          (at) => at.label === userBankDetail.account_type
        ) as dropdownType)
      : {
          label: "",
          id: -1,
        }
  );
  const [accountTypeInputValue, setAccountTypeInputValue] = useState(
    accountTypeValue.label
  );

  useEffect(() => {
    if (accountTypeValue.id !== -1) {
      setUserBankDetails((prev: UserBankDetailsInterface[]) => {
        const newBankDetails = prev.map((bankDetail) => {
          if (bankDetail.id === userBankDetail.id) {
            return {
              ...bankDetail,
              account_type: accountTypeValue.label,
            };
          }
          return bankDetail;
        });
        return newBankDetails;
      });
    }
  }, [accountTypeValue]);

  const handleBankCardDetailChange = (e: any) => {
    setUserBankDetails((prev: UserBankDetailsInterface[]) => {
      const newBankDetails = prev.map((bankDetail) => {
        if (bankDetail.id === userBankDetail.id) {
          return {
            ...bankDetail,
            [e.target.name]: e.target.value,
          };
        }
        return bankDetail;
      });
      return newBankDetails;
    });
  };
  const colors = useColors();
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        px: 4,
        // py: 2,
        bgcolor: colors.cardAccent,
      }}
      gap={2}
    >
      <Box
        sx={{
          position: "relative",
          pb: 2
        }}
      >
        <Typography
          variant="h6"
          component="h6"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          Bank Detail {userBankDetail.id}
          {
            <IconButton
              sx={{
                color: "tomato",
              }}
              onClick={() => handleDeleteBankDetail(userBankDetail.id)}
            >
              <DeleteForeverOutlined />
            </IconButton>
          }
        </Typography>
      </Box>
      <Grid container spacing={2} width={"100%"}>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            onChange={handleBankCardDetailChange}
            fullWidth
            name="account_name"
            value={userBankDetail.account_name}
            label="Full Name"
            required
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            onChange={handleBankCardDetailChange}
            fullWidth
            name="account_number"
            value={userBankDetail.account_number}
            label="Account Number"
            required
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            onChange={handleBankCardDetailChange}
            fullWidth
            name="bank_name"
            value={userBankDetail.bank_name}
            label="Bank Name"
            required
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Autocomplete
            disableClearable
            options={accountTypes}
            value={accountTypeValue}
            onChange={(event, newValue) => setAccountTypeValue(newValue)}
            inputValue={accountTypeInputValue}
            onInputChange={(event, newValue) =>
              setAccountTypeInputValue(newValue)
            }
            renderInput={(params) => (
              <TextField {...params} label="Acoount type" required />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            onChange={handleBankCardDetailChange}
            fullWidth
            name="branch"
            value={userBankDetail.branch}
            label="Branch"
            required
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            onChange={handleBankCardDetailChange}
            fullWidth
            name="ifsc"
            value={userBankDetail.ifsc}
            label="IFSC code"
            required
          />
        </Grid>
      </Grid>
    </Box>
  );
};
const BankDetails: FC<BankDetailsProps> = (props) => {
  const { userBankDetails, setUserBankDetails } = props;
  const handleDeleteBankDetail = (bankDetailId: number) => {
    deleteSingleDetail(
      bankDetailId,
      setUserBankDetails,
      userBankDetails.length
    );
  };

  const handleAddBankDetail = () => {
    const len = userBankDetails.length;
    const newBankDetail: UserBankDetailsInterface = {
      id: len + 1,
      account_name: "",
      account_number: "",
      bank_name: "",
      account_type: "",
      branch: "",
      ifsc: "",
    };
    addSingleDetail<UserBankDetailsInterface>(
      len,
      newBankDetail,
      setUserBankDetails
    );
  };
  const colors = useColors();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        position: "relative",
        py: 2,
        bgcolor: colors.cardAccent,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ my: 1, mt: 0, bgcolor: "green.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5" >
          Please fill atleast one bank detail
        </Typography>
      </Box>
      <Stack gap={3} width="100%">
        {userBankDetails.map((userBankDetail) => (
          <BankDetailsCard
            key={userBankDetail.id}
            userBankDetail={userBankDetail}
            setUserBankDetails={props.setUserBankDetails}
            handleDeleteBankDetail={handleDeleteBankDetail}
          />
        ))}
      </Stack>
      <Box
        width="100%"
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          px: 6,
          pt: 3
        }}
      >
        <Button variant="contained" color="blue" onClick={handleAddBankDetail}>
          <Add /> Bank Detail
        </Button>
      </Box>
    </Box>
  );
};

export default BankDetails;
