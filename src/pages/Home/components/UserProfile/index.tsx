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
import { useParams } from "react-router-dom";

interface UserProfileProps {}

const UserProfile: FC<UserProfileProps> = (props) => {
  const userId = useParams().userId;
  const userProfile = useUserProfile(userId!);

  const { loading, loadingText } = useMemo(() => {
    let loadingText = "loading";
    return {
      loading: userProfile.isLoading,
      loadingText,
    };
  }, [userProfile.isLoading]);

  if (!userProfile.data?.value) {
    return <TextLoader loading={loading} loadingText={loadingText} />;
  }

  return (
    <Sidebar active="Profile">
      <HeaderCard title="Profile" subtitle="Welcome to your profile section." />
      <TextLoader loading={loading} loadingText={loadingText} />
      <Card
        sx={{
          height: "calc(100% - 90px)",
          mt: 2,
          overflowY: "scroll",
        }}
      >
        <UserDetails
          userDetails={userProfile.data.value.userInfo}
          setUserDetails={() => {}}
          isEditable={false}
        />
        <Divider sx={{ mt: 2 }} />
        <BankDetails
          userBankDetails={userProfile.data.value.bankInfo}
          setUserBankDetails={() => {}}
          isEditable={false}
        />
        <Divider sx={{ mt: 2 }} />
        <ContactDetails
          userContactDetails={userProfile.data.value.contactInfo}
          setUserContactDetails={() => {}}
          isEditable={false}
        />
      </Card>
    </Sidebar>
  );
};

export default UserProfile;
