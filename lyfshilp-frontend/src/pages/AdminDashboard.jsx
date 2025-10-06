// src/pages/AdminDashboard.jsx
import { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../contexts/AuthContext";

export default function AdminDashboard() {
  const { user, loading } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);

  const [userSearch, setUserSearch] = useState("");
  const [appSearch, setAppSearch] = useState("");
  const [userSortAsc, setUserSortAsc] = useState(true);
  const [appSortAsc, setAppSortAsc] = useState(true);

  // ✅ Fetch users and applications when user is loaded
  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem("token");

    const fetchUsers = async () => {
      try {
        const res = await api.get("/user/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data.users || res.data || []);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setUsers([]);
      }
    };

    const fetchApplications = async () => {
      try {
        const res = await api.get("/applications/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApplications(res.data.applications || res.data || []);
      } catch (err) {
        console.error("Failed to fetch applications:", err);
        setApplications([]);
      }
    };

    fetchUsers();
    fetchApplications();
  }, [user]);

  // 🔒 Redirect if not admin
  if (!loading && (!user || user.role?.toLowerCase() !== "admin")) {
    return <Navigate to="/login" replace />;
  }

  // Filter + sort users
  const filteredUsers = [...users]
    .filter(
      (u) =>
        u.name?.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.email?.toLowerCase().includes(userSearch.toLowerCase())
    )
    .sort((a, b) => (userSortAsc ? a.id - b.id : b.id - a.id));

  // Filter + sort applications
  const filteredApps = [...applications]
    .filter(
      (a) =>
        a.fullName?.toLowerCase().includes(appSearch.toLowerCase()) ||
        a.email?.toLowerCase().includes(appSearch.toLowerCase())
    )
    .sort((a, b) =>
      appSortAsc
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt)
    );

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-green-600">Admin Dashboard</h1>

      {/* Users Table */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">All Users</h2>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search users..."
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              className="border p-1 rounded"
            />
            <button
              onClick={() => setUserSortAsc(!userSortAsc)}
              className="bg-green-500 text-white px-2 rounded"
            >
              Sort {userSortAsc ? "↑" : "↓"}
            </button>
          </div>
        </div>

        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Joined</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((u) => (
                <tr key={u.id}>
                  <td className="p-2 border">{u.id}</td>
                  <td className="p-2 border">{u.name}</td>
                  <td className="p-2 border">{u.email}</td>
                  <td className="p-2 border">{u.role || "User"}</td>
                  <td className="p-2 border">
                    {u.createdAt
                      ? new Date(u.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-2 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Applications Table */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">All Applications</h2>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search applications..."
              value={appSearch}
              onChange={(e) => setAppSearch(e.target.value)}
              className="border p-1 rounded"
            />
            <button
              onClick={() => setAppSortAsc(!appSortAsc)}
              className="bg-green-500 text-white px-2 rounded"
            >
              Sort {appSortAsc ? "↑" : "↓"}
            </button>
          </div>
        </div>

        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Full Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Job Title</th>
              <th className="p-2 border">Resume</th>
              <th className="p-2 border">Applied On</th>
            </tr>
          </thead>
          <tbody>
            {filteredApps.length > 0 ? (
              filteredApps.map((a) => (
                <tr key={a.id}>
                  <td className="p-2 border">{a.id}</td>
                  <td className="p-2 border">{a.fullName}</td>
                  <td className="p-2 border">{a.email}</td>
                  <td className="p-2 border">{a.phone}</td>
                  <td className="p-2 border">{a.jobTitle || "N/A"}</td>
                  <td className="p-2 border">
                    {a.resumeUrl ? (
                      <a
                        href={a.resumeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 underline"
                      >
                        View Resume
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="p-2 border">
                    {a.createdAt
                      ? new Date(a.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-2 text-center text-gray-500">
                  No applications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
