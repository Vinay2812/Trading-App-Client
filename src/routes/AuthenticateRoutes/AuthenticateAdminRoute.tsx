import { useAppSelector } from "../../hooks/redux";
import Auth from "../../pages/Auth";

export const AuthenticateAdminRoute = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const isAdmin = useAppSelector((state) => state.admin.isAdmin);
  const isUser = useAppSelector((state) => state.user.email);

  if (isAdmin) {
    return children;
  }
  if (isUser) {
    return <div>Home</div>;
  }
  return <Auth />;
};
