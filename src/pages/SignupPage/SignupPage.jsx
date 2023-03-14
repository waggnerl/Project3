import "./SignupPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import backgroundImage from "../../assets/gym.jpg";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleRole = (e) => setRole(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name, role };

    // Send a request to the server using axios
    /* 
    const authToken = localStorage.getItem("authToken");
    axios.post(
      `${process.env.REACT_APP_SERVER_URL}/auth/signup`, 
      requestBody, 
      { headers: { Authorization: `Bearer ${authToken}` },
    })
    .then((response) => {})
    */

    // Or using a service
    authService
      .signup(requestBody)
      .then((response) => {
        // If the POST request is successful redirect to the login page
        navigate("/login");
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
      className="bg-cover bg-center bg-no-repeat min-h-screen bg-gray-100  flex flex-col justify-center sm:py-12"
    >
      <div className="p-5 xs:p-0 mx-auto drop-shadow md:w-full md:max-w-md">
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <form onSubmit={handleSignupSubmit} className="px-5 py-7">
            <h1 className="font-bold text-center text-2xl mb-5">Sign up</h1>
            <label className="font-semibold text-left text-sm text-gray-600 pb-1 block">
              Name
            </label>
            <input
              type="text"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              placeholder="Name"
              value={name}
              onChange={handleName}
            />
            <label className="font-semibold text-left text-sm text-gray-600 pb-1 block">
              E-mail
            </label>
            <input
              type="email"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              placeholder="E-mail"
              value={email}
              onChange={handleEmail}
            />
            <label className="font-semibold text-left text-sm text-gray-600 pb-1 block">
              Password
            </label>
            <input
              type="password"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text -sm w-full"
              placeholder="Password"
              value={password}
              onChange={handlePassword}
            />
            <label className="font-semibold text-left text-sm text-gray-600 pb-1 block">
              Role
            </label>
            <select
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              defaultValue=""
              onChange={handleRole}
            >
              <option value="" disabled>
                Choose a role
              </option>
              <option value="personal">Personal Trainer</option>
              <option value="student">Student</option>
            </select>
            <button
              type="submit"
              className="transition border-2 duration-200 bg-white hover:bg-black focus:bg-white-700 focus:ring-2 focus:ring-white-600 focus:ring-opacity-50 rounded-lg hover:text-white w-full py-2 text-sm"
            >
              Sign up
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <p>Already have account?</p>
            <Link to={"/login"}> Login</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
