import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Auth = ({ children }) => {
  const { user } = useSelector((state) => state.userReducer);
  
  return !user ? <Navigate to="/login" replace /> : children;
};

export default Auth;