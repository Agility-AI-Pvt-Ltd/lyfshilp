import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Sharadimg from "../assets/Aboutimg/Sharad.svg";
import Shreyaimg from "../assets/Aboutimg/Shreya.svg";
import Saurabhimg from "../assets/Aboutimg/Saurabh.svg";
import AboutImage from "../assets/Aboutimg/LyfshilpStudents.svg";
import { FaLinkedin } from "react-icons/fa";

/* ── scroll reveal ── */
const useInView = (threshold = 0.08) => {
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
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
};

/* ── data ── */
const STATS = [
  { value: "38+", label: "Partner Institutions", sub: "Schools & colleges across India" },
  { value: "6,000+", label: "Students Impacted", sub: "Through fellowships, workshops & programmes" },
  { value: "250+", label: "Workshops Conducted", sub: "AI, ICT & gamified learning sessions" },
  { value: "85%", label: "Improvement Rate", sub: "Measurable growth with structured mentoring" },
];

const TEAM = [
  {
    img: Sharadimg,
    name: "Sharad Raaj Utsav",
    title: "Founder & CEO",
    creds: "Stanford Seed · Stanford GSB · B.Tech NSUT · MBA IRMA · M.S. BITS Pilani",
    exp: "~10 Years",
    linkedin: "https://www.linkedin.com/in/sharadrajutsav",
    bio: `A curious mind with degrees in Engineering, Management and Law, Sharad has explored education, business and development across organisations like the United Nations, Amul and Piramal Foundation. His journey from boardrooms to classrooms inspired Lyfshilp Academy, where he's on a mission to make learning fun, relevant, and future-ready.\n\n"If learning feels like a chore, you're doing it wrong."`,
  },
  {
    img: Shreyaimg,
    name: "Shreya Sinha",
    title: "Co-Founder & COO",
    creds: "B.Tech NSUT · PGP MICA · Ex-DM Head Piramal Pharma",
    exp: "~10 Years",
    linkedin: "https://www.linkedin.com/in/shreya-sinha2802",
    bio: `An Engineer turned Educator, Shreya brings creativity and empathy to everything she designs. Her experience in Digital Marketing at Piramal Pharma and with Piramal Foundation gave her a unique blend of analytical thinking and human-centred design — helping her understand how young minds learn best.\n\n"When students feel seen, learning takes care of itself."`,
  },
  {
    img: Saurabhimg,
    name: "CA Saurabh Jain",
    title: "Co-Founder & CFO",
    creds: "FCA · Cer.IFRS (ICAI) · CS-E · Cer.Startup (ICAI) · FAFD · BRSR",
    exp: "10+ Years",
    linkedin: "https://www.linkedin.com/in/ca-saurabh-jain-8a014034/",
    bio: `A Chartered Accountant who believes numbers and learning can be equally exciting, Saurabh brings financial discipline and strategic clarity to Lyfshilp's vision. Having worked with multiple startups and education ventures, he ensures the academy grows with purpose and sustainability.\n\n"Strong foundations build not just balance sheets — but better learners."`,
  },
  {
    img: null,
    name: "Aryan Shukla",
    title: "CTO",
    creds: "B.Tech · M.Tech IIT BHU · Samsung Research India",
    exp: "3 Years",
    linkedin: "#",
    bio: `An IIT BHU alumnus and former researcher at Samsung Research India, Aryan architects the technology backbone of Lyfshilp's learning platform — from AI-driven personalisation to scalable delivery infrastructure that powers students across India.`,
  },
];

const ADVISORS = [
  {
    name: "Prof. Sumit Kumar Yadav",
    title: "Asst. Professor",
    inst: "IIT Roorkee",
    creds: "PhD IIM Ahmedabad · B.Tech IIT Bombay",
    initial: "SY",
  },
  {
    name: "Prof. Aashish Argade",
    title: "Asst. Professor",
    inst: "IRMA",
    creds: "PhD IIM Ahmedabad",
    initial: "AA",
  },
  {
    name: "Sri R. Ramaseshan",
    title: "Former IAS",
    inst: "NCDEX",
    creds: "Ex-MD & CEO NCDEX · Chairman National Commodity Clearing Ltd.",
    initial: "RR",
  },
  {
    name: "Prof. Ashok R. Patil",
    title: "Vice Chancellor",
    inst: "NUSRL",
    creds: "Professor NLSIU Bengaluru",
    initial: "AP",
  },
  {
    name: "Dr. Rajeev Tyagi",
    title: "Principal",
    inst: "Mt Carmel School, Delhi",
    creds: "IIT Roorkee Alumnus · Mt Carmel School Dwarka",
    initial: "RT",
  },
];

export default function AboutUs() {
  useEffect(() => {
    document.title = "About Lyfshilp Academy | DPIIT EdTech | Incubated at IIIT Allahabad";
    const setMeta = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) { tag = document.createElement("meta"); tag.setAttribute("name", name); document.head.appendChild(tag); }
      tag.setAttribute("content", content);
    };
    setMeta("description", "Lyfshilp Academy is a DPIIT-recognised EdTech startup incubated at IIIT Allahabad. Our mission: make AI-powered learning accessible to every student in India. Meet our founding team and advisory board.");
    setMeta("keywords", "Lyfshilp Academy about, DPIIT EdTech startup India, EdTech IIIT Allahabad, AI education startup India founding team");
  }, []);

  return (
    <div style={{ background: "var(--color-bg-primary, #0C2D1E)", color: "var(--color-text-body, #FAFDF8)", fontFamily: "var(--font-body, 'DM Sans',sans-serif)" }}>
      <style>{`
        .ab-accent  { color: #00c896; }
        .ab-gold    { color: var(--color-gold, #C9A84C); }
        .ab-divider { height: 1px; background: rgba(0,200,150,.1); }
        .ab-card {
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(0,200,150,.13);
          border-radius: 18px; overflow: hidden;
        }
        .ab-card-hover { transition: border-color .3s, transform .3s; }
        .ab-card-hover:hover { border-color: rgba(0,200,150,.3); transform: translateY(-4px); }
        .ab-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(0,200,150,.09); border: 1px solid rgba(0,200,150,.25);
          color: #00c896; padding: 5px 16px; border-radius: 50px;
          font-size: .7rem; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; margin-bottom: 22px;
        }
        .ab-pulse { width: 7px; height: 7px; border-radius: 50%; background: #00c896; display: inline-block; animation: ab-pulse 1.6s infinite; }
        @keyframes ab-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.4)} }
        .ab-section-label { font-size: .7rem; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: #00c896; margin-bottom: 12px; }
        .ab-h2 { font-family: var(--font-body); font-weight: 800; font-size: clamp(1.8rem,4vw,2.8rem); color: var(--color-text-body); line-height: 1.12; }
        .ab-initial-avatar {
          width: 52px; height: 52px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: .82rem; letter-spacing: .5px;
          background: rgba(0,200,150,.12); border: 1px solid rgba(0,200,150,.28);
          color: #00c896; flex-shrink: 0;
        }
        .ab-linkedin { display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 9px; background: rgba(10,102,194,.15); border: 1px solid rgba(10,102,194,.3); color: #0A66C2; transition: background .2s; text-decoration: none; }
        .ab-linkedin:hover { background: rgba(10,102,194,.28); }
        .ab-cred-pill { display: inline-block; background: rgba(201,168,76,.08); border: 1px solid rgba(201,168,76,.2); color: rgba(201,168,76,.85); font-size: .65rem; font-weight: 700; letter-spacing: .8px; padding: 3px 10px; border-radius: 50px; margin: 2px 2px; }
        .ab-advisor-card {
          background: rgba(255,255,255,.025);
          border: 1px solid rgba(0,200,150,.12);
          border-radius: 16px; padding: 22px 18px;
          transition: border-color .3s, background .3s, transform .3s;
        }
        .ab-advisor-card:hover { border-color: rgba(0,200,150,.28); background: rgba(0,200,150,.04); transform: translateY(-3px); }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ padding: "116px 24px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at 12% 55%, rgba(0,200,150,.1), transparent 50%), radial-gradient(ellipse at 86% 20%, rgba(201,168,76,.06), transparent 42%)" }} />
        <div className="max-w-4xl mx-auto text-center" style={{ position: "relative", zIndex: 2 }}>
          <Reveal>
            <div className="ab-badge"><span className="ab-pulse" />DPIIT Recognised · Incubated at IIIT Allahabad</div>
            <h1 style={{ fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "clamp(2.1rem,5.5vw,3.9rem)", lineHeight: 1.08, color: "var(--color-text-body)", marginBottom: 20, letterSpacing: "-.015em" }}>
              On a Mission to Make AI-Powered<br />
              Learning <span className="ab-accent">Accessible to Every</span><br />
              <span className="ab-gold">Student in India.</span>
            </h1>
            <p style={{ fontSize: "clamp(.97rem,2vw,1.15rem)", color: "var(--color-text-muted, #7A9E8A)", lineHeight: 1.8, maxWidth: 620, margin: "0 auto 36px" }}>
              Lyfshilp Academy is a DPIIT-recognised EdTech startup incubated at IIIT Allahabad. We bridge the gap between the way students learn today and the skills they will need tomorrow.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              {["38+ Partner Institutions", "6,000+ Students Impacted", "IIIT Allahabad Incubated", "DPIIT Recognised"].map((t) => (
                <span key={t} style={{ padding: "5px 15px", borderRadius: 50, background: "rgba(0,200,150,.06)", border: "1px solid rgba(0,200,150,.16)", fontSize: ".72rem", color: "var(--color-text-muted, #7A9E8A)", fontWeight: 600 }}>{t}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <div className="ab-divider" />

      {/* ── OUR STORY ── */}
      <section style={{ padding: "80px 24px" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* image */}
            <Reveal delay={0.04}>
              <div style={{ borderRadius: 20, overflow: "hidden", border: "1px solid rgba(0,200,150,.14)" }}>
                <img src={AboutImage} alt="Lyfshilp Students" style={{ width: "100%", display: "block", objectFit: "cover" }} />
              </div>
            </Reveal>

            {/* text */}
            <Reveal delay={0.1}>
              <div className="ab-section-label">Our Story</div>
              <h2 className="ab-h2" style={{ marginBottom: 20 }}>
                Beyond Exams,<br />
                <span className="ab-accent">Towards Excellence.</span>
              </h2>
              <p style={{ color: "var(--color-text-muted, #7A9E8A)", fontSize: ".93rem", lineHeight: 1.8, marginBottom: 20 }}>
                We believe education goes beyond exams. Our mission is to prepare students with AI-powered preparation, mentorship and skills to succeed academically, professionally and personally.
              </p>
              <p style={{ color: "var(--color-text-muted, #7A9E8A)", fontSize: ".93rem", lineHeight: 1.8, marginBottom: 24 }}>
                With 38 partner institutions and over 6,000 students impacted, our programmes are built on rigorous pedagogy, real academic outcomes, and deep respect for the school ecosystem.
              </p>
              <div style={{ padding: "16px 20px", borderRadius: 12, background: "rgba(201,168,76,.07)", border: "1px solid rgba(201,168,76,.2)", fontSize: ".8rem", color: "rgba(201,168,76,.85)", fontStyle: "italic", lineHeight: 1.7 }}>
                Powered by <strong>Lyfshilp Academy Pvt. Ltd.</strong> &amp; <strong>Agility AI Pvt. Ltd.</strong>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="ab-divider" />

      {/* ── STATS ── */}
      <section style={{ padding: "72px 24px", background: "rgba(0,200,150,.025)" }}>
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center" style={{ marginBottom: 44 }}>
            <div className="ab-section-label">Impact by the Numbers</div>
            <h2 className="ab-h2">Our Success <span className="ab-accent">So Far</span></h2>
            <p style={{ color: "var(--color-text-muted, #7A9E8A)", fontSize: ".93rem", marginTop: 10 }}>
              Empowering students with AI-driven exam prep, Olympiad training, mentorship and workshops.
            </p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 items-stretch">
            {STATS.map(({ value, label, sub }, i) => (
              <Reveal key={label} delay={i * 0.08}>
                <div style={{ background: "rgba(0,200,150,.06)", border: "1px solid rgba(0,200,150,.18)", borderRadius: 16, padding: "26px 18px", textAlign: "center", height: "100%", minHeight: 190, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div style={{ fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "clamp(1.6rem,3vw,2.4rem)", color: "#00c896", lineHeight: 1, marginBottom: 8 }}>{value}</div>
                  <div style={{ fontWeight: 700, fontSize: ".85rem", color: "var(--color-text-body)", marginBottom: 6 }}>{label}</div>
                  <div style={{ color: "var(--color-text-muted, #7A9E8A)", fontSize: ".72rem", lineHeight: 1.5 }}>{sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="ab-divider" />

      {/* ── FOUNDING TEAM ── */}
      <section style={{ padding: "80px 24px" }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center" style={{ marginBottom: 52 }}>
            <div className="ab-section-label">Founding Team</div>
            <h2 className="ab-h2">
              The Minds Behind <span className="ab-accent">Lyfshilp Academy</span>
            </h2>
            <p style={{ color: "var(--color-text-muted, #7A9E8A)", fontSize: ".95rem", marginTop: 10, maxWidth: 540, margin: "10px auto 0" }}>
              Behind every student's success is a founding team that blends engineering, management, law, and finance.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map(({ img, name, title, creds, exp, linkedin, bio }, i) => (
              <Reveal key={name} delay={i * 0.09}>
                <div className="ab-card ab-card-hover h-full" style={{ display: "flex", flexDirection: "column" }}>
                  {/* photo / avatar */}
                  <div style={{ aspectRatio: "3/4", overflow: "hidden", background: "linear-gradient(135deg,rgba(0,200,150,.12),rgba(12,45,30,.9))", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                    {img ? (
                      <img src={img} alt={name} style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center top" }} />
                    ) : (
                      <div style={{ width: 72, height: 72, borderRadius: 20, background: "rgba(0,200,150,.18)", border: "1px solid rgba(0,200,150,.35)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "1.4rem", color: "#00c896" }}>
                        {name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                      </div>
                    )}
                    {/* overlay */}
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent,rgba(0,0,0,.75))", padding: "20px 14px 12px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                      <div>
                        <div style={{ fontSize: ".7rem", color: "rgba(255,255,255,.65)", fontWeight: 600, marginBottom: 2 }}>{title}</div>
                        <div style={{ fontSize: ".88rem", fontWeight: 700, color: "#fff" }}>{name}</div>
                      </div>
                      <a href={linkedin} target="_blank" rel="noopener noreferrer" className="ab-linkedin" aria-label={`${name} LinkedIn`}>
                        <FaLinkedin size={14} />
                      </a>
                    </div>
                  </div>

                  {/* body */}
                  <div style={{ padding: "18px 16px", flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
                    <div>
                      {creds.split(" · ").map((c) => (
                        <span key={c} className="ab-cred-pill">{c}</span>
                      ))}
                    </div>
                    <div style={{ height: 1, background: "rgba(0,200,150,.08)" }} />
                    <p style={{ color: "var(--color-text-muted, #7A9E8A)", fontSize: ".8rem", lineHeight: 1.7, margin: 0, whiteSpace: "pre-line" }}>{bio}</p>
                    <div style={{ fontSize: ".7rem", color: "rgba(0,200,150,.7)", fontWeight: 600, marginTop: "auto" }}>{exp} experience</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="ab-divider" />

      {/* ── ADVISORY BOARD ── */}
      <section style={{ padding: "80px 24px", background: "rgba(201,168,76,.025)" }}>
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center" style={{ marginBottom: 52 }}>
            <div className="ab-section-label">Advisory Board</div>
            <h2 className="ab-h2">
              Guided by the <span className="ab-gold">Best Minds</span> in India
            </h2>
            <p style={{ color: "var(--color-text-muted, #7A9E8A)", fontSize: ".93rem", marginTop: 10, maxWidth: 520, margin: "10px auto 0" }}>
              Professors from IIT, IIM, and IRMA. A former IAS officer. A Vice Chancellor. Our advisors bring academic rigour and institutional wisdom to everything we build.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ADVISORS.map(({ name, title, inst, creds, initial }, i) => (
              <Reveal key={name} delay={i * 0.08}>
                <div className="ab-advisor-card h-full" style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div className="ab-initial-avatar">{initial}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: ".92rem", color: "var(--color-text-body)", marginBottom: 2 }}>{name}</div>
                    <div style={{ fontSize: ".75rem", color: "#00c896", fontWeight: 600, marginBottom: 6 }}>
                      {title} · <span style={{ color: "var(--color-gold, #C9A84C)" }}>{inst}</span>
                    </div>
                    <div style={{ color: "var(--color-text-muted, #7A9E8A)", fontSize: ".75rem", lineHeight: 1.6 }}>{creds}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* institution logos strip */}
          <Reveal delay={0.2} style={{ marginTop: 44 }}>
            <div style={{ borderTop: "1px solid rgba(201,168,76,.12)", paddingTop: 28, textAlign: "center" }}>
              <div style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--color-text-muted, #7A9E8A)", marginBottom: 16 }}>Advisory Institutions</div>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 }}>
                {["IIT Roorkee", "IIM Ahmedabad", "IIT Bombay", "IRMA", "NUSRL", "NLSIU Bengaluru", "Mt Carmel School"].map((inst) => (
                  <span key={inst} style={{ padding: "6px 16px", borderRadius: 50, background: "rgba(201,168,76,.07)", border: "1px solid rgba(201,168,76,.2)", fontSize: ".75rem", color: "rgba(201,168,76,.8)", fontWeight: 600 }}>{inst}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="ab-divider" />

      {/* ── CTA ── */}
      <section style={{ padding: "88px 24px" }}>
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <div className="ab-section-label" style={{ marginBottom: 14 }}>Work With Us</div>
            <h2 style={{ fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "var(--color-text-body)", lineHeight: 1.1, marginBottom: 12 }}>
              Join the Mission to Build<br />
              <span className="ab-accent">India's AI-Ready Generation.</span>
            </h2>
            <p style={{ color: "var(--color-text-muted, #7A9E8A)", fontSize: ".9rem", lineHeight: 1.7, marginBottom: 32 }}>
              Whether you're a school, a college, a corporate, or an individual — there's a place for you in the Lyfshilp ecosystem.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/for-schools" style={{ display: "inline-block", background: "linear-gradient(135deg,#00c896,#128061)", color: "#fff", fontWeight: 700, padding: "14px 32px", borderRadius: 50, textDecoration: "none", fontSize: ".92rem", boxShadow: "0 6px 22px rgba(0,200,150,.28)", transition: "transform .25s" }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "none"}>
                Partner Your School →
              </Link>
              <Link to="/contact" style={{ display: "inline-block", border: "1.5px solid rgba(0,200,150,.35)", color: "#00c896", padding: "14px 32px", borderRadius: 50, textDecoration: "none", fontSize: ".92rem", fontWeight: 600, transition: "background .25s" }}
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(0,200,150,.08)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "none"}>
                Get in Touch
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
