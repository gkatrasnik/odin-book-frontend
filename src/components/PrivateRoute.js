import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useContext(UserContext);

  return user ? <Outlet /> : <Navigate to="/login" />;
}
