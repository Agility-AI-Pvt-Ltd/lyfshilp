import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Test Series", href: "/testseries" },
  { label: "Daily Updates", href: "/updates" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    fn(); // set initial state
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}

        .shimmer-btn{
          background:linear-gradient(90deg,#00c896 0%,#00e8ad 40%,#d4af37 60%,#00c896 100%);
          background-size:200% 100%;
          animation:shimmer 2.8s linear infinite;
          color:#0a2a1f;
          font-weight:700;
          border-radius:50px;
          cursor:pointer;
          transition:transform .25s,box-shadow .25s;
        }
        .shimmer-btn:hover{
          transform:translateY(-2px);
          box-shadow:0 10px 32px rgba(0,200,150,.35);
        }

        .nav-link{position:relative;transition:color .3s;}
        .nav-link::after{content:'';position:absolute;bottom:-3px;left:0;right:0;height:2px;background:#00c896;transform:scaleX(0);transition:transform .3s;}
        .nav-link:hover::after{transform:scaleX(1);}
        .nav-link:hover{color:#00c896 !important;}
      `}</style>

      <nav
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
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img src="/logo.png" alt="Lyfshilp Logo" className="h-10 mr-2" />
            <span
              style={{
                fontFamily: "'Playfair Display',serif",
                fontWeight: 900,
                fontSize: "1.2rem",
                color: "#fff",
                letterSpacing: 1,
              }}
            >
              LYFSHILP ACADEMY
            </span>
          </a>

          {/* Desktop links */}
          <ul
            className="hidden md:flex items-center gap-8"
            style={{ listStyle: "none" }}
          >
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
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
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/login"
              className="shimmer-btn px-6 py-2.5 text-sm"
              style={{
                textDecoration: "none",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: ".85rem",
              }}
            >
              Login
            </a>
            <a
              href="/signup"
              className="shimmer-btn px-6 py-2.5 text-sm"
              style={{
                textDecoration: "none",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: ".85rem",
              }}
            >
              Signup
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white text-2xl bg-transparent border-0 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="md:hidden px-6 pb-6"
            style={{ background: "rgba(8,24,16,.98)" }}
          >
            <div className="flex flex-col">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block py-3 text-sm"
                  style={{
                    color: "rgba(255,255,255,.75)",
                    borderBottom: "1px solid rgba(255,255,255,.07)",
                    textDecoration: "none",
                    fontFamily: "'DM Sans',sans-serif",
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex gap-3 mt-4">
              <a
                href="/login"
                className="shimmer-btn px-6 py-2.5 text-sm"
                style={{
                  textDecoration: "none",
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: ".85rem",
                  flex: 1,
                  textAlign: "center",
                }}
                onClick={() => setMobileOpen(false)}
              >
                Login
              </a>
              <a
                href="/signup"
                className="shimmer-btn px-6 py-2.5 text-sm"
                style={{
                  textDecoration: "none",
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: ".85rem",
                  flex: 1,
                  textAlign: "center",
                }}
                onClick={() => setMobileOpen(false)}
              >
                Signup
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
