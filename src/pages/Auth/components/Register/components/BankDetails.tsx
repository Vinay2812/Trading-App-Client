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
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Add, DeleteForeverOutlined, LockOutlined } from "@mui/icons-material";
import { accountTypes } from "../data";

interface BankDetailsProps {
  userBankDetails: UserBankDetailsInterface[];
  setUserBankDetails: Function;
}
interface BankDetailsCardProps {
  userBankDetail: UserBankDetailsInterface;
  setUserBankDetails: Function;
}
const BankDetailsCard: FC<BankDetailsCardProps> = (props) => {
  const { userBankDetail, setUserBankDetails } = props;
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

  return (
    <Box
      sx={{
        width: "100%",
        boxShadow: "0px 2px 5px 5px rgba(0,0,0,0.3)",
        p: 4,
        borderRadius: 4,
      }}
      gap={2}
    >
      <CssBaseline />
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
          <Button
            color="peach"
            sx={{
              aspectRatio: "1",
              borderRadius: "50%",
              p: 0,
            }}
          >
            <DeleteForeverOutlined />
          </Button>
        }
      </Typography>
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
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        alignItems: "center",
        position: "relative",
        mt: 1
      }}
    >
      <CssBaseline />
      <Avatar sx={{ m: 1, mt: 0, bgcolor: "green.main" }}>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h5" pb={2}>
        Please fill atleast one bank detail
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Stack sx={{ width: "100%" }}>
          {props.userBankDetails.map((userBankDetail) => (
            <BankDetailsCard
              key={userBankDetail.id}
              userBankDetail={userBankDetail}
              setUserBankDetails={props.setUserBankDetails}
            />
          ))}
        </Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            py: 2,
          }}
        >
          <Button
            variant="contained"
            sx={{
              position: "absolute",
              aspectRatio: "1",
              borderRadius: "50%",
            }}
            color="darkblue"
          >
            <Add />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default BankDetails;
