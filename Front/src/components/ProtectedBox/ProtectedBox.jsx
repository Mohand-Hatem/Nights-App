import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Context/Conex";
import PageLoader from "../common/PageLoader";

function ProtectedBox({ children, adminOnly = false }) {
  const { isAuth, isAdmin, isLoading } = useContext(AuthContext);

  if (isLoading || isAuth === null) {
    return <PageLoader />;
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

export default ProtectedBox;
