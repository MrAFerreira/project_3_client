import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";
import { Navigate } from "react-router-dom";

function Private({ children }) {
  const { loading, user } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}

export default Private;
