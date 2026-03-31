import { useState, useRef, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { AuthContext } from "../contexts/AuthContext.jsx";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [careerOpen, setCareerOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCareerOpen, setMobileCareerOpen] = useState(false);
  const closeTimeout = useRef(null);
  const [showAdmin, setShowAdmin] = useState(false); // toggle for Admin link

  const { user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

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

  // FutureXLandingNavbar-style scroll background
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    fn(); // set initial state
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: "all .5s",
          background: scrolled ? "rgba(8,24,16,.96)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,.35)" : "none",
          fontFamily: "'DM Sans',sans-serif",
        }}
      >
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes urgentPulse{0%,100%{transform:scale(1);opacity:.75}50%{transform:scale(1.85);opacity:0}}

        .shimmer-btn{
          background:linear-gradient(
            90deg,
            var(--color-accent,#2E6B52) 0%,
            var(--color-surface,#1A5C3A) 40%,
            var(--color-gold,#C9A84C) 60%,
            var(--color-accent,#2E6B52) 100%
          );
          background-size:200% 100%;
          animation:shimmer 2.8s linear infinite;
          color:var(--color-text-body,#FAFDF8);
          font-weight:700;
          border-radius:50px;
          cursor:pointer;
          transition:transform .25s,box-shadow .25s;
        }
        .shimmer-btn:hover{
          transform:translateY(-2px);
          box-shadow:0 10px 32px rgba(46,107,82,.35);
        }

        .nav-link{
          position:relative;
          transition:color .3s;
        }
        .nav-link::after{
          content:'';
          position:absolute;
          bottom:-3px;
          left:0;
          right:0;
          height:2px;
          background:#00c896;
          transform:scaleX(0);
          transition:transform .3s;
        }
        .nav-link:hover::after{transform:scaleX(1);}
        .nav-link:hover{color:#00c896 !important;}

        .nav-link.active{color:#00c896 !important;}
        .nav-link.active::after{transform:scaleX(1);}

        .dropdown-link{
          display:block;
          padding:10px 16px;
          color:rgba(255,255,255,.75);
          text-decoration:none;
          font-family:'DM Sans',sans-serif;
          font-size:.86rem;
          border-radius:10px;
        }
        .dropdown-link:hover{color:#00c896;}

        .mobile-link{
          display:block;
          padding:14px 0;
          color:rgba(255,255,255,.75);
          text-decoration:none;
          font-family:'DM Sans',sans-serif;
          font-size:.88rem;
          border-bottom:1px solid rgba(255,255,255,.07);
        }
        .mobile-link:hover{color:#00c896;}

        .mobile-link.active{color:#00c896 !important;}

        .urgent-dot{
          display:inline-block;
          width:10px;
          height:10px;
          border-radius:999px;
          background:#00c896;
          margin-left:10px;
          animation:urgentPulse 1.5s ease-in-out infinite;
          transform-origin:center;
          vertical-align:middle;
        }
        .star-badge{
          display:inline-flex;
          align-items:center;
          justify-content:center;
          width:18px;
          height:18px;
          border-radius:999px;
          background:rgba(0,200,150,.18);
          border:1px solid rgba(0,200,150,.35);
          color:#00c896;
          font-size:11px;
          margin-left:8px;
          transform:translateY(-1px);
          vertical-align:middle;
        }

        .mobile-subtle-btn{
          width:100%;
          display:flex;
          justify-content:space-between;
          align-items:center;
          color:rgba(255,255,255,.75);
          background:transparent;
          border:0;
          padding:12px 0;
          font-family:'DM Sans',sans-serif;
          font-size:.88rem;
          cursor:pointer;
        }
        .mobile-subtle-btn:hover{color:#00c896;}

        .logo-link{
          text-decoration:none;
          display:inline-flex;
          flex-direction:column;
          cursor:pointer;
          transition:transform .25s ease, filter .25s ease;
          transform-origin:left center;
        }
        .logo-link:hover{
          transform:translateY(-2px) scale(1.02);
          filter:drop-shadow(0 10px 30px rgba(0,200,150,.25));
        }
        .logo-caption{
          font-size:.72rem;
          padding-left:50px;
          letter-spacing:.5px;
          color:rgba(255,255,255,.55);
          
          font-family:'DM Sans',sans-serif;
          font-weight:600;
          text-align:left;
          align-self:flex-start;
          margin-top:0;
        }
      `}</style>

        <div className=" mx-auto flex items-center justify-between px-3 sm:px-4 md:px-24 py-3">
          {/* Logo Section */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 flex-shrink-0 min-w-0">
            <Link
              to="/futureX"
              className="logo-link"
              aria-label="Go to FutureX Fellowship"
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    flex: "0 0 auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 44,
                    height: 44,
                    marginTop: 6,

                    borderRadius: 9999,
                    background: "rgba(0,200,150,.08)",
                    border: "1px solid rgba(0,200,150,.18)",
                  }}
                >
                  <img
                    className=" rounded-full overflow-hidden"
                    src="/logo.png"
                    alt="FutureX Fellowship logo"
                    style={{
                      width: 40,
                      height: 40,
                      objectFit: "contain",
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: 44,
                    fontFamily: "'Playfair Display',serif",
                    fontWeight: 900,
                    fontSize: "1.5rem",
                    color: "#fff",
                    letterSpacing: 1,
                    lineHeight: 1,
                  }}
                >
                  Future
                  <span style={{ color: "#00c896" }}>X</span>
                </div>
              </div>
              <span className="logo-caption">Powered By Lyfshilp Academy </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden 2xl:flex items-center gap-8 flex-shrink-0">
            <Link
              to="/"
              className={`nav-link ${isActive("/") ? "active" : ""}`}
              style={{
                color: isActive("/") ? "#00c896" : "rgba(255,255,255,.75)",
                textDecoration: "none",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: ".87rem",
                fontWeight: 500,
                letterSpacing: ".4px",
              }}
            >
              Home
            </Link>

            {/* Exam Prep (NO DROPDOWN) */}
            {/* <Link
              to="/exam-prep"
              className={`nav-link ${isActive("/exam-prep") ? "active" : ""}`}
              style={{
                color: isActive("/exam-prep")
                  ? "#00c896"
                  : "rgba(255,255,255,.75)",
                textDecoration: "none",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: ".87rem",
                fontWeight: 500,
                letterSpacing: ".4px",
              }}
            >
              Exam Prep
            </Link> */}

            <Link
              to="/futureX"
              className={`nav-link ${isActive("/futureX") ? "active" : ""}`}
              style={{
                color: isActive("/futureX")
                  ? "#00c896"
                  : "rgba(255,255,255,.75)",
                textDecoration: "none",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: ".87rem",
                fontWeight: 500,
                letterSpacing: ".4px",
              }}
            >
              FutureX Fellowship
              <span className="star-badge" aria-hidden="true">
                ★
              </span>
            </Link>
            <Link
              to="/podcasts"
              className={`nav-link ${isActive("/podcasts") ? "active" : ""}`}
              style={{
                color: isActive("/podcasts")
                  ? "#00c896"
                  : "rgba(255,255,255,.75)",
                textDecoration: "none",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: ".87rem",
                fontWeight: 500,
                letterSpacing: ".4px",
              }}
            >
              Podcast
            </Link>
            <Link
              to="/community"
              className={`nav-link ${isActive("/community") ? "active" : ""}`}
              style={{
                color: isActive("/community")
                  ? "#00c896"
                  : "rgba(255,255,255,.75)",
                textDecoration: "none",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: ".87rem",
                fontWeight: 500,
                letterSpacing: ".4px",
              }}
            >
              Community
            </Link>
            {/* <Link
              to="/free-content"
              className={`nav-link ${isActive("/free-content") ? "active" : ""}`}
              style={{
                color: isActive("/free-content")
                  ? "#00c896"
                  : "rgba(255,255,255,.75)",
                textDecoration: "none",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: ".87rem",
                fontWeight: 500,
                letterSpacing: ".4px",
              }}
            >
              Free Content
            </Link> */}
            <Link
              to="/summer-programme"
              className={`nav-link ${isActive("/summer-programme") ? "active" : ""}`}
              style={{
                color: isActive("/summer-programme")
                  ? "#00c896"
                  : "rgba(255,255,255,.75)",
                textDecoration: "none",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: ".87rem",
                fontWeight: 500,
                letterSpacing: ".4px",
              }}
            >
              Summer Programme
              <span className="urgent-dot" aria-hidden="true" />
            </Link>

            <Link
              to="/for-colleges"
              className={`nav-link ${isActive("/for-colleges") ? "active" : ""}`}
              style={{
                color: isActive("/for-colleges")
                  ? "#00c896"
                  : "rgba(255,255,255,.75)",
                textDecoration: "none",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: ".87rem",
                fontWeight: 500,
                letterSpacing: ".4px",
              }}
            >
              For Colleges
            </Link>

            <Link
              to="/for-schools"
              className={`nav-link ${isActive("/for-schools") ? "active" : ""}`}
              style={{
                color: isActive("/for-schools")
                  ? "#00c896"
                  : "rgba(255,255,255,.75)",
                textDecoration: "none",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: ".87rem",
                fontWeight: 500,
                letterSpacing: ".4px",
              }}
            >
              For Schools
            </Link>

            <Link
              to="/corporate-ai-upskilling"
              className={`nav-link ${isActive("/corporate-ai-upskilling") ? "active" : ""}`}
              style={{
                color: isActive("/corporate-ai-upskilling")
                  ? "#00c896"
                  : "rgba(255,255,255,.75)",
                textDecoration: "none",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: ".87rem",
                fontWeight: 500,
                letterSpacing: ".4px",
              }}
            >
              Corporate AI
            </Link>

            <Link
              to="/about"
              className={`nav-link ${isActive("/about") ? "active" : ""}`}
              style={{
                color: isActive("/about") ? "#00c896" : "rgba(255,255,255,.75)",
                textDecoration: "none",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: ".87rem",
                fontWeight: 500,
                letterSpacing: ".4px",
              }}
            >
              About Us
            </Link>

            {/* Careers Dropdown */}
            {/* <div className="relative">
              <button
                onClick={() => openDropdown(setCareerOpen)}
                className="nav-link"
                style={{
                  background: "transparent",
                  border: 0,
                  cursor: "pointer",
                  padding: 0,
                  color: "rgba(255,255,255,.75)",
                  textDecoration: "none",
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: ".87rem",
                  fontWeight: 500,
                  letterSpacing: ".4px",
                }}
              >
                Careers <span style={{ marginLeft: 6 }}>▾</span>
              </button>
              {careerOpen && (
                <div
                  className="absolute left-0 mt-2 z-50"
                  onMouseEnter={cancelClose}
                  onMouseLeave={() => delayClose(setCareerOpen)}
                  style={{
                    width: 180,
                    background: "rgba(8,24,16,.98)",
                    border: "1px solid rgba(255,255,255,.12)",
                    borderRadius: 12,
                    boxShadow: "0 20px 50px rgba(0,0,0,.35)",
                    padding: "8px 8px",
                  }}
                >
                  <Link to="/career" className="dropdown-link">
                    Jobs
                  </Link>
                  <Link to="/internships" className="dropdown-link">
                    Internships
                  </Link>
                </div>
              )}
            </div> */}

            {user?.role?.toLowerCase() === "admin" && (
              <Link
                to="/admin"
                className="nav-link"
                style={{
                  color: "rgba(255,255,255,.75)",
                  textDecoration: "none",
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: ".87rem",
                  fontWeight: 500,
                  letterSpacing: ".4px",
                }}
              >
                Admin
              </Link>
            )}
          </nav>

          {/* Right Section (Auth Buttons) */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <div className="hidden 2xl:flex items-center gap-3">
              {loading ? (
                <span
                  style={{ color: "rgba(255,255,255,.6)", fontSize: ".85rem" }}
                >
                  Loading...
                </span>
              ) : user ? (
                <>
                  <span
                    style={{
                      color: "rgba(255,255,255,.75)",
                      fontSize: ".85rem",
                      maxWidth: 140,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Hi{" "}
                    <b style={{ color: "#fff" }}>{user.name?.split(" ")[0]}</b>
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 border border-red-500 rounded-full text-red-500 hover:bg-red-50 font-medium text-sm transition whitespace-nowrap"
                    style={{ background: "transparent" }}
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
                  {showAdmin && (
                    <Link
                      to="/login"
                      className="shimmer-btn px-6 py-2.5 text-sm"
                      style={{ textDecoration: "none" }}
                    >
                      Login
                    </Link>
                  )}
                  <Link
                    to="/contact"
                    className="shimmer-btn px-6 py-2.5 text-sm"
                    style={{ textDecoration: "none" }}
                  >
                    Register Summer 2026
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
              className="2xl:hidden text-white text-2xl bg-transparent border-0 cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div
            className="2xl:hidden animate-slide-down overflow-y-auto max-h-[90vh]"
            style={{
              background: "rgba(8,24,16,.98)",
              borderTop: "1px solid rgba(255,255,255,.08)",
            }}
          >
            <div className="flex flex-col p-6">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className={`mobile-link ${isActive("/") ? "active" : ""}`}
              >
                Home
              </Link>

              {/* Exam Prep as Single Link */}
              {/* <Link
                to="/exam-prep"
                onClick={() => setMobileOpen(false)}
                className={`mobile-link ${isActive("/exam-prep") ? "active" : ""}`}
              >
                Exam Prep
              </Link> */}

              <Link
                to="/futureX"
                onClick={() => setMobileOpen(false)}
                className={`mobile-link ${isActive("/futureX") ? "active" : ""}`}
              >
                FutureX Fellowship
                <span className="star-badge" aria-hidden="true">
                  ★
                </span>
              </Link>
              <Link
                to="/podcasts"
                onClick={() => setMobileOpen(false)}
                className={`mobile-link ${isActive("/podcasts") ? "active" : ""}`}
              >
                Podcast
              </Link>
              <Link
                to="/community"
                onClick={() => setMobileOpen(false)}
                className={`mobile-link ${isActive("/community") ? "active" : ""}`}
              >
                Community
              </Link>
              {/* <Link
                to="/free-content"
                onClick={() => setMobileOpen(false)}
                className={`mobile-link ${isActive("/free-content") ? "active" : ""}`}
              >
                Free Content
              </Link> */}
              <Link
                to="/summer-programme"
                onClick={() => setMobileOpen(false)}
                className={`mobile-link ${isActive("/summer-programme") ? "active" : ""}`}
              >
                Summer Programme
                <span className="urgent-dot" aria-hidden="true" />
              </Link>

              <Link
                to="/for-schools"
                onClick={() => setMobileOpen(false)}
                className={`mobile-link ${isActive("/for-schools") ? "active" : ""}`}
              >
                For Schools
              </Link>
              <Link
                to="/for-colleges"
                onClick={() => setMobileOpen(false)}
                className={`mobile-link ${isActive("/for-colleges") ? "active" : ""}`}
              >
                For Colleges
              </Link>
              <Link
                to="/corporate-ai-upskilling"
                onClick={() => setMobileOpen(false)}
                className={`mobile-link ${
                  isActive("/corporate-ai-upskilling") ? "active" : ""
                }`}
              >
                Corporate AI
              </Link>

              <Link
                to="/about"
                onClick={() => setMobileOpen(false)}
                className={`mobile-link ${isActive("/about") ? "active" : ""}`}
              >
                About Us
              </Link>

              {/* Careers Collapsible */}
              {/* <button
                onClick={() => setMobileCareerOpen(!mobileCareerOpen)}
                className="mobile-subtle-btn"
              >
                <span>Careers</span>
                <span>{mobileCareerOpen ? "▴" : "▾"}</span>
              </button>
              {mobileCareerOpen && (
                <div className="ml-4 flex flex-col space-y-1">
                  <Link
                    to="/career"
                    onClick={() => setMobileOpen(false)}
                    className="mobile-link"
                  >
                    Jobs
                  </Link>
                  <Link
                    to="/internships"
                    onClick={() => setMobileOpen(false)}
                    className="mobile-link"
                  >
                    Internships
                  </Link>
                </div>
              )} */}

              {user?.role?.toLowerCase() === "admin" && (
                <Link
                  to="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="mobile-link"
                >
                  Admin Dashboard
                </Link>
              )}

              {/* Auth Section */}
              {loading ? (
                <span
                  style={{ color: "rgba(255,255,255,.6)", fontSize: ".9rem" }}
                >
                  Loading...
                </span>
              ) : user ? (
                <>
                  <span
                    style={{
                      color: "rgba(255,255,255,.75)",
                      fontSize: ".9rem",
                    }}
                  >
                    Welcome <b>{user.name?.split(" ")[0]}</b>
                  </span>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileOpen(false);
                    }}
                    className="px-4 py-2 border border-red-500 rounded-full text-red-500 hover:bg-red-50 font-medium text-sm transition"
                    style={{ background: "transparent" }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="shimmer-btn px-6 py-2.5 text-sm"
                    style={{ textDecoration: "none", textAlign: "center" }}
                  >
                    Partner with us
                  </Link>
                </>

                // <>
                //   <Link
                //     to="/login"
                //     onClick={() => setMobileOpen(false)}
                //     className="px-4 py-2 border border-green-600 rounded-full text-center text-green-600 hover:bg-green-50 font-medium text-sm transition"
                //   >
                //     Login
                //   </Link>
                //   <Link
                //     to="/register"
                //     onClick={() => setMobileOpen(false)}
                //     className="px-4 py-2 bg-green-600 rounded-full text-center text-white hover:bg-green-700 font-medium text-sm shadow-md transition"
                //   >
                //     Sign Up
                //   </Link>
                // </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Sticky mobile CTA */}
      <div
        className="2xl:hidden fixed left-0 right-0 bottom-0 px-4 py-3"
        style={{
          zIndex: 101,
          background: "rgba(8,24,16,.98)",
          borderTop: "1px solid rgba(255,255,255,.08)",
        }}
      >
        <Link
          to="/contact"
          onClick={() => setMobileOpen(false)}
          className="shimmer-btn px-6 py-2.5 text-sm"
          style={{
            textDecoration: "none",
            display: "block",
            textAlign: "center",
            width: "100%",
          }}
        >
          Partner with us
        </Link>
      </div>
    </>
  );
}
