import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const GuestRoute = ({ children }) => {
  const { isAuthenticated, authChecked } = useSelector((state) => state.user);
  if (!authChecked) return null;
  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

export default GuestRoute;
