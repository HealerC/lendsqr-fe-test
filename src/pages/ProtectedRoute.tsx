import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/context";

type Props = { children: React.ReactNode };
export default function ProtectedRoute({ children }: Props) {
  const { loggedIn } = useAppContext();
  if (!loggedIn) {
    return <Navigate to="/landing" />;
  }
  return <>{children}</>;
}
