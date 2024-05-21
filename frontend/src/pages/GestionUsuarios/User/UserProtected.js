import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

export function UserProtected({ children, requiredRole }) {
  const { user, userRole } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (userRole === "inhabilitado") {
    return <Navigate to="/usuario-inhabilitado" replace />;
  }

  return children;
}
