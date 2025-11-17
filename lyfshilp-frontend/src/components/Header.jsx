import { useState, useRef, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { AuthContext } from "../contexts/AuthContext.jsx";

export default function Header() {
  const [careerOpen, setCareerOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCareerOpen, setMobileCareerOpen] = useState(false);
  const closeTimeout = useRef(null);
  const [showAdmin, setShowAdmin] = useState(false); // toggle for Admin link

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
    logout();
    navigate("/login");
  };

  // ✅ works on Windows + Mac
  useEffect(() => {
  const handleKey = (e) => {
    const key = e.key?.toLowerCase() || "";

    // Windows/Linux → Alt + A
    if (e.altKey && key === "a") {
      e.preventDefault();
      setShowAdmin((prev) => !prev);
      return;
    }

    // Mac → Command + A (⌘ + A)
    if (e.metaKey && key === "a") {
      e.preventDefault();
      setShowAdmin((prev) => !prev);
      return;
    }
  };

  window.addEventListener("keydown", handleKey);
  return () => window.removeEventListener("keydown", handleKey);
}, []);

  return (
    <header className="w-full bg-white shadow-sm fixed top-0 left-0 z-50 font-sans transition-all duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3">
        
        {/* Logo Section */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 flex-shrink-0 min-w-0">
          <img src={logo} alt="Lyfshilp Academy" className="h-6 sm:h-7 lg:h-8 flex-shrink-0" />
          <span className="font-bold text-sm sm:text-base lg:text-lg text-gray-800 tracking-tight truncate">
            Lyfshilp Academy
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-gray-700 font-medium text-sm xl:text-base flex-shrink-0">
          <Link to="/" className="hover:text-green-600 transition whitespace-nowrap">Home</Link>
          <Link to="/about" className="hover:text-green-600 transition whitespace-nowrap">About Us</Link>

          {/* Exam Prep (NO DROPDOWN) */}
          <Link to="/exam-prep" className="hover:text-green-600 transition whitespace-nowrap">
            Exam Prep
          </Link>

          <Link to="/olympiad" className="hover:text-green-600 transition whitespace-nowrap">FutureX</Link>
          <Link to="/podcast" className="hover:text-green-600 transition whitespace-nowrap">Podcast</Link>
          <Link to="/workshop" className="hover:text-green-600 transition whitespace-nowrap">Workshops</Link>

          {/* Careers Dropdown */}
          <div className="relative">
            <button
              onClick={() => openDropdown(setCareerOpen)}
              className="hover:text-green-600 transition flex items-center whitespace-nowrap"
            >
              Careers <span className="ml-1">▾</span>
            </button>
            {careerOpen && (
              <div
                className="absolute left-0 mt-2 bg-white border rounded-lg shadow-lg w-44 py-2 z-50"
                onMouseEnter={cancelClose}
                onMouseLeave={() => delayClose(setCareerOpen)}
              >
                <Link to="/career" className="block px-4 py-2 hover:text-green-600">
                  Jobs
                </Link>
                <Link to="/internships" className="block px-4 py-2 hover:text-green-600">
                  Internships
                </Link>
              </div>
            )}
          </div>

          {user?.role?.toLowerCase() === "admin" && (
            <Link to="/admin" className="hover:text-green-600 transition whitespace-nowrap">
              Admin
            </Link>
          )}
        </nav>

        {/* Right Section (Auth Buttons) */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <div className="hidden lg:flex items-center gap-2 xl:gap-3">
            {loading ? (
              <span className="text-xs xl:text-sm text-gray-500">Loading...</span>
            ) : user ? (
              <>
                <span className="text-xs xl:text-sm text-gray-700 truncate max-w-[80px] xl:max-w-[120px]">
                  Hi <b>{user.name?.split(" ")[0]}</b>
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 xl:px-4 py-1.5 xl:py-2 border border-red-500 rounded-full text-red-500 hover:bg-red-50 font-medium text-xs xl:text-sm transition whitespace-nowrap"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* <Link
                  to="/login"
                  className="px-3 xl:px-4 py-1.5 xl:py-2 border border-green-600 rounded-full text-green-600 hover:bg-green-50 font-medium text-xs xl:text-sm transition whitespace-nowrap"
                >
                  Login
                </Link> */}
                {/* //make login for admin */}
                {(showAdmin) &&(<Link
                  to="/login"
                  className="px-3 xl:px-4 py-1.5 xl:py-2 border border-green-600 rounded-full text-green-600 hover:bg-green-50 font-medium text-xs xl:text-sm transition whitespace-nowrap"
                >
                  Login
                </Link>
                )}
                <Link
                  to="/contact"
                  className="px-3 xl:px-4 py-1.5 xl:py-2 bg-green-600 rounded-full text-white hover:bg-green-700 font-medium text-xs xl:text-sm shadow-md transition whitespace-nowrap"
                >
                  Contact Us
                </Link>
                
                {/* <Link
                  to="/register"
                  className="px-3 xl:px-4 py-1.5 xl:py-2 bg-green-600 rounded-full text-white hover:bg-green-700 font-medium text-xs xl:text-sm shadow-md transition whitespace-nowrap"
                >
                  Sign Up
                </Link> */}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700 text-xl sm:text-2xl focus:outline-none p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="lg:hidden bg-white shadow-md border-t animate-slide-down overflow-y-auto max-h-[90vh]">
          <div className="flex flex-col space-y-2 p-4 text-gray-700 font-medium text-sm">
            <Link to="/" onClick={() => setMobileOpen(false)} className="hover:text-green-600">Home</Link>
            <Link to="/about" onClick={() => setMobileOpen(false)} className="hover:text-green-600">About Us</Link>

            {/* Exam Prep as Single Link */}
            <Link
              to="/exam-prep"
              onClick={() => setMobileOpen(false)}
              className="hover:text-green-600"
            >
              Exam Prep
            </Link>

            <Link to="/olympiad" onClick={() => setMobileOpen(false)} className="hover:text-green-600">
              FutureX
            </Link>
            <Link to="/podcast" onClick={() => setMobileOpen(false)} className="hover:text-green-600">
              Podcast
            </Link>
            <Link to="/workshop" onClick={() => setMobileOpen(false)} className="hover:text-green-600">
              Workshop
            </Link>

            {/* Careers Collapsible */}
            <button
              onClick={() => setMobileCareerOpen(!mobileCareerOpen)}
              className="flex justify-between items-center hover:text-green-600"
            >
              <span>Careers</span>
              <span>{mobileCareerOpen ? "▴" : "▾"}</span>
            </button>
            {mobileCareerOpen && (
              <div className="ml-4 flex flex-col space-y-1">
                <Link to="/career" onClick={() => setMobileOpen(false)} className="hover:text-green-600">
                  Jobs
                </Link>
                <Link to="/internships" onClick={() => setMobileOpen(false)} className="hover:text-green-600">
                  Internships
                </Link>
              </div>
            )}

            {user?.role?.toLowerCase() === "admin" && (
              <Link
                to="/admin"
                onClick={() => setMobileOpen(false)}
                className="hover:text-green-600"
              >
                Admin Dashboard
              </Link>
            )}

            {/* Auth Section */}
            {loading ? (
              <span className="text-sm text-gray-500">Loading...</span>
            ) : user ? (
              <>
                <span className="text-sm text-gray-700">
                  Welcome <b>{user.name?.split(" ")[0]}</b>
                </span>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                  className="px-4 py-2 border border-red-500 rounded-full text-red-500 hover:bg-red-50 font-medium text-sm transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-2 border border-green-600 rounded-full text-center text-green-600 hover:bg-green-50 font-medium text-sm transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-2 bg-green-600 rounded-full text-center text-white hover:bg-green-700 font-medium text-sm shadow-md transition"
                >
                  Sign Up
                </Link> */}
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
