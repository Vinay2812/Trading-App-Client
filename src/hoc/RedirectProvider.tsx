import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface RedirectProviderProps {
  children: any;
}

const RedirectProvider: FC<RedirectProviderProps> = (props) => {
  const { children } = props;
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/todos/admin");
  }, []);

  // useEffect(() => {
  //   window.onbeforeunload = () => {
  //     return "Are you sure you want to leave this page?"
  //   }
  // },[window.onbeforeunload])
  return children;
};

export default RedirectProvider;
