import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* ── scroll reveal ── */
const useInView = (threshold = 0.12) => {
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

const Reveal = ({ children, delay = 0, className = "" }) => {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

/* ── data ── */
const STATS = [
  { value: "10", label: "Live Online Sessions" },
  { value: "90", label: "Minutes Each" },
  { value: "May–Jun", label: "2026 Batch" },
  { value: "₹2,999", label: "+ GST" },
];

const TRACK_A = [
  "School subject mastery with AI",
  "Olympiad prep: NSO, IMO, NTSE, IEO",
  "JEE / NEET foundation building",
  "AI-powered study plan & revision",
  "Prompt library for all subjects",
];

const TRACK_B = [
  "Board exam strategy with AI",
  "JEE / NEET / CLAT / CA Foundation prep",
  "Error diary from mock test analysis",
  "Advanced prompt engineering",
  "6-month competitive exam roadmap",
];

const BUILDS = [
  { label: "A personal Prompt Library for every school subject" },
  { label: "A Personalised AI Mentor — built by the student, for the student — guiding their entire education journey" },
  { label: "A 6-month AI-generated, adaptive Study Plan" },
  { label: "An Error Diary from AI-powered mock test analysis" },
  { label: "A Future Topics Map linking school chapters to JEE / NEET / CLAT / CA" },
  { label: "Significant reduction in dependency on paid coaching — students free up time and cost" },
];

const SESSIONS = [
  { n: 1, title: "Welcome to Your AI Study Buddy", a: "Setup, golden rule pledge, first smart question", b: "AI fundamentals, learning vs cheating framework" },
  { n: 2, title: "Becoming a Prompt Pro", a: "4 prompt types, subject-specific prompting", b: "5 prompt frameworks, JEE/NEET/CA prompting" },
  { n: 3, title: "AI-Powered Concept Mastery", a: "Teach Back Method, 5 Ways Trick", b: "Feynman Technique, multi-angle learning" },
  { n: 4, title: "Cracking Maths with AI", a: "Math Protocol, Olympiad thinking", b: "Solve-Compare-Learn loop, error pattern analysis" },
  { n: 5, title: "Science Mastery / Study Planning", a: "Making Science visual with AI", b: "Personalised study plan with AI diagnostics" },
  { n: 6, title: "Olympiad & Quantitative Prep", a: "NSO/IMO/NTSE strategy, pattern recognition", b: "JEE/NEET math, CA accountancy with AI" },
  { n: 7, title: "Study Planning Deep Dive", a: "Spaced repetition, balanced weekly plan", b: "Physics, Chemistry, Biology with AI" },
  { n: 8, title: "AI-Powered Mock Tests", a: "Chapter-wise tests, Error Detective method", b: "Full JEE/NEET/CA format mocks, post-test analysis" },
  { n: 9, title: "Competitive Exam Connections", a: "NCERT-to-JEE/NEET bridge, Future Topics Map", b: "Complete daily workflow, revision system" },
  { n: 10, title: "Graduation & 6-Month Roadmap", a: "AI Toolkit showcase, Young Achievers community", b: "Live exam simulation, personalised 6-month plan" },
];

const PRIZES = [
  { rank: "1st Prize", amount: "₹50,000", accent: "#C9A84C" },
  { rank: "2nd Prize", amount: "₹25,000", accent: "#a8b8c8" },
  { rank: "3rd Prize", amount: "₹10,000", accent: "#b87333" },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the fee for the AI Summer Programme?",
      acceptedAnswer: { "@type": "Answer", text: "₹2,999 + GST. Complimentary for students at Lyfshilp partner schools with 30+ enrolments." },
    },
    {
      "@type": "Question",
      name: "Is this programme online or offline?",
      acceptedAnswer: { "@type": "Answer", text: "The programme is fully online — 10 live sessions conducted over video call." },
    },
    {
      "@type": "Question",
      name: "Which exams does the AI Summer Programme cover?",
      acceptedAnswer: { "@type": "Answer", text: "It covers Board Exams, JEE, NEET, CLAT, CA Foundation, NTSE, NSO, IMO, and IEO depending on the track chosen." },
    },
  ],
};

export default function SummerProgramme() {
  const [openSession, setOpenSession] = useState(null);

  /* SEO */
  useEffect(() => {
    document.title = "AI Summer Programme 2026 for Class 6-12 | JEE NEET Board Prep | Lyfshilp Academy";
    const setMeta = (name, content, prop = false) => {
      const sel = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let tag = document.querySelector(sel);
      if (!tag) { tag = document.createElement("meta"); tag[prop ? "setAttribute" : "setAttribute"](prop ? "property" : "name", name); document.head.appendChild(tag); }
      tag.setAttribute("content", content);
    };
    setMeta("description", "Lyfshilp's 10-session AI Summer Programme (May–June 2026) helps students in Class 6–12 master AI for Board Exams, JEE, NEET, CLAT & Olympiads. ₹2,999 + GST. Win from ₹85,000 prize pool.");
    setMeta("keywords", "AI summer program Class 6 12, JEE NEET prep AI 2026, summer AI course for students India, online AI course school students, board exam AI preparation, NTSE Olympiad preparation AI");
  }, []);

  return (
    <div style={{ background: "var(--color-bg-primary)", color: "var(--color-text-body)", fontFamily: "var(--font-body)" }}>
      {/* FAQ schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />

      <style>{`
        .sp-accent   { color: #00c896; }
        .sp-gold     { color: var(--color-gold, #C9A84C); }
        .sp-card     { background: rgba(255,255,255,.04); border: 1px solid rgba(0,200,150,.16); border-radius: 16px; }
        .sp-card-hover { transition: border-color .3s, background .3s, transform .3s; }
        .sp-card-hover:hover { border-color: rgba(0,200,150,.35); background: rgba(0,200,150,.07); transform: translateY(-4px); }
        .sp-btn-primary {
          display: inline-block;
          background: linear-gradient(135deg, #00c896, #128061);
          color: #fff; font-weight: 700; padding: 16px 36px;
          border-radius: 50px; text-decoration: none;
          font-size: .97rem; letter-spacing: .3px;
          box-shadow: 0 8px 28px rgba(0,200,150,.35);
          transition: transform .25s, box-shadow .25s;
        }
        .sp-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(0,200,150,.45); }
        .sp-btn-outline {
          display: inline-block;
          border: 1.5px solid rgba(0,200,150,.4); color: #00c896;
          padding: 14px 32px; border-radius: 50px; text-decoration: none;
          font-size: .92rem; font-weight: 600;
          transition: border-color .25s, background .25s;
        }
        .sp-btn-outline:hover { background: rgba(0,200,150,.1); border-color: rgba(0,200,150,.7); }
        .sp-divider { height: 1px; background: rgba(0,200,150,.12); margin: 0; }
        .sp-stat-card { background: rgba(0,200,150,.07); border: 1px solid rgba(0,200,150,.2); border-radius: 14px; padding: 24px 20px; text-align: center; }
        .sp-session-row { border-bottom: 1px solid rgba(0,200,150,.1); }
        .sp-session-row:last-child { border-bottom: none; }
        .sp-track-pill-a { background: rgba(0,200,150,.12); color: #00c896; border-radius: 6px; padding: 2px 10px; font-size: .7rem; font-weight: 700; letter-spacing: .8px; text-transform: uppercase; }
        .sp-track-pill-b { background: rgba(201,168,76,.12); color: #C9A84C; border-radius: 6px; padding: 2px 10px; font-size: .7rem; font-weight: 700; letter-spacing: .8px; text-transform: uppercase; }
        .sp-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(0,200,150,.12); border: 1px solid rgba(0,200,150,.3); color: #00c896; padding: 5px 16px; border-radius: 50px; font-size: .72rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 22px; }
        .sp-pulse { width: 7px; height: 7px; border-radius: 50%; background: #00c896; display: inline-block; animation: sp-pulse 1.6s infinite; }
        @keyframes sp-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.4)} }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ padding: "120px 24px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(circle at 20% 50%, rgba(0,200,150,.11), transparent 45%), radial-gradient(circle at 80% 20%, rgba(201,168,76,.07), transparent 40%)" }} />
        <div className="max-w-5xl mx-auto text-center" style={{ position: "relative", zIndex: 2 }}>
          <Reveal>
            <div className="sp-badge">
              <span className="sp-pulse" />
              AI Summer Programme 2026
            </div>
            <h1 style={{ fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "clamp(2.2rem,5vw,3.8rem)", lineHeight: 1.1, color: "var(--color-text-body)", marginBottom: 24, letterSpacing: "-.01em" }}>
              Don't Let the Summer Break<br />
              <span className="sp-accent">Cost Them a Year.</span>
            </h1>
            <p style={{ fontSize: "clamp(1rem,2vw,1.2rem)", color: "var(--color-text-muted)", lineHeight: 1.8, maxWidth: 680, margin: "0 auto 40px" }}>
              10 live AI sessions. Real exam prep. A national prize pool of ₹85,000. The Lyfshilp AI Summer Programme is the only programme that gives your child a complete, personalised AI-powered academic system — before school starts again.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/contact" className="sp-btn-primary">Enroll Now — ₹2,999 + GST →</Link>
              <a href="#curriculum" className="sp-btn-outline">View Curriculum</a>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="sp-divider" />

      {/* ── STATS STRIP ── */}
      <section style={{ padding: "56px 24px" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map(({ value, label }, i) => (
            <Reveal key={label} delay={i * 0.08}>
              <div className="sp-stat-card">
                <div style={{ fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "clamp(1.6rem,3vw,2.4rem)", color: "#00c896", lineHeight: 1, marginBottom: 8 }}>{value}</div>
                <div style={{ color: "var(--color-text-muted)", fontSize: ".82rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>{label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="sp-divider" />

      {/* ── TWO TRACKS ── */}
      <section style={{ padding: "80px 24px" }}>
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center" style={{ marginBottom: 48 }}>
            <div style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "#00c896", marginBottom: 12 }}>Choose Your Track</div>
            <h2 style={{ fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "var(--color-text-body)", lineHeight: 1.15 }}>
              Two Tracks. <span className="sp-accent">One Outcome.</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Track A */}
            <Reveal delay={0.05}>
              <div className="sp-card h-full" style={{ padding: "32px 28px" }}>
                <div style={{ marginBottom: 20 }}>
                  <span className="sp-track-pill-a">Track A</span>
                  <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "1.25rem", color: "var(--color-text-body)", marginTop: 14, marginBottom: 4 }}>Class 6 to 8</h3>
                  <div style={{ height: 2, width: 40, background: "#00c896", borderRadius: 2, marginBottom: 20 }} />
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                  {TRACK_A.map((item, i) => (
                    <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00c896", flexShrink: 0, marginTop: 8 }} />
                      <span style={{ color: "var(--color-text-muted)", fontSize: ".9rem", lineHeight: 1.6 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Track B */}
            <Reveal delay={0.1}>
              <div className="sp-card h-full" style={{ padding: "32px 28px", borderColor: "rgba(201,168,76,.2)" }}>
                <div style={{ marginBottom: 20 }}>
                  <span className="sp-track-pill-b">Track B</span>
                  <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "1.25rem", color: "var(--color-text-body)", marginTop: 14, marginBottom: 4 }}>Class 9 to 12</h3>
                  <div style={{ height: 2, width: 40, background: "#C9A84C", borderRadius: 2, marginBottom: 20 }} />
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                  {TRACK_B.map((item, i) => (
                    <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C9A84C", flexShrink: 0, marginTop: 8 }} />
                      <span style={{ color: "var(--color-text-muted)", fontSize: ".9rem", lineHeight: 1.6 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="sp-divider" />

      {/* ── WHAT STUDENTS BUILD ── */}
      <section style={{ padding: "80px 24px" }}>
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center" style={{ marginBottom: 48 }}>
            <div style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "#00c896", marginBottom: 12 }}>Outcomes</div>
            <h2 style={{ fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "var(--color-text-body)", lineHeight: 1.15 }}>
              What Every Student <span className="sp-accent">Builds</span> Across 10 Sessions
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BUILDS.map(({ label }, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="sp-card sp-card-hover h-full" style={{ padding: "22px 20px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(0,200,150,.12)", border: "1px solid rgba(0,200,150,.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontWeight: 800, fontSize: ".72rem", color: "#00c896" }}>
                    {i + 1}
                  </div>
                  <p style={{ color: "var(--color-text-muted)", fontSize: ".87rem", lineHeight: 1.65, margin: 0 }}>{label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="sp-divider" />

      {/* ── CURRICULUM ── */}
      <section id="curriculum" style={{ padding: "80px 24px" }}>
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center" style={{ marginBottom: 48 }}>
            <div style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "#00c896", marginBottom: 12 }}>Curriculum</div>
            <h2 style={{ fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "var(--color-text-body)", lineHeight: 1.15 }}>
              10-Session <span className="sp-accent">Curriculum Overview</span>
            </h2>
            <p style={{ color: "var(--color-text-muted)", fontSize: ".95rem", marginTop: 12 }}>Click any session to expand details.</p>
          </Reveal>

          <div className="sp-card" style={{ overflow: "hidden" }}>
            {SESSIONS.map(({ n, title, a, b }) => (
              <div key={n} className="sp-session-row">
                <button
                  onClick={() => setOpenSession(openSession === n ? null : n)}
                  style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "18px 24px", display: "flex", alignItems: "center", gap: 16, textAlign: "left" }}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: openSession === n ? "rgba(0,200,150,.22)" : "rgba(0,200,150,.08)", border: "1px solid rgba(0,200,150,.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontWeight: 800, fontSize: ".78rem", color: "#00c896", transition: "background .25s" }}>
                    S{n}
                  </div>
                  <span style={{ fontWeight: 700, fontSize: ".95rem", color: "var(--color-text-body)", flex: 1 }}>{title}</span>
                  <span style={{ color: "#00c896", fontSize: "1.1rem", transition: "transform .25s", transform: openSession === n ? "rotate(180deg)" : "none" }}>
                    ▾
                  </span>
                </button>

                {openSession === n && (
                  <div style={{ padding: "0 24px 20px 76px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div style={{ background: "rgba(0,200,150,.06)", borderRadius: 10, padding: "14px 16px" }}>
                      <div className="sp-track-pill-a" style={{ display: "inline-block", marginBottom: 8 }}>Track A · Cl. 6–8</div>
                      <p style={{ color: "var(--color-text-muted)", fontSize: ".84rem", lineHeight: 1.6, margin: 0 }}>{a}</p>
                    </div>
                    <div style={{ background: "rgba(201,168,76,.06)", borderRadius: 10, padding: "14px 16px" }}>
                      <div className="sp-track-pill-b" style={{ display: "inline-block", marginBottom: 8 }}>Track B · Cl. 9–12</div>
                      <p style={{ color: "var(--color-text-muted)", fontSize: ".84rem", lineHeight: 1.6, margin: 0 }}>{b}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="sp-divider" />

      {/* ── CHALLENGE ── */}
      <section style={{ padding: "80px 24px", background: "rgba(0,200,150,.04)" }}>
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center" style={{ marginBottom: 48 }}>
            <div style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "#C9A84C", marginBottom: 12 }}>Prize Pool ₹85,000</div>
            <h2 style={{ fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "var(--color-text-body)", lineHeight: 1.15 }}>
              Compete. Win. <span className="sp-gold">Get Recognised Nationally.</span>
            </h2>
            <p style={{ color: "var(--color-text-muted)", fontSize: ".97rem", maxWidth: 620, margin: "16px auto 0", lineHeight: 1.8 }}>
              Every student builds an AI Academic Toolkit across the 10 sessions. The top 20 projects from all participating schools across India are shortlisted and presented before a distinguished panel of professors, senior bureaucrats, and startup founders.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-5 max-w-2xl mx-auto">
            {PRIZES.map(({ rank, amount, accent }, i) => (
              <Reveal key={rank} delay={i * 0.1}>
                <div style={{ background: `${accent}12`, border: `1px solid ${accent}33`, borderRadius: 16, padding: "28px 20px", textAlign: "center" }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, margin: "0 auto 14px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: ".9rem", color: accent, border: `1px solid ${accent}55`, background: `${accent}18` }}>
                    {i + 1}
                  </div>
                  <div style={{ fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "1.5rem", color: accent, lineHeight: 1, marginBottom: 6 }}>{amount}</div>
                  <div style={{ color: "var(--color-text-muted)", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".5px" }}>{rank}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="text-center" style={{ marginTop: 40 }}>
            <Link to="/contact" className="sp-btn-primary">Enroll Now and Compete →</Link>
          </Reveal>
        </div>
      </section>

      <div className="sp-divider" />

      {/* ── CTA ── */}
      <section style={{ padding: "96px 24px" }}>
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <div style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "#00c896", marginBottom: 14 }}>Limited Seats</div>
            <h2 style={{ fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "clamp(2rem,4vw,3rem)", color: "var(--color-text-body)", lineHeight: 1.1, marginBottom: 28 }}>
              Seats are limited.<br />
              <span className="sp-accent">Summer 2026 fills fast.</span>
            </h2>

            <Link to="/contact" className="sp-btn-primary" style={{ fontSize: "1.05rem", padding: "18px 44px" }}>
              Enroll Now — ₹2,999 + GST →
            </Link>

            <p style={{ color: "var(--color-text-muted)", fontSize: ".82rem", marginTop: 16, lineHeight: 1.7 }}>
              Complimentary for students at Lyfshilp partner schools (30+ enrolments)
            </p>

            <div style={{ marginTop: 28, display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://wa.me/917042671115" style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--color-text-muted)", textDecoration: "none", fontSize: ".85rem" }}>
                <span style={{ width: 30, height: 30, borderRadius: 9, background: "rgba(0,200,150,.12)", border: "1px solid rgba(0,200,150,.3)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: ".6rem", color: "#00c896" }}>WA</span>
                +91 70426 71115
              </a>
              <a href="mailto:service.excellence@lyfshilpacademy.com" style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--color-text-muted)", textDecoration: "none", fontSize: ".85rem" }}>
                <span style={{ width: 30, height: 30, borderRadius: 9, background: "rgba(0,200,150,.12)", border: "1px solid rgba(0,200,150,.3)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: ".6rem", color: "#00c896" }}>EM</span>
                service.excellence@lyfshilpacademy.com
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
