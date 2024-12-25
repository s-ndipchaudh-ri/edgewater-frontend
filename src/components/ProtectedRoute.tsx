import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store";

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  if (!isLoggedIn) {
    // Redirect unauthenticated users to the login page
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
