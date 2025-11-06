import { useContext, useEffect, useState } from "react";
import api from "../api/axios.js";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import profileEmoji from "../assets/career/Lyfshilp-logo.svg"; // 👈 apna emoji image ka path

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    api
      .get("/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProfile(res.data.user))
      .catch(() => setProfile(null))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-r from-green-100 to-orange-100">
        <p className="text-lg font-medium text-gray-700 animate-pulse">
          Loading your dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-r from-green-50 to-orange-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 flex justify-between items-center">
        {/* Left Side (Profile Info) */}
        <div>
          <h2 className="text-2xl font-bold text-green-500 mb-4">Dashboard</h2>
          {profile ? (
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-semibold">Welcome:</span> {profile.name}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Email:</span> {profile.email}
              </p>
              {profile.role && (
                <p className="text-gray-700">
                  <span className="font-semibold">Role:</span> {profile.role}
                </p>
              )}
              <button
                onClick={handleLogout}
                className="mt-4 px-5 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-400 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <p className="text-red-500 font-medium">
              Unauthorized – please login again.
            </p>
          )}
        </div>

        {/* Right Side (Profile Emoji Image) */}
        <div className="ml-6">
          <img
            src={profileEmoji}
            alt="Profile Emoji"
            className="w-80 h-100 border-4 border-green-200 shadow-md object-cover"
          />
        </div>
      </div>
    </div>
  );
}
