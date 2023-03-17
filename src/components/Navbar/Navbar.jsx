import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import TrainSmart from "../../assets/trainsmart.png";
function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <div className="navbar  bg-white ">
      <Link to={isLoggedIn ? "/list-students " : "/"} className="flex-1 p-3">
        <img className="w-6" alt="logo" src={TrainSmart} />
        <p className="text-xs sm:text-base">Train Smart</p>
      </Link>
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
              <button className="text-xs sm:text-base">Home</button>
            </Link>
          </li>

          {!isLoggedIn && (
            <>
              <li>
                <Link to="/signup" className="flex  items-center">
                  <button class="block lg:inline-block text-xs sm:text-base text-black-200 hover:text-slate-400">
                    Sign-Up
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/login" className="flex  items-center">
                  <button class="block text-xs sm:text-base lg:inline-block text-black-200 hover:text-slate-400">
                    Log-In
                  </button>
                </Link>
              </li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li>
                <Link to={`/profile/${user._id}`}>
                  <button className="text-xs sm:text-base">Profile</button>
                </Link>
              </li>
              <li>
                <button className="text-xs sm:text-base" onClick={logOutUser}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
