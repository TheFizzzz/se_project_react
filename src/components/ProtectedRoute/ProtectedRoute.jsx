import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, isAuthLoading, children }) {
  if (isAuthLoading) return null;
  return isLoggedIn ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;
