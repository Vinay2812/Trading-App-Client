import { FC, useMemo } from "react";
import { Sidebar } from "../../../Admin/components";
import HeaderCard from "../../../../components/Cards/HeaderCard";
import Card from "../../../../components/Cards/Card";
import { useUserProfile } from "../../../../hooks/api-hooks/user/use-user-profile";
import { useAppSelector } from "../../../../hooks/redux";
import BankDetails from "../../../Auth/components/Register/components/BankDetails";
import TextLoader from "../../../../components/TextLoader/TextLoader";

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

  return (
    <Sidebar active="Profile">
      <HeaderCard title="Profile" subtitle="Welcome to your profile section." />
      <Card
        sx={{
          height: "calc(100% - 90px)",
          mt: 2,
        }}
      >
        <TextLoader loading={loading} loadingText={loadingText} />
      </Card>
    </Sidebar>
  );
};

export default UserProfile;
