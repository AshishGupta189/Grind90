import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../config/axiosConfig"; 

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null); // null = loading

  useEffect(() => {
    axiosInstance
      .get("/auth/me")
      .then(() => setIsAuth(true))
      .catch(() => setIsAuth(false));
  }, []);

  if (isAuth === null) {
    return <div className="text-white p-4">Checking authentication...</div>;
  }

  if (!isAuth) {
    console.log("Not authenticated");
    
    return <Navigate to="/signup" replace />;
  }

  return children;
};

export default ProtectedRoute;
