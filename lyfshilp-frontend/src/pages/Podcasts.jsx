import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

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

/* ── Platform icons as inline SVGs ── */
const SpotifyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const GooglePodcastIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm-1.44 16.944V7.056A1.44 1.44 0 0112 5.616a1.44 1.44 0 011.44 1.44v9.888A1.44 1.44 0 0112 18.384a1.44 1.44 0 01-1.44-1.44zm-5.04-3.36V10.416a1.44 1.44 0 011.44-1.44 1.44 1.44 0 011.44 1.44v3.168a1.44 1.44 0 01-1.44 1.44 1.44 1.44 0 01-1.44-1.44zm10.32 0V10.416a1.44 1.44 0 011.44-1.44 1.44 1.44 0 011.44 1.44v3.168a1.44 1.44 0 01-1.44 1.44 1.44 1.44 0 01-1.44-1.44z"/>
  </svg>
);

/* ── Episode data ── */
const FEATURED = {
  ep: "EP 06",
  title: "Building India's First AI-Native Generation",
  guest: "Sharad Raaj Utsav",
  role: "CEO, Lyfshilp Academy",
  desc: "A candid conversation on why India's education system needs an AI-first reset, what FutureX Fellowship is building, and the 10-year vision for AI-ready students across the country.",
  duration: "48 min",
  tag: "AI",
  tagColor: "#00c896",
  crossLink: { label: "Explore FutureX Fellowship", href: "/futureX" },
};

const EPISODES = [
  {
    ep: "EP 01", title: "What NEP 2020 Really Means for School Principals", guest: "Panel Discussion", role: "School Leaders Across India",
    desc: "A practical breakdown of NEP 2020's AI literacy mandate and how forward-thinking principals are already acting on it.", duration: "42 min", tag: "Schools", tagColor: "#7c9fff", crossLink: { label: "For Schools", href: "/for-schools" },
  },
  {
    ep: "EP 02", title: "From NCERT to JEE: How AI is Changing Exam Prep", guest: "IIT Faculty Advisor", role: "IIT Roorkee",
    desc: "How students in Class 9–12 are using AI to build personalised study systems that bridge school and competitive exams.", duration: "37 min", tag: "AI", tagColor: "#00c896", crossLink: { label: "Summer Programme", href: "/summer-programme" },
  },
  {
    ep: "EP 03", title: "Why 38 School Principals Chose FutureX", guest: "Early Partner Schools", role: "FutureX Partner Network",
    desc: "A conversation with principals from our first cohort of partner schools — what convinced them, what surprised them.", duration: "51 min", tag: "Schools", tagColor: "#7c9fff", crossLink: { label: "For Schools", href: "/for-schools" },
  },
  {
    ep: "EP 04", title: "The Harvard AI Productivity Study: What It Means for Your Team", guest: "L&D Roundtable", role: "HR Directors & L&D Heads",
    desc: "Unpacking the 40–55% faster output finding and how organisations are structuring AI upskilling to capture that gain.", duration: "44 min", tag: "Corporates", tagColor: "#e27b6a", crossLink: { label: "Corporate AI Upskilling", href: "/corporate-ai-upskilling" },
  },
  {
    ep: "EP 05", title: "How Our Advisors from IIT & Stanford Are Shaping Indian Education", guest: "Advisory Board Conversation", role: "IIT Roorkee · IIM Ahmedabad · Stanford",
    desc: "Our advisory board discusses the gap between Indian academia and global employability — and what bridges it.", duration: "55 min", tag: "Entrepreneurship", tagColor: "#C9A84C", crossLink: { label: "About & Advisory Board", href: "/about" },
  },
  {
    ep: "EP 07", title: "Venture Building for College Students: Myth vs Reality", guest: "Startup Founder & FutureX Mentor", role: "Stanford Seed Alumni",
    desc: "What separates students who build real ventures from those who just pitch ideas — the mindset, the method, the mentors.", duration: "39 min", tag: "Entrepreneurship", tagColor: "#C9A84C", crossLink: { label: "For Colleges", href: "/for-colleges" },
  },
];

const ALL_TAGS = ["All", "AI", "Schools", "Entrepreneurship", "Corporates"];

const PLATFORMS = [
  { name: "Spotify", Icon: SpotifyIcon, color: "#1DB954", href: "https://open.spotify.com" },
  { name: "Apple Podcasts", Icon: AppleIcon, color: "#fc3c44", href: "https://podcasts.apple.com" },
  { name: "YouTube", Icon: YoutubeIcon, color: "#FF0000", href: "https://youtube.com" },
  { name: "Google Podcasts", Icon: GooglePodcastIcon, color: "#4285F4", href: "https://podcasts.google.com" },
];

/* ── JSON-LD schema ── */
const PODCAST_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "PodcastSeries",
  name: "Lyfshilp Podcast",
  description: "Conversations with educators, AI researchers, IIT and Stanford alumni, school leaders, and young founders on the future of learning in India.",
  url: "https://lyfshilpacademy.com/podcasts",
  author: { "@type": "Organization", name: "Lyfshilp Academy" },
  image: "https://lyfshilpacademy.com/logo.png",
};

export default function Podcasts() {
  const [activeTag, setActiveTag] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filtered = activeTag === "All" ? EPISODES : EPISODES.filter((e) => e.tag === activeTag);

  useEffect(() => {
    document.title = "Lyfshilp Podcast | Future of Education, AI & Entrepreneurship in India";
    const setMeta = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) { tag = document.createElement("meta"); tag.setAttribute("name", name); document.head.appendChild(tag); }
      tag.setAttribute("content", content);
    };
    setMeta("description", "Listen to the Lyfshilp podcast — conversations with educators, founders, IIT/IIM alumni, and Stanford mentors on AI, entrepreneurship, and the future of learning in India.");
    setMeta("keywords", "education podcast India, AI learning podcast, entrepreneurship podcast students India, future of education podcast, EdTech podcast India");
  }, []);

  return (
    <div style={{ background: "var(--color-bg-primary, #0C2D1E)", color: "var(--color-text-body, #FAFDF8)", fontFamily: "var(--font-body, 'DM Sans',sans-serif)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PODCAST_SCHEMA) }} />

      <style>{`
        .pc-accent  { color: #00c896; }
        .pc-gold    { color: var(--color-gold, #C9A84C); }
        .pc-divider { height: 1px; background: rgba(0,200,150,.1); }
        .pc-card {
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(0,200,150,.13);
          border-radius: 16px;
          overflow: hidden;
        }
        .pc-card-hover { transition: border-color .3s, background .3s, transform .3s; cursor: pointer; }
        .pc-card-hover:hover { border-color: rgba(0,200,150,.3); background: rgba(0,200,150,.05); transform: translateY(-3px); }
        .pc-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(0,200,150,.09); border: 1px solid rgba(0,200,150,.25);
          color: #00c896; padding: 5px 16px; border-radius: 50px;
          font-size: .7rem; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; margin-bottom: 22px;
        }
        .pc-pulse { width: 7px; height: 7px; border-radius: 50%; background: #00c896; display: inline-block; animation: pc-pulse 1.6s infinite; }
        @keyframes pc-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.4)} }
        .pc-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg,#00c896,#128061);
          color: #fff; font-weight: 700; padding: 13px 28px;
          border-radius: 50px; text-decoration: none; border: none; cursor: pointer;
          font-size: .9rem; letter-spacing: .3px;
          box-shadow: 0 6px 22px rgba(0,200,150,.28);
          transition: transform .25s, box-shadow .25s;
        }
        .pc-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(0,200,150,.4); }
        .pc-play-btn {
          width: 40px; height: 40px; border-radius: 50%;
          background: #00c896; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 16px rgba(0,200,150,.35);
          transition: transform .2s, box-shadow .2s; flex-shrink: 0;
        }
        .pc-play-btn:hover { transform: scale(1.12); box-shadow: 0 6px 22px rgba(0,200,150,.5); }
        .pc-filter-btn {
          padding: 7px 18px; border-radius: 50px; border: 1px solid rgba(0,200,150,.2);
          background: transparent; color: var(--color-text-muted, #7A9E8A);
          font-size: .78rem; font-weight: 600; cursor: pointer; letter-spacing: .5px;
          transition: all .2s; font-family: inherit;
        }
        .pc-filter-btn:hover { border-color: rgba(0,200,150,.45); color: #00c896; }
        .pc-filter-btn.active { background: rgba(0,200,150,.12); border-color: rgba(0,200,150,.45); color: #00c896; }
        .pc-platform-btn {
          display: flex; align-items: center; gap: 10px;
          padding: 12px 22px; border-radius: 12px;
          background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.1);
          text-decoration: none; color: var(--color-text-body);
          font-size: .85rem; font-weight: 600;
          transition: background .25s, border-color .25s, transform .2s;
        }
        .pc-platform-btn:hover { background: rgba(255,255,255,.08); transform: translateY(-2px); }
        .pc-cover {
          aspect-ratio: 1;
          background: linear-gradient(135deg, rgba(0,200,150,.15), rgba(201,168,76,.08));
          border-bottom: 1px solid rgba(0,200,150,.1);
          display: flex; align-items: center; justify-content: center;
        }
        .pc-ep-tag {
          display: inline-block; padding: 2px 10px; border-radius: 50px;
          font-size: .62rem; font-weight: 800; letter-spacing: 1.2px; text-transform: uppercase;
        }
        .pc-section-label { font-size: .7rem; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: #00c896; margin-bottom: 12px; }
        .pc-cross-link { display: inline-flex; align-items: center; gap: 5px; font-size: .75rem; font-weight: 600; text-decoration: none; transition: gap .2s; }
        .pc-cross-link:hover { gap: 8px; }
        .pc-subscribe-input {
          background: rgba(255,255,255,.05); border: 1px solid rgba(0,200,150,.22);
          border-radius: 50px 0 0 50px; padding: 12px 20px;
          color: #FAFDF8; font-size: .88rem; font-family: inherit;
          outline: none; min-width: 0; flex: 1;
          transition: border-color .2s;
        }
        .pc-subscribe-input:focus { border-color: rgba(0,200,150,.5); }
        .pc-subscribe-input::placeholder { color: rgba(255,255,255,.3); }
        .pc-subscribe-btn {
          background: linear-gradient(135deg,#00c896,#128061);
          color: #fff; font-weight: 700; padding: 12px 24px;
          border-radius: 0 50px 50px 0; border: none; cursor: pointer;
          font-size: .88rem; font-family: inherit;
          transition: opacity .2s;
        }
        .pc-subscribe-btn:hover { opacity: .88; }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ padding: "116px 24px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at 12% 55%, rgba(0,200,150,.1), transparent 50%), radial-gradient(ellipse at 86% 20%, rgba(201,168,76,.06), transparent 42%)" }} />
        <div className="max-w-4xl mx-auto text-center" style={{ position: "relative", zIndex: 2 }}>
          <Reveal>
            <div className="pc-badge"><span className="pc-pulse" />Podcast · Thought Leadership</div>
            <h1 style={{ fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "clamp(2.2rem,5.5vw,4rem)", lineHeight: 1.08, color: "var(--color-text-body)", marginBottom: 20, letterSpacing: "-.015em" }}>
              Ideas That Shape the<br />
              <span className="pc-accent">Future of Learning.</span>
            </h1>
            <p style={{ fontSize: "clamp(.97rem,2vw,1.15rem)", color: "var(--color-text-muted, #7A9E8A)", lineHeight: 1.8, maxWidth: 600, margin: "0 auto 40px" }}>
              Conversations with educators, AI researchers, IIT and Stanford alumni, school leaders, and young founders — on what it really takes to prepare students for the world ahead.
            </p>
          </Reveal>

          {/* Platform strip in hero */}
          <Reveal delay={0.1}>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 10 }}>
              {PLATFORMS.map(({ name, Icon, color, href }) => (
                <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="pc-platform-btn" style={{ borderColor: `${color}28` }}>
                  <span style={{ color }}><Icon /></span>
                  <span style={{ fontSize: ".78rem" }}>{name}</span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <div className="pc-divider" />

      {/* ── FEATURED EPISODE ── */}
      <section style={{ padding: "72px 24px" }}>
        <div className="max-w-5xl mx-auto">
          <Reveal style={{ marginBottom: 28 }}>
            <div className="pc-section-label">Featured Episode</div>
          </Reveal>
          <Reveal>
            <div style={{ background: "rgba(0,200,150,.06)", border: "1px solid rgba(0,200,150,.22)", borderRadius: 20, overflow: "hidden" }}>
              <div className="grid md:grid-cols-5" style={{ gap: 0 }}>
                {/* cover art */}
                <div style={{ gridColumn: "1 / 2", background: "linear-gradient(135deg,rgba(0,200,150,.18),rgba(12,45,30,.9))", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 30px", minHeight: 220 }}>
                  <div style={{ width: 72, height: 72, borderRadius: 20, background: "rgba(0,200,150,.2)", border: "1px solid rgba(0,200,150,.4)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00c896" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
                  </div>
                  <span style={{ fontSize: ".68rem", color: "rgba(0,200,150,.7)", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase" }}>{FEATURED.ep}</span>
                </div>

                {/* content */}
                <div style={{ gridColumn: "2 / 6", padding: "32px 32px 28px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
                    <span className="pc-ep-tag" style={{ background: `${FEATURED.tagColor}18`, border: `1px solid ${FEATURED.tagColor}35`, color: FEATURED.tagColor }}>{FEATURED.tag}</span>
                    <span style={{ color: "var(--color-text-muted, #7A9E8A)", fontSize: ".72rem" }}>{FEATURED.duration}</span>
                  </div>
                  <h2 style={{ fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "clamp(1.2rem,2.5vw,1.7rem)", color: "var(--color-text-body)", lineHeight: 1.2, marginBottom: 10 }}>{FEATURED.title}</h2>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(0,200,150,.14)", border: "1px solid rgba(0,200,150,.28)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".6rem", fontWeight: 900, color: "#00c896" }}>
                      {FEATURED.guest.charAt(0)}
                    </div>
                    <div>
                      <span style={{ fontWeight: 700, fontSize: ".85rem", color: "var(--color-text-body)" }}>{FEATURED.guest}</span>
                      <span style={{ color: "var(--color-text-muted, #7A9E8A)", fontSize: ".78rem" }}> · {FEATURED.role}</span>
                    </div>
                  </div>
                  <p style={{ color: "var(--color-text-muted, #7A9E8A)", fontSize: ".88rem", lineHeight: 1.7, marginBottom: 20 }}>{FEATURED.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                    <button className="pc-btn-primary">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                      Listen Now
                    </button>
                    <Link to={FEATURED.crossLink.href} className="pc-cross-link" style={{ color: "#00c896" }}>
                      {FEATURED.crossLink.label} <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="pc-divider" />

      {/* ── EPISODE GRID ── */}
      <section style={{ padding: "72px 24px" }}>
        <div className="max-w-5xl mx-auto">
          <Reveal style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
              <div>
                <div className="pc-section-label">All Episodes</div>
                <h2 style={{ fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "clamp(1.6rem,3.5vw,2.4rem)", color: "var(--color-text-body)", lineHeight: 1.15 }}>
                  Browse by <span className="pc-accent">Topic</span>
                </h2>
              </div>
              {/* filters */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {ALL_TAGS.map((t) => (
                  <button key={t} className={`pc-filter-btn ${activeTag === t ? "active" : ""}`} onClick={() => setActiveTag(t)}>{t}</button>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(({ ep, title, guest, role, desc, duration, tag, tagColor, crossLink }, i) => (
              <Reveal key={ep} delay={i * 0.06}>
                <div className="pc-card pc-card-hover h-full" style={{ display: "flex", flexDirection: "column" }}>
                  {/* cover */}
                  <div className="pc-cover">
                    <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(0,200,150,.15)", border: "1px solid rgba(0,200,150,.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00c896" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/></svg>
                    </div>
                  </div>

                  {/* body */}
                  <div style={{ padding: "20px 18px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                      <span className="pc-ep-tag" style={{ background: `${tagColor}14`, border: `1px solid ${tagColor}32`, color: tagColor }}>{tag}</span>
                      <span style={{ color: "var(--color-text-muted, #7A9E8A)", fontSize: ".7rem", fontWeight: 600 }}>{ep} · {duration}</span>
                    </div>
                    <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: ".95rem", color: "var(--color-text-body)", lineHeight: 1.35, marginBottom: 8 }}>{title}</h3>
                    <div style={{ color: "var(--color-text-muted, #7A9E8A)", fontSize: ".75rem", fontWeight: 600, marginBottom: 10 }}>
                      {guest} · <span style={{ fontWeight: 400 }}>{role}</span>
                    </div>
                    <p style={{ color: "var(--color-text-muted, #7A9E8A)", fontSize: ".8rem", lineHeight: 1.65, margin: "0 0 auto" }}>{desc}</p>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(0,200,150,.08)" }}>
                      <button className="pc-play-btn" aria-label={`Play ${title}`}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                      </button>
                      <Link to={crossLink.href} className="pc-cross-link" style={{ color: tagColor }}>
                        {crossLink.label} <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="pc-divider" />

      {/* ── PLATFORM STRIP ── */}
      <section style={{ padding: "64px 24px", background: "rgba(255,255,255,.015)" }}>
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center" style={{ marginBottom: 32 }}>
            <div className="pc-section-label">Listen Everywhere</div>
            <h2 style={{ fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "clamp(1.5rem,3vw,2rem)", color: "var(--color-text-body)" }}>
              Available on All <span className="pc-accent">Major Platforms</span>
            </h2>
          </Reveal>
          <Reveal>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 14 }}>
              {PLATFORMS.map(({ name, Icon, color, href }) => (
                <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="pc-platform-btn" style={{ borderColor: `${color}33`, minWidth: 180 }}>
                  <span style={{ color, width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon /></span>
                  <div>
                    <div style={{ fontSize: ".65rem", color: "var(--color-text-muted, #7A9E8A)", fontWeight: 600, letterSpacing: ".8px", textTransform: "uppercase", marginBottom: 1 }}>Listen on</div>
                    <div style={{ fontWeight: 700, fontSize: ".88rem" }}>{name}</div>
                  </div>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <div className="pc-divider" />

      {/* ── SUBSCRIBE CTA ── */}
      <section style={{ padding: "80px 24px" }}>
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <div className="pc-section-label" style={{ marginBottom: 14 }}>Never Miss an Episode</div>
            <h2 style={{ fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.6rem)", color: "var(--color-text-body)", lineHeight: 1.1, marginBottom: 12 }}>
              Stay Ahead of the<br />
              <span className="pc-accent">Conversation.</span>
            </h2>
            <p style={{ color: "var(--color-text-muted, #7A9E8A)", fontSize: ".9rem", lineHeight: 1.7, marginBottom: 32 }}>
              New episodes drop every week. Subscribe to get notified first.
            </p>

            {subscribed ? (
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 28px", borderRadius: 50, background: "rgba(0,200,150,.1)", border: "1px solid rgba(0,200,150,.3)", color: "#00c896", fontWeight: 700 }}>
                <span>✓</span> You're subscribed — we'll notify you of new episodes!
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true); }}
                style={{ display: "flex", maxWidth: 440, margin: "0 auto" }}
              >
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address" required
                  className="pc-subscribe-input"
                />
                <button type="submit" className="pc-subscribe-btn">Subscribe</button>
              </form>
            )}

            <p style={{ color: "var(--color-text-muted, #7A9E8A)", fontSize: ".75rem", marginTop: 12 }}>
              No spam. Unsubscribe anytime. Or follow directly on{" "}
              <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer" style={{ color: "#1DB954", textDecoration: "none", fontWeight: 600 }}>Spotify</a>.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
