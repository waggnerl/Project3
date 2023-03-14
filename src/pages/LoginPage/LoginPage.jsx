import "./LoginPage.css";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";
import backgroundImage from "../../assets/gym.jpg";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    // Send a request to the server using axios
    /* 
    axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`)
      .then((response) => {})
    */

    // Or using a service
    authService
      .login(requestBody)
      .then((response) => {
        // If the POST request is successful store the authentication token,
        // after the token is stored authenticate the user
        // and at last navigate to the home page
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })

      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="bg-cover bg-center bg-no-repeat min-h-screen  bg-gray-100 flex flex-col justify-center sm:py-12"
    >
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <form onSubmit={handleLoginSubmit} className="px-5 py-7">
            <h1 className="font-bold text-center text-2xl mb-5">Login</h1>
            <label className="font-semibold text-sm text-left text-gray-600 pb-1 block">
              E-mail
            </label>
            <input
              type="email"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              placeholder="E-mail"
              value={email}
              onChange={handleEmail}
            />
            <label className="font-semibold text-sm text-left text-gray-600 pb-1 block">
              Password
            </label>
            <input
              type="password"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              placeholder="Password"
              value={password}
              onChange={handlePassword}
            />
            <button
              type="submit"
              className="transition duration-200 bg-white hover:bg-black focus:bg-blue-700 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 rounded-lg hover:text-white border-2 w-full py-2 text-sm"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
