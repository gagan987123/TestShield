import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";
import Profile from "./pages/Profile";
import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { useAuthStore } from "../store/AuthUser";
import StudentDash from "./pages/StudentDash";
import AdminDash from "./pages/AdminDash";
import TestCard from "../components/TestCard";
import StudentTest from "./pages/StudentTest";
import StudentHome from "./pages/StudentHome";
import NotFound from "./pages/NotFound";
import ResetPasswordPage from "./pages/ResetPasswordPage";

function App() {
  const { user, userId, isCheckingAuth, authCheck } = useAuthStore();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isCheckingAuth) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin text-red-600 size-10" />
        </div>
      </div>
    );
  }
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            !user ? (
              <Login />
            ) : user.role === "candidate" ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/admin" replace />
            )
          }
        />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        {user?.role === "candidate" && (
          <Route path="/dashboard" element={<StudentDash />}>
            <Route index element={<StudentHome />} />
            <Route path="assignments" element={<StudentTest />} />
            <Route path="profile" element={<Profile user={user} />} />
          </Route>
        )}
        {user?.role === "admin" && (
          <Route path="/admin" element={<AdminDash />}>
            <Route index element={<div>Admin Home</div>} />
            {/* Add admin-specific routes here if needed */}
          </Route>
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
