import React, { useState } from "react";
import axios from "axios";
import { useAuthStore } from "../../store/AuthUser";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../components/Navbar";
import { Toaster, toast } from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const { login, isLoggingIn, reset_password, isSendingResetLink } =
    useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isForgotMode) {
      const response = await reset_password(email);

      if (response.success) {
        setResetSent(true);
      }
    } else {
      const result = await login({ email, password }, navigate);
      if (!result || result.success === false) {
        setLoginFailed(true);
      } else {
        setLoginFailed(false);
      }
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <NavBar />
      <div className="flex min-h-screen">
        {/* Image Section */}
        <div className="hidden md:block w-1/2 bg-gray-200 rounded-3xl">
          <img
            src="front.svg"
            alt="Login"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-100 p-6">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-center mb-6">
              {isForgotMode ? "Reset Password" : "Login"}
            </h2>

            {resetSent ? (
              <div className="text-green-600 text-center">
                Password reset link has been sent to your email.
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setLoginFailed(false);
                    }}
                    required
                  />
                </div>

                {!isForgotMode && (
                  <div className="mb-6">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setLoginFailed(false);
                      }}
                      required
                    />
                    {loginFailed && (
                      <div className="text-sm text-red-600 mt-2">
                        Incorrect email or password.{" "}
                        <span
                          className="text-blue-600 hover:underline cursor-pointer"
                          onClick={() => setIsForgotMode(true)}
                        >
                          Forgot Password?
                        </span>
                      </div>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none"
                  disabled={isLoggingIn}
                >
                  {isForgotMode
                    ? isSendingResetLink
                      ? "Sending..."
                      : "Send Reset Link"
                    : isLoggingIn
                    ? "Loading..."
                    : "Login"}
                </button>
              </form>
            )}

            {!isForgotMode && (
              <div className="text-center text-gray-500 mt-4">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-600 hover:underline">
                  Sign Up
                </Link>
              </div>
            )}

            {isForgotMode && (
              <div className="text-center mt-4">
                <span
                  onClick={() => {
                    setIsForgotMode(false);
                    setResetSent(false);
                  }}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Back to Login
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
