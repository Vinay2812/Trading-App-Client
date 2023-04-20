import { FC } from "react";
import * as React from "react";
import {
  ArrowBack,
  ArrowCircleLeftOutlined,
  ArrowCircleRightOutlined,
  ArrowForward,
  ArrowLeft,
  Done,
  Home,
  HomeMaxOutlined,
  HomeOutlined,
  LockOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  IconButton,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import UserDetails from "./components/UserDetails";
const BankDetails = React.lazy(() => import("./components/BankDetails"));
const ContactDetails = React.lazy(() => import("./components/ContactDetails"));
const UserOtpVerification = React.lazy(
  () => import("./components/UserOtpVerification")
);
const UserPassword = React.lazy(() => import("./components/UserPassword"));
import {
  UserBankDetailsInterface,
  UserContactDetailsInterface,
  UserDetailsInterface,
  UserPasswordDetailsInterface,
} from "../../types/register";
import { useNavigate } from "react-router-dom";
import { RegisterUserRequest } from "../../../../api/auth/request";
import { handleApiAsync } from "../../../../utils/handleAsync";
import { registerUser } from "../../../../api/auth/auth.request";
import {
  validateUserBankDetails,
  validateUserContactDetails,
  validateUserDetails,
  validateUserPasswordDetails,
} from "./helpers/validator";
import { useColors } from "../../../../hooks/useColors";

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
    password: "",
  });

  const [userBankDetails, setUserBankDetails] = React.useState<
    UserBankDetailsInterface[]
  >(() => [
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

  const handleBack = () => {
    if (activeStep === 0) {
      navigate("/auth");
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const validateForm: any = (currentStep: number) => {
    switch (currentStep) {
      case 0:
        return validateUserDetails(userDetails);
      case 1:
        return validateUserBankDetails(userBankDetails);
      case 2:
        return validateUserContactDetails(userContactDetails);
      case 3:
        return {
          value: null,
          error: userOtpVerified ? null : "OTP not verified",
        };
      case 4:
        return validateUserPasswordDetails(userPasswordDetails);
    }
  };

  const handleNext = () => {
    const { value, error } = validateForm(activeStep);
    if (error) {
      // return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleRegisterUser = async () => {
    const reqObj: RegisterUserRequest = {
      userData: { ...userDetails, password: userPasswordDetails.password },
      bankData: userBankDetails,
      contactData: userContactDetails,
    };

    const { value, error, status, message } = await handleApiAsync(
      registerUser(reqObj)
    );

    if (status === "error") {
      alert(error);
    } else {
      console.log(value);
    }
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
          <UserOtpVerification
            userOtpVerified={userOtpVerified}
            setUserOtpVerified={setUserOtpVerified}
          />
        );
      case 4:
        return (
          <UserPassword
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
            <Button
              onClick={handleRegisterUser}
              variant="contained"
              color="green"
              endIcon={<Done />}
            >
              Submit
            </Button>
          </Box>
        );
    }
  };
  const colors = useColors();
  return (
    <Box
      gap={2}
      sx={{
        width: "100%",
        height: "100vh",
        // px: 2,
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          bgcolor: colors.sidebarAccent,
        }}
      >
        <IconButton
          size="large"
          sx={{ position: "absolute", left: 2, fontSize: 20 }}
          onClick={() => navigate("/auth")}
          content="home"
        >
          <Avatar sx={{ bgcolor: colors.red[300] }}>
            <Home
              sx={{
                fontSize: 28,
                // p: 2
              }}
            />
          </Avatar>
        </IconButton>
        <Typography
          variant="h4"
          sx={{
            color: "white",
            textAlign: "center",
            fontWeight: "700",
            py: 3,
            px: 2,
            mb: 1,
          }}
        >
          <LockOutlined /> Registration form
        </Typography>
      </Box>
      <Stepper activeStep={activeStep} sx={{ py: 3 }}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Box
        sx={{
          // height: "100%",
          width: "100%",
        }}
      >
        {getActiveSliderComponent()}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p:2,
          bgcolor: colors.cardAccent
        }}
        gap={2}
      >
        <Button
          disabled={activeStep === 0}
          variant="outlined"
          onClick={handleBack}
          startIcon={<ArrowBack />}
        >
          Prev
        </Button>
        <Button
          disabled={activeStep === steps.length}
          onClick={handleNext}
          variant="contained"
          endIcon={<ArrowForward />}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
