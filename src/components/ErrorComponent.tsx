import { FC } from "react";

interface ErrorComponentProps {
  children: React.ReactNode;
}

const ErrorComponent: FC<ErrorComponentProps> = (props) => {
  return <div>{props.children}</div>;
};

export default ErrorComponent;
