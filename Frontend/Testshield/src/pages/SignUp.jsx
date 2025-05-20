import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/AuthUser";
import NavBar from "../../components/Navbar";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("candidate");
  const navigate = useNavigate();
  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup({ name, email, password, role }, navigate);
  };

  return (
    <>
      <NavBar />
      <div className="flex min-h-screen">
        {/* Image Section */}
        <div className="hidden md:block w-1/2 bg-gray-200 rounded-3xl">
          <img
            src="front.svg" // Replace with your image path
            alt="Sign Up"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-100 p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

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
                  className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-600"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-600"
                >
                  Role
                </label>
                <select
                  id="role"
                  className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="admin">Admin</option>
                  <option value="candidate">Candidate</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-1 rounded-md hover:bg-blue-600 focus:outline-none"
                disabled={isSigningUp}
              >
                {isSigningUp ? "Loading..." : "Sign Up"}
              </button>
            </form>

            <div className="text-center text-gray-500 mt-4">
              Already a member?{" "}
              <Link to="/" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
