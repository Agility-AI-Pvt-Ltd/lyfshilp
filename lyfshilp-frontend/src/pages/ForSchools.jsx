import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* ── scroll reveal helper ── */
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
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(26px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/* ── data ── */
const INITIATIVES = [
  {
    num: "01",
    badge: "FREE",
    badgeColor: "#00c896",
    title: "Teacher AI Productivity Workshop",
    subtitle: "Free for partner schools",
    desc: "3-hour hands-on session delivered at your school. Every teacher leaves with a ready-to-use AI Prompt Toolkit for their subject.",
    highlight: "Harvard Business School study: professionals using AI complete tasks 40–55% faster.",
    cta: null,
    ctaLink: null,
  },
  {
    num: "02",
    badge: "FREE",
    badgeColor: "#00c896",
    title: "Student AI Awareness Workshops",
    subtitle: "Free for partner schools",
    desc: "60-minute interactive session per segment. Segment A: Class 6–8. Segment B: Class 9–12. Covers ethical AI use, prompting basics, and board/competitive exam preparation.",
    highlight: null,
    cta: null,
    ctaLink: null,
  },
  {
    num: "03",
    badge: "₹2,999 + GST",
    badgeColor: "#C9A84C",
    title: "10-Session AI Summer Programme",
    subtitle: "Per student",
    desc: "10 live online sessions (May–June 2026). Track A: Cl. 6–8. Track B: Cl. 9–12. Students build a complete AI-powered academic toolkit.",
    highlight: "National competition: Prize pool ₹85,000.",
    cta: "Learn More →",
    ctaLink: "/summer-programme",
  },
];

const SCHOOL_GETS = [
  "NEP 2020 AI literacy compliance — ready documentation",
  "Zero cost, zero faculty burden on all workshops",
  "Co-branded certificates — school name on every cert",
  "Dedicated School Coordinator — one point of contact",
  "Weekly parent progress reports to build school trust",
  "Reputation as a Future-Ready Institution",
  "Differentiated school communications and marketing",
];

const STUDENTS_GET = [
  "Practical AI skills — not theory",
  "One-time fee, no recurring coaching cost",
  "Personalised AI Mentor built by the student",
  "Session recordings for unlimited revision",
  "National AI Scholar Challenge — cash prizes",
  "6-month personalised roadmap",
  "Community access: Young Achievers WhatsApp group",
];

const STEPS = [
  { n: 1, title: "Principal Approves", desc: "Principal approves partnership and nominates a school coordinator." },
  { n: 2, title: "Parent Circular Sent", desc: "Lyfshilp shares a parent communication template — school sends one circular." },
  { n: 3, title: "Teacher Workshop", desc: "Teacher AI Workshop date confirmed and delivered at your school." },
  { n: 4, title: "Student Awareness", desc: "Student AI Awareness Workshop delivered (both segments) before summer break." },
  { n: 5, title: "Summer Batch Begins", desc: "Summer Programme batch begins — school's role is now complete." },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the cost of the FutureX Fellowship for schools?",
      acceptedAnswer: { "@type": "Answer", text: "The Teacher AI Workshop and Student AI Awareness Sessions are completely free for partner schools. The 10-session AI Summer Programme is ₹2,999 + GST per student." },
    },
    {
      "@type": "Question",
      name: "Does this require any teacher involvement or admin work?",
      acceptedAnswer: { "@type": "Answer", text: "No. There is zero faculty burden. Lyfshilp handles all sessions, coordination, and reporting. The school only needs to share one parent circular." },
    },
    {
      "@type": "Question",
      name: "Is the FutureX Fellowship aligned with NEP 2020?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. The programme delivers AI literacy in line with NEP 2020 guidelines and provides ready documentation for schools." },
    },
    {
      "@type": "Question",
      name: "Which classes can participate?",
      acceptedAnswer: { "@type": "Answer", text: "All initiatives cover Classes 6 to 12. The Summer Programme is split into Track A (Classes 6–8) and Track B (Classes 9–12)." },
    },
  ],
};

export default function ForSchools() {
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    document.title = "AI Education Program for Schools | FutureX Fellowship by Lyfshilp Academy";
    const setMeta = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) { tag = document.createElement("meta"); tag.setAttribute("name", name); document.head.appendChild(tag); }
      tag.setAttribute("content", content);
    };
    setMeta("description", "Partner your school with Lyfshilp's International FutureX Fellowship — free teacher AI workshops, student AI awareness sessions, and a 6-month entrepreneurship program for Classes 6–12. NEP 2020 aligned. Zero admin burden.");
    setMeta("keywords", "AI program for schools India, school AI workshop, FutureX Fellowship school partnership, NEP 2020 AI education, school entrepreneurship program India, AI awareness program students");
  }, []);

  return (
    <div style={{ background: "var(--color-bg-primary, #0C2D1E)", color: "var(--color-text-body, #FAFDF8)", fontFamily: "var(--font-body, 'DM Sans',sans-serif)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />

      <style>{`
        .fs-accent   { color: #00c896; }
        .fs-gold     { color: var(--color-gold, #C9A84C); }
        .fs-divider  { height: 1px; background: rgba(0,200,150,.1); }
        .fs-card {
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(0,200,150,.14);
          border-radius: 18px;
        }
        .fs-card-hover {
          transition: border-color .3s, background .3s, transform .3s;
        }
        .fs-card-hover:hover {
          border-color: rgba(0,200,150,.32);
          background: rgba(0,200,150,.06);
          transform: translateY(-4px);
        }
        .fs-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(0,200,150,.1);
          border: 1px solid rgba(0,200,150,.28);
          color: #00c896; padding: 5px 16px; border-radius: 50px;
          font-size: .7rem; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; margin-bottom: 22px;
        }
        .fs-pulse { width: 7px; height: 7px; border-radius: 50%; background: #00c896; display: inline-block; animation: fs-pulse 1.6s infinite; }
        @keyframes fs-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.4)} }
        .fs-btn-primary {
          display: inline-block;
          background: linear-gradient(135deg,#00c896,#128061);
          color: #fff; font-weight: 700; padding: 16px 38px;
          border-radius: 50px; text-decoration: none;
          font-size: .97rem; letter-spacing: .3px;
          box-shadow: 0 8px 28px rgba(0,200,150,.32);
          transition: transform .25s, box-shadow .25s;
        }
        .fs-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(0,200,150,.44); }
        .fs-btn-outline {
          display: inline-block;
          border: 1.5px solid rgba(0,200,150,.38); color: #00c896;
          padding: 14px 32px; border-radius: 50px; text-decoration: none;
          font-size: .9rem; font-weight: 600;
          transition: border-color .25s, background .25s;
        }
        .fs-btn-outline:hover { background: rgba(0,200,150,.09); border-color: rgba(0,200,150,.65); }
        .fs-step-connector { flex: 1; height: 1px; background: rgba(0,200,150,.2); }
        .fs-free-tag {
          display: inline-block; background: rgba(0,200,150,.14);
          border: 1px solid rgba(0,200,150,.3); color: #00c896;
          font-size: .65rem; font-weight: 800; letter-spacing: 1.5px;
          text-transform: uppercase; padding: 3px 10px; border-radius: 50px;
        }
        .fs-paid-tag {
          display: inline-block; background: rgba(201,168,76,.12);
          border: 1px solid rgba(201,168,76,.3); color: #C9A84C;
          font-size: .65rem; font-weight: 800; letter-spacing: 1.5px;
          text-transform: uppercase; padding: 3px 10px; border-radius: 50px;
        }
        .fs-faq-row { border-bottom: 1px solid rgba(0,200,150,.1); }
        .fs-faq-row:last-child { border-bottom: none; }
        .fs-highlight-box {
          background: rgba(201,168,76,.07);
          border-left: 3px solid #C9A84C;
          border-radius: 0 10px 10px 0;
          padding: 10px 14px;
          font-size: .82rem;
          color: rgba(201,168,76,.9);
          font-style: italic;
          line-height: 1.6;
          margin-top: 14px;
        }
        .fs-initiative-link {
          display: inline-flex; align-items: center; gap: 6px;
          color: #00c896; font-size: .84rem; font-weight: 600;
          text-decoration: none; margin-top: 16px;
          transition: gap .2s;
        }
        .fs-initiative-link:hover { gap: 10px; }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ padding: "116px 24px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at 15% 60%, rgba(0,200,150,.1), transparent 50%), radial-gradient(ellipse at 85% 20%, rgba(201,168,76,.07), transparent 45%)" }} />
        <div className="max-w-5xl mx-auto text-center" style={{ position: "relative", zIndex: 2 }}>
          <Reveal>
            <div className="fs-badge">
              <span className="fs-pulse" />
              For School Leadership &amp; Principals
            </div>
            <h1 style={{ fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "clamp(2.2rem,5.5vw,4rem)", lineHeight: 1.08, color: "var(--color-text-body)", marginBottom: 22, letterSpacing: "-.015em" }}>
              Give Your Students a<br />
              <span className="fs-accent">10-Year Head Start.</span>
            </h1>
            <p style={{ fontSize: "clamp(1rem,2vw,1.18rem)", color: "var(--color-text-muted, #7A9E8A)", lineHeight: 1.8, maxWidth: 640, margin: "0 auto 42px" }}>
              The International FutureX Fellowship brings AI literacy, entrepreneurship, and world-class mentorship directly to your school — at zero cost to the institution.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/contact" className="fs-btn-primary">Become a FutureX Partner School →</Link>
              <a href="https://wa.me/917042671115" className="fs-btn-outline">Schedule a Free Demo</a>
            </div>
          </Reveal>

          {/* trust bar */}
          <Reveal delay={0.15} style={{ marginTop: 52 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "10px 22px", borderRadius: 50, background: "rgba(0,200,150,.06)", border: "1px solid rgba(0,200,150,.18)", fontSize: ".8rem", color: "var(--color-text-muted, #7A9E8A)", fontWeight: 600 }}>
              <span style={{ color: "#00c896" }}>✓</span>
              Already trusted by 38 institutions across India
            </div>
          </Reveal>
        </div>
      </section>

      <div className="fs-divider" />

      {/* ── 3 INITIATIVES ── */}
      <section style={{ padding: "80px 24px" }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center" style={{ marginBottom: 52 }}>
            <div style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "#00c896", marginBottom: 12 }}>What We Bring to Your School</div>
            <h2 style={{ fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "var(--color-text-body)", lineHeight: 1.12 }}>
              The 3 Initiatives — <span className="fs-accent">One Partnership.</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {INITIATIVES.map(({ num, badge, badgeColor, title, subtitle, desc, highlight, cta, ctaLink }, i) => (
              <Reveal key={num} delay={i * 0.1}>
                <div className="fs-card fs-card-hover h-full" style={{ padding: "30px 26px", display: "flex", flexDirection: "column" }}>
                  {/* top row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                    <span style={{ fontFamily: "var(--font-body)", fontWeight: 900, fontSize: "2rem", color: "rgba(0,200,150,.18)", lineHeight: 1 }}>{num}</span>
                    <span style={{ background: `${badgeColor}18`, border: `1px solid ${badgeColor}44`, color: badgeColor, fontSize: ".65rem", fontWeight: 800, letterSpacing: "1.5px", textTransform: "uppercase", padding: "4px 12px", borderRadius: 50 }}>
                      {badge}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "1.1rem", color: "var(--color-text-body)", marginBottom: 4, lineHeight: 1.3 }}>{title}</h3>
                  <div style={{ fontSize: ".72rem", fontWeight: 600, color: badgeColor, letterSpacing: ".5px", textTransform: "uppercase", marginBottom: 16 }}>{subtitle}</div>
                  <div style={{ height: 1, background: "rgba(0,200,150,.1)", marginBottom: 16 }} />
                  <p style={{ color: "var(--color-text-muted, #7A9E8A)", fontSize: ".88rem", lineHeight: 1.7, margin: 0, flex: 1 }}>{desc}</p>
                  {highlight && (
                    <div className="fs-highlight-box">{highlight}</div>
                  )}
                  {cta && ctaLink && (
                    <Link to={ctaLink} className="fs-initiative-link">
                      {cta}
                      <span>→</span>
                    </Link>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="fs-divider" />

      {/* ── WHY PARTNER ── */}
      <section style={{ padding: "80px 24px", background: "rgba(0,200,150,.025)" }}>
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center" style={{ marginBottom: 52 }}>
            <div style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "#00c896", marginBottom: 12 }}>Partnership Value</div>
            <h2 style={{ fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "var(--color-text-body)", lineHeight: 1.12 }}>
              Why Schools <span className="fs-accent">Partner With Lyfshilp</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {/* School gets */}
            <Reveal delay={0.05}>
              <div className="fs-card h-full" style={{ padding: "30px 28px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 11, background: "rgba(0,200,150,.12)", border: "1px solid rgba(0,200,150,.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00c896" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                  </div>
                  <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "1rem", color: "var(--color-text-body)" }}>What the School Gets</span>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 13 }}>
                  {SCHOOL_GETS.map((item, i) => (
                    <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(0,200,150,.12)", border: "1px solid rgba(0,200,150,.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2, fontSize: ".6rem", color: "#00c896", fontWeight: 900 }}>✓</span>
                      <span style={{ color: "var(--color-text-muted, #7A9E8A)", fontSize: ".88rem", lineHeight: 1.6 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Students get */}
            <Reveal delay={0.1}>
              <div className="fs-card h-full" style={{ padding: "30px 28px", borderColor: "rgba(201,168,76,.18)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 11, background: "rgba(201,168,76,.1)", border: "1px solid rgba(201,168,76,.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                  </div>
                  <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "1rem", color: "var(--color-text-body)" }}>What Students Get</span>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 13 }}>
                  {STUDENTS_GET.map((item, i) => (
                    <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(201,168,76,.1)", border: "1px solid rgba(201,168,76,.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2, fontSize: ".6rem", color: "#C9A84C", fontWeight: 900 }}>→</span>
                      <span style={{ color: "var(--color-text-muted, #7A9E8A)", fontSize: ".88rem", lineHeight: 1.6 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="fs-divider" />

      {/* ── PARTNERSHIP STEPS ── */}
      <section style={{ padding: "80px 24px" }}>
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center" style={{ marginBottom: 56 }}>
            <div style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "#00c896", marginBottom: 12 }}>How It Works</div>
            <h2 style={{ fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "var(--color-text-body)", lineHeight: 1.12 }}>
              Partnership <span className="fs-accent">Next Steps</span>
            </h2>
            <p style={{ color: "var(--color-text-muted, #7A9E8A)", fontSize: ".95rem", marginTop: 12 }}>Five simple steps — we handle the heavy lifting.</p>
          </Reveal>

          {/* Desktop timeline */}
          <div className="hidden md:flex items-start gap-0" style={{ marginBottom: 16 }}>
            {STEPS.map(({ n }, i) => (
              <div key={n} style={{ flex: 1, display: "flex", alignItems: "center" }}>
                <Reveal delay={i * 0.1} style={{ flex: 1, display: "flex", alignItems: "center" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(0,200,150,.12)", border: "1px solid rgba(0,200,150,.35)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: ".88rem", color: "#00c896", zIndex: 2, position: "relative" }}>{n}</div>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,rgba(0,200,150,.35),rgba(0,200,150,.1))" }} />
                  )}
                </Reveal>
              </div>
            ))}
          </div>
          <div className="hidden md:grid" style={{ gridTemplateColumns: `repeat(${STEPS.length},1fr)`, gap: 0, marginBottom: 40 }}>
            {STEPS.map(({ n, title, desc }, i) => (
              <Reveal key={n} delay={i * 0.1} style={{ padding: "16px 12px" }}>
                <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: ".88rem", color: "var(--color-text-body)", marginBottom: 6 }}>{title}</div>
                <div style={{ color: "var(--color-text-muted, #7A9E8A)", fontSize: ".78rem", lineHeight: 1.65 }}>{desc}</div>
              </Reveal>
            ))}
          </div>

          {/* Mobile timeline */}
          <div className="flex md:hidden flex-col gap-0">
            {STEPS.map(({ n, title, desc }, i) => (
              <Reveal key={n} delay={i * 0.07}>
                <div style={{ display: "flex", gap: 16, paddingBottom: 28, position: "relative" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(0,200,150,.12)", border: "1px solid rgba(0,200,150,.35)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: ".85rem", color: "#00c896", flexShrink: 0 }}>{n}</div>
                    {i < STEPS.length - 1 && <div style={{ flex: 1, width: 1, background: "rgba(0,200,150,.2)", marginTop: 8 }} />}
                  </div>
                  <div style={{ paddingTop: 8 }}>
                    <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: ".9rem", color: "var(--color-text-body)", marginBottom: 4 }}>{title}</div>
                    <div style={{ color: "var(--color-text-muted, #7A9E8A)", fontSize: ".82rem", lineHeight: 1.65 }}>{desc}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="fs-divider" />

      {/* ── FAQ ── */}
      <section style={{ padding: "80px 24px", background: "rgba(0,200,150,.02)" }}>
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center" style={{ marginBottom: 48 }}>
            <div style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "#00c896", marginBottom: 12 }}>Common Questions</div>
            <h2 style={{ fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "clamp(1.7rem,3.5vw,2.5rem)", color: "var(--color-text-body)", lineHeight: 1.15 }}>
              Why Partner <span className="fs-accent">With Us?</span>
            </h2>
          </Reveal>

          <div className="fs-card">
            {FAQ_SCHEMA.mainEntity.map(({ name, acceptedAnswer }, i) => (
              <div key={i} className="fs-faq-row">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, textAlign: "left" }}
                >
                  <span style={{ fontWeight: 700, fontSize: ".93rem", color: "var(--color-text-body)", flex: 1, lineHeight: 1.5 }}>{name}</span>
                  <span style={{ color: "#00c896", fontSize: ".9rem", transition: "transform .25s", transform: openFaq === i ? "rotate(180deg)" : "none", flexShrink: 0 }}>▾</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 24px 20px", color: "var(--color-text-muted, #7A9E8A)", fontSize: ".88rem", lineHeight: 1.75 }}>
                    {acceptedAnswer.text}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="fs-divider" />

      {/* ── CTA ── */}
      <section style={{ padding: "96px 24px" }}>
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <div style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "#00c896", marginBottom: 14 }}>Join the Network</div>
            <h2 style={{ fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "clamp(1.9rem,4vw,3rem)", color: "var(--color-text-body)", lineHeight: 1.1, marginBottom: 10 }}>
              Join the International Network of<br />
              <span className="fs-accent">Future-Ready Institutions.</span>
            </h2>
            <p style={{ color: "var(--color-text-muted, #7A9E8A)", fontSize: ".9rem", marginBottom: 36, lineHeight: 1.7 }}>
              Already trusted by 38 institutions across India.
            </p>

            <Link to="/contact" className="fs-btn-primary" style={{ fontSize: "1.05rem", padding: "18px 44px" }}>
              Become a FutureX Partner School →
            </Link>

            <div style={{ marginTop: 20, display: "flex", gap: 8, justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
              <a href="https://wa.me/917042671115" style={{ color: "var(--color-text-muted, #7A9E8A)", textDecoration: "none", fontSize: ".85rem" }}>
                Schedule a free demo call
              </a>
              <span style={{ color: "rgba(0,200,150,.3)" }}>|</span>
              <a href="https://wa.me/917042671115" style={{ display: "flex", alignItems: "center", gap: 6, color: "#00c896", textDecoration: "none", fontSize: ".85rem", fontWeight: 600 }}>
                <span style={{ width: 26, height: 26, borderRadius: 8, background: "rgba(0,200,150,.12)", border: "1px solid rgba(0,200,150,.28)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".55rem", fontWeight: 800 }}>WA</span>
                +91 70426 71115
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
