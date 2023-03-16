import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate } from "react-router-dom";
import Loading from "../Loading/Loading";

function IsAnon({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  // If the authentication is still loading ⏳
  if (isLoading) {
    return <Loading />;
  }

  if (isLoggedIn && user.role === "personal") {
    // If the user is logged in, navigate to home page ❌
    return <Navigate to="/list-students" />;
  }

  if (isLoggedIn && user.role === "student") {
    // If the user is logged in, navigate to home page ❌
    return <Navigate to={`/trains/${user._id}`} />;
  }

  // If the user is not logged in, allow to see the page ✅
  return children;
}

export default IsAnon;
