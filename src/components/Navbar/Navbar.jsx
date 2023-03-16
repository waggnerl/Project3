import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <div className="navbar bg-base-100 bg-white ">
      <div className="flex-1">
        <a>Train Smart</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link
              to={
                user && user.role === "personal"
                  ? "/list-students"
                  : user && `/trains/${user._id}`
              }
            >
              <button>Home</button>
            </Link>
          </li>

          {!isLoggedIn && (
            <>
              <li>
                <Link to="/signup" className="flex  items-center">
                  <button class="block lg:inline-block text-black-200 hover:text-slate-400">
                    Sign-Up
                  </button>{" "}
                </Link>
              </li>
              <li>
                <Link to="/login" className="flex  items-center">
                  <button class="block lg:inline-block text-black-200 hover:text-slate-400">
                    Log-In
                  </button>{" "}
                </Link>
              </li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li>
                <button onClick={logOutUser}>Logout</button>
              </li>
              <li>
                <Link to={`/profile/${user._id}`}>
                  <button>Profile</button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
