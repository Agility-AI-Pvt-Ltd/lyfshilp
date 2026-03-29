import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* ── scroll reveal ── */
const useInView = (threshold = 0.1) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
};

const Reveal = ({ children, delay = 0, className = "", style = {} }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(26px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
};

/* ── data ── */
const UG_TRACK = [
  "AI & Future Tech for real-world application",
  "Finance & Wealth Skills — financial literacy",
  "Digital Marketing & Personal Branding",
  "Business Communication — pitch & persuade",
  "Build a functional startup in 6 months",
  "International FutureX Certificate",
];

const PG_TRACK = [
  "Advanced AI strategy for business leaders",
  "Entrepreneurship and intrapreneurship",
  "Venture building — from idea to MVP",
  "Finance, fundraising and investor readiness",
  "Executive communication and leadership",
  "MIT Sloan + Stanford GSB certificate",
];

const PILLARS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
    title: "AI & Future Tech",
    tagline: "Tech-ready graduates",
    desc: "AI tools, prompt engineering, future careers",
    accent: "#00c896",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
    title: "Finance & Wealth",
    tagline: "Financially aware young citizens",
    desc: "Personal finance, investment basics, wealth mindset",
    accent: "#C9A84C",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10M12 20V4M6 20v-6"/>
      </svg>
    ),
    title: "Digital Marketing",
    tagline: "Confident brand builders",
    desc: "Branding, content, digital presence",
    accent: "#7c9fff",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    ),
    title: "Business Communication",
    tagline: "Persuasive future leaders",
    desc: "Pitching, storytelling, negotiation",
    accent: "#e27b6a",
  },
];

const COLLEGE_BENEFITS = [
  "Enhances institution reputation as a Future-Ready College",
  "Zero administrative burden — Lyfshilp handles delivery",
  "Co-branded certificates for your students",
  "Dedicated coordinator assigned to your institution",
  "Compliant with NEP 2020 skill development goals",
];

const OUTCOME_STATS = [
  { value: "6", label: "Month Programme" },
  { value: "4", label: "Core Pillars" },
  { value: "MIT + Stanford", label: "Curriculum Principles" },
  { value: "Intl.", label: "Certificate Issued" },
];

export default function ForColleges() {
  useEffect(() => {
    document.title = "FutureX Fellowship for College Students | AI + Entrepreneurship Program | Lyfshilp";
    const setMeta = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) { tag = document.createElement("meta"); tag.setAttribute("name", name); document.head.appendChild(tag); }
      tag.setAttribute("content", content);
    };
    setMeta("description", "The International FutureX Fellowship for UG & PG students combines AI, finance, digital marketing and business communication — helping students build real ventures in 6 months. MIT Sloan + Stanford GSB principles.");
    setMeta("keywords", "entrepreneurship program college students India, AI fellowship program UG PG, startup building program India, MIT Sloan principles India, college AI upskilling program, B.Tech BBA MBA AI program");
  }, []);

  return (
    <div style={{ background: "var(--color-bg-primary, #0C2D1E)", color: "var(--color-text-body, #FAFDF8)", fontFamily: "var(--font-body, 'DM Sans',sans-serif)" }}>
      <style>{`
        .fc-accent  { color: #00c896; }
        .fc-gold    { color: var(--color-gold, #C9A84C); }
        .fc-divider { height: 1px; background: rgba(0,200,150,.1); }
        .fc-card {
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(0,200,150,.14);
          border-radius: 18px;
        }
        .fc-card-hover { transition: border-color .3s, background .3s, transform .3s; }
        .fc-card-hover:hover { border-color: rgba(0,200,150,.32); background: rgba(0,200,150,.055); transform: translateY(-4px); }
        .fc-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(0,200,150,.09); border: 1px solid rgba(0,200,150,.26);
          color: #00c896; padding: 5px 16px; border-radius: 50px;
          font-size: .7rem; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; margin-bottom: 22px;
        }
        .fc-pulse { width: 7px; height: 7px; border-radius: 50%; background: #00c896; display: inline-block; animation: fc-pulse 1.6s infinite; }
        @keyframes fc-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.4)} }
        .fc-btn-primary {
          display: inline-block;
          background: linear-gradient(135deg,#00c896,#128061);
          color: #fff; font-weight: 700; padding: 15px 36px;
          border-radius: 50px; text-decoration: none;
          font-size: .95rem; letter-spacing: .3px;
          box-shadow: 0 8px 28px rgba(0,200,150,.3);
          transition: transform .25s, box-shadow .25s;
        }
        .fc-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(0,200,150,.42); }
        .fc-btn-secondary {
          display: inline-block;
          background: rgba(201,168,76,.12); border: 1.5px solid rgba(201,168,76,.38);
          color: #C9A84C; font-weight: 700; padding: 15px 36px;
          border-radius: 50px; text-decoration: none;
          font-size: .95rem; letter-spacing: .3px;
          transition: background .25s, border-color .25s;
        }
        .fc-btn-secondary:hover { background: rgba(201,168,76,.2); border-color: rgba(201,168,76,.6); }
        .fc-btn-outline {
          display: inline-block; border: 1.5px solid rgba(0,200,150,.35); color: #00c896;
          padding: 13px 30px; border-radius: 50px; text-decoration: none;
          font-size: .88rem; font-weight: 600; transition: background .25s, border-color .25s;
        }
        .fc-btn-outline:hover { background: rgba(0,200,150,.08); border-color: rgba(0,200,150,.6); }
        .fc-ug-pill { display: inline-block; background: rgba(0,200,150,.12); border: 1px solid rgba(0,200,150,.28); color: #00c896; font-size: .65rem; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; padding: 3px 10px; border-radius: 50px; }
        .fc-pg-pill { display: inline-block; background: rgba(201,168,76,.1); border: 1px solid rgba(201,168,76,.28); color: #C9A84C; font-size: .65rem; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; padding: 3px 10px; border-radius: 50px; }
        .fc-section-label { font-size: .7rem; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: #00c896; margin-bottom: 12px; }
        .fc-h2 { font-family: var(--font-body); font-weight: 800; font-size: clamp(1.8rem,4vw,2.8rem); color: var(--color-text-body); line-height: 1.12; }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ padding: "116px 24px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at 10% 55%, rgba(0,200,150,.1), transparent 48%), radial-gradient(ellipse at 90% 15%, rgba(201,168,76,.07), transparent 42%)" }} />
        <div className="max-w-5xl mx-auto text-center" style={{ position: "relative", zIndex: 2 }}>
          <Reveal>
            <div className="fc-badge">
              <span className="fc-pulse" />
              International FutureX Fellowship · For Colleges
            </div>
            <h1 style={{ fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "clamp(1.9rem,5vw,3.6rem)", lineHeight: 1.08, color: "var(--color-text-body)", marginBottom: 22, letterSpacing: "-.015em" }}>
              Your Degree Gets You the Interview.<br />
              <span className="fc-accent">FutureX Gets You the Job —</span><br />
              <span style={{ color: "var(--color-gold, #C9A84C)" }}>and the Company.</span>
            </h1>
            <p style={{ fontSize: "clamp(.97rem,2vw,1.15rem)", color: "var(--color-text-muted, #7A9E8A)", lineHeight: 1.8, maxWidth: 660, margin: "0 auto 42px" }}>
              The International FutureX Fellowship is a 6-month, AI-native entrepreneurship program for UG and PG students, built on MIT Sloan School of Management and Stanford Seed | Graduate School of Business principles. Graduate with skills, a venture, and an internationally recognised certificate.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/contact" className="fc-btn-primary">Enroll as a Student →</Link>
              <Link to="/contact" className="fc-btn-secondary">Partner Your College →</Link>
            </div>
          </Reveal>

          {/* credibility strip */}
          <Reveal delay={0.15} style={{ marginTop: 52 }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
              {["MIT Sloan Principles", "Stanford GSB", "NEP 2020 Aligned", "Intl. Certificate"].map((t) => (
                <span key={t} style={{ padding: "6px 16px", borderRadius: 50, background: "rgba(0,200,150,.06)", border: "1px solid rgba(0,200,150,.16)", fontSize: ".72rem", color: "var(--color-text-muted, #7A9E8A)", fontWeight: 600, letterSpacing: ".5px" }}>{t}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <div className="fc-divider" />

      {/* ── QUICK STATS ── */}
      <section style={{ padding: "52px 24px" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 items-stretch">
          {OUTCOME_STATS.map(({ value, label }, i) => (
            <Reveal key={label} delay={i * 0.08} className="h-full">
              <div style={{ background: "rgba(0,200,150,.06)", border: "1px solid rgba(0,200,150,.18)", borderRadius: 14, padding: "22px 16px", textAlign: "center", height: "100%", minHeight: 142, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "clamp(1.3rem,2.5vw,1.9rem)", color: "#00c896", lineHeight: 1, marginBottom: 8 }}>{value}</div>
                <div style={{ color: "var(--color-text-muted, #7A9E8A)", fontSize: ".75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>{label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="fc-divider" />

      {/* ── TWO TRACKS ── */}
      <section style={{ padding: "80px 24px" }}>
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center" style={{ marginBottom: 52 }}>
            <div className="fc-section-label">Choose Your Track</div>
            <h2 className="fc-h2">Two Tracks. <span className="fc-accent">One Fellowship.</span></h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {/* UG */}
            <Reveal delay={0.05}>
              <div className="fc-card h-full" style={{ padding: "32px 28px" }}>
                <span className="fc-ug-pill">UG Track</span>
                <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "1.15rem", color: "var(--color-text-body)", margin: "14px 0 4px" }}>B.Com / BBA / B.Tech</h3>
                <div style={{ height: 2, width: 38, background: "#00c896", borderRadius: 2, marginBottom: 22 }} />
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 13 }}>
                  {UG_TRACK.map((item, i) => (
                    <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00c896", flexShrink: 0, marginTop: 8 }} />
                      <span style={{ color: "var(--color-text-muted, #7A9E8A)", fontSize: ".88rem", lineHeight: 1.65 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* PG */}
            <Reveal delay={0.1}>
              <div className="fc-card h-full" style={{ padding: "32px 28px", borderColor: "rgba(201,168,76,.2)" }}>
                <span className="fc-pg-pill">PG / MBA Track</span>
                <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "1.15rem", color: "var(--color-text-body)", margin: "14px 0 4px" }}>MCA / MBA / M.Tech & PG</h3>
                <div style={{ height: 2, width: 38, background: "#C9A84C", borderRadius: 2, marginBottom: 22 }} />
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 13 }}>
                  {PG_TRACK.map((item, i) => (
                    <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C9A84C", flexShrink: 0, marginTop: 8 }} />
                      <span style={{ color: "var(--color-text-muted, #7A9E8A)", fontSize: ".88rem", lineHeight: 1.65 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="fc-divider" />

      {/* ── 4 PILLARS ── */}
      <section style={{ padding: "80px 24px", background: "rgba(0,200,150,.025)" }}>
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center" style={{ marginBottom: 52 }}>
            <div className="fc-section-label">Programme Architecture</div>
            <h2 className="fc-h2">The Four <span className="fc-accent">Programme Pillars</span></h2>
            <p style={{ color: "var(--color-text-muted, #7A9E8A)", fontSize: ".95rem", marginTop: 10, maxWidth: 520, margin: "10px auto 0" }}>
              Each pillar is a standalone skill module — together, they produce a complete, career-ready professional.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PILLARS.map(({ icon, title, tagline, desc, accent }, i) => (
              <Reveal key={title} delay={i * 0.09}>
                <div className="fc-card fc-card-hover h-full" style={{ padding: "26px 22px" }}>
                  <div style={{ width: 46, height: 46, borderRadius: 14, background: `${accent}14`, border: `1px solid ${accent}30`, display: "flex", alignItems: "center", justifyContent: "center", color: accent, marginBottom: 18 }}>
                    {icon}
                  </div>
                  <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: ".95rem", color: "var(--color-text-body)", marginBottom: 6, lineHeight: 1.3 }}>{title}</h3>
                  <div style={{ fontSize: ".72rem", fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: ".8px", marginBottom: 12 }}>{tagline}</div>
                  <div style={{ height: 1, background: `${accent}20`, marginBottom: 12 }} />
                  <p style={{ color: "var(--color-text-muted, #7A9E8A)", fontSize: ".82rem", lineHeight: 1.65, margin: 0 }}>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="fc-divider" />

      {/* ── WHY PARTNER ── */}
      <section style={{ padding: "80px 24px" }}>
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center" style={{ marginBottom: 48 }}>
            <div className="fc-section-label">For Institutions</div>
            <h2 className="fc-h2">Why Partner <span className="fc-accent">Your College</span></h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto items-stretch">
            {COLLEGE_BENEFITS.map((benefit, i) => (
              <Reveal key={i} delay={i * 0.07} className="h-full min-h-0 flex">
                <div className="fc-card fc-card-hover h-full w-full flex-1" style={{ padding: "20px 18px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(0,200,150,.1)", border: "1px solid rgba(0,200,150,.24)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: ".58rem", fontWeight: 900, color: "#00c896" }}>✓</div>
                  <p style={{ color: "var(--color-text-muted, #7A9E8A)", fontSize: ".86rem", lineHeight: 1.65, margin: 0, flex: 1 }}>{benefit}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="fc-divider" />

      {/* ── SOCIAL PROOF BAND ── */}
      <section style={{ padding: "52px 24px", background: "rgba(201,168,76,.04)", borderTop: "1px solid rgba(201,168,76,.1)", borderBottom: "1px solid rgba(201,168,76,.1)" }}>
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center">
            <p style={{ color: "var(--color-text-muted, #7A9E8A)", fontSize: ".82rem", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 22 }}>Built on Principles From</p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14 }}>
              {["MIT Sloan School of Management", "Stanford Seed | GSB", "Harvard Business School Research", "DPIIT-Recognised EdTech"].map((name) => (
                <span key={name} style={{ padding: "8px 20px", borderRadius: 50, background: "rgba(201,168,76,.08)", border: "1px solid rgba(201,168,76,.22)", fontSize: ".78rem", color: "var(--color-gold, #C9A84C)", fontWeight: 700, letterSpacing: ".3px" }}>{name}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "96px 24px" }}>
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <div className="fc-section-label" style={{ marginBottom: 14 }}>Get Started</div>
            <h2 style={{ fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "clamp(2rem,4.5vw,3.1rem)", color: "var(--color-text-body)", lineHeight: 1.08, marginBottom: 14 }}>
              Graduate with Skills,<br />
              <span className="fc-accent">a Venture,</span> and a Certificate.
            </h2>
            <p style={{ color: "var(--color-text-muted, #7A9E8A)", fontSize: ".9rem", lineHeight: 1.7, marginBottom: 38 }}>
              Individual enrolments and institutional partnerships both welcome.
            </p>

            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
              <Link to="/contact" className="fc-btn-primary" style={{ padding: "17px 40px" }}>Enroll as a Student →</Link>
              <Link to="/contact" className="fc-btn-secondary" style={{ padding: "17px 40px" }}>Partner Your College →</Link>
            </div>

            <div style={{ marginTop: 22, display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://wa.me/917042671115" style={{ display: "flex", alignItems: "center", gap: 7, color: "var(--color-text-muted, #7A9E8A)", textDecoration: "none", fontSize: ".84rem" }}>
                <span style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(0,200,150,.1)", border: "1px solid rgba(0,200,150,.26)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".55rem", fontWeight: 800, color: "#00c896" }}>WA</span>
                +91 70426 71115
              </a>
              <a href="mailto:service.excellence@lyfshilpacademy.com" style={{ display: "flex", alignItems: "center", gap: 7, color: "var(--color-text-muted, #7A9E8A)", textDecoration: "none", fontSize: ".84rem" }}>
                <span style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(0,200,150,.1)", border: "1px solid rgba(0,200,150,.26)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".55rem", fontWeight: 800, color: "#00c896" }}>EM</span>
                service.excellence@lyfshilpacademy.com
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
