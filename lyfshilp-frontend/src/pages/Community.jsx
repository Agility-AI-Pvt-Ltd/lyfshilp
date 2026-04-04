import { useEffect, useRef, useState } from "react";

/* ─── scroll-reveal ─────────────────────────────────────── */
const useInView = (threshold = 0.12) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
};

const Reveal = ({ children, delay = 0, className = "" }) => {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

/* ─── community url placeholder ─────────────────────────── */
const COMMUNITY_URL = "https://www.futurexfellows.com/";

/* ─── feature pills data ─────────────────────────────────── */
const FEATURES = [
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#00c896"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Share & Discuss",
    desc: "Post your startup idea, get instant feedback from fellow founders and mentors who've been there.",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#00c896"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: "Build Together",
    desc: "Find co-founders, designers, and developers. Collaborate on projects across schools and colleges.",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#00c896"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    title: "Celebrate Wins",
    desc: "Share your journey, milestones and achievements — your community celebrates every step forward.",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#d4af37"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    title: "FutureX Mentors",
    desc: "Get guidance from FutureX mentors — serial founders and industry leaders who help ideas scale.",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#d4af37"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "Live Sessions",
    desc: "Join exclusive community-only AMAs, demo days and workshops with top founders and investors.",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#d4af37"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: "Nationwide Network",
    desc: "Connect with student founders across every state — your next partner might be a DM away.",
  },
];

/* ─── stats ──────────────────────────────────────────────── */
const STATS = [
  { value: "500+", label: "Student Founders" },
  { value: "50+", label: "Partner Schools" },
  { value: "20+", label: "FutureX Mentors" },
  { value: "10+", label: "Cities Represented" },
];

/* ─── community page ──────────────────────────────────────── */
export default function Community() {
  useEffect(() => {
    document.title = "FutureX Community — Student Founders Network | Lyfshilp";
  }, []);

  return (
    <div
      style={{
        background: "var(--color-bg-primary, #071a11)",
        color: "var(--color-text-body, #e8f5ef)",
        fontFamily: "'DM Sans', sans-serif",
        minHeight: "100vh",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600;700;800&display=swap');

        .cm-accent { color: #00c896; }
        .cm-gold   { color: #d4af37; }

        .cm-badge {
          display: inline-flex; align-items: center; gap: 9px;
          background: rgba(0,200,150,.12); border: 1px solid rgba(0,200,150,.3);
          color: #00c896; padding: 6px 20px; border-radius: 50px;
          font-size: .72rem; font-weight: 700; letter-spacing: 2.5px;
          text-transform: uppercase; margin-bottom: 28px;
        }
        .cm-pulse {
          width: 8px; height: 8px; border-radius: 50%; background: #00c896;
          display: inline-block; animation: cm-pulse 1.6s ease-in-out infinite;
        }
        @keyframes cm-pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:.4; transform:scale(1.5); }
        }

        .cm-btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          background: linear-gradient(135deg,#00c896,#128061);
          color: #fff; font-weight: 700; font-family: 'DM Sans',sans-serif;
          padding: 18px 44px; border-radius: 50px; text-decoration: none;
          font-size: 1.05rem; letter-spacing: .3px;
          box-shadow: 0 10px 36px rgba(0,200,150,.4);
          transition: transform .25s, box-shadow .25s;
        }
        .cm-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 48px rgba(0,200,150,.5);
        }
        .cm-btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          border: 1.5px solid rgba(0,200,150,.4); color: #00c896;
          padding: 16px 36px; border-radius: 50px; text-decoration: none;
          font-size: .97rem; font-weight: 600; font-family: 'DM Sans',sans-serif;
          transition: border-color .25s, background .25s;
        }
        .cm-btn-outline:hover {
          background: rgba(0,200,150,.09);
          border-color: rgba(0,200,150,.7);
        }

        .cm-feature-card {
          background: rgba(255,255,255,.035);
          border: 1px solid rgba(0,200,150,.14);
          border-radius: 18px;
          padding: 28px 24px;
          transition: border-color .3s, background .3s, transform .3s, box-shadow .3s;
        }
        .cm-feature-card:hover {
          border-color: rgba(0,200,150,.32);
          background: rgba(0,200,150,.06);
          transform: translateY(-5px);
          box-shadow: 0 16px 40px rgba(0,200,150,.1);
        }

        .cm-stat {
          text-align: center;
          padding: 28px 16px;
          background: rgba(0,200,150,.06);
          border: 1px solid rgba(0,200,150,.18);
          border-radius: 16px;
        }

        /* floating glow orbs */
        .cm-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(72px);
          opacity: .18;
        }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        style={{
          padding: "130px 24px 100px",
          position: "relative",
          overflow: "hidden",
          minHeight: "92vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Background orbs */}
        <div
          className="cm-orb"
          style={{
            width: 560,
            height: 560,
            background: "#00c896",
            top: "-120px",
            left: "-160px",
          }}
        />
        <div
          className="cm-orb"
          style={{
            width: 400,
            height: 400,
            background: "#d4af37",
            bottom: "-80px",
            right: "-100px",
          }}
        />
        <div
          className="cm-orb"
          style={{
            width: 300,
            height: 300,
            background: "#00c896",
            top: "40%",
            left: "55%",
          }}
        />

        {/* Grid texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage:
              "linear-gradient(rgba(0,200,150,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,200,150,.025) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div
          className="max-w-4xl mx-auto text-center"
          style={{ position: "relative", zIndex: 2, width: "100%" }}
        >
          <Reveal>
            {/* Live badge */}
            <div className="cm-badge">
              <span className="cm-pulse" />
              Now Open · Join Free
            </div>

            {/* Main headline */}
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontSize: "clamp(2.6rem, 6vw, 5rem)",
                lineHeight: 1.08,
                color: "#fff",
                marginBottom: 28,
                letterSpacing: "-.02em",
              }}
            >
              Where Student Founders
              <br />
              <span className="cm-accent">Build the Future</span>{" "}
              <span style={{ color: "rgba(255,255,255,.25)" }}>Together</span>
            </h1>

            {/* Sub-description */}
            <p
              style={{
                fontSize: "clamp(1rem, 2vw, 1.2rem)",
                color: "rgba(255,255,255,.55)",
                lineHeight: 1.85,
                maxWidth: 680,
                margin: "0 auto 20px",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              A community built for student founders across schools and colleges
              in India. Share your startup, project or idea. Collaborate, get
              feedback, celebrate wins — and grow alongside{" "}
              <span style={{ color: "#00c896", fontWeight: 600 }}>
                FutureX mentors
              </span>{" "}
              who help take your idea to the next level.
            </p>

            <p
              style={{
                fontSize: ".92rem",
                color: "rgba(255,255,255,.32)",
                marginBottom: 48,
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: ".2px",
              }}
            >
              From Class 6 to final-year college — if you're building something,
              you belong here.
            </p>

            {/* CTAs */}
            <div
              style={{
                display: "flex",
                gap: 16,
                justifyContent: "center",
                flexWrap: "wrap",
                marginBottom: 72,
              }}
            >
              <a
                href={COMMUNITY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cm-btn-primary"
              >
                Join the Community
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <a href="#what-you-get" className="cm-btn-outline">
                Learn More
              </a>
            </div>
          </Reveal>

          {/* Stats strip */}
          <Reveal delay={0.15}>
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              style={{ maxWidth: 760, margin: "0 auto" }}
            >
              {STATS.map(({ value, label }, i) => (
                <div key={label} className="cm-stat">
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 900,
                      fontSize: "clamp(1.7rem,3vw,2.4rem)",
                      color: "#00c896",
                      lineHeight: 1,
                      marginBottom: 8,
                    }}
                  >
                    {value}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: "rgba(255,255,255,.42)",
                      fontSize: ".75rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "1.2px",
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── WHAT YOU GET ─────────────────────────────────────── */}
      <section
        id="what-you-get"
        style={{
          padding: "96px 24px",
          background: "rgba(0,0,0,.18)",
          position: "relative",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center" style={{ marginBottom: 56 }}>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: ".72rem",
                fontWeight: 700,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "#00c896",
                marginBottom: 14,
              }}
            >
              Everything Inside
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontSize: "clamp(1.9rem, 4vw, 3rem)",
                color: "#fff",
                lineHeight: 1.15,
              }}
            >
              More Than a Forum. <span className="cm-accent">A Launchpad.</span>
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="cm-feature-card h-full">
                  <div style={{ marginBottom: 18 }}>{icon}</div>
                  <h3
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: "1.05rem",
                      color: "#fff",
                      marginBottom: 10,
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: ".87rem",
                      color: "rgba(255,255,255,.45)",
                      lineHeight: 1.75,
                    }}
                  >
                    {desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA BAND ───────────────────────────────────── */}
      <section
        style={{
          padding: "96px 24px",
          background: "linear-gradient(135deg,#0d3d2f,#071a11)",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        <div
          className="cm-orb"
          style={{
            width: 480,
            height: 480,
            background: "#00c896",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            opacity: 0.1,
          }}
        />
        <div
          className="max-w-2xl mx-auto"
          style={{ position: "relative", zIndex: 2 }}
        >
          <Reveal>
            <div className="cm-badge" style={{ marginBottom: 24 }}>
              <span className="cm-pulse" />
              Free to Join
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                color: "#fff",
                lineHeight: 1.1,
                marginBottom: 20,
              }}
            >
              Ready to Build
              <br />
              <span className="cm-accent">Something Real?</span>
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "rgba(255,255,255,.48)",
                fontSize: ".97rem",
                lineHeight: 1.8,
                marginBottom: 40,
              }}
            >
              Join hundreds of student founders who are already sharing ideas,
              finding collaborators, and getting mentored by the best.
            </p>
            <a
              href={COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cm-btn-primary"
              style={{ fontSize: "1.1rem", padding: "20px 52px" }}
            >
              Join the Community
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
