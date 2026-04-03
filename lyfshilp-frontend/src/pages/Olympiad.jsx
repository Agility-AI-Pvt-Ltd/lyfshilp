import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";
import studentsImage from "/students-group.svg";
import LyfshilpLogo from "../assets/LyfshilpLogo.png";
import agilityLogo from "../assets/Olympiadimg/agility-logo.svg";
import PartnershipImg from "../assets/partnership.jpg";

/** Centered glow + handshake for partner-themed sections */
function PartnerHandshakeIllustration({
  size = 280,
  ariaLabel = "Partnership",
}) {
  const glow = Math.round(size * 1.18);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        width: "100%",
        minHeight: Math.max(220, size + 24),
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: glow,
          height: glow,
          background:
            "radial-gradient(circle,rgba(0,200,150,.18),transparent 62%)",
          filter: "blur(20px)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: size,
          height: size,
          margin: "0 auto",
        }}
      >
        <img
          src={PartnershipImg}
          alt={ariaLabel}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
            filter: "drop-shadow(0 12px 28px rgba(0,0,0,.35))",
            borderRadius: 18,
          }}
        />
      </div>
    </div>
  );
}

/* Partnership band handshake SVG (used in the final section only) */
function PartnershipHandshakeGraphic({
  size = 220,
  ariaLabel = "Partnership",
}) {
  const gradId = `olymp-hand-${useId().replace(/:/g, "")}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={ariaLabel}
      style={{
        display: "block",
        filter: "drop-shadow(0 12px 28px rgba(0,0,0,.35))",
      }}
    >
      <defs>
        <linearGradient
          id={gradId}
          x1="2"
          y1="2"
          x2="22"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00c896" />
          <stop offset="1" stopColor="#0d8f6a" />
        </linearGradient>
      </defs>
      <circle
        cx="12"
        cy="12"
        r="10.5"
        fill="rgba(0,200,150,.06)"
        stroke="rgba(0,200,150,.22)"
        strokeWidth="0.75"
      />
      <g
        transform="translate(2.5, -1.5)"
        stroke={`url(#${gradId})`}
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m11 17 2 2a1 1 0 1 0 3-3" />
        <path d="m14 14 3-3a1 1 0 0 0-3-3l-3 3" />
        <path d="m9 12 2 2a1 1 0 1 1-3 3l-3-3" />
        <path d="M7 10 5 8a1 1 0 0 0-3 3l3 3" />
      </g>
    </svg>
  );
}

/** Centered glow + handshake SVG for the final partnership band */
function PartnerHandshakeIcon({ size = 280, ariaLabel = "Partnership" }) {
  const glow = Math.round(size * 1.18);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        width: "100%",
        minHeight: Math.max(220, size + 24),
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: glow,
          height: glow,
          background:
            "radial-gradient(circle,rgba(0,200,150,.18),transparent 62%)",
          filter: "blur(20px)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto",
        }}
      >
        <PartnershipHandshakeGraphic size={size} ariaLabel={ariaLabel} />
      </div>
    </div>
  );
}

/* ─── data ─────────────────────────────────────────────────────────────── */

const HERO_STATS = [
  { icon: "ER", value: "9/10", label: "Improved Exam Readiness" },
  { icon: "BC", value: "82%", label: "Boosted Confidence" },
  { icon: "CC", value: "87%", label: "Better Career Clarity" },
];

const CREDENTIALS = [
  "MIT Sloan School of Management Principles",
  "Stanford Seed | Graduate School of Business Principles",
  "DPIIT Recognised Startup · Incubated at IIIT Allahabad",
  "Mentors from Stanford, IITs, IIMs & NSUT",
  "38 Institutions · 6,000+ Students · NEP 2020 Aligned",
];

const PILLARS = [
  {
    num: 1,
    accent: "#00c896",
    title: "AI & Future Tech",
    tagline: "Creativity, experimentation & innovation",
    detail: "AI readiness for every profession",
    focus: "Computational Thinking & Digital Competencies",
    outcome: "Tech-literate students ready for the AI era",
  },
  {
    num: 2,
    accent: "#d4af37",
    title: "Finance & Wealth Skills",
    tagline: "Financially aware young citizens",
    detail: "Personal finance, wealth building",
    focus: "Financial literacy & wealth creation basics",
    outcome: "Financially aware young citizens",
  },
  {
    num: 3,
    accent: "#00e8ad",
    title: "Digital Marketing & Branding",
    tagline: "Confident digital communicators",
    detail: "Brand strategy, content, digital presence",
    focus: "Design Thinking, Communication & Digital Citizenship",
    outcome: "Confident communicators & strategic thinkers",
  },
  {
    num: 4,
    accent: "#7ee8c8",
    title: "Business Communication",
    tagline: "Persuasive future leaders",
    detail: "Pitching, storytelling, leadership",
    focus: "Negotiation, influence, conflict resolution, storytelling",
    outcome: "Persuasive negotiators, storytellers, networkers",
  },
];

const SCHOOL_TRACK = [
  "6-month program delivered at your school",
  "4 curriculum pillars — live expert delivery",
  "Students build functional startups",
  "Co-branded international certificates",
  "Free teacher & student AI workshops",
  "NEP 2020 AI literacy compliance",
];

const COLLEGE_TRACK = [
  "UG: B.Com / BBA / B.Tech students",
  "PG: MBA and postgraduate students",
  "6-month venture-building program",
  "MIT Sloan + Stanford GSB principles",
  "International certification",
  "Individual or institutional enrollment",
];

const QUOTES = [
  {
    name: "Larry Page",
    role: "Co-founder, Google | Former CEO, Alphabet",
    text: "Education should encourage creativity and experimentation.",
    img: "/images/larry_page.svg",
  },
  {
    name: "Barack Obama",
    role: "44th President of the United States",
    text: "Education should prepare young people for jobs that don't yet exist.",
    img: "/images/Obama.svg",
  },
  {
    name: "Bill Gates",
    role: "Co-founder, Microsoft | Co-chair, Gates Foundation",
    text: "We need education systems that teach problem-solving and critical thinking.",
    img: "/images/Bill_Gates.svg",
  },
  {
    name: "Jensen Huang",
    role: "Founder & CEO, NVIDIA",
    text: "Understanding how to work with AI will be essential for every profession.",
    img: "/images/Jensen_huang.svg",
  },
  {
    name: "Peter Thiel",
    role: "Co-founder, PayPal | Entrepreneur & Investor",
    text: "Education should teach people how to think, not what to think.",
    img: "/images/Peter_Theil.svg",
  },
  {
    name: "Falguni Nayar",
    role: "Founder & CEO, Nykaa",
    text: "Modern careers demand adaptability and practical skills at every stage.",
    img: "/images/Falguni_Nayar.svg",
  },
  {
    name: "Sheryl Sandberg",
    role: "Former COO, Meta",
    text: "Careers today require constant reinvention and skill building.",
    img: "/images/Sheryl_Sandberg.svg",
  },
];

const EVAL_ITEMS = [
  { label: "Weekly Quizzes", pct: 15 },
  { label: "Case Analysis", pct: 25 },
  { label: "Venture Performance", pct: 30 },
  { label: "Final Pitch (Demo Day)", pct: 30 },
];

const PRIZES = [
  { medal: "1", place: "1st Prize", amount: "₹75,000", color: "#d4af37" },
  { medal: "2", place: "2nd Prize", amount: "₹50,000", color: "#a8b8c8" },
  { medal: "3", place: "3rd Prize", amount: "₹25,000", color: "#b87333" },
];

const BENEFITS = [
  {
    icon: "OPS",
    title: "Zero Administrative Load",
    desc: "We manage sessions, content, assessments and communication end-to-end.",
  },
  {
    icon: "SCH",
    title: "Enhance School Reputation",
    desc: "Recognition as a certified FutureX Partner School with co-branded identity.",
  },
  {
    icon: "CRT",
    title: "Co-Branded Certificates",
    desc: "Each student certificate carries your school's name and seal.",
  },
  {
    icon: "CSP",
    title: "Seamless Implementation",
    desc: "Dedicated school co-ordinator provided from day one.",
  },
];

const NEP_ITEMS = [
  "Financial Literacy & Wealth Management",
  "AI, Coding & Digital Competencies",
  "21st Century Problem Solving & Critical Thinking",
  "Business Communication & Negotiation Skills",
];

const GAMIFIED_ITEMS = [
  {
    icon: "XP",
    title: "XP System",
    desc: "Points, Levels, Badges, Leaderboards — learning made motivating.",
  },
  {
    icon: "VB",
    title: "Live Venture Build",
    desc: "Build a live venture managing finance, operations, marketing and sales with expert mentorship.",
  },
  {
    icon: "LS",
    title: "Live Industry Sessions",
    desc: "Interactive sessions with founders and industry leaders.",
  },
];

const ELITE_OPP = [
  {
    icon: "IN",
    text: "Top 25 All-India Rankers: Internship opportunities with partner startups.",
  },
  {
    icon: "MT",
    text: "Top 3%: Lifetime mentorship through The International FutureX Fellows Cohort.",
  },
  {
    icon: "IC",
    text: "Guided incubation and mentorship to help students evolve into entrepreneurs.",
  },
];

/* ─── utils ─────────────────────────────────────────────────────────────── */

const useInView = (threshold = 0.1) => {
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

const Reveal = ({ children, delay = 0, className = "", style = {} }) => {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity .7s ease ${delay}s, transform .7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const EvalBar = ({ label, pct, delay }) => {
  const [ref, inView] = useInView(0.1);
  return (
    <div ref={ref} style={{ marginBottom: 18 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 7,
        }}
      >
        <span
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: ".85rem",
            fontWeight: 600,
            color: "rgba(255,255,255,.8)",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: "'Playfair Display',serif",
            fontWeight: 700,
            color: "#00c896",
          }}
        >
          {pct}%
        </span>
      </div>
      <div
        style={{
          height: 7,
          background: "rgba(255,255,255,.08)",
          borderRadius: 50,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: inView ? `${pct}%` : "0%",
            transition: `width 1.3s ease ${delay}s`,
            height: "100%",
            background: "linear-gradient(90deg,#00c896,#d4af37)",
            borderRadius: 50,
          }}
        />
      </div>
    </div>
  );
};

const H = (tag, props, children) => {
  const Tag = tag;
  return <Tag {...props}>{children}</Tag>;
};

/* ─── component ──────────────────────────────────────────────────────────── */

export default function Olympiad() {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    schoolName: "",
    contactPerson: "",
    designation: "",
    phone: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.title =
      "International FutureX Fellowship | AI + Entrepreneurship | Lyfshilp Academy India";
    const setMeta = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };
    setMeta(
      "description",
      "The International FutureX Fellowship is India's leading AI-native education fellowship — preparing students from Class 6 to MBA for careers that don't exist yet. Built on MIT Sloan + Stanford GSB principles.",
    );
    setMeta(
      "keywords",
      "International FutureX Fellowship, AI fellowship program India, entrepreneurship fellowship school college India, MIT Sloan India, Stanford GSB program India, future skills program students",
    );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "contactPerson")
      setForm({ ...form, [name]: value.replace(/[^a-zA-Z\s]/g, "") });
    else if (name === "phone")
      setForm({ ...form, [name]: value.replace(/[^0-9]/g, "").slice(0, 10) });
    else if (name === "schoolName" || name === "designation")
      setForm({ ...form, [name]: value.replace(/[^a-zA-Z0-9\s.,-]/g, "") });
    else setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    if (!form.schoolName.trim()) return "School Name is required";
    if (!form.contactPerson.trim()) return "Contact Person is required";
    if (!form.designation.trim()) return "Designation is required";
    if (!/^\d{10}$/.test(form.phone)) return "Phone number must be 10 digits";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Invalid email format";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    setError("");
    const ve = validateForm();
    if (ve) {
      setError(ve);
      setLoading(false);
      return;
    }
    try {
      const res = await api.post("/partner-school/submit", form);
      if (res.data.success) {
        setMsg("Form submitted successfully!");
        setForm({
          schoolName: "",
          contactPerson: "",
          designation: "",
          phone: "",
          email: "",
        });
        setTimeout(() => {
          setModalOpen(false);
          setMsg("");
        }, 1500);
      }
    } catch {
      setMsg("Something went wrong. Try again.");
      setTimeout(() => setMsg(""), 2000);
    }
    setLoading(false);
  };

  const BG = "#061510";
  const inputStyle = {
    width: "100%",
    marginTop: 6,
    padding: "11px 14px",
    background: "rgba(255,255,255,.07)",
    border: "1px solid rgba(0,200,150,.22)",
    borderRadius: 10,
    color: "#fff",
    fontFamily: "'DM Sans',sans-serif",
    fontSize: ".88rem",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color .25s",
  };

  return (
    <div
      style={{
        background: BG,
        color: "#FAFDF8",
        fontFamily: "'DM Sans',sans-serif",
      }}
    >
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes fx-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.4)} }
        @keyframes fx-scroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .fx-accent { color: #00c896; }
        .fx-gold { color: #d4af37; }
        .fx-divider { height: 1px; background: rgba(0,200,150,.1); }
        .fx-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(0,200,150,.09); border: 1px solid rgba(0,200,150,.25);
          color: #00c896; padding: 5px 16px; border-radius: 50px;
          font-size: .7rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 22px;
        }
        .fx-pulse-dot { width: 7px; height: 7px; border-radius: 50%; background: #00c896; display: inline-block; animation: fx-pulse 1.6s infinite; }
        .fx-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg,#00c896,#128061); color: #fff;
          padding: 14px 32px; border-radius: 50px; text-decoration: none;
          font-weight: 700; font-size: .9rem; box-shadow: 0 8px 24px rgba(0,200,150,.35);
          border: none; cursor: pointer; transition: transform .25s, box-shadow .25s;
        }
        .fx-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 32px rgba(0,200,150,.48); }
        .fx-btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          border: 1.5px solid rgba(0,200,150,.4); color: #00c896;
          padding: 13px 30px; border-radius: 50px; text-decoration: none;
          font-weight: 600; font-size: .9rem; background: transparent;
          cursor: pointer; transition: background .2s;
        }
        .fx-btn-outline:hover { background: rgba(0,200,150,.09); }
        .fx-card {
          background: rgba(255,255,255,.05); border: 1px solid rgba(0,200,150,.16);
          border-radius: 18px; transition: box-shadow .3s, transform .25s, border-color .25s;
        }
        .fx-card:hover { box-shadow: 0 16px 40px rgba(0,0,0,.3); transform: translateY(-3px); border-color: rgba(0,200,150,.32); }
        .fx-quote-card {
          position: relative; background: rgba(255,255,255,.055); border: 1px solid rgba(0,200,150,.14);
          border-radius: 20px; padding: 28px 24px 22px; backdrop-filter: blur(8px); overflow: hidden;
          display: flex; flex-direction: column; height: 100%; min-height: 0;
        }
        .fx-row-item {
          display: flex; gap: 14; align-items: flex-start;
          background: rgba(255,255,255,.04); border: 1px solid rgba(0,200,150,.1);
          border-radius: 12px; padding: 14px 16px;
          transition: border-color .3s, background .3s;
        }
        .fx-row-item:hover { border-color: rgba(0,200,150,.3); background: rgba(0,200,150,.06); }
        .fx-cred-scroll { display: flex; gap: 0; animation: fx-scroll 28s linear infinite; }
        .fx-cred-scroll:hover { animation-play-state: paused; }
      `}</style>

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: "110px 24px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(circle at 20% 60%, rgba(0,200,150,.13), transparent 45%), radial-gradient(circle at 80% 20%, rgba(212,175,55,.08), transparent 40%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -80,
            top: -80,
            width: 320,
            height: 320,
            borderRadius: "50%",
            border: "1px solid rgba(0,200,150,.07)",
            pointerEvents: "none",
          }}
        />

        <div
          className="max-w-7xl mx-auto"
          style={{ position: "relative", zIndex: 2 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
            {/* Left */}
            <Reveal>
              <div className="fx-badge">
                <span className="fx-pulse-dot" />
                DPIIT Recognised · Incubated at IIIT Allahabad
              </div>
              <h1
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "clamp(2.4rem,5vw,3.8rem)",
                  fontWeight: 900,
                  color: "#fff",
                  lineHeight: 1.1,
                  marginBottom: 16,
                }}
              >
                The International
                <br />
                <span className="fx-accent">FutureX</span> Fellowship
              </h1>
              <p
                style={{
                  fontSize: "clamp(1rem,1.8vw,1.15rem)",
                  color: "#00c896",
                  fontWeight: 700,
                  marginBottom: 12,
                }}
              >
                Global Standards. International Impact. Delivered Locally.
              </p>
              <p
                style={{
                  color: "rgba(255,255,255,.58)",
                  fontSize: ".97rem",
                  lineHeight: 1.85,
                  maxWidth: 540,
                  marginBottom: 24,
                }}
              >
                An AI-native, entrepreneurship-focused learning program for
                students from Class 6 to MBA level. Built on MIT Sloan School of
                Management and Stanford Seed | Graduate School of Business
                principles — equipping students to build real ventures, lead
                with AI, and compete internationally.
              </p>

              {/* Meta strip */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10,
                  marginBottom: 32,
                }}
              >
                {[
                  ["Duration", "6 months"],
                  ["Format", "Online + School/College"],
                  ["Cert", "International"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    style={{
                      background: "rgba(0,200,150,.09)",
                      border: "1px solid rgba(0,200,150,.22)",
                      borderRadius: 10,
                      padding: "8px 16px",
                      fontSize: ".78rem",
                    }}
                  >
                    <span
                      style={{
                        color: "rgba(255,255,255,.45)",
                        fontWeight: 600,
                      }}
                    >
                      {k}:{" "}
                    </span>
                    <span style={{ color: "#e2f8f0", fontWeight: 700 }}>
                      {v}
                    </span>
                  </div>
                ))}
                <div
                  style={{
                    background: "rgba(212,175,55,.09)",
                    border: "1px solid rgba(212,175,55,.22)",
                    borderRadius: 10,
                    padding: "8px 16px",
                    fontSize: ".78rem",
                  }}
                >
                  <span
                    style={{ color: "rgba(255,255,255,.45)", fontWeight: 600 }}
                  >
                    Mentors:{" "}
                  </span>
                  <span style={{ color: "#f0e4a8", fontWeight: 700 }}>
                    Stanford · IITs · IIMs · NSUT
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 14,
                  marginBottom: 48,
                }}
              >
                <button
                  className="fx-btn-primary"
                  onClick={() => setModalOpen(true)}
                >
                  Apply for Fellowship →
                </button>
                <a
                  href="/International_FutureXFellowship.pdf"
                  download
                  className="fx-btn-outline"
                >
                  ↓ Download Brochure
                </a>
              </div>

              {/* 3 stats — equal height cards */}
              <div className="grid grid-cols-3 gap-3 items-stretch">
                {HERO_STATS.map(({ icon, value, label }, i) => (
                  <Reveal
                    key={icon}
                    delay={0.2 + i * 0.12}
                    className="h-full min-h-0"
                    style={{ display: "flex" }}
                  >
                    <div
                      style={{
                        flex: 1,
                        width: "100%",
                        textAlign: "center",
                        padding: "20px 12px",
                        borderRadius: 16,
                        background: "rgba(0,200,150,.08)",
                        border: "1px solid rgba(0,200,150,.22)",
                        minHeight: 188,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            width: 38,
                            height: 38,
                            borderRadius: 12,
                            margin: "0 auto 8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: ".68rem",
                            fontWeight: 800,
                            letterSpacing: ".8px",
                            color: "#00c896",
                            border: "1px solid rgba(0,200,150,.28)",
                            background: "rgba(0,200,150,.08)",
                          }}
                        >
                          {icon}
                        </div>
                        <div
                          style={{
                            fontFamily: "'Playfair Display',serif",
                            fontSize: "clamp(1.5rem,3vw,2.1rem)",
                            fontWeight: 900,
                            color: "#00c896",
                            lineHeight: 1,
                            marginBottom: 6,
                          }}
                        >
                          {value}
                        </div>
                      </div>
                      <p
                        style={{
                          fontSize: ".72rem",
                          color: "rgba(255,255,255,.5)",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          lineHeight: 1.45,
                          margin: 0,
                          marginTop: "auto",
                          paddingTop: 4,
                        }}
                      >
                        {label}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            {/* Right image */}
            <Reveal
              delay={0.2}
              className="relative flex justify-center order-first lg:order-last"
            >
              <div
                style={{
                  position: "absolute",
                  inset: "10% 5%",
                  background:
                    "radial-gradient(circle,rgba(0,200,150,.18),transparent 65%)",
                  filter: "blur(16px)",
                  borderRadius: "50%",
                }}
              />
              <img
                src={studentsImage}
                alt="FutureX Fellowship students"
                style={{
                  position: "relative",
                  zIndex: 1,
                  width: "85%",
                  maxWidth: 480,
                  filter: "drop-shadow(0 20px 50px rgba(0,0,0,.4))",
                }}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ CREDENTIALS STRIP ════════════════════════════════════════════ */}
      <div
        style={{
          borderTop: "1px solid rgba(0,200,150,.12)",
          borderBottom: "1px solid rgba(0,200,150,.12)",
          background: "rgba(0,200,150,.035)",
          padding: "18px 0",
          overflow: "hidden",
        }}
      >
        <div className="fx-cred-scroll" style={{ whiteSpace: "nowrap" }}>
          {[...CREDENTIALS, ...CREDENTIALS].map((c, i) => (
            <span
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 28,
                padding: "0 32px",
                fontSize: ".75rem",
                fontWeight: 700,
                color: "rgba(255,255,255,.7)",
                letterSpacing: ".5px",
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#00c896",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="fx-divider" />

      {/* ══ 4 PILLARS ════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: "88px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(circle at 15% 50%,rgba(0,200,150,.1),transparent 38%), radial-gradient(circle at 85% 20%,rgba(212,175,55,.07),transparent 32%)",
          }}
        />
        <div
          className="max-w-6xl mx-auto"
          style={{ position: "relative", zIndex: 2 }}
        >
          <Reveal className="text-center" style={{ marginBottom: 52 }}>
            <div
              style={{
                fontSize: ".7rem",
                fontWeight: 700,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "#00c896",
                marginBottom: 12,
              }}
            >
              NCF 2023 Aligned · Multidisciplinary
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(2rem,4vw,3rem)",
                fontWeight: 900,
                color: "#fff",
                lineHeight: 1.15,
                marginBottom: 14,
              }}
            >
              The 4 Pillars of the <span className="fx-accent">Fellowship</span>
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,.5)",
                fontSize: ".95rem",
                lineHeight: 1.8,
                maxWidth: 560,
                margin: "0 auto",
              }}
            >
              A multidisciplinary approach designed to future-proof students
              across every domain that matters in tomorrow's world.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PILLARS.map(
              ({ num, accent, title, tagline, detail, focus, outcome }, i) => (
                <Reveal key={num} delay={i * 0.1}>
                  <div
                    className="fx-card h-full"
                    style={{
                      padding: "24px 20px",
                      borderLeft: `3px solid ${accent}`,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        marginBottom: 14,
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          background: `${accent}22`,
                          border: `1px solid ${accent}55`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "'Playfair Display',serif",
                          fontWeight: 900,
                          color: accent,
                          fontSize: "1rem",
                          flexShrink: 0,
                        }}
                      >
                        {num}
                      </div>
                      <h4
                        style={{
                          fontFamily: "'Playfair Display',serif",
                          fontWeight: 700,
                          color: "#fff",
                          fontSize: ".97rem",
                          lineHeight: 1.25,
                        }}
                      >
                        {title}
                      </h4>
                    </div>
                    <p
                      style={{
                        fontSize: ".82rem",
                        color: accent,
                        fontWeight: 700,
                        marginBottom: 8,
                      }}
                    >
                      {tagline}
                    </p>
                    <p
                      style={{
                        fontSize: ".79rem",
                        color: "rgba(255,255,255,.55)",
                        lineHeight: 1.55,
                        marginBottom: 10,
                      }}
                    >
                      {detail}
                    </p>
                    <div
                      style={{
                        borderTop: "1px solid rgba(255,255,255,.07)",
                        paddingTop: 10,
                      }}
                    >
                      <p
                        style={{
                          fontSize: ".75rem",
                          color: "rgba(255,255,255,.38)",
                          lineHeight: 1.5,
                          margin: 0,
                        }}
                      >
                        <strong style={{ color: "rgba(255,255,255,.6)" }}>
                          Outcome:
                        </strong>{" "}
                        {outcome}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ),
            )}
          </div>
        </div>
      </section>

      <div className="fx-divider" />

      {/* ══ FELLOWSHIP TRACKS ═══════════════════════════════════════════ */}
      <section
        style={{
          padding: "88px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(circle at 50% 60%, rgba(0,200,150,.09), transparent 50%)",
          }}
        />
        <div
          className="max-w-5xl mx-auto"
          style={{ position: "relative", zIndex: 2 }}
        >
          <Reveal className="text-center" style={{ marginBottom: 52 }}>
            <div
              style={{
                fontSize: ".7rem",
                fontWeight: 700,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "#00c896",
                marginBottom: 12,
              }}
            >
              Fellowship Tracks
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(2rem,4vw,3rem)",
                fontWeight: 900,
                color: "#fff",
                lineHeight: 1.15,
              }}
            >
              Who Is It <span className="fx-accent">For?</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* School track */}
            <Reveal delay={0.05}>
              <div
                style={{
                  background: "rgba(0,200,150,.06)",
                  border: "1px solid rgba(0,200,150,.25)",
                  borderRadius: 20,
                  padding: "32px 28px",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    marginBottom: 8,
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 14,
                      background: "rgba(0,200,150,.15)",
                      border: "1px solid rgba(0,200,150,.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#00c896"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: "'Playfair Display',serif",
                        fontWeight: 800,
                        color: "#fff",
                        fontSize: "1.15rem",
                        marginBottom: 2,
                      }}
                    >
                      School Fellowship
                    </h3>
                    <span
                      style={{
                        fontSize: ".72rem",
                        fontWeight: 700,
                        color: "#00c896",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                      }}
                    >
                      Classes 6–12
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    height: 1,
                    background: "rgba(0,200,150,.15)",
                    margin: "18px 0",
                  }}
                />
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 11,
                  }}
                >
                  {SCHOOL_TRACK.map((item, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "flex-start",
                        fontSize: ".88rem",
                        color: "rgba(255,255,255,.75)",
                        lineHeight: 1.5,
                      }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "#00c896",
                          flexShrink: 0,
                          marginTop: 7,
                        }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: 24 }}>
                  <Link
                    to="/for-schools"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 7,
                      color: "#00c896",
                      fontWeight: 700,
                      fontSize: ".85rem",
                      textDecoration: "none",
                    }}
                  >
                    Learn more for Schools →
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* College track */}
            <Reveal delay={0.12}>
              <div
                style={{
                  background: "rgba(212,175,55,.05)",
                  border: "1px solid rgba(212,175,55,.22)",
                  borderRadius: 20,
                  padding: "32px 28px",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    marginBottom: 8,
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 14,
                      background: "rgba(212,175,55,.14)",
                      border: "1px solid rgba(212,175,55,.28)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#d4af37"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: "'Playfair Display',serif",
                        fontWeight: 800,
                        color: "#fff",
                        fontSize: "1.15rem",
                        marginBottom: 2,
                      }}
                    >
                      College Fellowship
                    </h3>
                    <span
                      style={{
                        fontSize: ".72rem",
                        fontWeight: 700,
                        color: "#d4af37",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                      }}
                    >
                      UG &amp; PG
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    height: 1,
                    background: "rgba(212,175,55,.14)",
                    margin: "18px 0",
                  }}
                />
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 11,
                  }}
                >
                  {COLLEGE_TRACK.map((item, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "flex-start",
                        fontSize: ".88rem",
                        color: "rgba(255,255,255,.75)",
                        lineHeight: 1.5,
                      }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "#d4af37",
                          flexShrink: 0,
                          marginTop: 7,
                        }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: 24 }}>
                  <Link
                    to="/for-colleges"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 7,
                      color: "#d4af37",
                      fontWeight: 700,
                      fontSize: ".85rem",
                      textDecoration: "none",
                    }}
                  >
                    Learn more for Colleges →
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="fx-divider" />

      {/* ══ CHANGING LANDSCAPE ══════════════════════════════════════════ */}
      <section
        style={{
          padding: "88px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(circle at 10% 40%,rgba(0,200,150,.1),transparent 40%), radial-gradient(circle at 90% 70%,rgba(212,175,55,.07),transparent 35%)",
          }}
        />
        <div
          className="max-w-7xl mx-auto"
          style={{ position: "relative", zIndex: 2 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <Reveal>
              <div
                style={{
                  fontSize: ".72rem",
                  fontWeight: 700,
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  color: "#00c896",
                  marginBottom: 14,
                }}
              >
                The Landscape is Changing
              </div>
              <h2
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "clamp(2rem,4vw,3rem)",
                  fontWeight: 900,
                  color: "#fff",
                  lineHeight: 1.15,
                  marginBottom: 16,
                }}
              >
                The Changing Landscape
                <br />
                <span className="fx-accent">of Education</span>
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,.55)",
                  fontSize: ".95rem",
                  lineHeight: 1.85,
                  marginBottom: 32,
                }}
              >
                As school leaders, you face the challenge of bridging the gap
                between traditional academics and future skills. NEP 2020 &amp;
                NCF 2023 require a new kind of learning.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {[
                  "Financial Education",
                  "AI & Digital",
                  "Critical Thinking",
                  "Business Comm",
                ].map((t) => (
                  <span
                    key={t}
                    style={{
                      background: "rgba(0,200,150,.1)",
                      border: "1px solid rgba(0,200,150,.25)",
                      color: "#e2f8f0",
                      padding: "7px 16px",
                      borderRadius: 50,
                      fontSize: ".78rem",
                      fontWeight: 600,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
            {/* Right cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                {
                  icon: "REQ",
                  title: "NEP 2020 & NCF 2023 Require:",
                  items: NEP_ITEMS,
                },
                {
                  icon: "CHL",
                  title: "The Challenge",
                  items: [
                    "Implementing these subjects demands trained faculty, modern infrastructure, and additional academic time — resources already stretched thin.",
                  ],
                },
                {
                  icon: "SOL",
                  title: "The FutureX Solution",
                  items: [
                    "Expert-led, ready-to-launch programs delivered to your school with zero extra administrative burden.",
                  ],
                },
              ].map(({ icon, title, items }, i) => (
                <Reveal key={icon} delay={i * 0.1}>
                  <div className="fx-card" style={{ padding: "22px 20px" }}>
                    <div
                      style={{
                        fontWeight: 700,
                        color: "#00c896",
                        fontSize: ".82rem",
                        marginBottom: 14,
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                      }}
                    >
                      {icon} · {title}
                    </div>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {items.map((item, j) => (
                        <li
                          key={j}
                          style={{
                            display: "flex",
                            gap: 10,
                            alignItems: "flex-start",
                            color: "rgba(255,255,255,.72)",
                            fontSize: ".85rem",
                            lineHeight: 1.6,
                            marginBottom: 8,
                          }}
                        >
                          <span
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              background: "#00c896",
                              flexShrink: 0,
                              marginTop: 7,
                            }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="fx-divider" />

      {/* ══ WORLD-CLASS LEARNING ════════════════════════════════════════ */}
      <section
        style={{
          padding: "88px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(circle at 80% 30%,rgba(0,200,150,.12),transparent 45%)",
          }}
        />
        <div
          className="max-w-7xl mx-auto"
          style={{ position: "relative", zIndex: 2 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left image */}
            <Reveal
              className="flex justify-center"
              style={{ position: "relative" }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: "5%",
                  background:
                    "radial-gradient(circle,rgba(0,200,150,.15),transparent 65%)",
                  filter: "blur(20px)",
                  borderRadius: "50%",
                }}
              />
              <img
                src="/images/2.svg"
                alt="World-class learning"
                style={{
                  position: "relative",
                  zIndex: 1,
                  width: "85%",
                  maxWidth: 420,
                  filter: "drop-shadow(0 20px 48px rgba(0,0,0,.4))",
                }}
              />
            </Reveal>
            {/* Right text */}
            <Reveal delay={0.15}>
              <div
                style={{
                  fontSize: ".72rem",
                  fontWeight: 700,
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  color: "#00c896",
                  marginBottom: 14,
                }}
              >
                Ivy League Standards · Delivered Locally
              </div>
              <h2
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "clamp(2rem,4vw,3rem)",
                  fontWeight: 900,
                  color: "#fff",
                  lineHeight: 1.15,
                  marginBottom: 16,
                }}
              >
                World-Class Learning,
                <br />
                <span className="fx-accent">Delivered Locally</span>
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,.55)",
                  fontSize: ".95rem",
                  lineHeight: 1.85,
                  marginBottom: 28,
                }}
              >
                Students don't just learn about business — they build one. Each
                participant learns business, tech and communication by building
                a live venture, managing finance, operations, marketing, and
                sales.
              </p>
              <div className="fx-card" style={{ padding: "22px 20px" }}>
                <div
                  style={{
                    fontWeight: 700,
                    color: "#00c896",
                    fontSize: ".8rem",
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    marginBottom: 18,
                  }}
                >
                  Program Structure
                </div>
                {[
                  ["Duration", "6 Months"],
                  ["Target Group", "Classes 6–12 (School) · UG / PG (College)"],
                  [
                    "Methodology",
                    "Build a working startup alongside learning business concepts (NEP Section 4.4)",
                  ],
                  [
                    "Framework",
                    "Integrates MIT Sloan School of Management principles with FutureX's experiential learning",
                  ],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    style={{
                      display: "flex",
                      gap: 14,
                      alignItems: "flex-start",
                      marginBottom: 12,
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#00c896",
                        flexShrink: 0,
                        marginTop: 7,
                      }}
                    />
                    <span
                      style={{
                        fontSize: ".88rem",
                        color: "rgba(255,255,255,.75)",
                        lineHeight: 1.55,
                      }}
                    >
                      <strong style={{ color: "#fff" }}>{k}:</strong> {v}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="fx-divider" />

      {/* ══ GLOBAL VISIONARIES / QUOTES ═════════════════════════════════ */}
      <section
        style={{
          padding: "88px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(circle at 85% 25%,rgba(212,175,55,.07),transparent 35%), radial-gradient(circle at 15% 75%,rgba(0,200,150,.08),transparent 40%)",
          }}
        />
        <div
          className="max-w-5xl mx-auto"
          style={{ position: "relative", zIndex: 2 }}
        >
          <Reveal className="text-center" style={{ marginBottom: 52 }}>
            <div
              style={{
                fontSize: ".7rem",
                fontWeight: 700,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "#00c896",
                marginBottom: 12,
              }}
            >
              Global Visionaries Agree
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(1.8rem,4vw,2.8rem)",
                fontWeight: 900,
                color: "#fff",
                lineHeight: 1.2,
              }}
            >
              Why <span className="fx-accent">FutureX Fellowship?</span>
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,.45)",
                fontSize: ".92rem",
                marginTop: 12,
              }}
            >
              Global Thought Leaders on Future-Ready Education
            </p>
          </Reveal>
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch"
            style={{ marginBottom: 36 }}
          >
            {QUOTES.map(({ name, role, text, img }, i) => (
              <Reveal
                key={name}
                delay={i * 0.08}
                className="h-full min-h-0"
                style={{ display: "flex" }}
              >
                <div
                  className="fx-quote-card"
                  style={{ flex: 1, width: "100%" }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 8,
                      left: 18,
                      fontFamily: "'Playfair Display',serif",
                      fontSize: "5rem",
                      color: "rgba(0,200,150,.15)",
                      lineHeight: 1,
                      userSelect: "none",
                      pointerEvents: "none",
                    }}
                  >
                    "
                  </div>
                  <p
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontStyle: "italic",
                      color: "rgba(255,255,255,.82)",
                      fontSize: ".92rem",
                      lineHeight: 1.7,
                      marginTop: 28,
                      marginBottom: 0,
                      flex: 1,
                      minHeight: 0,
                    }}
                  >
                    {text}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginTop: "auto",
                      paddingTop: 18,
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={img}
                      alt={name}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "2px solid rgba(0,200,150,.3)",
                        flexShrink: 0,
                      }}
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0d3d2f&color=00c896&size=80`;
                      }}
                    />
                    <div>
                      <div
                        style={{
                          fontWeight: 700,
                          color: "#00c896",
                          fontSize: ".84rem",
                        }}
                      >
                        {name}
                      </div>
                      <div
                        style={{
                          color: "rgba(255,255,255,.38)",
                          fontSize: ".7rem",
                          marginTop: 2,
                        }}
                      >
                        {role}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div
              style={{
                background: "rgba(0,200,150,.08)",
                border: "1px solid rgba(0,200,150,.22)",
                borderRadius: 20,
                padding: "28px 32px",
                textAlign: "center",
                backdropFilter: "blur(8px)",
              }}
            >
              <p
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontStyle: "italic",
                  color: "rgba(255,255,255,.88)",
                  fontSize: "clamp(.95rem,2vw,1.1rem)",
                  lineHeight: 1.7,
                }}
              >
                International{" "}
                <strong className="fx-accent">FutureX Fellowship</strong> is
                built to develop <strong className="fx-accent">thinkers</strong>
                , <strong className="fx-accent">builders</strong>, and{" "}
                <strong className="fx-accent">leaders</strong> for an AI-driven
                world.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="fx-divider" />

      {/* ══ PEDAGOGY & MENTORSHIP ═══════════════════════════════════════ */}
      <section
        style={{
          padding: "88px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(circle at 80% 60%,rgba(0,200,150,.1),transparent 40%)",
          }}
        />
        <div
          className="max-w-7xl mx-auto"
          style={{ position: "relative", zIndex: 2 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left image */}
            <Reveal
              className="flex justify-center"
              style={{ position: "relative" }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: "5%",
                  background:
                    "radial-gradient(circle,rgba(0,200,150,.15),transparent 65%)",
                  filter: "blur(20px)",
                  borderRadius: "50%",
                }}
              />
              <img
                src="/images/4.svg"
                alt="Mentorship"
                style={{
                  position: "relative",
                  zIndex: 1,
                  width: "85%",
                  maxWidth: 420,
                  filter: "drop-shadow(0 20px 48px rgba(0,0,0,.4))",
                }}
              />
            </Reveal>
            {/* Right */}
            <Reveal delay={0.15}>
              <div
                style={{
                  fontSize: ".72rem",
                  fontWeight: 700,
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  color: "#00c896",
                  marginBottom: 14,
                }}
              >
                Founder-Mentor Pedagogy
              </div>
              <h2
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "clamp(2rem,4vw,3rem)",
                  fontWeight: 900,
                  color: "#fff",
                  lineHeight: 1.15,
                  marginBottom: 16,
                }}
              >
                Pedagogy &amp; <span className="fx-accent">Mentorship</span>
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,.55)",
                  fontSize: ".95rem",
                  lineHeight: 1.85,
                  marginBottom: 28,
                }}
              >
                We go beyond textbooks — students are mentored by experts
                bringing real-world insights into the classroom.
              </p>
              <div
                className="fx-card"
                style={{ padding: "20px", marginBottom: 14 }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    color: "#00c896",
                    fontSize: ".8rem",
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    marginBottom: 14,
                  }}
                >
                  Mentors Include
                </div>
                {[
                  "IIT & IIM Alumni",
                  "Industry Experts & Startup Founders",
                  "Former IAS Officers",
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#00c896",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        color: "rgba(255,255,255,.72)",
                        fontSize: ".87rem",
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {GAMIFIED_ITEMS.map(({ icon, title, desc }) => (
                  <div
                    key={title}
                    className="fx-row-item"
                    style={{
                      display: "flex",
                      gap: 14,
                      alignItems: "flex-start",
                      background: "rgba(255,255,255,.04)",
                      border: "1px solid rgba(0,200,150,.1)",
                      borderRadius: 12,
                      padding: "14px 16px",
                    }}
                  >
                    <span
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 10,
                        flexShrink: 0,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: ".7rem",
                        fontWeight: 800,
                        letterSpacing: ".7px",
                        color: "#00c896",
                        border: "1px solid rgba(0,200,150,.3)",
                        background: "rgba(0,200,150,.1)",
                      }}
                    >
                      {icon}
                    </span>
                    <div>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: ".88rem",
                          color: "#fff",
                          marginBottom: 3,
                        }}
                      >
                        {title}
                      </div>
                      <div
                        style={{
                          fontSize: ".78rem",
                          color: "rgba(255,255,255,.45)",
                          lineHeight: 1.55,
                        }}
                      >
                        {desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="fx-divider" />

      {/* ══ ASSESSMENT & REWARDS ════════════════════════════════════════ */}
      <section
        style={{
          padding: "88px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(circle at 20% 70%,rgba(212,175,55,.09),transparent 38%), radial-gradient(circle at 80% 20%,rgba(0,200,150,.1),transparent 40%)",
          }}
        />
        <div
          className="max-w-7xl mx-auto"
          style={{ position: "relative", zIndex: 2 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <Reveal>
              <div
                style={{
                  fontSize: ".72rem",
                  fontWeight: 700,
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  color: "#00c896",
                  marginBottom: 14,
                }}
              >
                Measuring Impact
              </div>
              <h2
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "clamp(2rem,4vw,3rem)",
                  fontWeight: 900,
                  color: "#fff",
                  lineHeight: 1.15,
                  marginBottom: 24,
                }}
              >
                Assessment &amp; <span className="fx-accent">Rewards</span>
              </h2>
              <div
                className="fx-card"
                style={{ padding: "22px 20px", marginBottom: 20 }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    color: "#00c896",
                    fontSize: ".8rem",
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    marginBottom: 18,
                  }}
                >
                  Evaluation Framework · Total 100 Marks
                </div>
                {EVAL_ITEMS.map((item, i) => (
                  <EvalBar key={item.label} {...item} delay={i * 0.2} />
                ))}
              </div>
              <div
                style={{
                  background: "rgba(212,175,55,.08)",
                  border: "1px solid rgba(212,175,55,.2)",
                  borderRadius: 16,
                  padding: "22px 20px",
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    color: "#d4af37",
                    fontSize: ".8rem",
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    marginBottom: 16,
                  }}
                >
                  Prize Pool · ₹1,50,000+
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  {PRIZES.map(({ medal, place, amount, color }) => (
                    <div
                      key={place}
                      style={{
                        flex: 1,
                        textAlign: "center",
                        padding: "16px 8px",
                        background: "rgba(255,255,255,.05)",
                        border: `1px solid ${color}33`,
                        borderRadius: 12,
                      }}
                    >
                      <div
                        style={{
                          width: 34,
                          height: 34,
                          margin: "0 auto 8px",
                          borderRadius: 10,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: ".85rem",
                          fontWeight: 800,
                          color,
                          border: `1px solid ${color}66`,
                          background: `${color}1f`,
                        }}
                      >
                        {medal}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Playfair Display',serif",
                          fontWeight: 900,
                          color,
                          fontSize: "1.1rem",
                        }}
                      >
                        {amount}
                      </div>
                      <div
                        style={{
                          color: "rgba(255,255,255,.45)",
                          fontSize: ".72rem",
                          marginTop: 4,
                        }}
                      >
                        {place}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            {/* Right */}
            <Reveal delay={0.15}>
              <div
                className="fx-card"
                style={{ padding: "22px 20px", marginBottom: 24 }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    color: "#00c896",
                    fontSize: ".8rem",
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    marginBottom: 16,
                  }}
                >
                  Elite Opportunities
                </div>
                {ELITE_OPP.map(({ icon, text }) => (
                  <div
                    key={text}
                    style={{
                      display: "flex",
                      gap: 14,
                      marginBottom: 14,
                      alignItems: "flex-start",
                    }}
                  >
                    <span
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 9,
                        flexShrink: 0,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: ".65rem",
                        fontWeight: 800,
                        letterSpacing: ".5px",
                        color: "#00c896",
                        border: "1px solid rgba(0,200,150,.3)",
                        background: "rgba(0,200,150,.08)",
                      }}
                    >
                      {icon}
                    </span>
                    <span
                      style={{
                        fontSize: ".87rem",
                        color: "rgba(255,255,255,.7)",
                        lineHeight: 1.55,
                      }}
                    >
                      {text}
                    </span>
                  </div>
                ))}
              </div>
              <div
                className="flex justify-center"
                style={{ position: "relative" }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: "5%",
                    background:
                      "radial-gradient(circle,rgba(212,175,55,.15),transparent 60%)",
                    filter: "blur(16px)",
                    borderRadius: "50%",
                  }}
                />
                <img
                  src="/images/5.svg"
                  alt="Rewards"
                  style={{
                    position: "relative",
                    zIndex: 1,
                    width: "85%",
                    maxWidth: 380,
                    filter: "drop-shadow(0 16px 40px rgba(0,0,0,.35))",
                  }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="fx-divider" />

      {/* ══ WHY PARTNER ═════════════════════════════════════════════════ */}
      <section
        style={{
          padding: "88px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(circle at 85% 50%,rgba(0,200,150,.12),transparent 42%)",
          }}
        />
        <div
          className="max-w-7xl mx-auto"
          style={{ position: "relative", zIndex: 2 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left image */}
            <Reveal className="flex justify-center w-full">
              <PartnerHandshakeIllustration
                size={400}
                ariaLabel="Partnership with FutureX"
              />
            </Reveal>
            {/* Right */}
            <Reveal delay={0.15}>
              <div
                style={{
                  fontSize: ".72rem",
                  fontWeight: 700,
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  color: "#00c896",
                  marginBottom: 14,
                }}
              >
                Zero Load · Maximum Impact
              </div>
              <h2
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "clamp(2rem,4vw,3rem)",
                  fontWeight: 900,
                  color: "#fff",
                  lineHeight: 1.15,
                  marginBottom: 28,
                }}
              >
                Why Partner with <span className="fx-accent">FutureX?</span>
              </h2>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 14 }}
              >
                {BENEFITS.map(({ icon, title, desc }) => (
                  <div
                    key={title}
                    className="fx-row-item"
                    style={{
                      display: "flex",
                      gap: 16,
                      alignItems: "flex-start",
                      background: "rgba(255,255,255,.05)",
                      border: "1px solid rgba(0,200,150,.14)",
                      borderRadius: 14,
                      padding: "16px 18px",
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        background: "rgba(0,200,150,.14)",
                        border: "1px solid rgba(0,200,150,.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: ".62rem",
                        fontWeight: 800,
                        letterSpacing: ".45px",
                        color: "#00c896",
                        flexShrink: 0,
                      }}
                    >
                      {icon}
                    </div>
                    <div>
                      <div
                        style={{
                          fontWeight: 700,
                          color: "#fff",
                          fontSize: ".9rem",
                          marginBottom: 4,
                        }}
                      >
                        {title}
                      </div>
                      <div
                        style={{
                          color: "rgba(255,255,255,.52)",
                          fontSize: ".8rem",
                          lineHeight: 1.55,
                        }}
                      >
                        {desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="fx-divider" />

      {/* ══ CTA / CONTACT ════════════════════════════════════════════════ */}
      <section
        id="contact"
        style={{
          padding: "88px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(circle at 50% 40%,rgba(0,200,150,.13),transparent 50%)",
          }}
        />
        <div
          className="max-w-7xl mx-auto"
          style={{ position: "relative", zIndex: 2 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left text */}
            <Reveal>
              <div
                style={{
                  fontSize: ".72rem",
                  fontWeight: 700,
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  color: "#00c896",
                  marginBottom: 14,
                }}
              >
                Join the Movement
              </div>
              <h2
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "clamp(2rem,4vw,3rem)",
                  fontWeight: 900,
                  color: "#fff",
                  lineHeight: 1.15,
                  marginBottom: 16,
                }}
              >
                Empower the Next
                <br />
                <span className="fx-accent">Generation of Leaders</span>
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,.52)",
                  fontSize: ".95rem",
                  lineHeight: 1.85,
                  marginBottom: 28,
                }}
              >
                Join the national ecosystem of future-ready schools. Get in
                touch to learn how FutureX Fellowship can transform your
                students into confident founders, thinkers, and leaders.
              </p>
              <div
                className="fx-card"
                style={{ padding: "20px 20px", marginBottom: 24 }}
              >
                {[
                  {
                    icon: "PH",
                    label: "Phone",
                    val: "7042671115 | 7042672300",
                    href: "tel:7042671115",
                  },
                  {
                    icon: "EM",
                    label: "Email",
                    val: "service.excellence@lyfshilpacademy.com",
                    href: "mailto:service.excellence@lyfshilpacademy.com",
                  },
                  {
                    icon: "WB",
                    label: "Website",
                    val: "lyfshilp.com",
                    href: "https://lyfshilp.com",
                  },
                ].map(({ icon, label, val, href }) => (
                  <a
                    key={label}
                    href={href}
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "flex-start",
                      marginBottom: 14,
                      textDecoration: "none",
                    }}
                  >
                    <span
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 9,
                        flexShrink: 0,
                        marginTop: 1,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: ".62rem",
                        fontWeight: 800,
                        letterSpacing: ".5px",
                        color: "#00c896",
                        border: "1px solid rgba(0,200,150,.3)",
                        background: "rgba(0,200,150,.08)",
                      }}
                    >
                      {icon}
                    </span>
                    <div>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: ".75rem",
                          color: "#00c896",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                        }}
                      >
                        {label}
                      </div>
                      <div
                        style={{
                          color: "rgba(255,255,255,.58)",
                          fontSize: ".82rem",
                          wordBreak: "break-all",
                        }}
                      >
                        {val}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
              <button
                className="fx-btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
                onClick={() => setModalOpen(true)}
              >
                Enroll as a Partner School Today →
              </button>
            </Reveal>
            {/* Right image */}
            <Reveal delay={0.15} className="flex justify-center w-full">
              <PartnerHandshakeIllustration
                size={400}
                ariaLabel="Partner schools"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <div className="fx-divider" />

      {/* ══ PARTNERSHIP BAND ════════════════════════════════════════════ */}
      <section
        style={{
          padding: "72px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(circle at 50% 60%,rgba(0,200,150,.1),transparent 50%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "60%",
            maxWidth: 500,
            height: 1,
            background:
              "linear-gradient(90deg,transparent,rgba(0,200,150,.25),transparent)",
          }}
        />
        <div
          className="max-w-4xl mx-auto"
          style={{ position: "relative", zIndex: 2 }}
        >
          <Reveal>
            <div
              className="fx-card"
              style={{ padding: "36px 32px", backdropFilter: "blur(8px)" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div
                  aria-label="Purpose-built partnership logo"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    minHeight: 380,
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: -20,
                      borderRadius: 24,
                      background:
                        "radial-gradient(circle at 50% 40%, rgba(0,200,150,.18), transparent 60%)",
                      filter: "blur(14px)",
                      pointerEvents: "none",
                    }}
                  />
                  <div
                    style={{
                      position: "relative",
                      zIndex: 1,
                      width: "clamp(128px, 20vw, 220px)",
                      height: "clamp(128px, 20vw, 220px)",
                      borderRadius: 9999,
                      background: "rgba(0,200,150,.08)",
                      border: "1px solid rgba(0,200,150,.18)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 18,
                    }}
                  >
                    <img
                      src="/logo.png"
                      alt="FutureX Fellowship logo"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        display: "block",
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: ".72rem",
                      fontWeight: 700,
                      letterSpacing: "2.5px",
                      textTransform: "uppercase",
                      color: "#00c896",
                      marginBottom: 14,
                    }}
                  >
                    Purpose-Built Partnership
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: "clamp(1.5rem,3vw,2.2rem)",
                      fontWeight: 900,
                      color: "#fff",
                      lineHeight: 1.2,
                      marginBottom: 16,
                    }}
                  >
                    A Rare Convergence of{" "}
                    <span className="fx-accent">Education &amp; Industry</span>
                  </h3>
                  <p
                    style={{
                      color: "rgba(255,255,255,.52)",
                      fontSize: ".9rem",
                      lineHeight: 1.8,
                      marginBottom: 24,
                    }}
                  >
                    Long-term impact through a collaboration between two
                    organisations dedicated to building future-ready leaders.
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 20,
                      flexWrap: "wrap",
                    }}
                  >
                    {[
                      {
                        src: LyfshilpLogo,
                        alt: "Lyfshilp",
                        label: "Lyfshilp Academy",
                        h: 36,
                      },
                      {
                        src: agilityLogo,
                        alt: "Agility AI",
                        label: "Agility AI",
                        h: 32,
                      },
                    ].map(({ src, alt, label, h }) => (
                      <div
                        key={alt}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          background: "rgba(255,255,255,.07)",
                          border: "1px solid rgba(0,200,150,.18)",
                          borderRadius: 12,
                          padding: "10px 16px",
                        }}
                      >
                        <img
                          src={src}
                          alt={alt}
                          style={{
                            height: h,
                            width: "auto",
                            objectFit: "contain",
                          }}
                        />
                        <span
                          style={{
                            fontWeight: 700,
                            color: "rgba(255,255,255,.82)",
                            fontSize: ".85rem",
                          }}
                        >
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ MODAL ════════════════════════════════════════════════════════ */}
      {modalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.65)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
            zIndex: 999,
          }}
          onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}
        >
          <div
            style={{
              background: "linear-gradient(165deg,#0d3d2f,#071a11)",
              border: "1px solid rgba(0,200,150,.28)",
              borderRadius: 20,
              padding: "32px 28px",
              width: "100%",
              maxWidth: 480,
              position: "relative",
              boxShadow: "0 24px 64px rgba(0,0,0,.5)",
            }}
          >
            <button
              onClick={() => setModalOpen(false)}
              disabled={loading}
              style={{
                position: "absolute",
                top: 12,
                right: 16,
                background: "none",
                border: "none",
                color: "rgba(255,255,255,.5)",
                fontSize: "1.5rem",
                cursor: "pointer",
                lineHeight: 1,
              }}
            >
              ×
            </button>
            <h2
              style={{
                fontFamily: "'Playfair Display',serif",
                fontWeight: 900,
                fontSize: "1.5rem",
                color: "#fff",
                textAlign: "center",
                marginBottom: 20,
              }}
            >
              Enroll as Partner School
            </h2>
            {msg && (
              <p
                style={{
                  textAlign: "center",
                  color: "#00c896",
                  fontWeight: 700,
                  marginBottom: 12,
                }}
              >
                {msg}
              </p>
            )}
            {error && (
              <p
                style={{
                  textAlign: "center",
                  color: "#ff6b6b",
                  fontWeight: 700,
                  marginBottom: 12,
                }}
              >
                {error}
              </p>
            )}
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 14 }}
            >
              {[
                {
                  name: "schoolName",
                  label: "School Name",
                  placeholder: "Enter school name",
                },
                {
                  name: "contactPerson",
                  label: "Contact Person",
                  placeholder: "Enter name",
                },
                {
                  name: "designation",
                  label: "Designation",
                  placeholder: "Principal / Coordinator / Teacher",
                },
                {
                  name: "phone",
                  label: "Phone Number",
                  placeholder: "10-digit number",
                },
                {
                  name: "email",
                  label: "Official Email",
                  placeholder: "Enter email",
                },
              ].map(({ name, label, placeholder }) => (
                <div key={name}>
                  <label
                    style={{
                      fontWeight: 600,
                      fontSize: ".82rem",
                      color: "rgba(255,255,255,.75)",
                    }}
                  >
                    {label} *
                  </label>
                  <input
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    required
                    style={inputStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(0,200,150,.55)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(0,200,150,.22)";
                    }}
                  />
                </div>
              ))}
              <button
                type="submit"
                disabled={loading}
                className="fx-btn-primary"
                style={{
                  justifyContent: "center",
                  marginTop: 4,
                  padding: 13,
                  borderRadius: 50,
                  fontSize: "1rem",
                  opacity: loading ? 0.6 : 1,
                }}
              >
                {loading ? "Submitting…" : "Submit Enrollment"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
