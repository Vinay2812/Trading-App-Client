import {
  CheckCircleOutlineRounded,
  LockOutlined,
  Send,
} from "@mui/icons-material";
import { Container, Box, Typography, Avatar, Button } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import { FC, useEffect, useState } from "react";
import { useColors } from "../../../../../hooks/use-colors";
import { useSendOtp } from "../../../../../hooks/api-hooks/auth/use-send-otp";
import { useValidateOtp } from "../../../../../hooks/api-hooks/auth/use-validate-otp";
import TextLoader from "../../../../../components/TextLoader/TextLoader";

interface UserOtpVerificationProps {
  userOtpVerified: boolean;
  setUserOtpVerified: Function;
  isSendingOtp: boolean;
  userOtpSent: boolean;
  email: string;
  onSuccess?: Function;
}

const UserOtpVerification: FC<UserOtpVerificationProps> = (props) => {
  const {
    userOtpVerified,
    setUserOtpVerified,
    isSendingOtp,
    email,
  } = props;
  const [otp, setOtp] = useState<string>("");
  const [timer, setTimer] = useState<number>(userOtpVerified ? 0 : 29);
  const [startTimer, setStartTimer] = useState(true);
  const colors = useColors();

  // ********** Api Calls **********
  const sendOtpMutation = useSendOtp();
  const validateOtpMutation = useValidateOtp();

  const validateChar = (value: string, index: number) => {
    if (typeof value !== "string") return true;
    return value === "" || /\d/.test(value);
  };

  const handleOtpChange = (newValue: string) => {
    setOtp(newValue);
  };

  const handleOtpVerification = async () => {
    validateOtpMutation.mutate({ email, otp });
  };

  const handleSendOtp = async () => {
    !sendOtpMutation.isLoading &&
      (await sendOtpMutation.mutateAsync({ email }));
  };

  useEffect(() => {
    if (!startTimer) {
      setTimer(29);
      return;
    }
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
  }, [startTimer]);

  useEffect(() => {
    validateOtpMutation.data && setUserOtpVerified(true);
  }, [validateOtpMutation.isSuccess]);

  useEffect(() => {
    if (
      !isSendingOtp &&
      !sendOtpMutation.isLoading &&
      !validateOtpMutation.isLoading
    ) {
      setStartTimer(true);
    }
  }, [sendOtpMutation.isLoading, validateOtpMutation.isLoading]);

  return (
    <>
      {
        <TextLoader
          loading={
            sendOtpMutation.isLoading ||
            validateOtpMutation.isLoading ||
            isSendingOtp
          }
          loadingText={
            sendOtpMutation.isLoading || isSendingOtp
              ? "sending otp"
              : "verifying otp"
          }
        />
      }
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
              `Please verify your email address ${email}`
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
                  Your email address {email} has been verified successfully{" "}
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
                autoFocus
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
                    onClick={handleSendOtp}
                  >
                    Resend Otp
                  </Button>
                )}
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
};

export default UserOtpVerification;
