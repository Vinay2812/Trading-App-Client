import { useAppSelector } from "../../hooks/redux";
import Admin from "../../pages/Admin";

export const AuthenticateAuthRoute = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const isAdmin = useAppSelector((state) => state.admin.isAdmin);
  const isUser = useAppSelector((state) => state.user.email);
  if (isAdmin) {
    return <Admin />;
  }
  if (isUser) {
    return <div>Home</div>;
  }
  return children;
};
