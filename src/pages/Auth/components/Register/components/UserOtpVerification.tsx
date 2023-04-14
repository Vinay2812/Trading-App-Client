import { CheckCircleOutlineRounded, LockOutlined } from "@mui/icons-material";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  Avatar,
  Button,
} from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import { FC, useEffect, useState } from "react";

interface UserOtpVerificationProps {
  userOtpVerified: boolean;
  setUserOtpVerified: Function;
}

const UserOtpVerification: FC<UserOtpVerificationProps> = (props) => {
  const { userOtpVerified, setUserOtpVerified } = props;
  const [otp, setOtp] = useState<string>("");
  const [timer, setTimer] = useState<number>(userOtpVerified ? 0 : 29);

  const validateChar = (value: string, index: number) => {
    if (typeof value !== "string") return true;
    return value === "" || /\d/.test(value);
  };

  const handleOtpChange = (newValue: string) => {
    setOtp(newValue);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev > 0) {
          return prev - 1;
        }
        clearInterval(interval);
        return 0;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        display: "flex",
        height: "100%",
        alignItems: "center",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "0px 2px 5px 5px rgba(0,0,0,0.35)",
          p: 4,
          borderRadius: 4,
        }}
      >
        <Avatar
          sx={{
            m: 1,
            mt: 0,
            bgcolor: userOtpVerified ? "green.main" : "red.main",
          }}
        >
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5" textAlign={"center"}>
          Please verify your email address vinaysarda***@gmail.com
        </Typography>
        {!userOtpVerified ? (
          <Box sx={{ mt: 2 }}>
            <MuiOtpInput
              value={otp}
              onChange={handleOtpChange}
              length={6}
              sx={{
                mt: 2,
              }}
              validateChar={validateChar}
              TextFieldsProps={{ placeholder: "-" }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="green"
              sx={{ mt: 3, mb: 2 }}
            >
              Verify
            </Button>
            <Typography variant="body2" color="text.secondary" align="center">
              {timer > 0 ? (
                `Resend OTP in ${timer} seconds`
              ) : (
                <Button sx={{ p: 1 }}>Resend Otp</Button>
              )}
            </Typography>
          </Box>
        ) : (
          <Typography
            component="h6"
            variant="h6"
            sx={{ display: "flex", alignItems: "center", mt: 3, width: "100%" }}
            gap={1}
          >
            Your Otp has been verified successfully{" "}
            {<CheckCircleOutlineRounded color="success" />}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default UserOtpVerification;
