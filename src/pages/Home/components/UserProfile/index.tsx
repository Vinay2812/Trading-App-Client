import { FC, useMemo } from "react";
import { Sidebar } from "../../../Admin/components";
import HeaderCard from "../../../../components/Cards/HeaderCard";
import Card from "../../../../components/Cards/Card";
import { useUserProfile } from "../../../../hooks/api-hooks/user/use-user-profile";
import { useAppSelector } from "../../../../hooks/redux";
import BankDetails from "../../../Auth/components/Register/components/BankDetails";
import TextLoader from "../../../../components/TextLoader/TextLoader";
import { Divider } from "@mui/material";
import ContactDetails from "../../../Auth/components/Register/components/ContactDetails";
import UserDetails from "../../../Auth/components/Register/components/UserDetails";

interface UserProfileProps {}

const UserProfile: FC<UserProfileProps> = (props) => {
  const userId = useAppSelector((state) => state.user.userId);
  const userProfile = useUserProfile(userId!);

  const { loading, loadingText } = useMemo(() => {
    let loadingText = "loading";
    return {
      loading: userProfile.isLoading,
      loadingText,
    };
  }, [userProfile.isLoading]);

  if (!userProfile.data?.value) {
    return <div>NA</div>;
  }

  return (
    <Sidebar active="Profile">
      <HeaderCard title="Profile" subtitle="Welcome to your profile section." />
      <Card
        sx={{
          height: "calc(100% - 90px)",
          mt: 2,
          overflowY: "scroll",
        }}
      >
        <TextLoader loading={loading} loadingText={loadingText} />
        <UserDetails
          userDetails={userProfile.data.value.userInfo}
          setUserDetails={() => {}}
          isEditable={false}
        />
        <Divider sx={{mt: 2}}/>
        <BankDetails
          userBankDetails={userProfile.data.value.bankInfo}
          setUserBankDetails={() => {}}
          isEditable={false}
        />
        <Divider sx={{mt: 2}}/>
        <ContactDetails
          userContactDetails={userProfile.data.value.contactInfo}
          setUserContactDetails={() => {}}
          isEditable={false}
        />
        {/* <Divider />
        <Box
          sx={{
            p: 2,
          }}
        >
          <Button variant="contained">Update</Button>
        </Box> */}
      </Card>
    </Sidebar>
  );
};

export default UserProfile;
