import { useEffect, useRef, useState } from "react";
import ExploreYoutubeSection from "../components/ExploreYoutubeSection.jsx";

const PLAYLIST_ID  = "PL8bYh1-B5eAbnEI_GEPCpWEorMafGBuT0";
const PLAYLIST_URL = `https://www.youtube.com/playlist?list=${PLAYLIST_ID}`;

/* 5 individual episodes */
const EPISODES = [
  { id: "CKoszLxWnfU", ep: "EP 01" },
  { id: "M58tGvdkrTM", ep: "EP 02" },
  { id: "QmqcBfIl5ws", ep: "EP 03" },
  { id: "4Uk1_vlvJFE", ep: "EP 04" },
  { id: "45zd4FUG0UQ", ep: "EP 05" },
];

/* ── scroll reveal ── */
const useInView = (threshold = 0.06) => {
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
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(22px)", transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
};

const YTIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export default function Podcast() {
  const [featured, setFeatured] = useState(EPISODES[0]);

  useEffect(() => {
    document.title = "Lyfshilp Podcast | Unlecture Podcast Series on YouTube";
    const setMeta = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) { tag = document.createElement("meta"); tag.setAttribute("name", name); document.head.appendChild(tag); }
      tag.setAttribute("content", content);
    };
    setMeta("description", "Watch the Lyfshilp Unlecture Podcast Series on YouTube — conversations with educators, founders, IIT/IIM alumni and mentors on AI, entrepreneurship, and the future of learning in India.");
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--color-bg-primary, #0C2D1E)", color: "var(--color-text-body, #FAFDF8)", fontFamily: "var(--font-body,'DM Sans',sans-serif)" }}
    >
      <style>{`
        .pod-divider { height: 1px; background: rgba(0,200,150,.1); }
        .pod-accent  { color: #00c896; }
        .pod-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(0,200,150,.09); border: 1px solid rgba(0,200,150,.25);
          color: #00c896; padding: 5px 16px; border-radius: 50px;
          font-size: .7rem; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; margin-bottom: 22px;
        }
        .pod-pulse { width: 7px; height: 7px; border-radius: 50%; background: #00c896; display: inline-block; animation: pod-pulse 1.6s infinite; }
        @keyframes pod-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.4)} }
        .pod-yt-btn {
          display: inline-flex; align-items: center; gap: 9px;
          background: #FF0000; color: #fff; font-weight: 700;
          padding: 13px 28px; border-radius: 50px; text-decoration: none;
          font-size: .9rem; box-shadow: 0 6px 22px rgba(255,0,0,.28);
          transition: transform .2s, box-shadow .2s;
        }
        .pod-yt-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(255,0,0,.4); }
        .pod-sub-btn {
          display: inline-flex; align-items: center; gap: 8px;
          border: 1.5px solid rgba(0,200,150,.38); color: #00c896;
          padding: 12px 26px; border-radius: 50px; text-decoration: none;
          font-size: .9rem; font-weight: 600; transition: background .2s;
        }
        .pod-sub-btn:hover { background: rgba(0,200,150,.09); }
        .pod-thumb {
          position: relative; cursor: pointer;
          border-radius: 12px; overflow: hidden;
          border: 2px solid rgba(0,200,150,.15);
          transition: border-color .25s, transform .25s;
        }
        .pod-thumb:hover { border-color: rgba(0,200,150,.5); transform: translateY(-3px); }
        .pod-thumb.active { border-color: #00c896; box-shadow: 0 0 0 2px rgba(0,200,150,.25); }
        .pod-thumb img { width: 100%; aspect-ratio: 16/9; object-fit: cover; display: block; }
        .pod-play-overlay {
          position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
          background: rgba(0,0,0,.28); transition: background .2s;
        }
        .pod-thumb:hover .pod-play-overlay { background: rgba(0,0,0,.1); }
        .pod-play-circle {
          width: 42px; height: 42px; border-radius: 50%; background: rgba(255,0,0,.85);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 16px rgba(0,0,0,.4);
        }
        .pod-ep-badge {
          position: absolute; top: 8px; left: 8px;
          background: rgba(0,0,0,.7); color: #fff;
          font-size: .62rem; font-weight: 700; letter-spacing: 1px;
          padding: 3px 9px; border-radius: 50px;
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ padding: "116px 24px 72px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at 12% 55%, rgba(0,200,150,.1), transparent 50%), radial-gradient(ellipse at 86% 20%, rgba(255,0,0,.05), transparent 42%)" }} />
        <div className="max-w-4xl mx-auto text-center" style={{ position: "relative", zIndex: 2 }}>
          <Reveal>
            <div className="pod-badge"><span className="pod-pulse" />Unlecture Podcast Series · YouTube Only</div>
            <h1 style={{ fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "clamp(2.1rem,5.5vw,3.8rem)", lineHeight: 1.08, color: "var(--color-text-body)", marginBottom: 20, letterSpacing: "-.015em" }}>
              Ideas That Shape the<br />
              <span className="pod-accent">Future of Learning.</span>
            </h1>
            <p style={{ fontSize: "clamp(.97rem,2vw,1.12rem)", color: "var(--color-text-muted, #7A9E8A)", lineHeight: 1.8, maxWidth: 580, margin: "0 auto 36px" }}>
              The Lyfshilp Unlecture Podcast Series — conversations with educators, founders, IIT &amp; Stanford alumni, and school leaders on AI, entrepreneurship, and the future of learning in India.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a href={PLAYLIST_URL} target="_blank" rel="noopener noreferrer" className="pod-yt-btn">
                <YTIcon />
                Watch Full Playlist
              </a>
              <a href={`https://www.youtube.com/channel/UCPjZ8bYh1-B5eAbnEI_GEPCpWEorMafGBuT0?sub_confirmation=1`} target="_blank" rel="noopener noreferrer" className="pod-sub-btn">
                Subscribe to Channel
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="pod-divider" />

      {/* ── FEATURED PLAYER ── */}
      <section style={{ padding: "64px 24px" }}>
        <div className="max-w-5xl mx-auto">
          <Reveal style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "#00c896", marginBottom: 8 }}>Now Playing</div>
                <h2 style={{ fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "clamp(1.5rem,3vw,2.1rem)", color: "var(--color-text-body)", lineHeight: 1.15 }}>
                  {featured.ep} — <span className="pod-accent">Unlecture Podcast</span>
                </h2>
              </div>
              <a href={`https://youtu.be/${featured.id}`} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 7, color: "#FF0000", fontSize: ".84rem", fontWeight: 700, textDecoration: "none" }}>
                <YTIcon size={14} /> Open in YouTube
              </a>
            </div>
          </Reveal>

          {/* 16:9 main player */}
          <Reveal delay={0.06}>
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, borderRadius: 16, overflow: "hidden", border: "1px solid rgba(0,200,150,.22)", boxShadow: "0 24px 60px rgba(0,0,0,.45)" }}>
              <iframe
                key={featured.id}
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                src={`https://www.youtube.com/embed/${featured.id}?rel=0&modestbranding=1`}
                title={`Lyfshilp Podcast ${featured.ep}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>

      <div className="pod-divider" />

      {/* ── EPISODE GRID ── */}
      <section style={{ padding: "56px 24px" }}>
        <div className="max-w-5xl mx-auto">
          <Reveal style={{ marginBottom: 28 }}>
            <div style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "#00c896", marginBottom: 8 }}>All Episodes</div>
            <h2 style={{ fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "clamp(1.5rem,3vw,2.1rem)", color: "var(--color-text-body)" }}>
              Browse <span className="pod-accent">Episodes</span>
            </h2>
            <p style={{ color: "var(--color-text-muted, #7A9E8A)", fontSize: ".85rem", marginTop: 8 }}>Click any episode to play it above.</p>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {EPISODES.map(({ id, ep }, i) => (
              <Reveal key={id} delay={i * 0.07}>
                <div
                  className={`pod-thumb ${featured.id === id ? "active" : ""}`}
                  onClick={() => { setFeatured({ id, ep }); window.scrollTo({ top: document.getElementById("player-section")?.offsetTop - 100 || 0, behavior: "smooth" }); }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setFeatured({ id, ep })}
                  aria-label={`Play ${ep}`}
                >
                  <img
                    src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
                    alt={`${ep} thumbnail`}
                    loading="lazy"
                  />
                  <div className="pod-play-overlay">
                    <div className="pod-play-circle">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    </div>
                  </div>
                  <span className="pod-ep-badge">{ep}</span>
                </div>
                {/* "Open in YT" below each thumb */}
                <a
                  href={`https://youtu.be/${id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 8, color: "var(--color-text-muted, #7A9E8A)", fontSize: ".7rem", fontWeight: 600, textDecoration: "none" }}
                >
                  <YTIcon size={11} />
                  YouTube
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} style={{ marginTop: 36, textAlign: "center" }}>
            <a href={PLAYLIST_URL} target="_blank" rel="noopener noreferrer" className="pod-yt-btn" style={{ fontSize: ".85rem", padding: "11px 24px" }}>
              <YTIcon size={15} />
              View All Episodes on YouTube
            </a>
          </Reveal>
        </div>
      </section>

      <div className="pod-divider" />

      {/* ── EXPLORE YOUTUBE ── */}
      <div className="mb-16 sm:mb-20">
        <ExploreYoutubeSection />
      </div>
    </div>
  );
}
