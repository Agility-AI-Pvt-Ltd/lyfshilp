import { useEffect, useState } from "react";

const NAV_ITEMS = [
  "About",
  "Curriculum",
  "Mentorship",
  "Rewards",
  "Team",
  "Contact",
];

export default function FutureXLandingNavbar() {
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
          <div
            style={{
              fontFamily: "'Playfair Display',serif",
              fontWeight: 900,
              fontSize: "1.2rem",
              color: "#fff",
              letterSpacing: 1,
            }}
          >
            Future<span style={{ color: "#00c896" }}>X</span> Fellowship
          </div>

          <ul
            className="hidden md:flex items-center gap-8"
            style={{ listStyle: "none" }}
          >
            {NAV_ITEMS.map((n) => (
              <li key={n}>
                <a
                  href={`#${n.toLowerCase()}`}
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
                  {n}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="hidden md:block shimmer-btn px-6 py-2.5 text-sm"
            style={{
              textDecoration: "none",
              fontFamily: "'DM Sans',sans-serif",
              fontSize: ".85rem",
            }}
          >
            Apply Now
          </a>

          <button
            className="md:hidden text-white text-2xl bg-transparent border-0 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>

        {mobileOpen && (
          <div
            className="md:hidden px-6 pb-6"
            style={{ background: "rgba(8,24,16,.98)" }}
          >
            {NAV_ITEMS.map((n) => (
              <a
                key={n}
                href={`#${n.toLowerCase()}`}
                className="block py-3 text-sm"
                style={{
                  color: "rgba(255,255,255,.75)",
                  borderBottom: "1px solid rgba(255,255,255,.07)",
                  textDecoration: "none",
                  fontFamily: "'DM Sans',sans-serif",
                }}
                onClick={() => setMobileOpen(false)}
              >
                {n}
              </a>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
