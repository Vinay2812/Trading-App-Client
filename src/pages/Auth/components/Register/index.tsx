import { FC } from "react";
import * as React from "react";
import {
  ArrowBack,
  ArrowForward,
  Done,
  Home,
  LockOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Step,
  StepLabel,
  Stepper,
  Tooltip,
  Typography,
} from "@mui/material";
import UserDetails from "./components/UserDetails";
import { useNavigate } from "react-router-dom";
import {
  validateUserBankDetails,
  validateUserContactDetails,
  validateUserDetails,
  validateUserPasswordDetails,
} from "./helpers/validator";
import { useColors } from "../../../../hooks/use-colors";
import {
  RegisterUserRequest,
  useRegisterUser,
} from "../../../../hooks/api-hooks/auth/use-register-user";
import {
  UserBankDetailsType,
  UserContactDetailsType,
  UserDataType,
  UserPasswordDetailsType,
} from "../../../../types/user";
import { useSendOtp } from "../../../../hooks/api-hooks/auth/use-send-otp";
import { useCustomToast } from "../../../../hooks/use-custom-toast";

const BankDetails = React.lazy(() => import("./components/BankDetails"));
const ContactDetails = React.lazy(() => import("./components/ContactDetails"));
const UserOtpVerification = React.lazy(
  () => import("./components/UserOtpVerification")
);
const UserPassword = React.lazy(() => import("./components/UserPassword"));

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
  const colors = useColors();
  const { success, fail } = useCustomToast();
  const [activeStep, setActiveStep] = React.useState(0);

  const [userDetails, setUserDetails] = React.useState<UserDataType>({
    company_name: "",
    email: "",
    address: "",
    state: "",
    district: "",
    pincode: "" as any,
    mobile: "",
    whatsapp: null,
    gst: null,
    pan: "",
    fssai: "",
    tan: "",
    constitution_of_firm: "",
    password: "",
    userId: null,
    accoid: null,
  });

  const [userBankDetails, setUserBankDetails] = React.useState<
    UserBankDetailsType[]
  >(() => [
    {
      id: "1",
      account_name: "",
      account_number: "" as any,
      account_type: "",
      bank_name: "",
      branch: "",
      ifsc: "",
    },
  ]);

  const [userContactDetails, setUserContactDetails] = React.useState<
    UserContactDetailsType[]
  >([
    {
      id: "1",
      full_name: "",
      designation: "",
      mobile: "",
      whatsapp: "",
      email: "",
    },
  ]);

  const [userOtpVerified, setUserOtpVerified] = React.useState<boolean>(false);
  const [otpSent, setOtpSent] = React.useState<boolean>(false);
  const sendOtpMutation = useSendOtp();

  React.useEffect(() => {
    if (!userOtpVerified && activeStep === 3 && !otpSent) {
      userDetails.email.length &&
        sendOtpMutation.mutate({ email: userDetails.email });
      setOtpSent(true);
    }
  }, [activeStep]);

  const [userPasswordDetails, setUserPasswordDetails] =
    React.useState<UserPasswordDetailsType>({
      password: "",
      confirmPassword: "",
    });

  // ********** API CALLS ********** //
  const registeUserMutation = useRegisterUser();

  const validateForm: any = (currentStep: number) => {
    switch (currentStep) {
      case 0:
        return validateUserDetails(userDetails as any);
      case 1:
        return validateUserBankDetails(userBankDetails as any);
      case 2:
        return validateUserContactDetails(userContactDetails as any);
      case 3:
        return {
          value: null,
          error: userOtpVerified ? null : ["Please verify the otp"],
        };
      case 4:
        return validateUserPasswordDetails(userPasswordDetails);
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
            isSendingOtp={sendOtpMutation.isLoading}
            userOtpSent={sendOtpMutation.isSuccess}
            email={userDetails.email}
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

  React.useEffect(() => {
    setUserOtpVerified(false);
    setOtpSent(false);
  }, [userDetails.email]);

  const handleBack = () => {
    if (activeStep === 0) {
      navigate("/auth");
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    const { value, error } = validateForm(activeStep);
    if (error) {
      error.length && fail(error[0]);
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  async function handleRegisterUser() {
    const reqObj: RegisterUserRequest = {
      userData: {
        ...userDetails,
        password: userPasswordDetails.password,
        whatsapp: userDetails.whatsapp?.length ? userDetails.whatsapp : null,
        gst: userDetails.gst?.length ? userDetails.gst : null,
      },
      bankData: userBankDetails,
      contactData: [
        ...userContactDetails.map((item) => ({
          ...item,
          whatsapp: item.whatsapp?.length ? item.whatsapp : null,
        })),
      ],
    };
    registeUserMutation.mutate(reqObj);
  }

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
          bgcolor: colors.card,
        }}
      >
        <Tooltip title="Go to home">
          <IconButton
            size="large"
            sx={{ position: "absolute", left: 2, fontSize: 20 }}
            onClick={() => navigate("/auth")}
            content="home"
            color="red"
          >
            <Avatar sx={{ bgcolor: colors.red[500] }}>
              <Home
                sx={{
                  fontSize: "28px",
                }}
              />
            </Avatar>
          </IconButton>
        </Tooltip>

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
              <StepLabel
                onClick={() => index <= activeStep && setActiveStep(index)}
                {...labelProps}
              >
                {label}
              </StepLabel>
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
          mt: 4,
          p: 2,
          bgcolor: colors.card,
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
