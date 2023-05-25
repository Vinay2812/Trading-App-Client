import { useAppSelector } from "../../hooks/redux";
import Admin from "../../pages/Admin";
import Auth from "../../pages/Auth";

export const AuthenticateUserRoute = ({
  children,
}: {
  children: React.JSX.Element;
}) => {
  const isAdmin = useAppSelector((state) => state.admin.isAdmin);
  const isUser = useAppSelector((state) => state.user.email);
  if (isAdmin) {
    return <Admin />;
  }
  if (isUser) {
    return children;
  }
  return <Auth />;
};
