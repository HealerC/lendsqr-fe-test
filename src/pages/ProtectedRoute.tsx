import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/context";

type Props = { children: React.ReactNode };

/*
 * Prevent usage of the app if user is not logged in
 * Go back to landing page with the login form.
 */
export default function ProtectedRoute({ children }: Props) {
  const { loggedIn } = useAppContext();
  if (!loggedIn) {
    return <Navigate to="/landing" />;
  }
  return <>{children}</>;
}
