import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthStore } from "../../store/AuthUser";
import toast from "react-hot-toast";
const Profile = () => {
  const { user, setUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState("overview");
  const [preview, setPreview] = useState("/profile.png");
  useEffect(() => {
    console.log("user in profile page", user);
    if (user?.base64Image) {
      setPreview(user.base64Image);
    }
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result;
        setPreview(base64);

        try {
          const res = await axios.post(
            `http://localhost:3000/api/auth/upload/${user._id}`,
            { base64Image: base64 }
          );

          if (res.data.image) {
            setPreview(res.data.image);

            setUser({
              ...user,
              base64Image: res.data.image,
            });
          }

          toast.success("Uploaded");
        } catch (err) {
          console.error("Upload failed", err);
          toast.error("Upload failed");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-start gap-8 bg-white shadow p-6 rounded-md">
        <div className="flex-shrink-0 text-center">
          <img
            src={preview}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border mx-auto"
          />
          <label className="mt-2 inline-block cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Upload Photo
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-4">Profile</h1>
          <p>
            <strong>Name:</strong> {user?.name}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>User ID:</strong> {user?._id}
          </p>
          <p>
            <strong>Role:</strong> {user?.role}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex gap-4 mb-4">
          {["overview", "settings", "activity"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md border ${
                activeTab === tab
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="p-4 border rounded-md bg-gray-50">
          {activeTab === "overview" && <p>This is your profile overview.</p>}
          {activeTab === "settings" && <p>Account settings go here.</p>}
          {activeTab === "activity" && (
            <p>Recent activity will be shown here.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
