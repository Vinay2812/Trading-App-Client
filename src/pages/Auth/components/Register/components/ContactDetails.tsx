import { FC } from "react";
import { UserContactDetailsInterface } from "../../../types/register";
import {
  Box,
  Button,
  CssBaseline,
  Typography,
  Grid,
  TextField,
  Stack,
  Container,
  Avatar,
} from "@mui/material";
import { Add, DeleteForeverOutlined, LockOutlined } from "@mui/icons-material";

interface ContactDetailsProps {
  userContactDetails: UserContactDetailsInterface[];
  setUserContactDetails: Function;
}

interface ContactDetailsCardProps {
  userContactDetail: UserContactDetailsInterface;
  setUserContactDetails: Function;
}

const ContactDetailsCard: FC<ContactDetailsCardProps> = (props) => {
  const { userContactDetail } = props;
  return (
    <Box
      sx={{
        width: "100%",
        boxShadow: "0px 2px 5px 5px rgba(0,0,0,0.35)",
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
          pl: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        Contact Detail {userContactDetail.id}
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
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            fullWidth
            name="full_name"
            value={userContactDetail.full_name}
            label="Full Name"
            required
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            fullWidth
            name="designation"
            value={userContactDetail.designation}
            label="Designation"
            required
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            fullWidth
            name="mobile"
            value={userContactDetail.mobile}
            label="Mobile Number"
            required
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            fullWidth
            name="email"
            value={userContactDetail.email}
            label="Email"
            required
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            fullWidth
            name="whatsapp"
            value={userContactDetail.whatsapp}
            label="Whatsapp Number"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

const ContactDetails: FC<ContactDetailsProps> = (props) => {
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
        Please fill atleast one contact detail
      </Typography>
      <Box
        sx={{
          mt: 1,
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        gap={2}
      >
        <Stack sx={{ width: "100%" }}>
          {props.userContactDetails.map((userContactDetail) => (
            <ContactDetailsCard
              key={userContactDetail.id}
              userContactDetail={userContactDetail}
              setUserContactDetails={props.setUserContactDetails}
            />
          ))}
        </Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            py: 2
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

export default ContactDetails;
