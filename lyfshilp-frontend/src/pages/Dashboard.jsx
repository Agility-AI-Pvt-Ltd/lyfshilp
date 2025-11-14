// src/pages/Dashboard.jsx
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { AuthContext } from "../contexts/AuthContext.jsx";
import profileEmoji from "../assets/career/Lyfshilp-logo.svg";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showComingSoon, setShowComingSoon] = useState(true); // 👈 Dynamic visibility
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
      .then((res) => setProfile(res.data.user || res.data))
      .catch(() => setProfile(null))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#FFF8EE]">
        <p className="text-lg font-semibold text-green-700 animate-pulse">
          Loading your dashboard...
        </p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#FFF8EE] py-14 sm:py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 text-center">

        {/* ==== Profile Card ==== */}
        {profile && (
          <div className="flex items-center justify-between bg-[#FFF8EE] shadow-lg border border-green-100 rounded-2xl p-5 sm:p-7 max-w-lg mx-auto mb-10 transition-transform hover:scale-[1.02] duration-300">
            <div className="flex-1 text-left">
              <h2 className="text-xl sm:text-2xl font-semibold text-green-700">
                Welcome, {profile.name || user?.name || "User"} 👋
              </h2>
              <p className="text-gray-700 text-sm sm:text-base mt-1">
                Email: {profile.email || "—"}
              </p>
              <button
                onClick={handleLogout}
                className="mt-4 px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium shadow-md transition-all"
              >
                Logout
              </button>
            </div>

            <div className="ml-6 flex-shrink-0">
              <img
                src={profileEmoji}
                alt="Lyfshilp Logo"
                className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-md"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
