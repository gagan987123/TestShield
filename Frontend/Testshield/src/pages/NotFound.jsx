import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">Page Not Found</p>
      <p className="text-md text-gray-600 mb-6">
        Try re-logging in or go back to the homepage.
      </p>
      <Link
        to="/"
        className="text-white bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
