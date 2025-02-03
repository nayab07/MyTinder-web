import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // For signup mode
  const [firstName, setFirstName] = useState(""); // For signup mode
  const [lastName, setLastName] = useState(""); // For signup mode
  const [Error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false); // Toggle between login and signup

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, Password },
        { withCredentials: true }
      );
      
      dispatch(addUser(res.data));
      navigate('/feed');
    } catch (err) {
      setError(err?.response?.data || "Login failed. Please try again.");
    }
  };

  // Handle Signup
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (Password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, Password },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      setIsSignup(false); // After successful signup, switch back to login
      setError("Signup successful! Please log in.");
    } catch (err) {
      setError(err?.response?.data || "Signup failed. Please try again.");
    }
  };

  // Toggle between login and signup form
  const toggleForm = () => {
    setIsSignup((prev) => !prev);
    setError(""); // Clear any error when switching between forms
  };

  return (
    <div className="flex justify-center mt-2 px-4 sm:px-0">
      <div className="w-full max-w-sm bg-base-300 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          {isSignup ? "Sign Up" : "Login"}
        </h2>

        <form onSubmit={isSignup ? handleSignUp : handleLogin}>
          {/* First Name and Last Name (Only for SignUp) */}
          {isSignup && (
            <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
              <div className="sm:w-1/2">
                <label htmlFor="firstName" className="block text-sm font-medium text-white">
                  First Name
                </label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  id="firstName"
                  placeholder="Enter your first name"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="sm:w-1/2 mt-4 sm:mt-0">
                <label htmlFor="lastName" className="block text-sm font-medium text-white">
                  Last Name
                </label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  id="lastName"
                  placeholder="Enter your last name"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              type="email"
              id="email"
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="Enter your password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Confirm Password (Only for SignUp) */}
          {isSignup && (
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
                Confirm Password
              </label>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}

          {/* Error message */}
          <p className="m-3 text-red-500">{Error}</p>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* Toggle between Login and Sign Up */}
        <div className="flex justify-center mt-4">
          <button
            onClick={toggleForm}
            className="text-blue-600 hover:underline"
          >
            {isSignup ? "Already have an account? Login here" : "New user? Sign up here"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
