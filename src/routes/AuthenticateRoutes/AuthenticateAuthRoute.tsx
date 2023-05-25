import { useAppSelector } from "../../hooks/redux";
import Admin from "../../pages/Admin";
import Home from "../../pages/Home";

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
    return <Home />;
  }
  return children;
};
