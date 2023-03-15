import "./Navbar.css";
import { Link} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav class="flex items-right justify-between flex-wrap bg-black-500 p-2">
      <div class="flex items-right flex-shrink-0 text-black mr-6">
        <svg
          class="fill-current h-8 w-8 mr-2"
          width="54"
          height="54"
          viewBox="0 0 54 54"
        >
          <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
        </svg>
        <span class="font-semibold text-xl tracking-tight">Train Smart</span>
      </div>
      <div class="block lg:hidden">
        <button class="flex items-right px-3 py-2 border rounded text-black-200 border-black-400 hover:text-white hover:border-white">
          <svg
            class="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Link>
              <button>Home</button>
            </Link>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div class="w-full block flex-grow lg:flex lg:items-right lg:w-auto">
        <div class="text-sm lg:flex-grow">
          <Link to="/">
            <button class="block mt-4 lg:inline-block lg:mt-0 text-black-200 hover:text-slate-400 mr-4">
              Home
            </button>
          </Link>
          {isLoggedIn && (
            <>
              <button class="block mt-4 lg:inline-block lg:mt-0 text-black-200 hover:text-slate-400 mr-4" onClick={logOutUser}>Logout</button>

              <Link to={`/profile/${user._id}`}>
                <button class="block mt-4 lg:inline-block lg:mt-0 text-black-200 hover:text-slate-400 mr-4">
                  Profile
                </button>
              </Link>
              
            </>
          )}
          {!isLoggedIn && (
            <>
              <Link to="/signup">
                <button class="block mt-4 lg:inline-block lg:mt-0 text-black-200 hover:text-slate-400">
                  Sign-Up
                </button>{" "}
              </Link>
              <Link to="/login">
                <button class="block mt-4 lg:inline-block lg:mt-0 text-black-200 hover:text-slate-400">
                  Log-In
                </button>{" "}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
