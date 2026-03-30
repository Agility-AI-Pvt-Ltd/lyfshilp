import { useState, useEffect, useRef } from "react";
import NewLandingPageAbout from "../components/newLandingPageAbout.jsx";
import NewHero from "../components/NewHero.jsx";
import NewLandingPagePillars from "../components/NewLandingPagePillars.jsx";
import GlobalVoicesSection from "../components/GlobalVoicesSection.jsx";
import Prof_Sumit_Img from "../assets/mentors/sumit.jpg";
import Prof_Aashish_Argade_Img from "../assets/mentors/aashish.jpg";
import Cdr_Praveen_Kumar_img from "../assets/mentors/praveen.jpg";
import Prof_Ashok_R_Patil_img from "../assets/mentors/ashok.jpg";
import Dr_Rajeev_Tyagi_img from "../assets/mentors/rajeev.jpg";

/* ── Scroll-reveal hooks ── */
const useInView = (threshold = 0.15) => {
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
  }, []);
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
        transform: inView ? "translateY(0)" : "translateY(44px)",
        transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

const SlideIn = ({ children, from = "left", delay = 0, className = "" }) => {
  const [ref, inView] = useInView();
  const tx = from === "left" ? "-60px" : "60px";
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : `translateX(${tx})`,
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

const ScaleIn = ({ children, delay = 0, className = "" }) => {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "scale(1)" : "scale(0.88)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

/* ── Animated Eval Bar ── */
const EvalBar = ({ label, pct, delay }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ marginBottom: 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <span
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: "0.88rem",
            fontWeight: 600,
            color: "#0d3d2f",
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
          height: 8,
          background: "rgba(13,61,47,0.1)",
          borderRadius: 50,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: inView ? `${pct}%` : "0%",
            transition: `width 1.3s ease ${delay}s`,
            height: "100%",
            background: "linear-gradient(90deg, #00c896, #d4af37)",
            borderRadius: 50,
          }}
        />
      </div>
    </div>
  );
};

/* ── Professional SVG icons (replaces emoji) ── */
function Ico({
  size = 24,
  color = "#00c896",
  stroke = 1.5,
  children,
  fill = "none",
}) {
  return (
    <span
      style={{
        color,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        lineHeight: 0,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={fill}
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </svg>
    </span>
  );
}

const HomeIcons = {
  certBrain: (p) => (
    <Ico {...p}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <path d="M9 2v2M15 2v2M9 20v2M15 20v2M20 9h2M20 15h2M2 9h2M2 15h2" />
    </Ico>
  ),
  certGem: (p) => (
    <Ico {...p}>
      <path d="M6 3h12l4 6-10 12L2 9l4-6Z" />
      <path d="M2 9h20" />
    </Ico>
  ),
  certTrend: (p) => (
    <Ico {...p}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </Ico>
  ),
  certMic: (p) => (
    <Ico {...p}>
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </Ico>
  ),
  star: (p) => (
    <Ico {...p}>
      <polygon
        fill="currentColor"
        stroke="currentColor"
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      />
    </Ico>
  ),
  trophy: (p) => (
    <Ico {...p}>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </Ico>
  ),
  badge: (p) => (
    <Ico {...p}>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </Ico>
  ),
  book: (p) => (
    <Ico {...p}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
    </Ico>
  ),
  building: (p) => (
    <Ico {...p}>
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
      <path d="M10 6h4" />
      <path d="M10 10h4" />
      <path d="M10 14h4" />
      <path d="M10 18h4" />
    </Ico>
  ),
  briefcase: (p) => (
    <Ico {...p}>
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </Ico>
  ),
  gradCap: (p) => (
    <Ico {...p}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </Ico>
  ),
  rocket: (p) => (
    <Ico {...p}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </Ico>
  ),
  document: (p) => (
    <Ico {...p}>
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2Z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </Ico>
  ),
  globe: (p) => (
    <Ico {...p}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
    </Ico>
  ),
  bolt: (p) => (
    <Ico {...p}>
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
    </Ico>
  ),
  handshake: (p) => (
    <Ico {...p}>
      <path d="m11 17 2 2a1 1 0 1 0 3-3" />
      <path d="m14 14 3-3a1 1 0 0 0-3-3l-3 3" />
      <path d="m9 12 2 2a1 1 0 1 1-3 3l-3-3" />
      <path d="M7 10 5 8a1 1 0 0 0-3 3l3 3" />
    </Ico>
  ),
  phone: (p) => (
    <Ico {...p}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
    </Ico>
  ),
  mail: (p) => (
    <Ico {...p}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </Ico>
  ),
  check: (p) => (
    <Ico {...p}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="9 12 11 14 15 10" />
    </Ico>
  ),
};

function PrizeMedalIcon({ rank, color, size = 22 }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle
          cx="12"
          cy="10"
          r="7"
          stroke={color}
          strokeWidth="1.5"
          fill={`${color}18`}
        />
        <text
          x="12"
          y="13.5"
          textAnchor="middle"
          fontSize="9"
          fontWeight="800"
          fill={color}
          fontFamily="'DM Sans',sans-serif"
        >
          {rank}
        </text>
        <path
          d="M8 17l-1 5M16 17l1 5"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

/* ── DATA ── */
const CERTS = [
  {
    icon: "certBrain",
    title: "AI Strategist Certificate",
    desc: "Mastery in AI-driven problem-solving and computational thinking.",
  },
  {
    icon: "certGem",
    title: "Wealth Architect Certificate",
    desc: "Literacy in venture capital, financial modeling, and wealth creation.",
  },
  {
    icon: "certTrend",
    title: "Growth Hacker Certificate",
    desc: "Proficiency in digital branding, market psychology, and audience acquisition.",
  },
  {
    icon: "certMic",
    title: "Art of the Pitch Certificate",
    desc: "Excellence in high-stakes negotiation and executive presence.",
  },
];

const EVAL = [
  { label: "Weekly Quizzes", pct: 15 },
  { label: "Case Analysis", pct: 25 },
  { label: "Venture Performance", pct: 30 },
  { label: "Final Pitch (Demo Day)", pct: 30 },
];

const ADVISORS = [
  {
    img: Prof_Sumit_Img,
    name: "Prof. Sumit Kumar Yadav",
    role: "Assistant Professor, IIT Roorkee | PhD: IIM Ahmedabad | BTech: IIT Bombay",
  },
  {
    img: Prof_Aashish_Argade_Img,
    name: "Prof. Aashish Argade",
    role: "Assistant Professor, IRMA | PhD: IIM Ahmedabad",
  },
  {
    img: Cdr_Praveen_Kumar_img,
    name: "Cdr Praveen Kumar",
    role: "CIO & Head of IT, Nykaa | IIT Kanpur | ISB",
  },
  {
    img: Prof_Ashok_R_Patil_img,
    name: "Prof. Ashok R. Patil",
    role: "Vice Chancellor, NUSRL Ranchi | Professor, NLSIU Bengaluru",
  },
  {
    img: Dr_Rajeev_Tyagi_img,
    name: "Dr. Rajeev Tyagi",
    role: "IIT Roorkee Alumnus | Principal, Mt Carmel School, Delhi",
  },
];

const FOUNDERS = [
  {
    name: "Sharadd Raaj Utsav",
    cred: "IIT Madras | BITS Pilani | NSUT Delhi | IRMA | CLC-DU",
  },
  { name: "Shreya Sienha", cred: "BTech, NSUT Delhi | PGPM, MICA Ahmedabad" },
  {
    name: "CA Saurabh Jain",
    cred: "FCA | Cer.IFRS(ICAI) | CS-E | Cer.Startup(ICAI)",
  },
  {
    name: "Deepak Dandotiya",
    cred: "BTech: NIT Silchar | MBA: Eastern Michigan University, USA",
  },
];

/* ══════════════════ MAIN ══════════════════ */
export default function HomeNew() {
  const [activeFounderIndex, setActiveFounderIndex] = useState(0);
  const [isFounderPaused, setIsFounderPaused] = useState(false);

  useEffect(() => {
    if (isFounderPaused) return;
    const timer = setInterval(() => {
      setActiveFounderIndex((prev) => (prev + 1) % FOUNDERS.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [isFounderPaused]);

  useEffect(() => {
    const title =
      "Lyfshilp Academy | AI-Powered Learning & FutureX Fellowship for Schools, Colleges & Corporates";
    const description =
      "Lyfshilp Academy is a DPIIT-recognised EdTech platform offering the International FutureX Fellowship for schools & colleges, AI upskilling for corporates, and a 10-session AI Summer Programme. Mentors from Stanford, IITs, IIMs & NSUT.";
    const keywords =
      "FutureX Fellowship India, AI learning program for schools, AI summer programme Class 6-12, corporate AI upskilling India, DPIIT EdTech startup, MIT Sloan learning program India";

    document.title = title;

    const upsertMeta = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    upsertMeta("description", description);
    upsertMeta("keywords", keywords);
  }, []);

  const origin = typeof window !== "undefined" ? window.location.origin : "";

  const organisationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Lyfshilp Academy",
    url: origin ? `${origin}/` : "/",
    logo: origin ? `${origin}/logo.png` : "/logo.png",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the International FutureX Fellowship?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The International FutureX Fellowship is a mentorship-led program for schools and colleges that blends MIT Sloan learning principles with experiential entrepreneurship and AI-ready skills.",
        },
      },
      {
        "@type": "Question",
        name: "What is the AI Summer Programme for Class 6-12?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The 10-session AI Summer Programme (Class 6-12) helps students build hands-on AI literacy through guided activities and mentor support.",
        },
      },
      {
        "@type": "Question",
        name: "How does corporate AI upskilling work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Corporate AI upskilling is designed for teams and leaders to understand practical AI applications, workflows, and decision-making—so learning converts directly into execution.",
        },
      },
      {
        "@type": "Question",
        name: "Who are the mentors for FutureX Fellowship?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Mentors include experts from Stanford, IITs, IIMs, and NSUT.",
        },
      },
      {
        "@type": "Question",
        name: "Is Lyfshilp Academy DPIIT-recognised?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Lyfshilp Academy is a DPIIT-recognised EdTech platform.",
        },
      },
    ],
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{font-family:'DM Sans',sans-serif;background:#f6fefa;}
        h1,h2,h3,h4,h5{font-family:'Playfair Display',serif;}

        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        @keyframes float2{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
        @keyframes heroFade{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
        @keyframes scrollBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(8px)}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes gridMove{0%{background-position:0 0}100%{background-position:60px 60px}}
        @keyframes pulseRing{0%{transform:scale(1);opacity:.7}100%{transform:scale(1.8);opacity:0}}

        .ha1{animation:heroFade .9s ease .1s both;}
        .ha2{animation:heroFade .9s ease .3s both;}
        .ha3{animation:heroFade .9s ease .5s both;}
        .ha4{animation:heroFade .9s ease .7s both;}
        .ha5{animation:heroFade .9s ease .9s both;}

        .floating{animation:float 5.5s ease-in-out infinite;}
        .floating2{animation:float2 7s ease-in-out 1.5s infinite;}
        .scroll-bounce{animation:scrollBounce 1.8s ease-in-out infinite;}
        .grid-bg{background-image:linear-gradient(rgba(0,200,150,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(0,200,150,.035) 1px,transparent 1px);background-size:60px 60px;animation:gridMove 9s linear infinite;}

        .shimmer-btn{background:linear-gradient(90deg,#00c896 0%,#00e8ad 40%,#d4af37 60%,#00c896 100%);background-size:200% 100%;animation:shimmer 2.8s linear infinite;color:#0a2a1f;font-weight:700;border-radius:50px;cursor:pointer;transition:transform .25s,box-shadow .25s;}
        .shimmer-btn:hover{transform:translateY(-2px);box-shadow:0 10px 32px rgba(0,200,150,.35);}

        .pillar-card{transition:transform .35s ease,box-shadow .35s ease;position:relative;overflow:hidden;}
        .pillar-card::after{content:'';position:absolute;bottom:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#00c896,#d4af37);transform:scaleX(0);transition:transform .35s;}
        .pillar-card:hover{transform:translateY(-8px);box-shadow:0 20px 50px rgba(13,61,47,.15);}
        .pillar-card:hover::after{transform:scaleX(1);}

        .cert-card{transition:transform .3s,box-shadow .3s;}
        .cert-card:hover{transform:translateY(-6px);box-shadow:0 18px 48px rgba(0,0,0,.28);}

        .hover-lift{transition:transform .3s,border-color .3s,box-shadow .3s;}
        .hover-lift:hover{transform:translateY(-5px);box-shadow:0 14px 40px rgba(13,61,47,.12);}

        .quote-card{transition:transform .3s,box-shadow .3s;}
        .quote-card:hover{transform:translateY(-5px);box-shadow:0 16px 40px rgba(0,0,0,.22);}

        .pulse-dot{animation:pulseRing 1.6s infinite;}

        ::-webkit-scrollbar{width:6px;}
        ::-webkit-scrollbar-track{background:#071a11;}
        ::-webkit-scrollbar-thumb{background:#00c896;border-radius:3px;}
      `}</style>

      {/* JSON-LD SEO: Organisation + FAQ (homepage) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organisationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <NewHero />

      <NewLandingPageAbout />

      <GlobalVoicesSection />

      <NewLandingPagePillars />

      {/* ══ PEDAGOGY ══ */}
      <section
        id="mentorship"
        style={{
          background: "linear-gradient(180deg,#0d3d2f,#071a11)",
          padding: "96px 24px",
        }}
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <SlideIn from="left">
            <div
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: ".73rem",
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
                fontSize: "clamp(2rem,4vw,3rem)",
                color: "#fff",
                marginBottom: 20,
                lineHeight: 1.15,
              }}
            >
              Moving Beyond Teachers
              <br />
              <span style={{ color: "#00c896" }}>to Practitioners</span>
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans',sans-serif",
                color: "rgba(255,255,255,.55)",
                fontSize: ".97rem",
                lineHeight: 1.85,
                marginBottom: 28,
              }}
            >
              We leverage the MIT Sloan 'Action Learning' methodology — used in
              world's top MBA programs. Over 6 months, students move from theory
              to market impact in a continuous loop.
            </p>
            {/* KPI boxes */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { n: "1:8", l: "Mentor Ratio" },
                { n: "6", l: "Months" },
                { n: "IIT/IIM", l: "Mentor Alumni" },
              ].map(({ n, l }) => (
                <div
                  key={l}
                  className="text-center p-4 rounded-2xl"
                  style={{
                    background: "rgba(0,200,150,.08)",
                    border: "1px solid rgba(0,200,150,.18)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: "1.3rem",
                      fontWeight: 900,
                      color: "#00c896",
                      marginBottom: 4,
                    }}
                  >
                    {n}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: ".68rem",
                      color: "rgba(255,255,255,.4)",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    {l}
                  </div>
                </div>
              ))}
            </div>
            {/* Gamification */}
            {[
              {
                icon: "star",
                t: "XP Points System",
                d: "Earn points for real-world milestones — Customer Feedback Loop, Automation Workflow Built.",
              },
              {
                icon: "trophy",
                t: "Leaderboard",
                d: "Healthy competitive spirit preparing students for the meritocratic world of global business.",
              },
              {
                icon: "badge",
                t: "Skill Badges",
                d: "Earn micro-credentials like Community Builder, AI Strategist, and Operations Analyst.",
              },
            ].map(({ icon, t, d }, i) => (
              <Reveal key={t} delay={i * 0.1}>
                <div
                  className="flex gap-4 p-4 rounded-xl mb-3"
                  style={{
                    background: "rgba(255,255,255,.04)",
                    border: "1px solid rgba(255,255,255,.07)",
                  }}
                >
                  <span style={{ flexShrink: 0 }}>
                    {HomeIcons[icon]
                      ? HomeIcons[icon]({ size: 28, color: "#00c896" })
                      : null}
                  </span>
                  <div>
                    <div
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        fontWeight: 700,
                        fontSize: ".88rem",
                        color: "#fff",
                        marginBottom: 4,
                      }}
                    >
                      {t}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        fontSize: ".78rem",
                        color: "rgba(255,255,255,.45)",
                        lineHeight: 1.6,
                      }}
                    >
                      {d}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </SlideIn>

          <SlideIn from="right">
            <div style={{ position: "sticky", top: 112 }}>
              <div
                className="p-8 rounded-3xl mb-5"
                style={{
                  background: "rgba(0,200,150,.07)",
                  border: "1px solid rgba(0,200,150,.2)",
                  boxShadow: "0 0 40px rgba(0,200,150,.1)",
                }}
              >
                <h3
                  style={{
                    color: "#fff",
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    marginBottom: 6,
                  }}
                >
                  MIT Sloan Action Learning Cycle
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: ".75rem",
                    color: "rgba(255,255,255,.4)",
                    marginBottom: 28,
                  }}
                >
                  A continuous loop from insight to real-world impact
                </p>
                {[
                  {
                    n: "01",
                    t: "SENSE",
                    d: "Identifying high-value problems using AI-driven market analysis.",
                  },
                  {
                    n: "02",
                    t: "STRATEGIZE",
                    d: "Building lean business models guided by Founder-Mentors.",
                  },
                  {
                    n: "03",
                    t: "SCALE",
                    d: "Executing real-world marketing and operations modules.",
                  },
                  {
                    n: "04",
                    t: "IMPACT",
                    d: "Demo Day pitch before investors, mentors, and school leaders.",
                  },
                ].map(({ n, t, d }, i) => (
                  <Reveal key={n} delay={i * 0.15}>
                    <div className="flex gap-4 mb-6 last:mb-0">
                      <div
                        style={{
                          width: 42,
                          height: 42,
                          borderRadius: "50%",
                          background: "rgba(0,200,150,.15)",
                          border: "2px solid #00c896",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          fontFamily: "'Playfair Display',serif",
                          fontWeight: 900,
                          color: "#00c896",
                          fontSize: ".85rem",
                        }}
                      >
                        {n}
                      </div>
                      <div>
                        <div
                          style={{
                            fontFamily: "'DM Sans',sans-serif",
                            fontWeight: 700,
                            fontSize: ".78rem",
                            letterSpacing: "1.5px",
                            textTransform: "uppercase",
                            color: "#00c896",
                            marginBottom: 4,
                          }}
                        >
                          {t}
                        </div>
                        <div
                          style={{
                            fontFamily: "'DM Sans',sans-serif",
                            fontSize: ".8rem",
                            color: "rgba(255,255,255,.5)",
                            lineHeight: 1.6,
                          }}
                        >
                          {d}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
              {/* Case study */}
              <Reveal delay={0.3}>
                <div
                  className="p-6 rounded-2xl"
                  style={{
                    background: "rgba(212,175,55,.07)",
                    border: "1px solid rgba(212,175,55,.2)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: ".72rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "1.5px",
                      color: "#d4af37",
                      marginBottom: 8,
                    }}
                  >
                    {HomeIcons.book({ size: 20, color: "#d4af37" })}
                    Harvard Case Study Mastery
                  </div>
                  <p
                    style={{
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: ".8rem",
                      color: "rgba(255,255,255,.5)",
                      lineHeight: 1.7,
                    }}
                  >
                    Students analyze real-world successes and failures — from
                    Gymshark's Community Strategy to Airbnb's Growth Hacking.
                    They don't just read about success; they deconstruct it.
                  </p>
                </div>
              </Reveal>
            </div>
          </SlideIn>
        </div>
      </section>

      {/* ══ ELITE MENTORSHIP ══ */}
      <section style={{ background: "#f6fefa", padding: "96px 24px" }}>
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <div
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: ".73rem",
                fontWeight: 700,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "#00c896",
                marginBottom: 14,
              }}
            >
              Apprenticing with the Top 1%
            </div>
            <h2
              style={{
                fontSize: "clamp(2rem,4vw,3rem)",
                color: "#0d3d2f",
                marginBottom: 16,
              }}
            >
              The Elite <span style={{ color: "#00c896" }}>Mentorship</span>{" "}
              Architecture
            </h2>
            <p
              style={{
                fontFamily: "'Playfair Display',serif",
                fontStyle: "italic",
                color: "#5a7a6e",
                fontSize: ".97rem",
                maxWidth: 540,
                margin: "0 auto",
                lineHeight: 1.8,
              }}
            >
              "You are the average of the five people you spend the most time
              with. We ensure those five people are industry leaders."
            </p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5 mb-12">
            {[
              {
                icon: "building",
                t: "Startup Founder Mentorship",
                d: "Learn directly from founders who have built and scaled successful startups, gaining real-world business insight beyond textbooks.",
              },
              {
                icon: "briefcase",
                t: "Industry Expert Guidance",
                d: "Fellows receive practical exposure from professionals in AI, Venture Capital, and Digital Marketing actively shaping today's economy.",
              },
              {
                icon: "gradCap",
                t: "Strategic Academic Oversight",
                d: "Program guided by professors from IIT Roorkee and IIM Ahmedabad, ensuring academic rigor and global relevance.",
              },
            ].map(({ icon, t, d }, i) => (
              <Reveal key={t} delay={i * 0.13}>
                <div
                  className="hover-lift p-8 rounded-2xl h-full"
                  style={{
                    background: "#fff",
                    border: "1px solid #e2f0ec",
                    boxShadow: "0 4px 20px rgba(13,61,47,.06)",
                  }}
                >
                  <div style={{ marginBottom: 16 }}>
                    {HomeIcons[icon]
                      ? HomeIcons[icon]({ size: 40, color: "#00c896" })
                      : null}
                  </div>
                  <h4
                    style={{
                      color: "#0d3d2f",
                      fontSize: "1rem",
                      fontWeight: 700,
                      marginBottom: 12,
                    }}
                  >
                    {t}
                  </h4>
                  <p
                    style={{
                      color: "#5a7a6e",
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: ".82rem",
                      lineHeight: 1.7,
                    }}
                  >
                    {d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          {/* Lifetime network */}
          <SlideIn from="left">
            <div
              className="p-8 md:p-10 rounded-3xl"
              style={{
                background: "linear-gradient(135deg,#0d3d2f,#1a5c46)",
                boxShadow: "0 20px 64px rgba(13,61,47,.28)",
              }}
            >
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <div
                    style={{
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: ".73rem",
                      fontWeight: 700,
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      color: "#00c896",
                      marginBottom: 14,
                    }}
                  >
                    The Lifetime Fellows Network
                  </div>
                  <h3
                    style={{
                      color: "#fff",
                      fontSize: "1.75rem",
                      marginBottom: 14,
                    }}
                  >
                    Graduation is Just the Beginning
                  </h3>
                  <p
                    style={{
                      color: "rgba(255,255,255,.55)",
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: ".9rem",
                      lineHeight: 1.8,
                    }}
                  >
                    All graduating fellows are inducted into the International
                    FutureX Fellows Cohort — a lifelong network of achievers.
                  </p>
                </div>
                <div>
                  {[
                    {
                      icon: "rocket",
                      t: "Direct access to incubation for selected ventures",
                    },
                    {
                      icon: "document",
                      t: "Letters of Recommendation with weight in international admissions",
                    },
                    {
                      icon: "globe",
                      t: "Priority invitations to global innovation summits",
                    },
                  ].map(({ icon, t }) => (
                    <div
                      key={t}
                      className="flex items-start gap-3 p-4 rounded-xl mb-3 last:mb-0"
                      style={{
                        background: "rgba(0,200,150,.08)",
                        border: "1px solid rgba(0,200,150,.15)",
                      }}
                    >
                      <span style={{ marginTop: 2 }}>
                        {HomeIcons[icon]
                          ? HomeIcons[icon]({ size: 22, color: "#00c896" })
                          : null}
                      </span>
                      <span
                        style={{
                          color: "rgba(255,255,255,.72)",
                          fontFamily: "'DM Sans',sans-serif",
                          fontSize: ".85rem",
                          lineHeight: 1.6,
                        }}
                      >
                        {t}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SlideIn>
        </div>
      </section>

      {/* ══ CERTIFICATIONS ══ */}
      <section
        style={{
          background: "linear-gradient(135deg,#071a11,#0d3d2f)",
          padding: "96px 24px",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <div
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: ".73rem",
                fontWeight: 700,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "#00c896",
                marginBottom: 14,
              }}
            >
              The Quad-Certification Portfolio
            </div>
            <h2
              style={{
                fontSize: "clamp(2rem,4vw,3rem)",
                color: "#fff",
                marginBottom: 16,
              }}
            >
              The Unfair Advantage in{" "}
              <span style={{ color: "#00c896" }}>College Admissions</span>
            </h2>
            <p
              style={{
                fontFamily: "'Playfair Display',serif",
                fontStyle: "italic",
                color: "rgba(255,255,255,.45)",
                fontSize: ".97rem",
                maxWidth: 500,
                margin: "0 auto",
              }}
            >
              "While others list extracurriculars, our Fellows present a
              professional portfolio of evidence."
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CERTS.map(({ icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 0.12}>
                <div
                  className="cert-card relative p-8 rounded-2xl h-full overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,.055)",
                    border: "1px solid rgba(0,200,150,.18)",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: -28,
                      right: -28,
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      background: "rgba(0,200,150,.06)",
                    }}
                  />
                  <div style={{ marginBottom: 18 }}>
                    {HomeIcons[icon]
                      ? HomeIcons[icon]({ size: 44, color: "#00c896" })
                      : null}
                  </div>
                  <h4
                    style={{
                      color: "#fff",
                      fontSize: "1rem",
                      fontWeight: 700,
                      marginBottom: 12,
                    }}
                  >
                    {title}
                  </h4>
                  <p
                    style={{
                      color: "rgba(255,255,255,.48)",
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: ".8rem",
                      lineHeight: 1.7,
                    }}
                  >
                    {desc}
                  </p>
                  <div
                    style={{
                      marginTop: 20,
                      height: 1,
                      borderRadius: 1,
                      background: "linear-gradient(90deg,#00c896,transparent)",
                    }}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ASSESSMENT & REWARDS ══ */}
      <section
        id="rewards"
        style={{ background: "#edf7f3", padding: "96px 24px" }}
      >
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <div
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: ".73rem",
                fontWeight: 700,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "#00c896",
                marginBottom: 14,
              }}
            >
              Assessment & Rewards
            </div>
            <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "#0d3d2f" }}>
              Measuring Impact Through{" "}
              <span style={{ color: "#00c896" }}>Rigorous Assessment</span>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-14 items-start">
            <SlideIn from="left">
              <div
                className="p-8 rounded-3xl"
                style={{
                  background: "#fff",
                  boxShadow: "0 8px 40px rgba(13,61,47,.08)",
                  border: "1px solid #d8ede7",
                }}
              >
                <h3
                  style={{
                    color: "#0d3d2f",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    marginBottom: 28,
                  }}
                >
                  Evaluation Framework{" "}
                  <span
                    style={{
                      fontSize: ".85rem",
                      color: "#5a7a6e",
                      fontWeight: 400,
                    }}
                  >
                    — Total 100 Marks
                  </span>
                </h3>
                {EVAL.map(({ label, pct }, i) => (
                  <EvalBar
                    key={label}
                    label={label}
                    pct={pct}
                    delay={i * 0.15}
                  />
                ))}
              </div>
            </SlideIn>
            <SlideIn from="right">
              <h3
                style={{
                  color: "#0d3d2f",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  marginBottom: 20,
                }}
              >
                Rewards &amp; Recognition
              </h3>
              {[
                { rank: 1, label: "1st Prize", a: "₹75,000", c: "#d4af37" },
                { rank: 2, label: "2nd Prize", a: "₹50,000", c: "#a8a9ad" },
                { rank: 3, label: "3rd Prize", a: "₹25,000", c: "#cd7f32" },
              ].map(({ rank, label, a, c }, i) => (
                <Reveal key={label} delay={i * 0.12}>
                  <div
                    className="flex items-center justify-between p-5 rounded-2xl mb-3"
                    style={{
                      background: "#fff",
                      border: "1px solid #e2f0ec",
                      boxShadow: "0 4px 16px rgba(13,61,47,.05)",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        fontFamily: "'DM Sans',sans-serif",
                        fontWeight: 600,
                        fontSize: ".92rem",
                        color: "#0d3d2f",
                      }}
                    >
                      <PrizeMedalIcon rank={rank} color={c} size={24} />
                      {label}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Playfair Display',serif",
                        fontWeight: 900,
                        fontSize: "1.5rem",
                        color: c,
                      }}
                    >
                      {a}
                    </span>
                  </div>
                </Reveal>
              ))}
              <div
                className="mt-6 p-7 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg,#0d3d2f,#1a5c46)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: ".72rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    color: "#00c896",
                    marginBottom: 16,
                  }}
                >
                  Elite Opportunities
                </div>
                {[
                  "Guided incubation to evolve into entrepreneurs, micropreneurs & solopreneurs",
                  "Lifetime mentorship through the International FutureX Fellows Cohort",
                  "Internship opportunities with partner startups",
                ].map((t, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 mb-3 last:mb-0"
                  >
                    <span style={{ flexShrink: 0, marginTop: 1 }}>
                      {HomeIcons.check({ size: 18, color: "#00c896" })}
                    </span>
                    <span
                      style={{
                        color: "rgba(255,255,255,.62)",
                        fontFamily: "'DM Sans',sans-serif",
                        fontSize: ".82rem",
                        lineHeight: 1.65,
                      }}
                    >
                      {t}
                    </span>
                  </div>
                ))}
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* ══ WHY PARTNER ══ */}
      <section style={{ background: "#f6fefa", padding: "96px 24px" }}>
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <div
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: ".73rem",
                fontWeight: 700,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "#00c896",
                marginBottom: 14,
              }}
            >
              For Schools
            </div>
            <h2
              style={{
                fontSize: "clamp(2rem,4vw,3rem)",
                color: "#0d3d2f",
                marginBottom: 10,
              }}
            >
              Why Partner with{" "}
              <span style={{ color: "#00c896" }}>FutureX?</span>
            </h2>
            <p
              style={{
                fontFamily: "'Playfair Display',serif",
                fontWeight: 700,
                fontSize: "1.25rem",
                color: "#0d3d2f",
              }}
            >
              Zero Load. Maximum Impact.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            {[
              {
                icon: "bolt",
                t: "Zero Admin Load",
                d: "We manage sessions, content, assessments, and communication.",
              },
              {
                icon: "trophy",
                t: "Enhance Reputation",
                d: "Recognition as a certified 'FutureX Partner School'.",
              },
              {
                icon: "gradCap",
                t: "Co-Branded Certs",
                d: "Each student certificate carries your school's name.",
              },
              {
                icon: "handshake",
                t: "Seamless Setup",
                d: "Dedicated school coordinator provided at no extra cost.",
              },
            ].map(({ icon, t, d }, i) => (
              <Reveal key={t} delay={i * 0.12}>
                <div
                  className="hover-lift text-center p-7 rounded-2xl h-full"
                  style={{
                    background: "#fff",
                    border: "1px solid #e2f0ec",
                    boxShadow: "0 4px 20px rgba(13,61,47,.06)",
                  }}
                >
                  <div
                    style={{
                      marginBottom: 14,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {HomeIcons[icon]
                      ? HomeIcons[icon]({ size: 44, color: "#00c896" })
                      : null}
                  </div>
                  <h4
                    style={{
                      color: "#0d3d2f",
                      fontSize: ".97rem",
                      fontWeight: 700,
                      marginBottom: 10,
                    }}
                  >
                    {t}
                  </h4>
                  <p
                    style={{
                      color: "#5a7a6e",
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: ".8rem",
                      lineHeight: 1.65,
                    }}
                  >
                    {d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <ScaleIn>
            <div
              className="text-center p-10 rounded-3xl max-w-lg mx-auto"
              style={{
                background: "linear-gradient(135deg,#0d3d2f,#1a5c46)",
                boxShadow: "0 20px 64px rgba(13,61,47,.28)",
              }}
            >
              <div
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: ".73rem",
                  fontWeight: 700,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "#00c896",
                  marginBottom: 12,
                }}
              >
                Program Fee
              </div>
              <div
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontWeight: 900,
                  color: "#fff",
                  fontSize: "clamp(2.8rem,5vw,3.8rem)",
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                ₹49,999
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  color: "rgba(255,255,255,.5)",
                  fontSize: ".88rem",
                  marginBottom: 28,
                }}
              >
                per student · one-time · all-inclusive
              </div>
              <a
                href="#contact"
                className="shimmer-btn inline-block px-10 py-4 text-sm"
                style={{
                  textDecoration: "none",
                  fontFamily: "'DM Sans',sans-serif",
                  letterSpacing: ".4px",
                }}
              >
                Enrol Your School Today →
              </a>
            </div>
          </ScaleIn>
        </div>
      </section>

      {/* ══ TEAM ══ */}
      <section
        id="team"
        style={{
          background: "linear-gradient(180deg,#071a11,#0d3d2f)",
          padding: "96px 24px",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-14">
            <div
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: ".73rem",
                fontWeight: 700,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "#00c896",
                marginBottom: 14,
              }}
            >
              Our Advisory Board
            </div>
            <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "#fff" }}>
              Guided by{" "}
              <span style={{ color: "#00c896" }}>Industry Leaders</span>
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
            {ADVISORS.map(({ img, name, role }, i) => (
              <Reveal key={name} delay={i * 0.1}>
                <div
                  className="hover-lift p-6 rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,.055)",
                    border: "1px solid rgba(0,200,150,.14)",
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: "rgba(0,200,150,.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 16,
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    {img ? (
                      <img
                        src={img}
                        alt={name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "center",
                          display: "block",
                        }}
                      />
                    ) : (
                      <span
                        style={{
                          fontFamily: "'Playfair Display',serif",
                          fontWeight: 900,
                          color: "#00c896",
                          fontSize: "1.2rem",
                        }}
                      >
                        {
                          name
                            .split(" ")
                            .filter((w) => w[0] === w[0].toUpperCase())
                            .slice(-1)[0]?.[0]
                        }
                      </span>
                    )}
                  </div>
                  <h4
                    style={{
                      color: "#fff",
                      fontFamily: "'Playfair Display',serif",
                      fontSize: ".95rem",
                      fontWeight: 700,
                      marginBottom: 8,
                    }}
                  >
                    {name}
                  </h4>
                  <p
                    style={{
                      color: "rgba(255,255,255,.42)",
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: ".76rem",
                      lineHeight: 1.65,
                    }}
                  >
                    {role}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section
        id="contact"
        style={{
          background: "linear-gradient(135deg,#071a11,#0d3d2f)",
          padding: "96px 24px",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <div
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: ".73rem",
                fontWeight: 700,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "#00c896",
                marginBottom: 16,
              }}
            >
              Empower the Next Generation
            </div>
            <h2
              style={{
                fontSize: "clamp(2rem,5vw,3.5rem)",
                color: "#fff",
                marginBottom: 20,
                lineHeight: 1.12,
              }}
            >
              Join the International Ecosystem of
              <br />
              <span style={{ color: "#00c896" }}>
                Future-Ready Institutions
              </span>
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans',sans-serif",
                color: "rgba(255,255,255,.5)",
                fontSize: ".95rem",
                lineHeight: 1.8,
                maxWidth: 480,
                margin: "0 auto 40px",
              }}
            >
              Get in touch to learn how FutureX Fellowship can transform your
              students into confident founders, thinkers, and leaders.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="grid sm:grid-cols-3 gap-4 mb-12">
              {[
                {
                  icon: "phone",
                  label: "Phone",
                  val: "7042671115 | 7042672300",
                  href: "tel:7042671115",
                },
                {
                  icon: "mail",
                  label: "Email",
                  val: "service.excellence@lyfshilpacademy.com",
                  href: "mailto:service.excellence@lyfshilpacademy.com",
                },
                {
                  icon: "globe",
                  label: "Website",
                  val: "lyfshilp.com",
                  href: "https://lyfshilp.com",
                },
              ].map(({ icon, label, val, href }) => (
                <a
                  key={label}
                  href={href}
                  className="hover-lift block p-6 rounded-2xl text-left"
                  style={{
                    background: "rgba(255,255,255,.05)",
                    border: "1px solid rgba(0,200,150,.18)",
                    textDecoration: "none",
                    transition: "transform .3s,box-shadow .3s",
                  }}
                >
                  <div style={{ marginBottom: 10 }}>
                    {HomeIcons[icon]
                      ? HomeIcons[icon]({ size: 32, color: "#00c896" })
                      : null}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: ".72rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "1.5px",
                      color: "#00c896",
                      marginBottom: 6,
                    }}
                  >
                    {label}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: ".78rem",
                      color: "rgba(255,255,255,.6)",
                      wordBreak: "break-all",
                      lineHeight: 1.6,
                    }}
                  >
                    {val}
                  </div>
                </a>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.35}>
            <a
              href="mailto:service.excellence@lyfshilpacademy.com"
              className="shimmer-btn inline-block px-12 py-5 text-base"
              style={{
                textDecoration: "none",
                fontFamily: "'DM Sans',sans-serif",
                letterSpacing: ".5px",
              }}
            >
              Partner with FutureX →
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
