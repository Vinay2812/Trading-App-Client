import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface RedirectProviderProps {
  children: any;
}

const RedirectProvider: FC<RedirectProviderProps> = (props) => {
  const { children } = props;
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/auth")
  },[]);
  return children;
};

export default RedirectProvider;
