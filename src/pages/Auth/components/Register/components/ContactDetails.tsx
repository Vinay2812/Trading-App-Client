import { FC } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  TextField,
  Stack,
  Avatar,
  IconButton,
} from "@mui/material";
import { Add, DeleteForeverOutlined, LockOutlined } from "@mui/icons-material";
import { addSingleDetail, deleteSingleDetail } from "../helpers";
import { useColors } from "../../../../../hooks/use-colors";
import { UserContactDetailsType } from "../../../../../hooks/api-hooks/user/user";

interface ContactDetailsProps {
  userContactDetails: UserContactDetailsType[];
  setUserContactDetails: Function;
  isEditable?: boolean;
}

interface ContactDetailsCardProps {
  userContactDetail: UserContactDetailsType;
  setUserContactDetails: Function;
  handleDeleteContactDetail: Function;
  isEditable: boolean;
}

const ContactDetailsCard: FC<ContactDetailsCardProps> = (props) => {
  const {
    userContactDetail,
    setUserContactDetails,
    handleDeleteContactDetail,
    isEditable,
  } = props;

  const handleContactDetailChange = (e: any) => {
    setUserContactDetails((prev: UserContactDetailsType[]) => {
      const newContactDetails = prev.map((contactDetail) => {
        if (contactDetail.id === userContactDetail.id) {
          return { ...contactDetail, [e.target.name]: e.target.value };
        }
        return contactDetail;
      });
      return newContactDetails;
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        px: 4,
        // py: 2,
      }}
      gap={4}
    >
      <Typography
        variant="h6"
        component="h6"
        sx={{
          pl: 1,
          mb: !isEditable ? 2 : 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        Contact Detail {userContactDetail.id}
        {isEditable && (
          <IconButton
            sx={{
              color: "tomato",
            }}
            onClick={() => handleDeleteContactDetail(userContactDetail.id)}
          >
            <DeleteForeverOutlined />
          </IconButton>
        )}
      </Typography>
      <Grid container spacing={3} width={"100%"}>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            disabled={!isEditable}
            fullWidth
            name="full_name"
            value={userContactDetail.full_name}
            label="Full Name"
            onChange={handleContactDetailChange}
            required
            autoFocus
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            disabled={!isEditable}
            fullWidth
            name="designation"
            value={userContactDetail.designation}
            label="Designation"
            onChange={handleContactDetailChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            disabled={!isEditable}
            fullWidth
            name="mobile"
            value={userContactDetail.mobile ?? ""}
            label="Mobile Number"
            required
            onChange={handleContactDetailChange}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            disabled={!isEditable}
            fullWidth
            name="email"
            value={userContactDetail.email}
            label="Email"
            required
            onChange={handleContactDetailChange}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            disabled={!isEditable}
            fullWidth
            name="whatsapp"
            value={userContactDetail.whatsapp}
            label="Whatsapp Number"
            onChange={handleContactDetailChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

const ContactDetails: FC<ContactDetailsProps> = (props) => {
  const { isEditable = true } = props;
  const handleDeleteContactDetail = (contactDetailId: number) => {
    deleteSingleDetail(
      contactDetailId,
      props.setUserContactDetails,
      props.userContactDetails.length
    );
  };

  const handleAddContactDetail = () => {
    const len = props.userContactDetails.length;
    const newContactDetails: UserContactDetailsType = {
      id: (len + 1).toString(),
      full_name: "",
      mobile: "",
      whatsapp: "",
      email: "",
      designation: "",
    };
    addSingleDetail(len, newContactDetails, props.setUserContactDetails);
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
        bgcolor: colors.card,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {props.isEditable && (
          <Avatar sx={{ m: 1, mt: 0, bgcolor: "green.main" }}>
            <LockOutlined />
          </Avatar>
        )}
        <Typography component="h1" variant="h5">
          Contact Details
        </Typography>
      </Box>
      <Stack gap={3} width="100%">
        {props.userContactDetails.map((userContactDetail, idx) => (
          <ContactDetailsCard
            key={userContactDetail.id}
            userContactDetail={{ ...userContactDetail, id: String(idx + 1) }}
            setUserContactDetails={props.setUserContactDetails}
            handleDeleteContactDetail={handleDeleteContactDetail}
            isEditable={isEditable}
          />
        ))}
      </Stack>
      {isEditable && (
        <Box
          width="100%"
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            px: 6,
            pt: 2,
          }}
        >
          <Button
            variant="contained"
            color="blue"
            onClick={handleAddContactDetail}
          >
            <Add /> Contact Detail
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ContactDetails;
