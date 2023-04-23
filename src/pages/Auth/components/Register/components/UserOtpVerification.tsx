import {
  CheckCircleOutlineRounded,
  LockOutlined,
  Send,
} from "@mui/icons-material";
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
import { useColors } from "../../../../../hooks/useColors";

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

  const handleOtpVerification = () => {
    setUserOtpVerified(true);
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

  const colors = useColors();
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
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          px: 4,
          py: 2,
          borderRadius: 4,
          bgcolor: colors.card,
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
        <Typography component="h6" variant="h6" textAlign={"center"}>
          {!userOtpVerified ? (
            "Please verify your email address vinaysarda***@gmail.com"
          ) : (
            <>
              <Typography
                component="h6"
                variant="h6"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "center",
                }}
                gap={1}
              >
                Your email address vinaysarda2812@gmail.com has been verified
                successfully{" "}
              </Typography>
              <CheckCircleOutlineRounded color="success" />
            </>
          )}
        </Typography>
        {!userOtpVerified && (
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
              sx={{ mt: 3, mb: 2, py: 1 }}
              onClick={handleOtpVerification}
            >
              Verify
            </Button>
            <Typography
              variant="body2"
              color="text.secondary"
              display="flex"
              justifyContent="center"
            >
              {timer > 0 ? (
                `Didn't receive otp? Resend otp in ${timer} seconds`
              ) : (
                <Button
                  sx={{ px: 2, py: 1 }}
                  endIcon={<Send />}
                  variant="text"
                >
                  Resend Otp
                </Button>
              )}
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default UserOtpVerification;
