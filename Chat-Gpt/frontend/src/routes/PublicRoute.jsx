import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../config/axiosConfig";

const PublicRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/auth/me")
      .then(() => setIsAuth(true))
      .catch(() => setIsAuth(false));
  }, []);

  if (isAuth === null) return null;

  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
