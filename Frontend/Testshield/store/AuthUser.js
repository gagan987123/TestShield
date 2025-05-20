import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
export const useAuthStore = create((set) => ({
  user: null,
  userId: null,

  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,
  isSendingResetLink: false,
  setUser: (updatedUser) => set({ user: updatedUser }),
  signup: async (credentials, navigate) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        credentials
      );
      console.log("user in auth store :", response);
      set({ user: response.data.user, isSigningUp: false });

      toast.success("Account created success ");
      //   navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message || "An error occured");
      set({ isSigningUp: false, user: null });
    }
  },
  login: async (credentials, navigate) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        credentials
      );

      set({
        user: response.data.user,
        isLoggingIn: false,
        userId: response.data.user._id,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      set({ isLoggingIn: false, user: null, userId: null });
      toast.error(error.response?.data?.message || "Login failed");
    }
  },
  logout: async (navigate) => {
    set({ isLoggingOut: true });
    try {
      localStorage.removeItem("token");
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      set({ isLoggingOut: false });
      console.log(error);
      toast.error(error.response.data.message || "Logout failed");
    }
  },
  authCheck: async () => {
    set({ isCheckingAuth: true });

    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:3000/api/auth/authCheck",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set({
        user: response.data.user,
        isCheckingAuth: false,
        userId: response.data.user?.user?._id,
      });
    } catch (error) {
      console.error("Auth check error:", error.response?.data || error.message);
      set({ isCheckingAuth: false, user: null, userId: null });
    }
  },
  reset_password: async (email) => {
    set({ isSendingResetLink: true });

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/forgot-password",
        { email }
      );

      toast.success("Reset link sent to your email.");
      return { success: true };
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send reset link."
      );
      return { success: false };
    } finally {
      set({ isSendingResetLink: false });
    }
  },
}));
