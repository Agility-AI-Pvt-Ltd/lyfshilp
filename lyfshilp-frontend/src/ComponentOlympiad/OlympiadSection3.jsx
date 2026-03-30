import { useEffect, useRef, useState } from "react";

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

const gamifiedItems = [
  { icon: "XP", title: "XP System", desc: "Points, Levels, Badges, Leaderboards" },
  { icon: "VB", title: "Live Venture Build", desc: "Build a live venture managing finance, operations, marketing and sales with expert mentorship." },
  { icon: "LS", title: "Live Industry Sessions", desc: "Interactive sessions with founders and industry leaders." },
];

export default function OlympiadSection3() {
  const [leftRef, leftInView] = useInView(0.1);
  const [rightRef, rightInView] = useInView(0.1);

  return (
    <section style={{
      background: "#061510",
      padding: "88px 24px", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(circle at 80% 60%,rgba(0,200,150,.1),transparent 40%)",
      }} />

      <div className="max-w-7xl mx-auto" style={{ position: "relative", zIndex: 2 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left image */}
          <div
            ref={leftRef}
            className="flex justify-center"
            style={{
              opacity: leftInView ? 1 : 0,
              transform: leftInView ? "translateX(0)" : "translateX(-40px)",
              transition: "opacity .8s ease, transform .8s ease",
              position: "relative",
            }}
          >
            <div style={{
              position: "absolute", inset: "5%",
              background: "radial-gradient(circle,rgba(0,200,150,.15),transparent 65%)",
              filter: "blur(20px)", borderRadius: "50%",
            }} />
            <img src="/images/4.svg" alt="Mentorship"
              style={{ position: "relative", zIndex: 1, width: "85%", maxWidth: 420, filter: "drop-shadow(0 20px 48px rgba(0,0,0,.4))" }}
            />
          </div>

          {/* Right content */}
          <div
            ref={rightRef}
            style={{
              opacity: rightInView ? 1 : 0,
              transform: rightInView ? "translateX(0)" : "translateX(40px)",
              transition: "opacity .8s ease .15s, transform .8s ease .15s",
            }}
          >
            <div style={{
              fontFamily: "'DM Sans',sans-serif", fontSize: ".72rem", fontWeight: 700,
              letterSpacing: "2.5px", textTransform: "uppercase", color: "#00c896", marginBottom: 14,
            }}>Founder-Mentor Pedagogy</div>
            <h2 style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900,
              color: "#fff", lineHeight: 1.15, marginBottom: 16,
            }}>
              Pedagogy & <span style={{ color: "#00c896" }}>Mentorship</span>
            </h2>
            <p style={{
              fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.55)",
              fontSize: ".95rem", lineHeight: 1.85, marginBottom: 28,
            }}>
              We go beyond textbooks — students are mentored by experts bringing real-world insights into the classroom.
            </p>

            {/* Mentors */}
            <div style={{
              background: "rgba(255,255,255,.05)", border: "1px solid rgba(0,200,150,.18)",
              borderRadius: 16, padding: "20px", marginBottom: 14,
            }}>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, color: "#00c896", fontSize: ".8rem", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 14 }}>
                Mentors Include
              </div>
              {["IIT & IIM Alumni", "Industry Experts & Startup Founders", "Former IAS Officers"].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00c896", flexShrink: 0 }} />
                  <span style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.72)", fontSize: ".87rem" }}>{item}</span>
                </div>
              ))}
            </div>

            {/* Gamified items */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {gamifiedItems.map(({ icon, title, desc }) => (
                <div key={title} style={{
                  display: "flex", gap: 14,
                  background: "rgba(255,255,255,.04)", border: "1px solid rgba(0,200,150,.1)",
                  borderRadius: 12, padding: "14px 16px",
                  transition: "border-color .3s, background .3s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,200,150,.3)"; e.currentTarget.style.background = "rgba(0,200,150,.06)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,200,150,.1)"; e.currentTarget.style.background = "rgba(255,255,255,.04)"; }}
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
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: ".88rem", color: "#fff", marginBottom: 3 }}>{title}</div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".78rem", color: "rgba(255,255,255,.45)", lineHeight: 1.55 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
