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
const MODULES = [
  "AI Foundations — what AI can and cannot do",
  "Prompt Engineering for professional outputs",
  "AI for documentation, reporting, research",
  "AI for communication and presentations",
  "AI readiness assessment for your team",
  "Responsible & ethical AI at work",
];

const FORMATS = [
  { tag: "4 hrs", title: "Half-Day Workshop", desc: "Awareness-level introduction. Ideal for leadership and cross-functional teams.", accent: "#00c896" },
  { tag: "2 days", title: "Hands-On Bootcamp", desc: "Intensive productivity focus. Participants leave with a working prompt toolkit.", accent: "#7c9fff" },
  { tag: "4 weeks", title: "Cohort Programme", desc: "Deep skills for power users. Role-specific tracks, weekly exercises, assessments.", accent: "#C9A84C" },
  { tag: "Custom", title: "Bespoke Programme", desc: "Built around your tools, workflows, and business goals. Any team size.", accent: "#e27b6a" },
];

const WHY = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
    title: "Academic-Grade Trainers",
    desc: "Trainers from IIT, IIM, Stanford & NSUT — academic rigour delivered with real-world business application.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
    title: "DPIIT-Recognised Provider",
    desc: "Credible, vetted and government-endorsed. Your L&D spend is with a certified startup under DPIIT.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
      </svg>
    ),
    title: "Harvard-Backed Methodology",
    desc: "Curriculum grounded in Harvard Business School AI productivity research — not vendor marketing material.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    title: "Practical, Not Theoretical",
    desc: "Every session includes live exercises. Participants apply skills to their actual role and tools in real time.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
    title: "Post-Training AI Toolkit",
    desc: "Each participant receives a personalised AI Prompt Library built for their specific role and function.",
  },
];

const STAT_CARDS = [
  { value: "40–55%", label: "Faster task completion", sub: "Harvard Business School" },
  { value: "10→500+", label: "Team size range", sub: "Flexible cohort design" },
  { value: "4", label: "Programme formats", sub: "Half-day to custom" },
  { value: "IIT · IIM · Stanford", label: "Trainer pedigree", sub: "Academic + practical" },
];

export default function CorporateAI() {
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    document.title = "Corporate AI Upskilling Programs India | Lyfshilp Academy";
    const setMeta = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) { tag = document.createElement("meta"); tag.setAttribute("name", name); document.head.appendChild(tag); }
      tag.setAttribute("content", content);
    };
    setMeta("description", "Lyfshilp delivers hands-on AI upskilling for corporate teams — prompt engineering, AI productivity tools, and custom cohort programs. Trainers from IIT, Stanford & IIM. Harvard-backed methodology.");
    setMeta("keywords", "corporate AI training India, AI upskilling for employees, AI productivity workshop corporate, prompt engineering training teams, L&D AI program India, enterprise AI training");
  }, []);

  return (
    <div style={{ background: "var(--color-bg-primary, #0C2D1E)", color: "var(--color-text-body, #FAFDF8)", fontFamily: "var(--font-body, 'DM Sans',sans-serif)" }}>
      <style>{`
        .ca-accent  { color: #00c896; }
        .ca-gold    { color: var(--color-gold, #C9A84C); }
        .ca-divider { height: 1px; background: rgba(0,200,150,.1); }
        .ca-card {
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(0,200,150,.14);
          border-radius: 18px;
        }
        .ca-card-hover { transition: border-color .3s, background .3s, transform .3s; }
        .ca-card-hover:hover { border-color: rgba(0,200,150,.3); background: rgba(0,200,150,.05); transform: translateY(-4px); }
        .ca-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(0,200,150,.09); border: 1px solid rgba(0,200,150,.25);
          color: #00c896; padding: 5px 16px; border-radius: 50px;
          font-size: .7rem; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; margin-bottom: 22px;
        }
        .ca-pulse { width: 7px; height: 7px; border-radius: 50%; background: #00c896; display: inline-block; animation: ca-pulse 1.6s infinite; }
        @keyframes ca-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.4)} }
        .ca-btn-primary {
          display: inline-block;
          background: linear-gradient(135deg,#00c896,#128061);
          color: #fff; font-weight: 700; padding: 15px 38px;
          border-radius: 50px; text-decoration: none; cursor: pointer; border: none;
          font-size: .95rem; letter-spacing: .3px;
          box-shadow: 0 8px 28px rgba(0,200,150,.3);
          transition: transform .25s, box-shadow .25s;
        }
        .ca-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(0,200,150,.42); }
        .ca-btn-outline {
          display: inline-block; border: 1.5px solid rgba(0,200,150,.35); color: #00c896;
          padding: 13px 30px; border-radius: 50px; text-decoration: none;
          font-size: .88rem; font-weight: 600; transition: background .25s, border-color .25s;
        }
        .ca-btn-outline:hover { background: rgba(0,200,150,.08); border-color: rgba(0,200,150,.6); }
        .ca-section-label { font-size: .7rem; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: #00c896; margin-bottom: 12px; }
        .ca-h2 { font-family: var(--font-body); font-weight: 800; font-size: clamp(1.8rem,4vw,2.8rem); color: var(--color-text-body); line-height: 1.12; }
        .ca-stat-box { background: rgba(0,200,150,.06); border: 1px solid rgba(0,200,150,.17); border-radius: 14px; padding: 24px 18px; text-align: center; }
        .ca-harvard-bar {
          background: linear-gradient(135deg, rgba(201,168,76,.08), rgba(0,200,150,.05));
          border: 1px solid rgba(201,168,76,.2);
          border-radius: 14px; padding: 18px 22px;
          display: flex; align-items: center; gap: 16;
        }
        .ca-format-tag {
          display: inline-block; padding: 3px 12px; border-radius: 50px;
          font-size: .65rem; font-weight: 800; letter-spacing: 1.2px;
          text-transform: uppercase; margin-bottom: 12px;
        }
        .ca-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,.7); z-index: 1000;
          display: flex; align-items: center; justify-content: center; padding: 24px;
        }
        .ca-modal {
          background: #0e2b1f; border: 1px solid rgba(0,200,150,.25); border-radius: 20px;
          padding: 40px 36px; width: 100%; max-width: 480px; position: relative;
        }
        .ca-input {
          width: 100%; background: rgba(255,255,255,.05); border: 1px solid rgba(0,200,150,.2);
          border-radius: 10px; padding: 12px 16px; color: #FAFDF8;
          font-size: .88rem; font-family: inherit; outline: none; box-sizing: border-box;
          transition: border-color .2s;
        }
        .ca-input:focus { border-color: rgba(0,200,150,.5); }
        .ca-input::placeholder { color: rgba(255,255,255,.3); }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ padding: "116px 24px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at 10% 60%, rgba(0,200,150,.1), transparent 48%), radial-gradient(ellipse at 88% 18%, rgba(201,168,76,.06), transparent 42%)" }} />
        <div className="max-w-5xl mx-auto text-center" style={{ position: "relative", zIndex: 2 }}>
          <Reveal>
            <div className="ca-badge">
              <span className="ca-pulse" />
              Corporate AI Upskilling · L&amp;D / HR / CXO
            </div>
            <h1 style={{ fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "clamp(1.85rem,5vw,3.5rem)", lineHeight: 1.08, color: "var(--color-text-body)", marginBottom: 22, letterSpacing: "-.015em" }}>
              Your Teams Are Already Using AI.<br />
              Is It Making Them Better —<br />
              <span className="ca-accent">or Just Faster at Being Wrong?</span>
            </h1>
            <p style={{ fontSize: "clamp(.97rem,2vw,1.15rem)", color: "var(--color-text-muted, #7A9E8A)", lineHeight: 1.8, maxWidth: 680, margin: "0 auto 18px" }}>
              Lyfshilp's Corporate AI Upskilling program trains your teams to use AI tools the right way — improving output quality, reducing rework, and unlocking real productivity gains.
            </p>
          </Reveal>

          {/* Harvard stat callout */}
          <Reveal delay={0.1}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "rgba(201,168,76,.08)", border: "1px solid rgba(201,168,76,.22)", borderRadius: 12, padding: "12px 22px", margin: "0 auto 38px", maxWidth: 560 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(201,168,76,.14)", border: "1px solid rgba(201,168,76,.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontWeight: 900, fontSize: ".65rem", color: "#C9A84C", letterSpacing: ".5px" }}>HBS</div>
              <p style={{ color: "rgba(201,168,76,.9)", fontSize: ".82rem", lineHeight: 1.6, margin: 0, textAlign: "left" }}>
                <strong>Harvard Business School:</strong> AI-assisted professionals complete tasks <strong>40–55% faster</strong> and at higher quality.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="ca-btn-primary" onClick={() => setFormOpen(true)}>Request a Proposal →</button>
              <a href="https://wa.me/917042671115" className="ca-btn-outline">Schedule a Discovery Call</a>
            </div>
          </Reveal>

          {/* trust strip */}
          <Reveal delay={0.16} style={{ marginTop: 44 }}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 }}>
              {["DPIIT Recognised", "Harvard-Backed Methodology", "IIT · IIM · Stanford Trainers", "Online & On-Site"].map((t) => (
                <span key={t} style={{ padding: "5px 15px", borderRadius: 50, background: "rgba(0,200,150,.06)", border: "1px solid rgba(0,200,150,.16)", fontSize: ".7rem", color: "var(--color-text-muted, #7A9E8A)", fontWeight: 600, letterSpacing: ".5px" }}>{t}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <div className="ca-divider" />

      {/* ── STAT STRIP ── */}
      <section style={{ padding: "52px 24px" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 items-stretch">
          {STAT_CARDS.map(({ value, label, sub }, i) => (
            <Reveal key={label} delay={i * 0.08} className="h-full">
              <div className="ca-stat-box" style={{ height: "100%", minHeight: 162, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div style={{ fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "clamp(1.1rem,2.2vw,1.6rem)", color: "#00c896", lineHeight: 1.1, marginBottom: 8 }}>{value}</div>
                <div style={{ color: "var(--color-text-body)", fontSize: ".78rem", fontWeight: 700, marginBottom: 4 }}>{label}</div>
                <div style={{ color: "var(--color-text-muted, #7A9E8A)", fontSize: ".68rem", fontWeight: 500 }}>{sub}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="ca-divider" />

      {/* ── WHAT WE TRAIN ── */}
      <section style={{ padding: "80px 24px" }}>
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center" style={{ marginBottom: 52 }}>
            <div className="ca-section-label">Programme Content</div>
            <h2 className="ca-h2">What We <span className="ca-accent">Train</span></h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Modules */}
            <Reveal delay={0.05}>
              <div className="ca-card h-full" style={{ padding: "30px 28px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 11, background: "rgba(0,200,150,.1)", border: "1px solid rgba(0,200,150,.24)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00c896" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
                  </div>
                  <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "1rem", color: "var(--color-text-body)" }}>Programme Modules</span>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                  {MODULES.map((item, i) => (
                    <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(0,200,150,.1)", border: "1px solid rgba(0,200,150,.28)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1, fontSize: ".6rem", fontWeight: 900, color: "#00c896" }}>{i + 1}</span>
                      <span style={{ color: "var(--color-text-muted, #7A9E8A)", fontSize: ".88rem", lineHeight: 1.65 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Formats */}
            <Reveal delay={0.1}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, height: "100%" }}>
                <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "1rem", color: "var(--color-text-body)", padding: "0 4px", marginBottom: 2 }}>Programme Formats</div>
                {FORMATS.map(({ tag, title, desc, accent }) => (
                  <div key={title} className="ca-card ca-card-hover" style={{ padding: "18px 20px", flex: 1 }}>
                    <div style={{ marginBottom: 6 }}>
                      <span className="ca-format-tag" style={{ background: `${accent}14`, border: `1px solid ${accent}36`, color: accent }}>{tag}</span>
                      <span style={{ fontWeight: 700, fontSize: ".9rem", color: "var(--color-text-body)", marginLeft: 8 }}>{title}</span>
                    </div>
                    <p style={{ color: "var(--color-text-muted, #7A9E8A)", fontSize: ".82rem", lineHeight: 1.6, margin: 0 }}>{desc}</p>
                  </div>
                ))}
                <div className="ca-card" style={{ padding: "14px 20px", background: "rgba(0,200,150,.04)" }}>
                  <p style={{ color: "var(--color-text-muted, #7A9E8A)", fontSize: ".8rem", margin: 0 }}>
                    <strong style={{ color: "#00c896" }}>Delivery:</strong> Online or on-site &nbsp;·&nbsp; <strong style={{ color: "#00c896" }}>Team size:</strong> 10 to 500+
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="ca-divider" />

      {/* ── WHY LYFSHILP ── */}
      <section style={{ padding: "80px 24px", background: "rgba(0,200,150,.025)" }}>
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center" style={{ marginBottom: 52 }}>
            <div className="ca-section-label">Why Choose Us</div>
            <h2 className="ca-h2">Why Lyfshilp for <span className="ca-accent">Corporate Training</span></h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY.map(({ icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="ca-card ca-card-hover h-full" style={{ padding: "26px 22px" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 13, background: "rgba(0,200,150,.1)", border: "1px solid rgba(0,200,150,.24)", display: "flex", alignItems: "center", justifyContent: "center", color: "#00c896", marginBottom: 18 }}>
                    {icon}
                  </div>
                  <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: ".95rem", color: "var(--color-text-body)", marginBottom: 10, lineHeight: 1.3 }}>{title}</h3>
                  <p style={{ color: "var(--color-text-muted, #7A9E8A)", fontSize: ".84rem", lineHeight: 1.7, margin: 0 }}>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="ca-divider" />

      {/* ── PROCESS ── */}
      <section style={{ padding: "80px 24px" }}>
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center" style={{ marginBottom: 52 }}>
            <div className="ca-section-label">How It Works</div>
            <h2 className="ca-h2">From Proposal to <span className="ca-accent">Programme Delivery</span></h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { n: "01", title: "Discovery Call", desc: "30-min call to understand your team's current AI maturity, roles, and goals." },
              { n: "02", title: "Custom Proposal", desc: "We design a programme outline, format, timeline and commercial proposal." },
              { n: "03", title: "Kickoff & Delivery", desc: "Sessions delivered online or on-site, with live exercises throughout." },
              { n: "04", title: "Toolkit Handover", desc: "Each participant receives a personalised AI Prompt Library for their role." },
            ].map(({ n, title, desc }, i) => (
              <Reveal key={n} delay={i * 0.09}>
                <div className="ca-card" style={{ padding: "24px 20px", textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-body)", fontWeight: 900, fontSize: "2rem", color: "rgba(0,200,150,.18)", lineHeight: 1, marginBottom: 12 }}>{n}</div>
                  <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: ".92rem", color: "var(--color-text-body)", marginBottom: 8, lineHeight: 1.3 }}>{title}</h3>
                  <p style={{ color: "var(--color-text-muted, #7A9E8A)", fontSize: ".8rem", lineHeight: 1.65, margin: 0 }}>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="ca-divider" />

      {/* ── CTA ── */}
      <section style={{ padding: "96px 24px" }}>
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <div className="ca-section-label" style={{ marginBottom: 14 }}>Get Started</div>
            <h2 style={{ fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "clamp(1.9rem,4.5vw,3rem)", color: "var(--color-text-body)", lineHeight: 1.1, marginBottom: 14 }}>
              Ready to Make Your Team<br />
              <span className="ca-accent">40% More Productive?</span>
            </h2>
            <p style={{ color: "var(--color-text-muted, #7A9E8A)", fontSize: ".9rem", lineHeight: 1.7, marginBottom: 38 }}>
              Trusted by organisations across India. DPIIT Recognised.
            </p>

            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
              <button className="ca-btn-primary" style={{ padding: "17px 42px", fontSize: "1rem" }} onClick={() => setFormOpen(true)}>
                Request a Proposal →
              </button>
              <a href="https://wa.me/917042671115" className="ca-btn-outline" style={{ padding: "17px 32px" }}>
                Schedule a Discovery Call
              </a>
            </div>

            <div style={{ marginTop: 20, display: "flex", gap: 18, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://wa.me/917042671115" style={{ display: "flex", alignItems: "center", gap: 7, color: "var(--color-text-muted, #7A9E8A)", textDecoration: "none", fontSize: ".84rem" }}>
                <span style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(0,200,150,.1)", border: "1px solid rgba(0,200,150,.26)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".55rem", fontWeight: 800, color: "#00c896" }}>WA</span>
                +91 70426 71115
              </a>
              <a href="mailto:futurex@lyfshilpacademy.com" style={{ display: "flex", alignItems: "center", gap: 7, color: "var(--color-text-muted, #7A9E8A)", textDecoration: "none", fontSize: ".84rem" }}>
                <span style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(0,200,150,.1)", border: "1px solid rgba(0,200,150,.26)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".55rem", fontWeight: 800, color: "#00c896" }}>EM</span>
                futurex@lyfshilpacademy.com
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PROPOSAL MODAL ── */}
      {formOpen && (
        <div className="ca-overlay" onClick={(e) => e.target === e.currentTarget && setFormOpen(false)}>
          <div className="ca-modal">
            <button onClick={() => setFormOpen(false)} style={{ position: "absolute", top: 18, right: 20, background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,.4)", fontSize: "1.3rem", lineHeight: 1 }} aria-label="Close">✕</button>
            <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "1.3rem", color: "var(--color-text-body)", marginBottom: 6 }}>Request a Proposal</h3>
            <p style={{ color: "var(--color-text-muted, #7A9E8A)", fontSize: ".82rem", marginBottom: 24 }}>We'll get back to you within 24 hours with a custom programme outline.</p>
            <form
              onSubmit={(e) => { e.preventDefault(); setFormOpen(false); window.location.href = "/contact"; }}
              style={{ display: "flex", flexDirection: "column", gap: 14 }}
            >
              <input className="ca-input" type="text" placeholder="Company / Organisation name" required />
              <input className="ca-input" type="number" placeholder="Team size (approximate)" min="1" required />
              <input className="ca-input" type="text" placeholder="Your role (e.g. L&D Head, HR Director)" required />
              <input className="ca-input" type="email" placeholder="Work email" required />
              <textarea className="ca-input" placeholder="What are your key training goals?" rows={3} style={{ resize: "vertical" }} />
              <button type="submit" className="ca-btn-primary" style={{ marginTop: 6, padding: "14px 24px", width: "100%", textAlign: "center" }}>
                Submit Request →
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
