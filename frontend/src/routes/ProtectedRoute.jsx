import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isAuthenticated, authChecked } = useSelector((state) => state.user);
  if (!authChecked) return null;
  return isAuthenticated ? children : <Navigate to="/" replace />;
}
export default ProtectedRoute;
