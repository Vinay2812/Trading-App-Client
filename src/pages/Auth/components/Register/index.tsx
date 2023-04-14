import { FC } from "react";
import * as React from "react";
import {
  ArrowBack,
  ArrowForward,
  Done,
  LockOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import UserDetails from "./components/UserDetails";
import BankDetails from "./components/BankDetails";
import ContactDetails from "./components/ContactDetails";
import VerifyOtp from "./components/UserOtpVerification";
import UpdatePassword from "./components/UserPassword";
import {
  UserBankDetailsInterface,
  UserContactDetailsInterface,
  UserDetailsInterface,
  UserPasswordDetailsInterface,
} from "../../types/register";
import { useNavigate } from "react-router-dom";

interface RegisterProps {}
const steps = [
  "Fill user details",
  "Add bank details",
  "Add contact details",
  "Verify otp",
  "Update password",
];

const Register: FC<RegisterProps> = (props) => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [userDetails, setUserDetails] = React.useState<UserDetailsInterface>({
    company_name: "",
    email: "",
    address: "",
    state: "",
    district: "",
    pincode: "",
    mobile: "",
    whatsapp: undefined,
    gst: undefined,
    pan: "",
    fssai: "",
    tan: "",
    constitution_of_firm: "",
  });

  const [userBankDetails, setUserBankDetails] = React.useState<
    UserBankDetailsInterface[]
  >([
    {
      id: 1,
      account_name: "",
      account_number: "",
      account_type: "",
      bank_name: "",
      branch: "",
      ifsc: "",
    },
  ]);

  const [userContactDetails, setUserContactDetails] = React.useState<
    UserContactDetailsInterface[]
  >([
    {
      id: 1,
      full_name: "",
      designation: "",
      mobile: "",
      whatsapp: "",
      email: "",
    },
  ]);

  const [userOtpVerified, setUserOtpVerified] = React.useState<boolean>(false);

  const [userPasswordDetails, setUserPasswordDetails] =
    React.useState<UserPasswordDetailsInterface>({
      password: "",
      confirmPassword: "",
    });

  React.useEffect(() => {
    setUserOtpVerified(false);
  }, [userDetails.email]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 0) {
      navigate("/auth");
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const getActiveSliderComponent = () => {
    switch (activeStep) {
      case 0:
        return (
          <UserDetails
            userDetails={userDetails}
            setUserDetails={setUserDetails}
          />
        );
      case 1:
        return (
          <BankDetails
            userBankDetails={userBankDetails}
            setUserBankDetails={setUserBankDetails}
          />
        );
      case 2:
        return (
          <ContactDetails
            userContactDetails={userContactDetails}
            setUserContactDetails={setUserContactDetails}
          />
        );
      case 3:
        return (
          <VerifyOtp
            userOtpVerified={userOtpVerified}
            setUserOtpVerified={setUserOtpVerified}
          />
        );
      case 4:
        return (
          <UpdatePassword
            userPasswordDetails={userPasswordDetails}
            setUserPasswordDetails={setUserPasswordDetails}
          />
        );
      default:
        return (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography sx={{ mt: 2, mb: 1, textAlign: "center" }} variant="h1">
              🎉 🎉
            </Typography>
            <Typography sx={{ mt: 2, mb: 1, textAlign: "center" }} variant="h6">
              You have successfully filled the required data for registration.
            </Typography>
            <Typography sx={{ mb: 1, textAlign: "center" }} variant="h6">
              Please click on submit to register yourself.
            </Typography>
          </Box>
        );
    }
  };
  return (
    <Box
      gap={2}
      sx={{
        width: "100%",
        height: "100%",
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CssBaseline />
      <Typography
        variant="h4"
        sx={{
          color: "white",
          width: "100%",
          textAlign: "center",
          fontWeight: "700",
          borderBottom: "1px solid grey",
          py: 2,
          mb: 1,
        }}
      >
        <LockOutlined /> Registration form
      </Typography>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step
              key={label}
              {...stepProps}
              sx={{
                color: "green",
              }}
            >
              <StepLabel {...labelProps} color="green">
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Box
        sx={{
          height: "100%",
          width: "100%",
        }}
      >
        {getActiveSliderComponent()}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          px: 4,
        }}
      >
        <Button
          color="red"
          variant="outlined"
          onClick={handleBack}
          sx={{ mr: 1 }}
          startIcon={<ArrowBack />}
        >
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        {activeStep === steps.length ? (
          <Button
            onClick={handleReset}
            variant="contained"
            color="green"
            endIcon={<Done />}
          >
            Submit
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleNext}
            endIcon={<ArrowForward />}
          >
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Register;
