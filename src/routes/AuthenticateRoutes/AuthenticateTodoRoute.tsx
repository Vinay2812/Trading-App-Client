import { useParams } from "react-router-dom";
import Auth from "../../pages/Auth";

export const AuthenticateTodoRoute = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const params = useParams();
  const userId = params.userId;

  if (userId === "admin") {
    return children;
  }
  return <Auth />;
};
