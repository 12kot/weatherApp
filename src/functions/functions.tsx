import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";

type ProtectedProps = {
  isError: boolean;
  path: string;
  children: ReactElement;
};

const Protected: React.FC<ProtectedProps> = ({
  isError,
  path,
  children,
}): ReactElement => {
  if (!isError) return <Navigate to={path} />;

  return children;
};

export default Protected;