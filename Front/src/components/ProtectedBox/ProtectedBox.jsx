import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Context/Conex";

function ProtectedBox({ children, adminOnly = false }) {
  const { isAuth, isAdmin } = useContext(AuthContext);

  if (isAuth === null) {
    return <p className="text-center mt-10 text-gray-300">Loading...</p>;
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
