import React, { useContext } from "react";
import { User } from "../store/Context";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
  const {
    state: { user },
  } = useContext(User);
  const auth = Object.keys(user).length ? true : false;
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouter;
