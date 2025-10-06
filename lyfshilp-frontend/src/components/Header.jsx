import { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { AuthContext } from "../contexts/AuthContext";

export default function Header() {
  const [examOpen, setExamOpen] = useState(false);
  const [careerOpen, setCareerOpen] = useState(false);
  const closeTimeout = useRef(null);

  const { user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const openDropdown = (setter) => {
    setter(true);
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    closeTimeout.current = setTimeout(() => setter(false), 2000);
  };
  const cancelClose = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
  };
  const delayClose = (setter) => {
    closeTimeout.current = setTimeout(() => setter(false), 1000);
  };

  const handleLogout = () => {
    logout(); // context se user clear hoga
    navigate("/login"); // logout ke baad login page
  };

  return (
    <header className="w-full shadow-sm bg-white fixed top-0 left-0 z-50 font-sans">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Lyfshilp Academy" className="h-8" />
          <span className="font-bold text-lg text-gray-800">
            Lyfshilp Academy
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-7 text-gray-700 font-medium text-sm">
          <Link to="/" className="hover:text-green-600 transition">Home</Link>
          <Link to="/about" className="hover:text-green-600 transition">About Us</Link>

          {/* Exam Prep Dropdown */}
          <div className="relative">
            <button
              onClick={() => openDropdown(setExamOpen)}
              className="hover:text-green-600 transition flex items-center"
            >
              Exam Prep <span className="ml-1">▾</span>
            </button>
            {examOpen && (
              <div
                className="absolute left-0 mt-2 bg-white border rounded-lg shadow-lg w-40 py-2 z-50"
                onMouseEnter={cancelClose}
                onMouseLeave={() => delayClose(setExamOpen)}
              >
                <a href="https://lyfshilpacademy.co.in/" target="_blank" rel="noopener noreferrer"
                   className="block px-4 py-2 hover:bg-gray-50 transition">CUET</a>
                <a href="https://lyfshilpacademy.co.in/" target="_blank" rel="noopener noreferrer"
                   className="block px-4 py-2 hover:bg-gray-50 transition">IPMAT</a>
                <a href="https://lyfshilpacademy.co.in/" target="_blank" rel="noopener noreferrer"
                   className="block px-4 py-2 hover:bg-gray-50 transition">CLAT</a>
              </div>
            )}
          </div>

          <Link to="/olympiad" className="hover:text-green-600 transition">Olympiad</Link>
          <Link to="/podcast" className="hover:text-green-600 transition">Podcast</Link>

          {/* Career Dropdown */}
          <div className="relative">
            <button
              onClick={() => openDropdown(setCareerOpen)}
              className="hover:text-green-600 transition flex items-center"
            >
              Careers <span className="ml-1">▾</span>
            </button>
            {careerOpen && (
              <div
                className="absolute left-0 mt-2 bg-white border rounded-lg shadow-lg w-44 py-2 z-50"
                onMouseEnter={cancelClose}
                onMouseLeave={() => delayClose(setCareerOpen)}
              >
                <Link to="/career" className="block px-4 py-2 hover:bg-gray-50 transition">Jobs</Link>
                <Link to="/internships" className="block px-4 py-2 hover:bg-gray-50 transition">Internships</Link>
              </div>
            )}
          </div>

          {/* ✅ Admin Dashboard only for admin */}
          {user?.role?.toLowerCase() === "admin" && (
            <Link to="/admin" className="hover:text-green-600 transition">Admin Dashboard</Link>
          )}
        </nav>

        {/* Buttons */}
        <div className="flex space-x-3">
          {loading ? (
            <span className="text-sm text-gray-500">Loading...</span>
          ) : user ? (
            <>
              <span className="text-sm text-gray-700">
                Welcome {user.name?.split(" ")[0]}
              </span>
              <button
                onClick={handleLogout}
                className="px-6 py-2.5 border border-red-500 rounded-full text-red-500 hover:bg-red-50 font-medium text-sm transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login"
                className="px-6 py-2.5 border border-green-600 rounded-full text-green-600 hover:bg-green-50 font-medium text-sm transition duration-200">
                Login
              </Link>
              <Link to="/register"
                className="px-6 py-2.5 bg-green-600 rounded-full text-white hover:bg-green-700 font-medium text-sm shadow-md transition duration-200">
                Register Now
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
